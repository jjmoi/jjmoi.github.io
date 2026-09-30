/* =========================================================
   Common Goods — Research Wall
   Pieces are data. Position is derived. Nothing is precious.
   ========================================================= */

/* ---------- deterministic jitter (same wall every visit) ---------- */

function seeded(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seeded(20260812);
const between = (lo, hi) => lo + rand() * (hi - lo);

/* ---------- how the wall can be grouped ------------------------- */

/* A studio re-pins its wall whenever the argument changes. The geometry is
   derived from whatever grouping is active, so any axis lays out cleanly. */

/* A wall like this is not arranged, it accretes. Lanes are only a scaffold —
   everything below overlaps hard enough that you never read the grid. */
const PITCH = 112;      /* lane to lane, well under a sheet's width */
const CHANNEL = 106;    /* the only bare wall left */
const TOP = 138;        /* first row, below the scrawled heading */
const MARGIN = 96;

/* one marker per group, the way a case board gets colour-coded by year */
const MARKERS = ['red', 'blue', 'orange', 'green', 'purple', 'pink'];

const FAMILY = {
  sign: 'signage', shout: 'signage', slab: 'signage',
  specimen: 'signage', badge: 'signage', word: 'signage',
  label: 'packaging', swatch: 'packaging',
  flyer: 'ephemera', receipt: 'ephemera', note: 'ephemera',
  ruled: 'ephemera', grid: 'ephemera',
  dossier: 'ephemera', snippet: 'ephemera',
  plate: 'photographic', framed: 'photographic', mugshot: 'photographic',
};

/* What the piece is actually made of, read off its own stock and ink.
   Plain white paper is the default, because most of this wall is ink on it. */
function toneOf(piece) {
  const stock = Object.values(piece.vars || {}).join(' ');
  if (/--flu-/.test(stock) || piece.kind === 'specimen') return 'flu';
  if (piece.kind === 'plate' || piece.kind === 'mugshot') return 'photo';
  if (/--paper-(grey|silver|kraft|news)/.test(stock)) return 'stock';
  if (piece.kind === 'receipt' || piece.kind === 'swatch') return 'stock';
  return 'mono';
}

const AXES = {
  theme: {
    label: 'Theme',
    of: (p) => p.c,
    groups: [
      { key: 'A', title: 'Unbranded', sub: 'Transparent / Honest / Blunt' },
      { key: 'B', title: 'On the street', sub: 'Everyman / Democratic / Low culture' },
      { key: 'C', title: 'Premium generic', sub: 'Fashion / Art / High culture' },
    ],
  },
  colour: {
    label: 'Colour',
    of: (p) => p.tone,
    groups: [
      { key: 'flu', title: 'Fluorescent', sub: 'Stock that does the shouting' },
      { key: 'mono', title: 'Ink on white', sub: 'Type doing all the work' },
      { key: 'stock', title: 'Board & grey', sub: 'Uncoated / Unbleached' },
      { key: 'photo', title: 'Photographic', sub: 'Taken, not made' },
    ],
  },
  format: {
    label: 'Format',
    of: (p) => p.family,
    groups: [
      { key: 'signage', title: 'Signage & type', sub: 'Set once / Read at speed' },
      { key: 'ephemera', title: 'Ephemera', sub: 'Printed to be thrown away' },
      { key: 'packaging', title: 'Packaging', sub: 'The object describing itself' },
      { key: 'photographic', title: 'Photographic', sub: 'Evidence, filed' },
    ],
  },
};

let axisKey = 'theme';

const axis = () => AXES[axisKey];
const groupOf = (piece) => axis().groups.find((g) => g.key === axis().of(piece));
const groupName = (piece) => groupOf(piece)?.title || '—';

/* ---------- the pieces ------------------------------------------ */

const PIECES = [
  /* ============ A — UNBRANDED ============ */
  {
    c: 'A', kind: 'word', w: 152, h: 196, fasten: 'top',
    title: 'Diet Coke, front panel', ref: 'A-01', origin: 'Vending machine, Old Street', year: '2024',
    note: 'Two words in a stock serif, no styling, and it still outsells everything on the shelf. The restraint is the branding.',
    vars: { '--word-bg': 'var(--paper-silver)' },
    d: { lines: ['Diet', 'Coke'], foot: '330ml / no sugar' },
  },
  {
    c: 'A', kind: 'label', w: 168, h: 138, fasten: 'sides',
    title: 'Luncheon loaf tin', ref: 'A-02', origin: 'Cash and carry, Peckham', year: '2023',
    note: 'The tin describes its contents and stops. Weight, method, nothing else. A whole voice in nine words.',
    d: { name: 'Luncheon loaf', spec: ['340 g net', 'Pressed pork', 'Open with key'], barcode: true },
  },
  {
    c: 'A', kind: 'specimen', w: 132, h: 182, fasten: 'corners',
    title: 'Kerning test sheet', ref: 'A-03', origin: 'Studio, letterpress drawer', year: '2025',
    note: 'Nonsense strings pulled to test the hard pairs. Set in fluorescent so the spacing errors shout.',
    d: { lines: ['MMKX', 'GGEB', 'GOFM', 'KBIW', 'YOFC', 'WVVY'] },
  },
  {
    c: 'A', kind: 'plate', w: 164, fasten: 'top', h: 158,
    title: 'Shelf, cash and carry', ref: 'A-04', origin: 'Photograph, 35mm', year: '2023',
    note: 'Twelve identical tins, one facing the wrong way. The mistake is the only thing you look at.',
    vars: { '--p1': 'var(--plate-c1)', '--p2': 'var(--plate-c2)', '--p3': 'var(--plate-c3)' },
    d: { form: 'object', cap: 'Peckham / 03' },
  },
  {
    c: 'A', kind: 'flyer', w: 142, h: 156, fasten: 'corners',
    title: 'Ripple chips, 6-pack', ref: 'A-05', origin: 'Discount bin', year: '2024',
    note: 'Fluorescent stock does the work that a photograph would cost money to do, at a fraction of the price.',
    vars: { '--flyer-bg': 'var(--flu-orange)' },
    d: { head: 'Ripple potato chips', body: 'Six packs. Salted. Nothing added that you would need to look up.', foot: '6 × 25 g' },
  },
  {
    c: 'A', kind: 'receipt', w: 120, h: 196, fasten: 'diag',
    title: 'Ingredients strip', ref: 'A-06', origin: 'Back of pack', year: '2024',
    note: 'A list nobody art-directed. Perfect hierarchy anyway, because the order is the truth.',
    d: {
      head: 'Contents',
      rows: [['Potato', '78%'], ['Oil', '19%'], ['Salt', '2%'], ['Nothing', '1%']],
      total: ['Declared', '100%'],
    },
  },
  {
    c: 'A', kind: 'ruled', w: 178, h: 124, fasten: 'top',
    title: 'Index card, first principle', ref: 'A-07', origin: 'Studio wall', year: '2025',
    note: 'Written on day one of the project and never edited. It has survived three rounds of client notes.',
    d: { text: 'Say the thing. Then stop talking.', sig: 'Wall 04 / card 1' },
  },
  {
    c: 'A', kind: 'swatch', w: 152, h: 126, fasten: 'top',
    title: 'Greys, pulled from packaging', ref: 'A-08', origin: 'Scanned and matched', year: '2025',
    note: 'None of these were chosen. They are what uncoated board looks like when nobody pays for ink.',
    d: {
      rows: [
        ['var(--paper-silver)', 'Board, uncoated'],
        ['var(--paper-grey)', 'Recycled 300gsm'],
        ['var(--paper-kraft)', 'Kraft, unbleached'],
      ],
    },
  },
  {
    c: 'A', kind: 'sign', w: 152, h: 94, fasten: 'corners',
    title: 'Yard', ref: 'A-09', origin: 'Builder\'s gate, Hackney', year: '2024',
    note: 'One word, ruled box, no arrow. It never occurred to anyone that it might need explaining.',
    d: { lines: ['Yard'] },
  },
  {
    c: 'A', kind: 'badge', w: 112, h: 112, fasten: 'sides',
    title: 'Born this book', ref: 'A-10', origin: 'Sticker, book fair', year: '2022',
    note: 'A circle forces you to cut the copy. Every round format is an editor.',
    vars: { '--badge-bg': 'var(--ink-solid)', '--badge-fg': 'var(--ink-inverse)' },
    d: { lines: ['Born', 'this', 'book'] },
  },
  {
    c: 'A', kind: 'slab', w: 134, h: 104, fasten: 'top',
    title: 'No name', ref: 'A-11', origin: 'Supermarket own-label, 1978', year: '1978',
    note: 'The original. Yellow ground, black Helvetica, product name as logotype. Forty-eight years and it still reads as new.',
    vars: { '--slab-bg': 'var(--flu-yellow)', '--slab-fg': 'var(--ink-solid)', '--slab-size': 'var(--step-2)' },
    d: { lines: ['No', 'name'] },
  },
  {
    c: 'A', kind: 'note', w: 144, h: 118, fasten: 'diag',
    title: 'Scrap, taped', ref: 'A-12', origin: 'Studio', year: '2025',
    note: 'Left by whoever was here on Tuesday. Nobody has taken it down because nobody disagrees.',
    vars: { '--note-bg': 'var(--flu-cyan)' },
    d: { text: 'A logo is what you add when the object is not enough.', by: 'Anon / Tue' },
  },
  {
    c: 'A', kind: 'grid', w: 148, h: 128, fasten: 'diag',
    title: 'Weight matrix', ref: 'A-13', origin: 'Studio test', year: '2025',
    note: 'Every weight of one grotesque, set at one size. Only three of them are usable and they are not the ones you expect.',
    d: { head: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], cells: 21, start: 1 },
  },
  {
    c: 'A', kind: 'plate', w: 172, h: 162, fasten: 'corners',
    title: 'Loading bay, 6am', ref: 'A-14', origin: 'Photograph, 35mm', year: '2024',
    note: 'Pallets, shrink wrap, a horizon of corrugated steel. The most honest colour palette in the city.',
    vars: { '--p1': 'var(--plate-a1)', '--p2': 'var(--plate-a2)', '--p3': 'var(--plate-a3)' },
    d: { form: 'horizon', cap: 'Bermondsey / 06:04' },
  },
  {
    c: 'A', kind: 'framed', w: 142, h: 176, fasten: 'top',
    title: 'Square, printed once', ref: 'A-15', origin: 'Studio edition', year: '2025',
    note: 'Framed to prove a point in a meeting: put a mat around anything and the room treats it as considered.',
    vars: { '--framed-mark': 'var(--ink-solid)' },
    d: { cap: 'Untitled / ed. 1' },
  },
  {
    c: 'A', kind: 'label', w: 136, h: 128, fasten: 'top',
    title: 'Aspirin, generic', ref: 'A-16', origin: 'Pharmacy, own-label', year: '2024',
    note: 'Dosage set larger than the brand name. Regulation produced better hierarchy than any brief would have.',
    vars: { '--label-bg': 'var(--paper-grey)' },
    d: { name: 'Aspirin 300mg', spec: ['32 tablets', 'Read the leaflet'], barcode: false },
  },

  /* ============ B — ON THE STREET ============ */
  {
    c: 'B', kind: 'sign', w: 154, h: 162, fasten: 'corners',
    title: 'Pick-up and drop-off only', ref: 'B-01', origin: 'Kerbside, Dalston', year: '2024',
    note: 'Four rules stacked by importance, ruled box, no softening. Read at speed from a moving car.',
    vars: { '--sign-line': 'var(--plate-d1)' },
    d: { lead: 'Pick-up and', lines: ['Drop-off', 'only', 'No parking'] },
  },
  {
    c: 'B', kind: 'slab', w: 178, h: 146, fasten: 'sides',
    title: 'Cafeteria menu board', ref: 'B-02', origin: 'Staff canteen', year: '2023',
    note: 'Punched plastic letters on black. The grid is the pricing, and the pricing is the design.',
    vars: { '--slab-size': 'var(--step-1)' },
    d: { lines: ['Cafeteria', 'menu', 'Entrée'] },
  },
  {
    c: 'B', kind: 'shout', w: 188, h: 222, fasten: 'top', span: 1,
    title: 'Sell your teeth online', ref: 'B-03', origin: 'Lamp post, Whitechapel', year: '2024',
    note: 'Set in whatever was installed, centred because centring is free, phone number as the payoff. The most confident piece on this wall.',
    d: { lines: ['Sell', 'your', 'teeth'], small: 'Online', num: 'Call: 0842 300 782' },
  },
  {
    c: 'B', kind: 'flyer', w: 168, h: 126, fasten: 'diag',
    title: 'No parking, hand-cut', ref: 'B-04', origin: 'Shutter, Ridley Road', year: '2024',
    note: 'Magenta because the shop had magenta. Constraint doing the work of a colour strategy.',
    vars: { '--flyer-bg': 'var(--flu-magenta)' },
    d: { head: 'No parking', body: 'Vehicles removed at owner\'s expense. We are not joking about this.', foot: '24 hours' },
  },
  {
    c: 'B', kind: 'plate', w: 178, h: 168, fasten: 'corners',
    title: 'Burger van, Bethnal Green', ref: 'B-05', origin: 'Photograph, digital', year: '2025',
    note: 'Red awning, white sans, prices in a column. A complete identity built by one person with a marker.',
    vars: { '--p1': 'var(--plate-d1)', '--p2': 'var(--plate-d2)', '--p3': 'var(--plate-d3)' },
    d: { form: 'stall', cap: 'Bethnal Green / 12:40' },
  },
  {
    c: 'B', kind: 'label', w: 134, h: 122, fasten: 'diag',
    title: 'Canal Street station', ref: 'B-06', origin: 'Enamel plate', year: 'Undated',
    note: 'Sixty years of wayfinding decisions and not one of them is decorative.',
    d: { name: 'Canal Street', spec: ['Downtown platform', 'Uptown / Broadway'], barcode: false },
  },
  {
    c: 'B', kind: 'grid', w: 152, h: 140, fasten: 'top',
    title: 'Market days', ref: 'B-07', origin: 'Stall wall', year: '2024',
    note: 'Seven letters, thirty-one numbers, one rule. A calendar is the cheapest grid ever designed.',
    d: { head: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], cells: 28, start: 1 },
  },
  {
    c: 'B', kind: 'receipt', w: 122, h: 182, fasten: 'top',
    title: 'Minicab card', ref: 'B-08', origin: 'Windscreen', year: '2024',
    note: 'Rates, radius, a number to call. It answers every question a customer has, in order.',
    d: {
      head: 'Any distance',
      rows: [['Local', '£6'], ['Airport', '£38'], ['Nights', '+£2'], ['Waiting', 'Free'] ],
      total: ['Call now', '24 hr'],
    },
  },
  {
    c: 'B', kind: 'note', w: 148, h: 110, fasten: 'sides',
    title: 'Overheard, bus stop', ref: 'B-09', origin: 'Studio notebook', year: '2025',
    note: 'Transcribed on the spot. Better copy than anything we wrote that week.',
    vars: { '--note-bg': 'var(--flu-yellow)' },
    d: { text: '"It does what it says. That\'s why I buy it."', by: 'Route 55 / 08:20' },
  },
  {
    c: 'B', kind: 'badge', w: 108, h: 108, fasten: 'top',
    title: '24 hour', ref: 'B-10', origin: 'Shop door', year: '2023',
    note: 'Orange disc, two words, no hours listed underneath. The claim is absolute or it is nothing.',
    vars: { '--badge-bg': 'var(--flu-orange)' },
    d: { lines: ['Open', '24', 'hour'] },
  },
  {
    c: 'B', kind: 'flyer', w: 162, h: 134, fasten: 'diag',
    title: 'Magazines about us', ref: 'B-11', origin: 'Newsstand sign', year: '2024',
    note: 'Green stock, condensed caps, wrapped to fill the board exactly. Justified by hand, not by software.',
    vars: { '--flyer-bg': 'var(--flu-green)' },
    d: { head: 'Magazines about us', body: 'Cold beer. Cigarettes. Papers from home. Open before you are.', foot: 'Cash preferred' },
  },
  {
    c: 'B', kind: 'plate', w: 158, h: 152, fasten: 'corners',
    title: 'Man with placard', ref: 'B-12', origin: 'Photograph, 35mm', year: '2023',
    note: 'The placard is A1 card and a marker pen. It carried further than the PA system did.',
    vars: { '--p1': 'var(--plate-a1)', '--p2': 'var(--plate-a2)', '--p3': 'var(--plate-a3)' },
    d: { form: 'figure', cap: 'Aldgate / 14:15' },
  },
  {
    c: 'B', kind: 'ruled', w: 172, h: 116, fasten: 'top',
    title: 'Index card, second principle', ref: 'B-13', origin: 'Studio wall', year: '2025',
    note: 'The street sets type badly and communicates perfectly. Worth staring at until it stings.',
    d: { text: 'Legible beats beautiful, every single time.', sig: 'Wall 04 / card 2' },
  },
  {
    c: 'B', kind: 'sign', w: 144, h: 88, fasten: 'corners',
    title: 'Grand St WC2', ref: 'B-14', origin: 'Street plate', year: 'Undated',
    note: 'Postcode as a suffix, cap height matched to the name. Municipal systems, quietly excellent.',
    d: { lines: ['Grand St', 'WC2'] },
  },
  {
    c: 'B', kind: 'swatch', w: 152, h: 148, fasten: 'top',
    title: 'Fluorescents, in stock', ref: 'B-15', origin: 'Copy shop, Kingsland Rd', year: '2025',
    note: 'The full range the shop carries. This is the palette of every flyer in a two-mile radius.',
    d: {
      rows: [
        ['var(--flu-magenta)', 'Astro magenta'],
        ['var(--flu-yellow)', 'Astro yellow'],
        ['var(--flu-green)', 'Astro green'],
        ['var(--flu-cyan)', 'Astro blue'],
      ],
    },
  },
  {
    c: 'B', kind: 'word', w: 146, h: 168, fasten: 'sides',
    title: 'Ma2, small ad', ref: 'B-16', origin: 'Classified page', year: '2024',
    note: 'Ruled box, centred serif, telephone in the last line. The layout of the small ad has not changed in a century because it works.',
    vars: { '--word-bg': 'var(--paper-news)' },
    d: { lines: ['Ma2'], foot: 'Box 4 / Reply by post' },
  },
  {
    c: 'B', kind: 'framed', w: 140, h: 170, fasten: 'top',
    title: 'Fare table', ref: 'B-17', origin: 'Bus shelter', year: '2024',
    note: 'Framed behind glass and bolted to a pole. Somebody thought a timetable deserved a frame, and they were right.',
    vars: { '--framed-mark': 'var(--paper-grey)' },
    d: { cap: 'Fares / from 03 Mar' },
  },

  /* ============ C — PREMIUM GENERIC ============ */
  {
    c: 'C', kind: 'slab', w: 248, h: 292, fasten: 'corners', span: 2,
    title: 'Tom Ford, box lid', ref: 'C-01', origin: 'Counter, department store', year: '2024',
    note: 'Two words, tight tracking, white on black, dead centre. The whole strategy is that nothing else appears on the surface.',
    vars: { '--slab-size': 'var(--step-4)' },
    d: { lines: ['Tom', 'Ford'] },
  },
  {
    c: 'C', kind: 'slab', w: 132, h: 108, fasten: 'corners',
    title: 'BLK DNM', ref: 'C-02', origin: 'Woven label', year: '2023',
    note: 'Vowels removed so the word becomes a mark. Costs nothing, reads as expensive.',
    vars: { '--slab-size': 'var(--step-2)' },
    d: { lines: ['BLK', 'DNM'] },
  },
  {
    c: 'C', kind: 'label', w: 152, h: 172, fasten: 'diag',
    title: 'Odeur 53', ref: 'C-03', origin: 'Fragrance carton', year: '2024',
    note: 'A number instead of a name, set in the same grotesque as a pharmacy box. Premium borrowed from generic, deliberately.',
    vars: { '--label-bg': 'var(--paper-grey)' },
    d: { name: 'Odeur 53', spec: ['Eau de toilette', '50 ml / 1.6 fl oz', 'Comme des Garçons'], barcode: true },
  },
  {
    c: 'C', kind: 'flyer', w: 168, h: 152, fasten: 'diag',
    title: 'Private view invitation', ref: 'C-04', origin: 'Posted card', year: '2025',
    note: 'Fluorescent yellow, hairline rule, address in the smallest legible size. The gallery is telling you it does not need to persuade you.',
    vars: { '--flyer-bg': 'var(--flu-yellow)' },
    d: {
      head: 'You are invited',
      body: 'Thursday 6–9pm. 34 Rechurch Street. No speeches, no programme, no press.',
      foot: 'RSVP not required',
    },
  },
  {
    c: 'C', kind: 'plate', w: 168, h: 178, fasten: 'top',
    title: 'Coat, unbranded', ref: 'C-05', origin: 'Lookbook, sheet 4', year: '2025',
    note: 'Photographed against a wall the same grey as the coat. Nothing in frame identifies the maker.',
    vars: { '--p1': 'var(--plate-f1)', '--p2': 'var(--plate-f2)', '--p3': 'var(--plate-f3)', '--plate-ratio': '3 / 4' },
    d: { form: 'figure', cap: 'Look 04 / no logo' },
  },
  {
    c: 'C', kind: 'framed', w: 148, h: 184, fasten: 'top',
    title: 'Gallery card', ref: 'C-06', origin: 'Wall label', year: '2025',
    note: 'The mat is wider than the work. Institutional confidence expressed entirely in millimetres of white.',
    vars: { '--framed-mark': 'var(--paper-silver)' },
    d: { cap: 'Untitled / 2025 / gouache' },
  },
  {
    c: 'C', kind: 'shout', w: 138, h: 96, fasten: 'corners',
    title: 'Pin-up', ref: 'C-07', origin: 'Magazine masthead', year: '2024',
    note: 'Hyphen carrying the whole joke. Set once, at one size, forever.',
    d: { lines: ['Pin-up'], small: 'Issue 32' },
  },
  {
    c: 'C', kind: 'swatch', w: 152, h: 148, fasten: 'sides',
    title: 'Blacks, matched', ref: 'C-08', origin: 'Press check', year: '2025',
    note: 'Four blacks that all failed to match on press. We printed the fifth one flat and nobody noticed the difference.',
    d: {
      rows: [
        ['var(--ink-solid)', 'Rich black'],
        ['var(--ink)', 'Cool black'],
        ['var(--ink-soft)', 'Grey 60'],
        ['var(--paper-silver)', 'Grey 15'],
      ],
    },
  },
  {
    c: 'C', kind: 'note', w: 158, h: 120, fasten: 'top',
    title: 'Scrap, third principle', ref: 'C-09', origin: 'Studio', year: '2025',
    note: 'Argued about for an afternoon. Still on the wall, so it won.',
    vars: { '--note-bg': 'var(--paper)' },
    d: { text: 'Premium is a typeface decision, not a budget.', by: 'Wall 04 / card 3' },
  },
  {
    c: 'C', kind: 'slab', w: 142, h: 134, fasten: 'diag',
    title: 'Tube light 19', ref: 'C-10', origin: 'Independent magazine', year: '2024',
    note: 'Lowercase title, issue number set as large as the title. The number is the collectable, so the number gets the size.',
    vars: { '--slab-bg': 'var(--paper)', '--slab-fg': 'var(--ink-solid)', '--slab-size': 'var(--step-2)' },
    d: { lines: ['tube', 'light', '19'] },
  },
  {
    c: 'C', kind: 'receipt', w: 126, h: 188, fasten: 'corners',
    title: 'Price list', ref: 'C-11', origin: 'Concession desk', year: '2025',
    note: 'No currency symbol, no decimals, no descriptions. Removing information is the entire pricing strategy.',
    d: {
      head: 'Autumn',
      rows: [['Coat', '1 450'], ['Shirt', '380'], ['Trouser', '520'], ['Scarf', '190']],
      total: ['On request', '—'],
    },
  },
  {
    c: 'C', kind: 'ruled', w: 164, h: 110, fasten: 'top',
    title: 'Men', ref: 'C-12', origin: 'Floor directory', year: '2024',
    note: 'One word doing the job of a whole department. Everything above it in the hierarchy was cut.',
    d: { text: 'Men. Second floor. That is the sign.', sig: 'Wall 04 / card 4' },
  },
  {
    c: 'C', kind: 'plate', w: 158, h: 150, fasten: 'top',
    title: 'Bag, black, unmarked', ref: 'C-13', origin: 'Product shot', year: '2025',
    note: 'Lit to show the material and nothing else. The absence of hardware is the price tag.',
    vars: { '--p1': 'var(--plate-c1)', '--p2': 'var(--plate-c2)', '--p3': 'var(--plate-c3)' },
    d: { form: 'object', cap: 'Sheet 11 / calf' },
  },
  {
    c: 'C', kind: 'badge', w: 110, h: 110, fasten: 'sides',
    title: 'No season', ref: 'C-14', origin: 'Hangtag', year: '2025',
    note: 'A refusal printed as a stamp. It reads as a promise, which is the trick.',
    vars: { '--badge-bg': 'var(--paper-silver)' },
    d: { lines: ['No', 'season'] },
  },
  {
    c: 'C', kind: 'grid', w: 152, h: 134, fasten: 'top',
    title: 'Contact sheet', ref: 'C-15', origin: 'Studio', year: '2025',
    note: 'Twenty-eight frames, one selected. The grid exists so the circle around frame nine means something.',
    d: { head: ['1', '2', '3', '4', '5', '6', '7'], cells: 21, start: 8 },
  },
  {
    c: 'C', kind: 'word', w: 150, h: 182, fasten: 'corners',
    title: 'Architecture / Interiors', ref: 'C-16', origin: 'Practice letterhead', year: '2024',
    note: 'Two disciplines, one hairline rule, address in the corner. A letterhead is a brand that has to survive a fax machine.',
    d: { lines: ['Architecture', '&', 'Interiors'], foot: 'Est. 1994 / London' },
  },
  {
    c: 'C', kind: 'flyer', w: 156, h: 128, fasten: 'diag',
    title: 'A.B.C. sale', ref: 'C-17', origin: 'Shop window', year: '2024',
    note: 'The only sale notice on the street that does not use the word sale twice.',
    vars: { '--flyer-bg': 'var(--flu-cyan)' },
    d: { head: 'A.B.C. sale', body: 'Final reductions. Thursday to Sunday. Everything as marked.', foot: 'No returns' },
  },

  /* ============ edges — pieces from the next wall along ============ */
  {
    c: 'A', kind: 'ruled', w: 150, h: 200, fasten: 'top', at: [-62, 336],
    title: 'Sheet from wall 03', ref: 'X-01', origin: 'Adjacent wall', year: '2025',
    note: 'Left up when wall 03 came down. The overlap is where the interesting work happens.',
    d: { text: 'Wall 03: things that are unfinished and better for it.', sig: 'Wall 03 / kept' },
  },
  {
    c: 'C', kind: 'flyer', w: 160, h: 210, fasten: 'top', at: [2272, 512],
    title: 'Sheet from wall 05', ref: 'X-02', origin: 'Adjacent wall', year: '2025',
    note: 'Wall 05 starts here. Logos, and whether any of them earn their place.',
    vars: { '--flyer-bg': 'var(--flu-yellow)' },
    d: { head: 'Wall 05', body: 'Logos. Overworked, over-approved, over.', foot: 'In progress' },
  },
];

