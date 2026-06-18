import fs from 'node:fs/promises';

const token = process.env.GITHUB_TOKEN;
const org = process.env.SPONSORS_PROJECT_ORG || 'Rust-Commercial-Network';
const projectNumber = Number(process.env.SPONSORS_PROJECT_NUMBER || '1');
const docsDir = process.env.DOCS_DIR || 'docs';
const outputPath = `${docsDir}/members.md`;
const summaryPath = `${docsDir}/SUMMARY.md`;

if (!token) {
  throw new Error('GITHUB_TOKEN is required to generate the member list.');
}

async function graphql(query, variables) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'user-agent': 'rcn-member-list-generator',
    },
    body: JSON.stringify({ query, variables }),
  });

  const body = await response.json();
  if (!response.ok || body.errors) {
    const detail = body.errors?.map((error) => error.message).join('; ') || response.statusText;
    throw new Error(`GitHub GraphQL request failed: ${detail}`);
  }

  return body.data;
}

const fieldFragment = `
  field {
    ... on ProjectV2Field {
      name
    }
    ... on ProjectV2IterationField {
      name
    }
    ... on ProjectV2SingleSelectField {
      name
    }
  }
`;

const query = `
  query($org: String!, $number: Int!, $cursor: String) {
    organization(login: $org) {
      projectV2(number: $number) {
        title
        url
        items(first: 100, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            content {
              ... on Issue {
                title
                url
              }
              ... on PullRequest {
                title
                url
              }
              ... on DraftIssue {
                title
              }
            }
            fieldValues(first: 50) {
              nodes {
                ... on ProjectV2ItemFieldTextValue {
                  text
                  ${fieldFragment}
                }
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  ${fieldFragment}
                }
                ... on ProjectV2ItemFieldNumberValue {
                  number
                  ${fieldFragment}
                }
                ... on ProjectV2ItemFieldDateValue {
                  date
                  ${fieldFragment}
                }
                ... on ProjectV2ItemFieldIterationValue {
                  title
                  ${fieldFragment}
                }
              }
            }
          }
        }
      }
    }
  }
`;

function fieldMap(item) {
  const fields = new Map();

  for (const value of item.fieldValues.nodes) {
    const key = value.field?.name?.toLowerCase();
    const data = value.text ?? value.name ?? value.number ?? value.date ?? value.title;
    if (key && data !== undefined && data !== null && String(data).trim()) {
      fields.set(key, String(data).trim());
    }
  }

  return fields;
}

function firstField(fields, names) {
  for (const name of names) {
    const value = fields.get(name.toLowerCase());
    if (value) {
      return value;
    }
  }
  return '';
}

function memberFromItem(item) {
  const fields = fieldMap(item);
  const title = item.content?.title?.trim() || '';
  const url = item.content?.url || '';
  const name = firstField(fields, ['Member Name', 'Name', 'Company', 'Organization', 'Entity']) || title;
  const company = firstField(fields, ['Company', 'Organization', 'Entity', 'Employer']);
  const type = firstField(fields, ['Member Type', 'Type', 'Category', 'Representation']);
  const website = firstField(fields, ['Website', 'URL', 'Link']);

  return {
    name,
    company,
    type,
    url: website || url,
  };
}

function memberKind(member) {
  const text = `${member.type} ${member.company}`.toLowerCase();
  if (/\b(individual|person|personal|self)\b/.test(text)) {
    return 'individual';
  }
  if (/\b(company|organization|organisation|corporate|business|institution|foundation)\b/.test(text)) {
    return 'company';
  }

  const hasSeparateCompany = member.company && member.company !== member.name;
  return hasSeparateCompany ? 'individual' : 'company';
}

function escapeMarkdown(text) {
  return text.replace(/([\\`*_{}[\]()#+.!|-])/g, '\\$1');
}

function companyLine(member) {
  const company = member.company || member.name;
  const label = escapeMarkdown(company);
  return member.url ? `- [${label}](${member.url})` : `- ${label}`;
}

function memberNameLine(member) {
  const label = escapeMarkdown(member.name);
  return member.url ? `- [${label}](${member.url})` : `- ${label}`;
}

function uniqueCompanies(members) {
  const companiesByName = new Map();

  for (const member of members) {
    if (memberKind(member) !== 'company') {
      continue;
    }

    const company = member.company || member.name;
    if (company.toLowerCase() === 'rust project') {
      continue;
    }

    const key = company.toLowerCase();
    if (!companiesByName.has(key)) {
      companiesByName.set(key, { ...member, company });
    }
  }

  return Array.from(companiesByName.values()).sort((a, b) =>
    a.company.localeCompare(b.company, 'en', { sensitivity: 'base' }),
  );
}

async function projectItems() {
  let cursor = null;
  let project = null;
  const items = [];

  do {
    const data = await graphql(query, { org, number: projectNumber, cursor });
    project = data.organization?.projectV2;
    if (!project) {
      throw new Error(`Could not find project ${org}/${projectNumber}.`);
    }

    items.push(...project.items.nodes);
    cursor = project.items.pageInfo.hasNextPage ? project.items.pageInfo.endCursor : null;
  } while (cursor);

  return { project, items };
}

function render(project, items) {
  const members = items
    .map(memberFromItem)
    .filter((member) => member.name)
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

  const companies = uniqueCompanies(members);

  const lines = [
    '# Members',
    '',
    'The Rust Commercial Network includes companies and individuals working together to make Rust easier to adopt and maintain.',
    '',
    `This page is generated from the [${project.title}](${project.url}) GitHub Project during the website deployment.`,
    '',
  ];

  if (companies.length) {
    lines.push('## Companies', '', ...companies.map(companyLine), '');
  }

  if (members.length) {
    lines.push('## Member Names', '', ...members.map(memberNameLine), '');
  }

  if (!members.length) {
    lines.push('No members are listed yet.', '');
  }

  return lines.join('\n');
}

async function addSummaryEntry() {
  const summary = await fs.readFile(summaryPath, 'utf8');
  if (summary.includes('./members.md')) {
    return;
  }

  const overviewEntry = '- [Overview](./overview.md)\n';
  if (!summary.includes(overviewEntry)) {
    throw new Error(`Could not add member list to ${summaryPath}: overview entry not found.`);
  }

  const updated = summary.replace(overviewEntry, `${overviewEntry}- [Members](./members.md)\n`);
  await fs.writeFile(summaryPath, updated);
}

const { project, items } = await projectItems();
await fs.writeFile(outputPath, render(project, items));
await addSummaryEntry();
console.log(`Generated ${outputPath} from ${items.length} project items.`);
