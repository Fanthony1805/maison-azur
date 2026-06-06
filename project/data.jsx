// data.jsx — contenu & catalogue Maison Azur
const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const PHOTOS = {
  hero: U("1691052252990-4cd1fdda73dc", 1100),
  atelier: U("1532635224-cf024e66d122", 1100),
  devanture: U("1623334044303-241021148842", 1400),
  equipe: U("1597528662465-55ece5734101", 1100),
  custom: U("1620980776848-84ac10194945", 1100),
};

const CATEGORIES = [
  { id: "entremets", label: "Entremets & Gâteaux", blurb: "Nos créations signature, dressées à la commande.", img: U("1691052252990-4cd1fdda73dc") },
  { id: "tartes", label: "Tartes", blurb: "Le fruit du Sud, sur une pâte sablée.", img: U("1620980776848-84ac10194945") },
  { id: "macarons", label: "Macarons & Petits-fours", blurb: "La bouchée, déclinée à l'infini.", img: U("1558326567-98ae2405596b") },
  { id: "viennoiseries", label: "Viennoiseries", blurb: "Le réveil au beurre, chaque matin.", img: U("1623334044303-241021148842") },
  { id: "confiseries", label: "Confiseries de Provence", blurb: "Calissons, fruits confits, douceurs d'antan.", img: U("1495147466023-ac5c588e2e94") },
];

const PRODUCTS = [
  {
    id: "tarte-citron-menton",
    name: "Tarte au Citron de Menton",
    cat: "tartes", price: 32, unit: "6 pers.", tag: "Signature", tint: "ocre",
    img: U("1620980776848-84ac10194945"),
    short: "Crème onctueuse au citron de Menton IGP, meringue toastée, sablé amande.",
    notes: ["Citron de Menton IGP", "Meringue française", "Sablé amande"],
    allergens: "Gluten, œuf, fruits à coque, lait.",
  },
  {
    id: "entremets-mimosa",
    name: "Le Mimosa",
    cat: "entremets", price: 38, unit: "6 pers.", tag: "Signature", tint: "ocre",
    img: U("1691052252990-4cd1fdda73dc"),
    short: "Mousse vanille de Madagascar, cœur citron-fleur d'oranger, biscuit moelleux.",
    notes: ["Vanille de Madagascar", "Fleur d'oranger", "Insert citron"],
    allergens: "Gluten, œuf, lait.",
  },
  {
    id: "cap-ferrat",
    name: "Le Cap-Ferrat",
    cat: "entremets", price: 42, unit: "8 pers.", tag: null, tint: "terracotta",
    img: U("1603532648955-039310d9ed75"),
    short: "Chocolat grand cru de Tanzanie, praliné noisette du Piémont, croustillant.",
    notes: ["Chocolat 70% Tanzanie", "Praliné noisette", "Feuilleté croustillant"],
    allergens: "Gluten, fruits à coque, lait, soja.",
  },
  {
    id: "paris-nice",
    name: "Le Paris-Nice",
    cat: "entremets", price: 36, unit: "6 pers.", tag: null, tint: "terracotta",
    img: U("1534432182912-63863115e106"),
    short: "Notre Paris-Brest revisité : crème pralinée pistache de Sicile, choux craquelin.",
    notes: ["Pistache de Sicile", "Praliné maison", "Choux craquelin"],
    allergens: "Gluten, œuf, fruits à coque, lait.",
  },
  {
    id: "tropezienne",
    name: "La Tropézienne",
    cat: "entremets", price: 34, unit: "6 pers.", tag: null, tint: "ocre",
    img: U("1593424718424-cf4d83f3def1"),
    short: "Brioche perlée, crème mousseline à la fleur d'oranger, sucre grain.",
    notes: ["Brioche au beurre", "Crème mousseline", "Fleur d'oranger"],
    allergens: "Gluten, œuf, lait.",
  },
  {
    id: "tarte-figue",
    name: "Tarte Figue & Miel de Lavande",
    cat: "tartes", price: 30, unit: "6 pers.", tag: "Saison", tint: "terracotta",
    img: U("1606188074044-fcd750f6996a"),
    short: "Figues rôties, crème d'amande, filet de miel de lavande de Haute-Provence.",
    notes: ["Figues de saison", "Crème d'amande", "Miel de lavande"],
    allergens: "Gluten, œuf, fruits à coque, lait.",
  },
  {
    id: "tarte-abricot-romarin",
    name: "Tarte Abricot & Romarin",
    cat: "tartes", price: 28, unit: "6 pers.", tag: "Saison", tint: "ocre",
    img: U("1483695028939-5bb13f8648b0"),
    short: "Abricots du Roussillon pochés au romarin, sablé breton, crème vanille.",
    notes: ["Abricot du Roussillon", "Romarin", "Sablé breton"],
    allergens: "Gluten, œuf, lait.",
  },
  {
    id: "millefeuille",
    name: "Mille-feuille Vanille",
    cat: "tartes", price: 9, unit: "la pièce", tag: null, tint: "caramel",
    img: U("1691052154815-6247a3cfedd3"),
    short: "Feuilletage caramélisé, crème diplomate à la vanille de Tahiti.",
    notes: ["Feuilletage maison", "Vanille de Tahiti", "Caramélisé minute"],
    allergens: "Gluten, œuf, lait.",
  },
  {
    id: "macarons-12",
    name: "Macarons — Boîte de 12",
    cat: "macarons", price: 24, unit: "12 pièces", tag: "Coffret", tint: "caramel",
    img: U("1558326567-98ae2405596b"),
    short: "L'assortiment du moment : citron, pistache, fleur d'oranger, framboise, café, chocolat.",
    notes: ["6 parfums", "Coffret offert", "Sans colorant artificiel"],
    allergens: "Œuf, fruits à coque, lait.",
  },
  {
    id: "petits-fours",
    name: "Petits-fours assortis",
    cat: "macarons", price: 19, unit: "16 pièces", tag: null, tint: "terracotta",
    img: U("1495147466023-ac5c588e2e94"),
    short: "L'assortiment de mignardises pour la fin du repas ou l'apéritif sucré.",
    notes: ["16 bouchées", "Assortiment varié", "Idéal réception"],
    allergens: "Gluten, œuf, fruits à coque, lait.",
  },
  {
    id: "viennoiseries-8",
    name: "Corbeille de Viennoiseries",
    cat: "viennoiseries", price: 16, unit: "8 pièces", tag: null, tint: "ocre",
    img: U("1623334044303-241021148842"),
    short: "Croissants, pains au chocolat et pains aux raisins, beurre de Charentes AOP.",
    notes: ["Beurre AOP", "Tourés maison", "Cuisson du matin"],
    allergens: "Gluten, œuf, lait.",
  },
  {
    id: "calissons",
    name: "Calissons d'Azur",
    cat: "confiseries", price: 22, unit: "boîte de 24", tag: "Provence", tint: "caramel",
    img: U("1622941367239-8acd68fa946d"),
    short: "Amande de Provence, melon confit et écorce d'orange, glaçage royal.",
    notes: ["Amande de Provence", "Melon confit", "Fait main"],
    allergens: "Fruits à coque.",
  },
];

