// Floating background shapes for the TinyWelt3D link page.
// Shapes drift up behind the buttons and fade out. No libraries, nothing loaded from outside.
// To change: edit SETTINGS below, or remove a shape from SHAPES.
(function () {
  // Respect visitors who turned off animations in their system settings
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SETTINGS = {
    everyMs: 450,      // how often a new shape appears (lower = more shapes)
    minSize: 34,       // smallest shape in px
    maxSize: 64,       // largest shape in px
    minSeconds: 6,     // shortest float time
    maxSeconds: 10,    // longest float time
    rise: 160          // how far a shape floats up, in px
  };

  var C = '#5A3E36', R = '#f4acb7', D = '#9d8189', W = '#fff', Y = '#fff6d9';
  function svg(inner) { return '<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">' + inner + '</svg>'; }

  var SHAPES = {
    cube: svg('<polygon points="20,4 36,12 20,20 4,12" fill="' + W + '" fill-opacity=".85"/><polygon points="4,12 20,20 20,37 4,29" fill="' + R + '"/><polygon points="36,12 20,20 20,37 36,29" fill="' + D + '"/><g fill="none" stroke="' + C + '" stroke-width="1.2" stroke-linejoin="round"><polygon points="20,4 36,12 36,29 20,37 4,29 4,12"/><polyline points="4,12 20,20 36,12"/><line x1="20" y1="20" x2="20" y2="37"/></g>'),
    printer: svg('<g fill="none" stroke="' + C + '" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="5" y="4" width="30" height="32" rx="3" fill="' + W + '" fill-opacity=".7"/><line x1="5" y1="11" x2="35" y2="11"/><rect x="16" y="11" width="8" height="5" fill="' + D + '"/><path d="M18.5 16 L20 19 L21.5 16"/><line x1="10" y1="31" x2="30" y2="31"/></g><rect x="15" y="24" width="10" height="7" rx="1" fill="' + R + '" stroke="' + C + '" stroke-width="1.2"/>'),
    spool: svg('<circle cx="20" cy="20" r="16" fill="' + R + '" stroke="' + C + '" stroke-width="1.4"/><circle cx="20" cy="20" r="11" fill="none" stroke="' + D + '" stroke-width="3" stroke-dasharray="2 1.5"/><circle cx="20" cy="20" r="5" fill="' + W + '" stroke="' + C + '" stroke-width="1.4"/><path d="M34 26 Q38 32 33 37" fill="none" stroke="' + D + '" stroke-width="1.6" stroke-linecap="round"/>'),
    bulb: svg('<path d="M20 4 C12.5 4 8 9.5 8 15.5 C8 20.5 11.5 23 13.5 26 L13.5 29 L26.5 29 L26.5 26 C28.5 23 32 20.5 32 15.5 C32 9.5 27.5 4 20 4Z" fill="' + Y + '" stroke="' + C + '" stroke-width="1.3" stroke-linejoin="round"/><rect x="14.5" y="29" width="11" height="5" rx="1.5" fill="' + D + '" stroke="' + C + '" stroke-width="1.2"/><path d="M17 15 L20 19 L23 15" fill="none" stroke="' + D + '" stroke-width="1.2" stroke-linecap="round"/>'),
    boat: svg('<path d="M3 24 L37 24 L33 33 C32.5 34.5 31 35 29.5 35 L10 35 C8 35 6.5 34 6 32.5 Z" fill="' + R + '" stroke="' + C + '" stroke-width="1.3" stroke-linejoin="round"/><path d="M10 24 L10 15 C10 13.5 11 12.5 12.5 12.5 L25 12.5 L28 24" fill="' + W + '" fill-opacity=".9" stroke="' + C + '" stroke-width="1.3" stroke-linejoin="round"/><rect x="13" y="15.5" width="5" height="4.5" rx="1" fill="' + Y + '" stroke="' + C + '" stroke-width="1"/><circle cx="22.5" cy="18" r="2.2" fill="' + Y + '" stroke="' + C + '" stroke-width="1"/><path d="M14.5 12.5 L14.5 6 L19 6 L19 12.5" fill="' + D + '" stroke="' + C + '" stroke-width="1.2" stroke-linejoin="round"/><circle cx="31" cy="28" r="1.6" fill="none" stroke="' + C + '" stroke-width="1"/>')
  };
  var keys = Object.keys(SHAPES);

  var style = document.createElement('style');
  style.textContent =
    '#fx-layer{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}' +
    'body>*:not(#fx-layer){position:relative;z-index:1}' +
    '.fx{position:absolute;opacity:0;animation:fxfloat linear forwards;will-change:transform,opacity}' +
    '@keyframes fxfloat{0%{opacity:0;transform:translateY(0) rotate(0) scale(.6)}15%{opacity:var(--o)}80%{opacity:var(--o)}' +
    '100%{opacity:0;transform:translateY(-' + SETTINGS.rise + 'px) rotate(var(--r)) scale(1)}}';
  document.head.appendChild(style);

  var layer = document.createElement('div');
  layer.id = 'fx-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.prepend(layer);

  function rand(a, b) { return a + Math.random() * (b - a); }

  function spawn() {
    if (document.hidden) return; // pause while the tab is in the background
    var d = document.createElement('div');
    var size = rand(SETTINGS.minSize, SETTINGS.maxSize);
    var dur = rand(SETTINGS.minSeconds, SETTINGS.maxSeconds);
    d.className = 'fx';
    d.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + rand(0, 95) + '%;top:' + rand(15, 95) + '%;' +
      'animation-duration:' + dur + 's;--o:' + rand(0.5, 0.85).toFixed(2) + ';--r:' + Math.round(rand(-45, 45)) + 'deg';
    d.innerHTML = SHAPES[keys[Math.floor(Math.random() * keys.length)]];
    layer.appendChild(d);
    setTimeout(function () { d.remove(); }, dur * 1000 + 100);
  }

  for (var i = 0; i < 8; i++) setTimeout(spawn, i * 200);
  setInterval(spawn, SETTINGS.everyMs);
})();
