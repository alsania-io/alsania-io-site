// age-gate.js — shared 18+ consent gate for Alsania character chats.
// Consent is stored in localStorage so users agree once (option A).
(function () {
  var KEY = 'alsania_age_verified_v1';

  function hasConsent() {
    try { return localStorage.getItem(KEY) === 'true'; } catch (e) { return false; }
  }

  function grantConsent() {
    try { localStorage.setItem(KEY, 'true'); } catch (e) {}
  }

  // Renders the gate into a container. Calls onAccept() once consent is given.
  function renderGate(container, onAccept) {
    if (hasConsent()) { onAccept(); return; }

    container.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'age-gate';
    wrap.innerHTML =
      '<div class="age-gate-card">' +
        '<div class="age-gate-icon">🔞</div>' +
        '<h2>Adults Only</h2>' +
        '<p>This area contains AI character chat experiences intended for adults. ' +
        'By continuing you confirm that you are at least 18 years old and consent to viewing this content.</p>' +
        '<div class="age-gate-actions">' +
          '<button type="button" class="age-gate-accept">I am 18 or older — Continue</button>' +
          '<a class="age-gate-decline" href="/">Take me back</a>' +
        '</div>' +
      '</div>';

    container.appendChild(wrap);

    wrap.querySelector('.age-gate-accept').addEventListener('click', function () {
      grantConsent();
      onAccept();
    });
  }

  window.AlsaniaAgeGate = { hasConsent: hasConsent, renderGate: renderGate, KEY: KEY };
})();