/* ---------- renderers ------------------------------------------- */

const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

const RENDER = {
  word: (d) => `
    <div class="word">${d.lines.map((l) => `<span>${esc(l)}</span>`).join('')}</div>
    <p class="word__foot">${esc(d.foot)}</p>`,

  slab: (d) => `<p class="slab">${d.lines.map((l) => `<em>${esc(l)}</em>`).join('')}</p>`,

  specimen: (d) => `<div class="specimen">${d.lines.map((l) => `<span>${esc(l)}</span>`).join('')}</div>`,

  label: (d) => `
    <p class="label__name">${esc(d.name)}</p>
    <p class="label__spec">${d.spec.map((s) => `<span>${esc(s)}</span>`).join('')}</p>
    ${d.barcode ? '<div class="barcode" aria-hidden="true"></div>' : ''}`,

  flyer: (d) => `
    <p class="flyer__head">${esc(d.head)}</p>
    <p class="flyer__body">${esc(d.body)}</p>
    <p class="flyer__foot">${esc(d.foot)}</p>`,

  sign: (d) => `
    <div class="sign">
      ${d.lead ? `<em class="sign__lead">${esc(d.lead)}</em>` : ''}
      ${d.lines.map((l) => `<em>${esc(l)}</em>`).join('')}
    </div>`,

  shout: (d) => `
    <div class="shout">
      ${d.lines.map((l) => `<em>${esc(l)}</em>`).join('')}
      ${d.small ? `<em class="shout__small">${esc(d.small)}</em>` : ''}
      ${d.num ? `<em class="shout__num">${esc(d.num)}</em>` : ''}
    </div>`,

  plate: (d) => `
    <div class="plate plate--${d.form}">
      <div class="plate__form" aria-hidden="true"></div>
    </div>
    <p class="plate__strip">${esc(d.cap)}</p>`,

  ruled: (d) => `
    <p class="ruled">${esc(d.text)}<span class="ruled__sig">${esc(d.sig)}</span></p>`,

  receipt: (d) => `
    <div class="receipt">
      <p class="receipt__head">${esc(d.head)}</p>
      ${d.rows.map((r) => `<p class="receipt__row"><span>${esc(r[0])}</span><span>${esc(r[1])}</span></p>`).join('')}
      <p class="receipt__total"><span>${esc(d.total[0])}</span><span>${esc(d.total[1])}</span></p>
    </div>`,

  swatch: (d) => d.rows.map((r) => `
    <div class="swatch">
      <div class="swatch__chip" style="--chip:${r[0]}"></div>
      <span class="swatch__name">${esc(r[1])}</span>
    </div>`).join(''),

  grid: (d) => {
    const heads = d.head.map((h) => `<b>${esc(h)}</b>`).join('');
    let cells = '';
    for (let i = 0; i < d.cells; i++) cells += `<i>${d.start + i}</i>`;
    return `<div class="gridcard">${heads}${cells}</div>`;
  },

  framed: (d) => `
    <div class="framed">
      <div class="framed__mark" aria-hidden="true"></div>
      <p class="framed__cap">${esc(d.cap)}</p>
    </div>`,

  note: (d) => `
    <p class="note">${esc(d.text)}</p>
    <p class="note__by">${esc(d.by)}</p>`,

  badge: (d) => `<p class="badge">${d.lines.map((l) => `<em>${esc(l)}</em>`).join('')}</p>`,

  /* body copy nobody will read, rendered as what it looks like from a metre away */
  dossier: (d) => `
    ${d.head ? `<p class="doc__head">${esc(d.head)}</p>` : ''}
    <div class="doc__body">${d.lines.map((w) => `<span style="width:${w}%"></span>`).join('')}</div>
    ${d.stamp ? `<span class="doc__stamp">${esc(d.stamp)}</span>` : ''}`,

  snippet: (d) => `
    <div class="doc__body doc__body--tight">${d.lines.map((w) => `<span style="width:${w}%"></span>`).join('')}</div>`,

  mugshot: (d) => `
    <div class="plate plate--${d.form}"><div class="plate__form" aria-hidden="true"></div></div>
    <p class="doc__name">${esc(d.name)}</p>`,
};

