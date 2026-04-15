/* =====================================================
   ATTOCK DENTAL CLINIC — Dynamic Content Renderer
   ===================================================== */

(function () {

  /* ---- ANNOUNCEMENT BAR ---- */
  function buildAnnouncementBar() {
    var ann = window.ANNOUNCEMENT;
    if (!ann || !ann.active) return;
    try { if (sessionStorage.getItem('ann_dismissed')) return; } catch(e) {}

    var bar = document.createElement('div');
    bar.className = 'announcement-bar color-' + ann.color;
    bar.id = 'announcement-bar';
    bar.innerHTML =
      '<span class="ann-text">' +
        (ann.emoji ? '<span style="margin-right:6px;">' + ann.emoji + '</span>' : '') +
        ann.text +
        (ann.linkText ? ' <a href="' + ann.linkUrl + '" class="ann-link">' + ann.linkText + '</a>' : '') +
      '</span>' +
      '<button class="ann-close" id="ann-close" aria-label="Dismiss">&#x2715;</button>';

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('has-announcement');

    document.getElementById('ann-close').addEventListener('click', function () {
      bar.style.transform = 'translateY(-100%)';
      bar.style.opacity = '0';
      bar.style.transition = 'all 0.3s ease';
      setTimeout(function(){ document.body.classList.remove('has-announcement'); }, 300);
      try { sessionStorage.setItem('ann_dismissed', '1'); } catch(e) {}
    });
  }


  /* ---- OFFERS SECTION ---- */
  function buildOffersSection() {
    var target = document.getElementById('offers-section');
    if (!target || !window.OFFERS) return;

    var active = window.OFFERS.filter(function(o){ return o.active; });
    if (active.length === 0) { target.style.display = 'none'; return; }

    var cards = active.map(function(offer, index) {
      // Build URL with offer details encoded so booking page can read them
      var offerParam = encodeURIComponent(offer.title);
      var discountParam = encodeURIComponent(offer.saving);
      var priceParam = encodeURIComponent(offer.offerPrice);
      var bookUrl = 'book.html?offer=' + offerParam + '&discount=' + discountParam + '&price=' + priceParam;

      return '<div class="offer-card">' +
        '<div class="offer-card-top">' +
          '<span class="offer-badge ' + offer.badgeColor + '">' + offer.badge + '</span>' +
          '<span class="offer-emoji">' + offer.emoji + '</span>' +
          '<h3>' + offer.title + '</h3>' +
          '<p>' + offer.description + '</p>' +

          (offer.saving ? '<span class="offer-saving">&#10003; ' + offer.saving + '</span>' : '') +
          '<div class="offer-expiry">&#9201; ' + offer.expiry + '</div>' +
        '</div>' +
        '<div class="offer-card-bottom">' +
          '<a href="' + bookUrl + '" class="btn btn-navy">' + offer.cta + ' &rarr;</a>' +
        '</div>' +
      '</div>';
    }).join('');

    target.innerHTML =
      '<div class="container">' +
        '<div class="section-header">' +
          '<span class="section-label">&#128176; Active Deals</span>' +
          '<h2>Current Offers</h2>' +
          '<div class="divider-line"></div>' +
          '<p class="section-subtitle">Limited-time promotions on our most popular treatments. Book before they expire.</p>' +
        '</div>' +
        '<div class="offers-grid" style="margin-top:48px;">' + cards + '</div>' +
        '<p style="text-align:center;margin-top:20px;font-size:0.78rem;color:var(--text-light);">* Mention the offer when booking. Subject to availability.</p>' +
      '</div>';

    // Animate cards in
    var offerCards = target.querySelectorAll('.offer-card');
    offerCards.forEach(function(card, i) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease ' + (i * 0.12) + 's, transform 0.5s ease ' + (i * 0.12) + 's';
      setTimeout(function() {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 150 + (i * 120));
    });
  }


  /* ---- NEWS TICKER ---- */
  function buildNewsTicker() {
    var target = document.getElementById('news-ticker');
    if (!target || !window.UPDATES) return;

    var active = window.UPDATES.filter(function(u){ return u.active; });
    if (active.length === 0) { target.style.display = 'none'; return; }

    var all = active.concat(active);
    var items = all.map(function(u) {
      return '<span class="update-item">' +
        '<span>' + u.emoji + '</span>' +
        '<span class="update-type">' + u.type + '</span>' +
        '<span>' + u.text + '</span>' +
        '<span class="updates-divider">&bull;</span>' +
      '</span>';
    }).join('');

    target.innerHTML =
      '<div class="container">' +
        '<div class="updates-inner">' +
          '<span class="updates-label">&#128226; Updates</span>' +
          '<div class="updates-ticker">' +
            '<div class="updates-track">' + items + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }


  /* ---- RUN ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      buildAnnouncementBar();
      buildOffersSection();
      buildNewsTicker();
    });
  } else {
    buildAnnouncementBar();
    buildOffersSection();
    buildNewsTicker();
  }

})();
