# Rust Ecosystem Work Seeking Support

This directory lists Rust compiler, Cargo, tooling, and library work where maintainers are looking for funding, production data, or feedback from companies using Rust at scale.

The initiatives below represent active funding opportunities. Most already have at least one supporting organization and are looking for additional partners.

To discuss funding, procurement, or sharing private production feedback, contact [rust-commercial-network@rustfoundation.org][rcn-email]. For public discussion, use the [RCN channel in the Rust Project Zulip][rcn-zulip].

RFEF sponsors may receive recognition, fund reporting, sponsorship coordination, and advance security disclosures when coordinated private notice is needed.

## How to Help

Most listed work can be supported through the Rust Foundation Ecosystem Fund (RFEF), which directs funding to the maintainers or projects doing the work. For Rust Project goals seeking support, see the [Rust Project Goals funding page][project-goals-funding]. If an organization wants to support Rust maintainers more generally, please check out the  [Rust Project Funding page](https://rust-lang.org/funding/) where you can support the Rust Foundation Maintainers Fund or individual Rust project members.

Funding does not buy control over Rust technical decisions, RFC outcomes, stabilization, release timing, maintainer review, priority, or project roadmaps.

Depending on the item, support may go to an individual maintainer, a project, a fiscal host, an employer, or a foundation. Rust Project work still goes through the normal team review process, including RFCs, ACPs, implementation review, and stabilization where applicable. Project goals provide public context and coordination; they are not approval of a specific design or priority.

Use public project venues for technical feedback when possible. If confidential build data, deployment details, or production traces would be useful, contact the RCN mailbox, the relevant maintainer, or the Foundation before sharing them. Non-confidential conclusions should be summarized publicly when practical.

Named contributors and related projects are included to identify likely contacts and work owners. Inclusion does not mean the RCN, Rust Foundation, or Rust Project has endorsed a specific technical decision.

## Build Performance

### Wild

Useful when: link time is a visible cost in CI or local development.

Wild is a [Rust Innovation Lab](https://rustfoundation.org/rust-innovation-lab/) project building a faster linker for Rust workloads. Current work is aimed at large binaries, more platforms, and the missing linker features that prevent projects from trying Wild today.

The most useful sponsor input is real build data: linker timing profiles, crate graph shape, binary size, platform constraints, and failure cases. Maintainers will prioritize work that fits Wild's goals and available time.

Led by [David Lattimore (@davidlattimore)](https://github.com/davidlattimore). Related project: [Wild](https://github.com/wild-linker/wild).

### Faster Builds Roadmap

Useful when: build time affects developer wait time, CI spend, or release latency.

The Faster Builds Roadmap would fund [bjorn3 (@bjorn3)][bjorn3] for an additional day per week of Rust build performance work, complementing time already contributed through [Tweede Golf][tweede-golf].

bjorn3 would spend the funded time on the roadmap items most likely to shorten real build times.

Related: [Faster Builds Roadmap][faster-builds-roadmap], [Tweede Golf][tweede-golf].

### Cargo Cross-Workspace Cache

Useful when: duplicate Cargo build artifacts are costing CI time, disk space, or local setup time.

Cargo Cross-Workspace Cache would reduce duplicate build artifacts across Cargo workspaces. A shared cache could cut repeated CI minutes and disk use, provided it holds up against production build patterns.

[Ross Sullivan (@ranger-ross)](https://github.com/ranger-ross) is seeking support to design and implement a first version that the Cargo team can evaluate. If accepted, support would carry the work through normal Cargo review and nightly testing. Useful data includes build times, cache hit rates, cache storage costs, workspace structure, and failure cases.

Related: [Cargo Cross-Workspace Cache][cargo-cross-workspace-cache], [Cargo][cargo].

### Reusable Build Artifacts

Useful when: teams run `cargo check` before `cargo build` in local development or CI.

Today, `cargo check` and `cargo build` largely duplicate work. This project aims to make build artifacts reusable across both workflows, so work done for `cargo check` can carry into `cargo build`.

Funding would give [Alejandra Gonzalez (@blyxyas)](https://github.com/blyxyas) time to pursue a new incremental compilation design. This work may also support Cargo Cross-Workspace Cache and other build reuse work.

Related: [Incremental Compilation System, Rethought][incremental-system-rethought], [rust-lang/rust][rust-lang-rust].

### Cranelift

Useful when: teams rebuild large Rust services many times per day and care most about local debug-build time.

Cranelift is an alternative Rust code generation backend. The current goal is a 2x speedup in Cranelift code generation for debug builds, reducing local compile time for developers.

Sponsor support would cover time for [bjorn3 (@bjorn3)][bjorn3] and [Folkert de Vries (@folkertdev)][folkertdev], through [Tweede Golf][tweede-golf], to work through the performance improvements in the project goal.

Related: [Cranelift Performance Improvements][cranelift-performance], [Cranelift][cranelift], [Tweede Golf][tweede-golf].

## Developer Experience and Tooling

### cargo-nextest

Useful when: Rust test suites are a release gate and slow or flaky test runs delay shipping.

`cargo-nextest` is a Rust test runner used in local development and CI. Maintenance funding pays for the work users rely on but do not always see: releases, issue triage, contributor review, platform support, and CI-scale fixes.

Funding would buy down unpaid maintenance work for [Rain (@sunshowers)](https://github.com/sunshowers): releases, issue triage, contributor review, and fixes requested by users running nextest in CI. RCN members can provide feedback, test cases, or contributions through the same public channels as other users.

Related: [cargo-nextest](https://nexte.st/).

### Cargo Maintenance

Useful when: Cargo review or implementation work blocks supply-chain policy, build reproducibility, C++ interoperability, signed crates, or sandboxed build scripts.

Many Rust roadmap items need Cargo review or implementation work. This item funds general Cargo review and implementation time, not reserved reviewer time for funder-requested changes.

[Arlo Siemsen (@arlosi)](https://github.com/arlosi) would use additional funded time for Cargo review, mentoring, implementation, and moving accepted changes through Cargo review. Cargo maintainers and Rust Project teams retain authority over review, acceptance, prioritization, and release timing.

Related: [Cargo][cargo], [crates.io][crates-io].

### Crate Namespaces

Useful when: organizations publish related crate families, internal platform crates, SDKs, or official packages.

Crate namespaces would let organizations publish related crates under one namespace, making ownership clearer and reducing collisions with similarly named crates.

Implementation work is underway across rustc, Cargo, and crates.io while the next project goal is still being drafted. Funding would help contributors such as [Takayuki Maeda (@TaKO8Ki)](https://github.com/TaKO8Ki) continue implementing RFC 3243 and related changes. Cargo, crates.io, and rust-lang teams still decide design and policy questions through their normal processes.

Related: [RFC 3243][rfc-3243], [previous project goal][open-namespaces-goal], [Cargo][cargo], [crates.io][crates-io], [rust-lang/rust][rust-lang-rust]. A new project goal has not been published yet.

### Native async fn dynamic dispatch in traits

Rust supports async fn in traits, but using async methods through dyn trait objects still requires workarounds such as #[async_trait], which add allocation overhead, obscure signatures, and split the ecosystem between native async traits and boxed trait-object patterns.

Funding would support work by [Santiago Pastorino (@spastorino)](https://github.com/spastorino) and [Jack Huey (@jackh726)](https://github.com/jackh726) to make async trait methods usable through dynamic dispatch. The work has two parts: first, making Rust more precise about which trait methods are dyn-compatible, and second, adding native support for async dispatch through trait objects.

The goal is to reduce reliance on #[async_trait], give library authors a cleaner path for async trait APIs, and make the feature available for real-world testing on nightly before final syntax is designed.

Related: [Async fn in Traits][async-fn-traits], [rust-lang/rust][rust-lang-rust].

## Language and Compiler

### Async State Machine Improvements

Useful when: state-machine code generation affects CPU use, memory pressure, binary size, or compiler limits in async services.

Rust's async implementation generates state machines behind the scenes. Better state-machine generation can shrink binaries, improve runtime performance, and avoid compiler limits such as maximum query recursion depth.

[Dion Dokter (@diondokter)](https://github.com/diondokter) at [Tweede Golf][tweede-golf] is seeking support to continue async state machine code generation work.

Related: [project goal][async-state-machine-goal], [background][async-state-machine-background], [rust-lang/rust][rust-lang-rust].

### F16 Stabilization

Useful when: Rust code needs to pass f16 data between ML inference, graphics, simulation, scientific computing, or hardware APIs.

Many machine learning, graphics, and scientific computing workloads use 16-bit floating point formats. Native f16 support would make it easier to pass data between Rust, hardware APIs, and libraries that already use those values.

Sponsor support would help [Folkert de Vries (@folkertdev)][folkertdev], through [Trifecta Tech Foundation][trifecta], continue the implementation, testing, documentation, and review work needed before f16 can be considered for stabilization. Stabilization would still be decided through the Rust Project process.

Related: [F16 Stabilization][f16-stabilization], [rust-lang/rust][rust-lang-rust].

### Stable MIR and rustc_public

Useful when: static analysis, verification, GPU, compliance, or internal platform tools need Rust compiler data.

Stable MIR is intended to give external tools a supported way to read compiler data without depending on unstable rustc internals.

The next project goal is still pending. Funding would help [Makai41 (@Makai41)](https://github.com/Makai41) and the Stable MIR project publish `rustc_public` to crates.io, expand API coverage, and improve documentation. API additions should be evaluated for general Rust tooling value, not for any one downstream project.

Related: [previous project goal][stable-mir-previous-goal], [rust-lang/rust][rust-lang-rust]. The next project goal has not been published yet.

### Binary Size Reduction

Useful when: Rust binary size affects cold-start time, memory footprint, storage pressure, firmware size, or rollout cost.

A roadmap is being prepared for binary size reduction work led by [Nia Espera (@nia-e)](https://github.com/nia-e) and [Hexcat (@hexcat)](https://github.com/hexcat). Once the roadmap is published, support should focus on reductions that translate into lower cold-start time, smaller firmware or container images, and lower rollout cost for size-sensitive Rust users.

This is a funding interest area, not an approved Rust Project goal or committed outcome.

Related: [rust-lang/rust][rust-lang-rust]. Binary-size roadmap link to be added once published.

### Declarative Macro Improvements

Useful when: dependency review, supply-chain controls, or build-time code execution policies make proc macros expensive to adopt.

Better declarative macros could replace some proc macros, cutting build time, dependency surface area, and supply-chain review burden.

Funding would help [Josh Triplett (@joshtriplett)](https://github.com/joshtriplett) work on declarative attributes and derive macros. It may also support related work by [Oli Scherer (@oli-obk)](https://github.com/oli-obk) on compile-time Rust evaluation, or "comptime". Design questions remain subject to the relevant RFC, lang/compiler team, and stabilization processes.

Related: [Declarative Macro Improvements][declarative-macro-improvements], [rust-lang/rust][rust-lang-rust].

## Production Systems

### Tokio Runtime Optimizations

Useful when: Tokio scheduler behavior affects production latency, fairness, CPU use, or incident risk.

[Tokio](https://tokio.rs/) is the foundation for many Rust network services and async applications. Runtime and scheduler work matters when production workloads combine network IO, timers, and compute-heavy tasks.

[Folkert de Vries (@folkertdev)][folkertdev] at [Tweede Golf][tweede-golf] is seeking support for runtime and scheduler improvements in Tokio. Production feedback from large Tokio users would be useful, especially where scheduler behavior affects latency or incidents. Maintainers still make changes through Tokio's public design and review process.

Related: [Tokio][tokio], [time-based cooperative scheduling prototype][tokio-coop-prototype], [runtime optimization discussion][tokio-runtime-discussion].

### rustls

Useful when: production services terminate or initiate TLS and depend on timely security response, compatibility, and connection-heavy performance.

[rustls][rustls] is a Rust Innovation Lab project that provides TLS functionality for many Rust applications and services. Maintenance support helps pay for security response, releases, dependent-crate compatibility, and production feedback work that otherwise competes with limited maintainer time.

[Dirkjan Ochtman (@djc)](https://github.com/djc) is seeking maintenance time for rustls security coordination, releases, contribution review, 1.0 work, async handshake performance, and production-user feedback.

Related: [rustls][rustls].

### Hyperium

Useful when: Rust HTTP services depend on Hyper, Tower, h2, or related crates for availability, protocol correctness, observability, or performance.

[Hyperium][hyperium] maintains Hyper, Tower, h2, and related networking crates used by Rust services.

[Sean McArthur (@seanmonstar)](https://github.com/seanmonstar) is seeking time for the work that keeps Hyperium crates healthy: releases, issue triage, modularization, h2 performance, buffer pooling, observability, and production-user feedback.

Related: [Hyperium Roadmap][hyperium-roadmap].

## Contact

To discuss funding, procurement, or private production feedback, contact [rust-commercial-network@rustfoundation.org][rcn-email]. For public discussion, use the [RCN channel in the Rust Project Zulip][rcn-zulip].

[async-fn-traits]: https://rust-lang.github.io/rust-project-goals/2026/afidt-box.html#funding
[async-state-machine-background]: https://tweedegolf.nl/en/blog/237/async-rust-never-left-the-mvp-state
[async-state-machine-goal]: https://rust-lang.github.io/rust-project-goals/2026/async-statemachine-optimisation.html#funding
[bjorn3]: https://github.com/bjorn3
[cargo]: https://github.com/rust-lang/cargo
[cargo-cross-workspace-cache]: https://rust-lang.github.io/rust-project-goals/2026/cargo-cross-workspace-cache.html
[cranelift]: https://github.com/bytecodealliance/wasmtime/tree/main/cranelift
[cranelift-performance]: https://rust-lang.github.io/rust-project-goals/2026/improve-cg_clif-performance.html
[crates-io]: https://crates.io/
[declarative-macro-improvements]: https://github.com/rust-lang/rust-project-goals/issues/629
[f16-stabilization]: https://rust-lang.github.io/rust-project-goals/2026/stabilizing-f16.html#funding
[faster-builds-roadmap]: https://rust-lang.github.io/rust-project-goals/2026/roadmap-fast-builds.html
[folkertdev]: https://github.com/folkertdev
[hyperium]: https://hyper.rs/
[hyperium-roadmap]: https://hyper.rs/contrib/roadmap/
[incremental-system-rethought]: https://rust-lang.github.io/rust-project-goals/2026/incremental-system-rethought.html
[open-namespaces-goal]: https://rust-lang.github.io/rust-project-goals/2025h1/open-namespaces.html
[project-goals-funding]: https://rust-lang.github.io/rust-project-goals/2026/funding.html
[rcn-email]: mailto:rust-commercial-network@rustfoundation.org
[rcn-zulip]: https://rust-lang.zulipchat.com/#narrow/channel/594428-rcn
[rfc-3243]: https://github.com/rust-lang/rfcs/issues/3243
[rust-lang-rust]: https://github.com/rust-lang/rust
[rustls]: https://rustls.dev/
[rustnl]: https://rustnl.org/
[stable-mir-previous-goal]: https://github.com/rust-lang/rust-project-goals/issues/266
[tokio]: https://tokio.rs/
[tokio-coop-prototype]: https://github.com/tokio-rs/tokio/tree/time-based-coop-poc
[tokio-runtime-discussion]: https://github.com/tokio-rs/tokio/issues/8085
[trifecta]: https://trifectatech.org/
[tweede-golf]: https://tweedegolf.nl/