/* every piece is held up with scotch tape, torn off the roll by hand */
const strip = (kind) => `<span class="tape tape--${kind}" aria-hidden="true"></span>`;

const FASTEN = {
  top: strip('top'),
  corners: strip('l') + strip('r'),
  diag: strip('diag'),
  sides: strip('side-l') + strip('side-r'),
  /* plenty of it is just wedged under whatever went up before */
  none: '',
};

/* ---------- the substrate --------------------------------------- */

/* An obsessive's wall is mostly paper nobody will ever read: printouts,
   transcripts, photocopies of photocopies. These are generated rather than
   written, because that is what they are — bulk. They pack in underneath the
   pieces that actually say something. */

const DOC_HEADS = [
  'Memorandum', 'Delivery note', 'Transcript', 'Press release', 'Invoice 4471',
  'Spec sheet', 'Print order', 'Colour proof', 'Shelf audit', 'Supplier list',
  'Artwork approval', 'Stock report', 'Site survey', 'Copy deck', 'Run-on quote',
  'Packaging brief', 'Retouch notes', 'Distribution', 'Trademark search', 'Cost breakdown',
  'Bill of lading', 'Ink drawdown', 'Die line', 'Barcode check', 'Reorder 8812',
  'Warehouse note', 'Sample request', 'Legal read', 'Amend 03', 'Docket 5590',
  'Origination', 'Plate order', 'Proof 2 of 4', 'Returns log', 'Vendor terms',
];