const CUSTOM_HERO = [
  { id: "piece-montee", name: "Pièces montées & Wedding cakes", tint: "terracotta", img: U("1691052252990-4cd1fdda73dc"), blurb: "Pour les mariages et grandes réceptions, de 20 à 300 convives." },
  { id: "buffet", name: "Buffets sucrés & Traiteur", tint: "caramel", img: U("1483695028939-5bb13f8648b0"), blurb: "Mignardises, verrines et tartes en grand format, dressés sur place." },
  { id: "anniversaire", name: "Gâteaux d'anniversaire", tint: "ocre", img: U("1603532648955-039310d9ed75"), blurb: "Le parfum de votre choix, le décor à votre image." },
];

const GALLERY = [
  { id: "g1", label: "vitrine boutique", tint: "ocre", span: "tall", img: U("1623334044303-241021148842") },
  { id: "g2", label: "entremets dressé", tint: "terracotta", span: "wide", img: U("1691052252990-4cd1fdda73dc", 1200) },
  { id: "g3", label: "macarons en coffret", tint: "caramel", span: "", img: U("1558326567-98ae2405596b") },
  { id: "g4", label: "création signature", tint: "terracotta", span: "tall", img: U("1603532648955-039310d9ed75") },
  { id: "g5", label: "tarte citron", tint: "ocre", span: "", img: U("1620980776848-84ac10194945") },
  { id: "g6", label: "buffet réception", tint: "caramel", span: "wide", img: U("1483695028939-5bb13f8648b0", 1200) },
  { id: "g7", label: "atelier · le chef", tint: "terracotta", span: "", img: U("1532635224-cf024e66d122") },
  { id: "g8", label: "calissons de Provence", tint: "ocre", span: "", img: U("1495147466023-ac5c588e2e94") },
];

const COMMUNES = [
  "Monaco", "Monte-Carlo", "Beaulieu-sur-Mer", "Saint-Jean-Cap-Ferrat", "Èze", "Cap-d'Ail",
  "Roquebrune-Cap-Martin", "Menton", "Nice", "Villefranche-sur-Mer",
  "Cagnes-sur-Mer", "Antibes", "Cannes",
];

Object.assign(window, { CATEGORIES, PRODUCTS, CUSTOM_HERO, GALLERY, COMMUNES, PHOTOS });
