(function() {
  function hideLoader() {
    var loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(function() {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 800);
    }
  }
  // Hide after animation completes
  window.addEventListener('load', function() {
    setTimeout(hideLoader, 2700);
  });
  // Hard fallback — never block longer than 4s
  setTimeout(hideLoader, 4000);
})();
