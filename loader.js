(function() {
  // Hide loader after animation completes
  window.addEventListener('load', function() {
    setTimeout(function() {
      var loader = document.getElementById('page-loader');
      if (loader) {
        loader.classList.add('hidden');
        setTimeout(function() {
          loader.style.display = 'none';
        }, 700);
      }
      document.body.classList.add('loaded');
    }, 2600);
  });

  // Fallback — never block page longer than 4s
  setTimeout(function() {
    var loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
    document.body.classList.add('loaded');
  }, 4000);
})();