const DOC_STAMPS = ['Filed', 'Copy', 'Void', 'Seen', 'Draft', 'Rec’d', 'Held'];

const FACES = [
  'Unknown, buyer', 'Print rep', 'Shop owner', 'Studio, 1994', 'Supplier',
  'Photographer', 'Unnamed', 'Second visit', 'Contact 04', 'Witness',
];

/* Half the copy shop's output is on whatever was loaded in the tray. */
function docStock() {
  const roll = rand();
  if (roll < 0.16) return { '--doc-bg': `var(--flu-${['yellow', 'green', 'cyan', 'orange'][Math.floor(rand() * 4)]})` };
  if (roll < 0.36) return { '--doc-bg': 'var(--paper-news)' };
  return undefined;
}

function makeFiller(count) {
  const out = [];

  for (let i = 0; i < count; i += 1) {
    const cluster = ['A', 'B', 'C'][Math.floor(rand() * 3)];
    const roll = rand();
    const ref = `D-${String(i + 1).padStart(2, '0')}`;
    const fasten = ['top', 'corners', 'diag', 'none', 'none', 'sides'][Math.floor(rand() * 6)];

    if (roll < 0.24) {
      /* a face, pinned up and named in marker */
      const pal = ['a', 'b', 'c', 'd', 'e', 'f'][Math.floor(rand() * 6)];
      out.push({
        c: cluster, kind: 'mugshot', ref, fasten,
        w: Math.round(between(74, 104)), h: Math.round(between(88, 118)),
        vars: { '--p1': `var(--plate-${pal}1)`, '--p2': `var(--plate-${pal}2)`, '--p3': `var(--plate-${pal}3)` },
        d: { form: ['figure', 'object', 'stall'][Math.floor(rand() * 3)], name: FACES[Math.floor(rand() * FACES.length)] },
      });
      continue;
    }

    if (roll < 0.42) {
      /* a scrap torn off something bigger */
      out.push({
        c: cluster, kind: 'snippet', ref, fasten,
        vars: docStock(),
        w: Math.round(between(66, 108)), h: Math.round(between(44, 74)),
        d: { lines: Array.from({ length: 2 + Math.floor(rand() * 3) }, () => Math.round(between(48, 100))) },
      });
      continue;
    }

    /* a printed page, read once and marked up */
    const rows = 6 + Math.floor(rand() * 14);
    out.push({
      c: cluster, kind: 'dossier', ref, fasten,
      w: Math.round(between(92, 148)), h: Math.round(between(104, 186)),
      vars: docStock(),
      d: {
        head: rand() < 0.78 ? DOC_HEADS[Math.floor(rand() * DOC_HEADS.length)] : null,
        lines: Array.from({ length: rows }, () => Math.round(between(38, 100))),
        stamp: rand() < 0.3 ? DOC_STAMPS[Math.floor(rand() * DOC_STAMPS.length)] : null,
      },
    });
  }

  return out;
}

