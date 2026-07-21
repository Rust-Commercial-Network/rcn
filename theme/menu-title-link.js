// Make the header logo (rendered as the menu title) link to the site home page.
(function () {
  var title = document.querySelector('.menu-bar .menu-title');
  if (!title || title.querySelector('a')) {
    return;
  }
  // mdBook defines `path_to_root` globally on every page.
  var root = typeof path_to_root !== 'undefined' ? path_to_root : '';
  var link = document.createElement('a');
  link.href = root + 'index.html';
  link.setAttribute('aria-label', 'Rust Commercial Network home');
  while (title.firstChild) {
    link.appendChild(title.firstChild);
  }
  title.appendChild(link);
})();
