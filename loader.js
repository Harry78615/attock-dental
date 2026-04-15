(function() {
  function hideLoader() {
    var loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(function() { loader.style.display = 'none'; }, 700);
    }
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
  }

  window.addEventListener('load', function() {
    setTimeout(hideLoader, 2600);
  });

  // Hard fallback — never wait more than 3.5s
  setTimeout(hideLoader, 3500);
})();