/* ---------- marker: what somebody did to all this paper ---------- */

/* Every stroke is drawn as a jittered polyline so nothing is ever straight
   or closed. Colour comes from the group, so re-grouping recolours the
   whole wall's annotation at once. */

function wobble(x1, y1, x2, y2, amp) {
  const steps = 7;
  const nx = -(y2 - y1);
  const ny = x2 - x1;
  const len = Math.hypot(nx, ny) || 1;
  const pts = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const push = (rand() - 0.5) * amp * Math.sin(t * Math.PI) + (rand() - 0.5) * amp * 0.3;
    pts.push(`${(x1 + (x2 - x1) * t + (nx / len) * push).toFixed(1)} ${(y1 + (y2 - y1) * t + (ny / len) * push).toFixed(1)}`);
  }

  return `M${pts.join(' L')}`;
}

/* circled, and overshot, because nobody stops exactly where they started */
function loop(cx, cy, rx, ry) {
  const steps = 30;
  const from = rand() * 6.28;
  const turns = 1.04 + rand() * 0.28;
  const pts = [];

  for (let i = 0; i <= steps; i += 1) {
    const a = from + (i / steps) * 6.283 * turns;
    const r = 1 + (rand() - 0.5) * 0.16;
    pts.push(`${(cx + Math.cos(a) * rx * r).toFixed(1)} ${(cy + Math.sin(a) * ry * r).toFixed(1)}`);
  }

  return `M${pts.join(' L')}`;
}

