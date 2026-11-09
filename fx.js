// Floating background shapes for the TinyWelt3D link page.
// Shapes drift up behind the buttons and fade out. No libraries, nothing loaded from outside.
// To change: edit SETTINGS below, or remove a shape from SHAPES.
(function () {
  // Respect visitors who turned off animations in their system settings
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SETTINGS = {
    everyMs: 560,      // how often a new shape appears (lower = more shapes)
    minSize: 36,       // smallest shape in px
    maxSize: 64,       // largest shape in px
    minSeconds: 6,     // shortest float time
    maxSeconds: 10,    // longest float time
    rise: 160          // how far a shape floats up, in px
  };

  // Brand colours
  var C = '#5A3E36', R = '#f4acb7', D = '#9d8189', DD = '#735960', W = '#fff', RS = '#e38d9c', RL = '#f8cbd2';

  function svg(inner) { return '<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">' + inner + '</svg>'; }

  var SHAPES = {
    // Little test-print boat, single pink "filament"
    boat: svg('<g stroke="' + C + '" stroke-width="1.2" stroke-linejoin="round" fill="' + RL + '">' +
      '<path d="M15 3 L19 3 L18.8 8.5 L15.2 8.5 Z"/>' +
      '<path d="M12.5 8.5 L27 7.5 L27 10 L12.5 11 Z"/>' +
      '<path d="M13.5 11 L26 10 L25.2 21 L14.2 23 Z"/>' +
      '<path d="M17.2 22.4 L17.2 15.5 C17.2 13.6 21.6 13.4 21.6 15.3 L21.4 21.7" fill="' + RS + '"/>' +
      '<path d="M4 24.5 C12 24 19 23.5 24 20.5 C26 19 28 18.5 37 15.5 L37.5 18 C37 27 32 33 26 35 L8 35 Z" fill="' + R + '"/>' +
      '<circle cx="32" cy="22.5" r="1.6" fill="' + RL + '"/></g>'),

    // Cube: white top, pink front, dusty brown side
    cube: svg('<polygon points="20,4 36,12 20,20 4,12" fill="' + W + '" fill-opacity=".85"/><polygon points="4,12 20,20 20,37 4,29" fill="' + R + '"/><polygon points="36,12 20,20 20,37 36,29" fill="' + D + '"/>' +
      '<g fill="none" stroke="' + C + '" stroke-width="1.2" stroke-linejoin="round"><polygon points="20,4 36,12 36,29 20,37 4,29 4,12"/><polyline points="4,12 20,20 36,12"/><line x1="20" y1="20" x2="20" y2="37"/></g>'),

    // Pink filament spool
    spool: svg('<ellipse cx="23" cy="20" rx="12.5" ry="16" fill="' + DD + '"/>' +
      '<path d="M17 5.5 C26 5.5 31.5 12 31.5 20 C31.5 28 26 34.5 17 34.5 Z" fill="' + R + '"/>' +
      '<g fill="none" stroke="' + RS + '" stroke-width=".8" stroke-linecap="round"><path d="M22 6.5 C28 9 30 15 30 20 C30 25 28 31 22 33.5"/><path d="M25 8 C29 11 30.8 16 30.8 20 C30.8 25 29 29 25.5 32"/><path d="M19.5 6 C25 8 28 14 28.3 20 C28.5 26 25.5 32 19.5 34"/></g>' +
      '<path d="M29.5 29 C30.5 32.5 31 35 34.5 37.5" fill="none" stroke="' + R + '" stroke-width="1.6" stroke-linecap="round"/>' +
      '<ellipse cx="16.5" cy="20" rx="12.5" ry="15.5" fill="' + D + '"/>' +
      '<g fill="' + R + '"><path d="M13 7.5 Q16.5 6.6 20 7.5 L18.6 12 Q16.5 11.5 14.4 12 Z"/><path d="M13 32.5 Q16.5 33.4 20 32.5 L18.6 28 Q16.5 28.5 14.4 28 Z"/><path d="M5.4 16.3 Q5 20 5.4 23.7 L9.6 22.2 Q9.3 20 9.6 17.8 Z"/><path d="M27.6 16.3 Q28 20 27.6 23.7 L23.4 22.2 Q23.7 20 23.4 17.8 Z"/></g>' +
      '<g stroke="' + RS + '" stroke-width=".7" fill="none"><path d="M14 9.2 L19.2 9.2 M14.3 10.7 L18.9 10.7"/><path d="M14 30.8 L19.2 30.8 M14.3 29.3 L18.9 29.3"/><path d="M7 17 L7 23 M8.4 17.5 L8.4 22.5"/><path d="M26 17 L26 23 M24.6 17.5 L24.6 22.5"/></g>' +
      '<ellipse cx="16.5" cy="20" rx="4.3" ry="5.2" fill="' + DD + '"/>' +
      '<path d="M17.6 16.3 C16.3 18 16.3 22 17.6 23.7 C18.9 22 18.9 18 17.6 16.3 Z" fill="' + W + '"/>')
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
    var small = window.innerWidth < 600 ? 0.8 : 1; // slightly smaller shapes on phones
    var size = rand(SETTINGS.minSize, SETTINGS.maxSize) * small;
    var dur = rand(SETTINGS.minSeconds, SETTINGS.maxSeconds);
    d.className = 'fx';
    d.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + rand(0, 95) + '%;top:' + rand(15, 95) + '%;' +
      'animation-duration:' + dur + 's;--o:' + rand(0.55, 0.85).toFixed(2) + ';--r:' + Math.round(rand(-35, 35)) + 'deg';
    d.innerHTML = SHAPES[keys[Math.floor(Math.random() * keys.length)]];
    layer.appendChild(d);
    setTimeout(function () { d.remove(); }, dur * 1000 + 100);
  }

  // Scale the amount to the screen size, so phones get the same density as a desktop
  // instead of the same number of shapes. everyMs is tuned for a 1440×900 screen.
  function screenFactor() {
    var area = window.innerWidth * window.innerHeight;
    return Math.max(1, (1440 * 900) / Math.max(area, 1));
  }
  function loop() {
    spawn();
    setTimeout(loop, SETTINGS.everyMs * screenFactor());
  }

  var startCount = Math.max(2, Math.round(7 / screenFactor()));
  for (var i = 0; i < startCount; i++) setTimeout(spawn, i * 220);
  setTimeout(loop, SETTINGS.everyMs * screenFactor());
})();