const MARK = {
  /* a highlighter dragged across a few lines */
  wash(w, h) {
    const runs = 2 + Math.floor(rand() * 4);
    const top = between(h * 0.12, h * 0.62);
    let out = '';
    for (let i = 0; i < runs; i += 1) {
      const y = top + i * between(11, 15);
      if (y > h - 4) break;
      const x1 = between(-4, w * 0.22);
      out += `<path class="ink__wash" d="${wobble(x1, y, between(w * 0.66, w + 4), y + between(-2, 2), 3)}"/>`;
    }
    return out;
  },

  ring(w, h) {
    const rx = between(w * 0.22, w * 0.42);
    const ry = between(h * 0.12, h * 0.3);
    return `<path class="ink__pen" d="${loop(between(rx, w - rx), between(ry, h - ry), rx, ry)}"/>`;
  },

  rule(w, h) {
    const y = between(h * 0.2, h * 0.9);
    return `<path class="ink__pen" d="${wobble(between(3, w * 0.2), y, between(w * 0.6, w - 3), y + between(-4, 4), 4)}"/>`
      + (rand() < 0.4 ? `<path class="ink__pen" d="${wobble(between(3, w * 0.2), y + 4, between(w * 0.55, w - 6), y + between(1, 8), 4)}"/>` : '');
  },

  cross(w, h) {
    return `<path class="ink__pen" d="${wobble(between(2, 14), between(2, 14), w - between(2, 14), h - between(2, 14), 7)}"/>`
      + `<path class="ink__pen" d="${wobble(w - between(2, 14), between(2, 14), between(2, 14), h - between(2, 14), 7)}"/>`;
  },

  /* an arrow leaving the sheet, pointing at whatever is next to it */
  arrow(w, h) {
    const y = between(h * 0.25, h * 0.75);
    const tip = w + between(10, 26);
    const head = between(7, 12);
    return `<path class="ink__pen" d="${wobble(between(w * 0.3, w * 0.6), y, tip, y + between(-10, 10), 5)}"/>`
      + `<path class="ink__pen" d="M${(tip - head).toFixed(1)} ${(y - head * 0.7).toFixed(1)} L${tip.toFixed(1)} ${y.toFixed(1)} L${(tip - head).toFixed(1)} ${(y + head * 0.7).toFixed(1)}"/>`;
  },

  bang(w, h) {
    const x = between(w * 0.06, w * 0.94);
    const y = between(h * 0.12, h * 0.6);
    return `<path class="ink__pen ink__pen--fat" d="${wobble(x, y, x + between(-4, 4), y + 16, 2)}"/>`
      + `<path class="ink__pen ink__pen--fat" d="${wobble(x, y + 22, x + 1, y + 24, 1)}"/>`;
  },

  box(w, h) {
    const m = between(2, 8);
    return `<path class="ink__pen" d="${wobble(m, m, w - m, m, 4)}"/>`
      + `<path class="ink__pen" d="${wobble(w - m, m - 2, w - m, h - m, 4)}"/>`
      + `<path class="ink__pen" d="${wobble(w - m + 2, h - m, m, h - m, 4)}"/>`
      + `<path class="ink__pen" d="${wobble(m, h - m + 2, m, m - 3, 4)}"/>`;
  },
};

/* filler gets worked over harder than the pieces that can speak for
   themselves — the marker is how you tell the substrate from the argument */
const NOISE = ['wash', 'wash', 'wash', 'wash', 'rule', 'rule', 'rule', 'ring', 'ring', 'arrow', 'bang', 'cross', 'box'];
const SPARE = ['wash', 'rule', 'rule', 'ring', 'arrow', 'bang'];

function inkFor(piece, w, h) {
  const heavy = piece.ref.startsWith('D-');
  const pool = heavy ? NOISE : SPARE;
  const count = heavy ? 2 + Math.floor(rand() * 3) : 1 + Math.floor(rand() * 2);
  if (!count) return '';

  let marks = '';
  for (let i = 0; i < count; i += 1) marks += MARK[pool[Math.floor(rand() * pool.length)]](w, h);

  return `<svg class="ink" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">${marks}</svg>`;
}

/* ---------- layout ---------------------------------------------- */

const board = document.getElementById('board');
const wall = document.getElementById('wall');

function layout() {
  const a = axis();
  const pinnedEdges = axisKey === 'theme';
  let x = MARGIN;
  let deepest = 0;
  let z = 1;

  for (const group of a.groups) {
    const all = PIECES.filter((p) => a.of(p) === group.key && !(pinnedEdges && p.at));

    /* Bulk and pieces get interleaved so the argument runs through the whole
       mass rather than sitting in a band at one end. Stacking is decided
       separately, further down — placement order is not depth order. */
    const bulk = all.filter((p) => p.bulk);
    const own = all.filter((p) => !p.bulk);
    const members = [];
    let bi = 0;
    let oi = 0;

    while (members.length < all.length) {
      const ownAhead = (oi + 0.5) / (own.length || 1) > (bi + 0.5) / (bulk.length || 1);
      if ((ownAhead || oi >= own.length) && bi < bulk.length) members.push(bulk[bi += 1, bi - 1]);
      else members.push(own[oi += 1, oi - 1]);
    }

    const laneCount = Math.max(3, Math.min(8, Math.round(members.length / 5.5)));

    group.lanes = Array.from({ length: laneCount }, (_, i) => x + i * PITCH);
    group.header = { x: x - 24, y: 34, w: (laneCount - 1) * PITCH + 190 };
    group.count = members.length;
    group.marker = `var(--marker-${MARKERS[a.groups.indexOf(group) % MARKERS.length]})`;

    const cursors = group.lanes.map(() => TOP);
    const tails = new Array(laneCount).fill(null);

    members.forEach((piece, i) => {
      const span = Math.min(piece.span || 1, laneCount);
      let best = 0;
      let bestY = Infinity;

      for (let l = 0; l + span <= laneCount; l += 1) {
        const y = Math.max(...cursors.slice(l, l + span));
        if (y < bestY) { bestY = y; best = l; }
      }

      /* the further a lane runs, the wider the gaps drift — which is what
         leaves the foot of the wall ragged instead of ruled off */
      const drift = 4 + Math.min(34, i * 1.9);

      piece.x = Math.round(group.lanes[best] + between(-24, 24));
      piece.y = Math.round(bestY + between(-76, drift));
      piece.rot = +(rand() < 0.15 ? between(-15, 15) : between(-6, 6)).toFixed(2);

      /* bulk stacks among itself; anything that has something to say sits
         over the top of all of it */
      piece.z = piece.bulk ? z : 2000 + z;
      z += 1;

      const bottom = piece.y + piece.h;
      for (let l = best; l < best + span; l += 1) {
        cursors[l] = bottom;
        tails[l] = piece;
      }
    });

    /* and some sheets just hang lower than the ones beside them */
    const dropped = new Set();
    for (const piece of tails) {
      if (!piece || dropped.has(piece) || rand() > 0.55) continue;
      dropped.add(piece);
      piece.y += Math.round(between(30, 118));
    }

    for (const piece of members) deepest = Math.max(deepest, piece.y + piece.h);
    x += laneCount * PITCH + CHANNEL;
  }

  if (pinnedEdges) {
    for (const piece of PIECES.filter((p) => p.at)) {
      [piece.x, piece.y] = piece.at;
      piece.rot = +between(-2.4, 2.4).toFixed(2);
      piece.z = 2000 + z;
      z += 1;
      deepest = Math.max(deepest, piece.y + piece.h);
    }
  }

  const root = document.documentElement.style;
  root.setProperty('--board-h', `${Math.round(deepest + 72)}px`);
  root.setProperty('--board-w', `${Math.round(x - CHANNEL + MARGIN)}px`);
}

/* ---------- build ----------------------------------------------- */

function makeCard(piece) {
  /* A sheet of paper is not a control. It can be moved and it can be read —
     that is the whole of it. */
  const el = document.createElement('div');
  el.className = `card card--${piece.kind}`;
  el.dataset.ref = piece.ref;
  if (piece.bulk) el.dataset.bulk = '';

  el.style.setProperty('--w', `${piece.w}px`);
  el.style.setProperty('--h', `${piece.h}px`);
  if (piece.vars) for (const [k, v] of Object.entries(piece.vars)) el.style.setProperty(k, v);

  /* every kind owns its own padding, so contents render bare inside the card */
  el.innerHTML = FASTEN[piece.fasten] + RENDER[piece.kind](piece.d);

  el._piece = piece;
  return el;
}

function pin(card) {
  const piece = card._piece;
  card.dataset.cluster = axis().of(piece);
  card.style.setProperty('--marker', groupOf(piece).marker);
  card.style.setProperty('--x', `${piece.x}px`);
  card.style.setProperty('--y', `${piece.y}px`);
  card.style.setProperty('--rot', `${piece.rot}deg`);
  card.style.setProperty('--z', piece.z);
  card._home = { x: piece.x, y: piece.y, rot: piece.rot, z: piece.z };
}

function renderHeadings() {
  for (const old of board.querySelectorAll('.cluster')) old.remove();

  const frag = document.createDocumentFragment();

  for (const group of axis().groups) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'cluster';
    el.dataset.cluster = group.key;
    el.setAttribute('aria-pressed', 'false');
    el.style.setProperty('--x', `${group.header.x}px`);
    el.style.setProperty('--y', `${group.header.y}px`);
    el.style.setProperty('--w', `${group.header.w}px`);
    el.style.setProperty('--marker', group.marker);
    el.innerHTML = `
      <span class="cluster__mark">
        <svg class="cluster__box" viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="${wobble(7, 6, 193, 4, 5)}"/>
          <path d="${wobble(195, 2, 194, 66, 5)}"/>
          <path d="${wobble(197, 65, 6, 66, 5)}"/>
          <path d="${wobble(6, 68, 5, 4, 5)}"/>
        </svg>
        <span class="cluster__title">${esc(group.title)}</span>
        <span class="cluster__sub">${esc(group.sub)}</span>
      </span>
      <span class="cluster__count">${group.count} pieces</span>`;
    frag.append(el);
  }

  board.prepend(frag);
}

PIECES.push(...makeFiller(124));

for (const piece of PIECES) {
  piece.tone = toneOf(piece);
  piece.family = FAMILY[piece.kind];
  piece.bulk = piece.ref.startsWith('D-');
}

layout();
for (const piece of PIECES) board.append(makeCard(piece));

/* Not everything gets written on paper first. */
const SCRAWLS = [
  'same printer?', 'who signed this off', 'check the date', 'NOT a coincidence',
  'why no logo', 'ask Margaret', 'this is the one', 'came back to this twice',
  'wrong stock', 'follow the money', 'reprinted 1994', 'HE KNEW',
];

function scrawl() {
  for (const old of board.querySelectorAll('.scrawl')) old.remove();

  const groups = axis().groups;
  let n = 0;

  for (const group of groups) {
    const edge = group.lanes[group.lanes.length - 1] + PITCH;
    for (let i = 0; i < 2; i += 1) {
      const el = document.createElement('span');
      el.className = 'scrawl';
      el.style.setProperty('--marker', group.marker);
      el.style.setProperty('--x', `${Math.round(edge - 20 + between(-8, 8))}px`);
      el.style.setProperty('--y', `${Math.round(between(TOP + 40, TOP + 700))}px`);
      el.style.setProperty('--rot', `${between(-14, 12).toFixed(1)}deg`);
      el.textContent = SCRAWLS[n % SCRAWLS.length];
      n += 1;
      board.append(el);
    }
  }
}

const order = [...board.querySelectorAll('.card')];

/* Declared heights are estimates. Measure what the browser actually set,
   then lay the wall out again so pieces stack against real edges. */
function refit() {
  for (const card of order) card._piece.h = card.offsetHeight;
  layout();

  for (const card of order) {
    const piece = card._piece;
    card.style.setProperty('--h', `${piece.h}px`);
    card.insertAdjacentHTML('beforeend', inkFor(piece, piece.w, piece.h));
    pin(card);
  }

  renderHeadings();
  scrawl();
}

refit();

let topZ = 5000;
document.getElementById('count').textContent = order.length;

/* On a narrow screen the wall is a single column, so DOM order is the only
   order there is. Only re-sort there — moving nodes on the wide wall would
   restart every transition mid-flight. */
const narrow = window.matchMedia('(max-width: 900px)');

function syncOrder() {
  if (!narrow.matches) return;
  for (const group of axis().groups) {
    board.append(board.querySelector(`.cluster[data-cluster="${group.key}"]`));
    for (const card of order) {
      if (axis().of(card._piece) === group.key) board.append(card);
    }
  }
}

syncOrder();
narrow.addEventListener('change', syncOrder);

/* ---------- drag a piece off its pin ---------------------------- */

let drag = null;

board.addEventListener('pointerdown', (e) => {
  const card = e.target.closest('.card');
  if (!card || e.button !== 0) return;

  drag = {
    card,
    id: e.pointerId,
    px: e.clientX,
    py: e.clientY,
    x: parseFloat(card.style.getPropertyValue('--x')),
    y: parseFloat(card.style.getPropertyValue('--y')),
    moved: false,
  };

  card.classList.remove('is-settling');
  card.setPointerCapture(e.pointerId);
});

board.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.id) return;

  const dx = e.clientX - drag.px;
  const dy = e.clientY - drag.py;

  if (!drag.moved && Math.hypot(dx, dy) < 5) return;
  if (!drag.moved) {
    drag.moved = true;
    drag.card.classList.add('is-held');
    drag.card.style.setProperty('--z', ++topZ);
  }

  drag.card.style.setProperty('--x', `${drag.x + dx}px`);
  drag.card.style.setProperty('--y', `${drag.y + dy}px`);
});

board.addEventListener('pointerup', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  drag.card.classList.remove('is-held');
  drag = null;
});

board.addEventListener('pointercancel', () => {
  if (drag) drag.card.classList.remove('is-held');
  drag = null;
});

/* ---------- pan the wall ---------------------------------------- */

let pan = null;

wall.addEventListener('pointerdown', (e) => {
  /* headings are buttons — capturing the pointer here would retarget their
     click to the wall and swallow it */
  if (e.target.closest('.card, .cluster') || e.button !== 0) return;
  pan = { px: e.clientX, py: e.clientY, sx: wall.scrollLeft, sy: wall.scrollTop, id: e.pointerId };
  wall.classList.add('is-panning');
  wall.setPointerCapture(e.pointerId);
});

wall.addEventListener('pointermove', (e) => {
  if (!pan || e.pointerId !== pan.id) return;
  wall.scrollLeft = pan.sx - (e.clientX - pan.px);
  wall.scrollTop = pan.sy - (e.clientY - pan.py);
});

const endPan = () => { pan = null; wall.classList.remove('is-panning'); };
wall.addEventListener('pointerup', endPan);
wall.addEventListener('pointercancel', endPan);

/* ---------- tidy, and re-pinning the whole wall ------------------ */

let settling = null;

function settle() {
  clearTimeout(settling);
  settling = setTimeout(() => {
    for (const card of order) card.classList.remove('is-settling');
    settling = null;
  }, 720);
}

document.getElementById('tidy').addEventListener('click', () => {
  let moved = 0;
  for (const card of order) {
    const home = card._home;
    if (card.style.getPropertyValue('--x') !== `${home.x}px`) moved += 1;
    card.classList.add('is-settling');
    card.style.setProperty('--x', `${home.x}px`);
    card.style.setProperty('--y', `${home.y}px`);
    card.style.setProperty('--rot', `${home.rot}deg`);
    card.style.setProperty('--z', home.z);
  }
  topZ = 5000;
  settle();
});

/* Re-group: the studio takes everything down and puts it back up under a
   different argument. Same pieces, same tape, new wall. */
function regroup(key) {
  if (key === axisKey) return;
  axisKey = key;
  release();

  layout();
  renderHeadings();
  scrawl();
  for (const card of order) {
    card.classList.add('is-settling');
    pin(card);
  }
  topZ = 5000;

  syncOrder();
  settle();

  for (const chip of document.querySelectorAll('[data-axis]')) {
    chip.classList.toggle('is-on', chip.dataset.axis === key);
    chip.setAttribute('aria-pressed', String(chip.dataset.axis === key));
  }
  wall.scrollTo({ left: 0, behavior: 'smooth' });
}

for (const chip of document.querySelectorAll('[data-axis]')) {
  chip.addEventListener('click', () => regroup(chip.dataset.axis));
}

/* ---------- reading one group at a time -------------------------- */

let focused = null;

function paint() {
  for (const el of board.querySelectorAll('.card, .cluster')) {
    el.classList.toggle('is-dimmed', focused !== null && el.dataset.cluster !== focused);
  }
  for (const el of board.querySelectorAll('.cluster')) {
    el.setAttribute('aria-pressed', String(el.dataset.cluster === focused));
  }
}

function release() {
  focused = null;
  paint();
}

board.addEventListener('click', (e) => {
  const heading = e.target.closest('.cluster');
  if (!heading) return;

  const key = heading.dataset.cluster;
  focused = focused === key ? null : key;
  paint();

  if (!focused || narrow.matches) return;
  const group = axis().groups.find((g) => g.key === key);
  const centre = group.header.x + group.header.w / 2;
  wall.scrollTo({ left: Math.max(0, centre - wall.clientWidth / 2), behavior: 'smooth' });
});
