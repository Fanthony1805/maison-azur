// map.jsx — carte stylisée de la zone de livraison (Côte d'Azur / Monaco)
const { useState: useStateMap, useEffect: useEffectMap, useRef: useRefMap } = React;

// Lisse une polyline en un tracé SVG (midpoints quadratiques)
function smoothPath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${pts[i][0]} ${pts[i][1]} ${mx} ${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

function DeliveryMap({ variant = "zone" }) {
  const [drawn, setDrawn] = useStateMap(false);
  useEffectMap(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDrawn(true); return; }
    const t = setTimeout(() => setDrawn(true), 250);
    return () => clearTimeout(t);
  }, []);

  if (variant === "spot") return <SpotMap drawn={drawn} />;

  // Trait de côte : terre au nord, mer au sud. Deux presqu'îles plongent vers le sud.
  const coast = [
    [0, 246], [62, 260], [120, 266], [172, 262], [235, 276], [300, 280], [338, 274], [392, 280],
    // presqu'île du Cap-Ferrat
    [408, 290], [432, 350], [450, 358], [468, 350], [486, 290],
    [500, 276], [525, 270], [560, 278], [592, 282], [624, 284],
    // presqu'île du Cap-Martin (Roquebrune)
    [650, 292], [668, 348], [684, 354], [700, 346], [716, 292],
    [736, 282], [800, 276],
  ];
  const coastPath = smoothPath(coast);
  const land = coastPath + " L 800 0 L 0 0 Z";

  const cities = [
    { n: "Cannes", x: 62, y: 250, below: false },
    { n: "Antibes", x: 172, y: 248 },
    { n: "Cagnes", x: 235, y: 262 },
    { n: "Nice", x: 338, y: 258 },
    { n: "Villefranche", x: 392, y: 262, lift: true },
    { n: "Beaulieu", x: 498, y: 260 },
    { n: "Èze", x: 540, y: 250, lift: true },
    { n: "Cap-d'Ail", x: 594, y: 270 },
    { n: "Menton", x: 736, y: 264 },
    { n: "Cap-Ferrat", x: 450, y: 332, below: true, small: true },
    { n: "Roquebrune", x: 684, y: 326, below: true, small: true },
  ];
  const monaco = [624, 266];
  // Itinéraire littoral : passe par toutes les communes desservies + les caps
  const route = [
    [62, 250], [172, 248], [235, 262], [338, 258], [392, 262],
    [450, 332], [498, 260], [540, 250], [594, 270], [624, 266],
    [684, 326], [736, 264],
  ];
  const routeD = smoothPath(route);

  return (
    <div className="map">
      <svg viewBox="0 0 800 470" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Carte de la zone de livraison, du littoral de Cannes à Menton, centrée sur Monaco">
        <defs>
          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#BBD9DC" />
            <stop offset="1" stopColor="#9DC2C7" />
          </linearGradient>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2A2018" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* mer */}
        <rect x="0" y="0" width="800" height="470" fill="url(#seaGrad)" />
        {/* vaguelettes */}
        {[[90, 360], [240, 400], [400, 372], [430, 425], [560, 392], [690, 410], [150, 430], [330, 446], [600, 448]].map(([x, y], i) => (
          <path key={i} d={`M ${x} ${y} q 9 -6 18 0 t 18 0`} fill="none" stroke="rgba(58,104,112,.32)" strokeWidth="1.7" strokeLinecap="round" />
        ))}
        {/* liseré clair le long du rivage (écume) */}
        <path d={coastPath} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="5" />

        {/* terre */}
        <path d={land} fill="#F4ECDB" stroke="rgba(42,32,24,.28)" strokeWidth="1.5" />
        {/* relief discret de l'arrière-pays */}
        {[[140, 120], [300, 100], [470, 130], [640, 105], [740, 140]].map(([x, y], i) => (
          <path key={i} d={`M ${x - 38} ${y + 28} Q ${x} ${y} ${x + 38} ${y + 28}`} fill="none" stroke="rgba(201,150,47,.32)" strokeWidth="1.5" />
        ))}

        {/* itinéraire littoral — tracé animé, passe par toutes les communes */}
        <path className={"map__route" + (drawn ? " is-drawn" : "")} d={routeD}
          fill="none" stroke="var(--c-terracotta)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1500" />

        {/* villes */}
        {cities.map((c) => {
          const ly = c.below ? c.y + 17 : (c.lift ? c.y - 24 : c.y - 10);
          return (
            <g key={c.n}>
              {c.lift && <line x1={c.x} y1={c.y - 6} x2={c.x} y2={ly + 4} stroke="rgba(42,32,24,.32)" strokeWidth="1" />}
              <circle cx={c.x} cy={c.y} r={c.small ? 3.2 : 4} fill="#2A2018" />
              <text x={c.x} y={ly}
                textAnchor="middle" className="map__city" style={{ fontSize: c.small ? 12 : 13.5 }}>{c.n}</text>
            </g>
          );
        })}

        {/* atelier — Monaco */}
        <circle className={"map__pulse" + (drawn ? " is-on" : "")} cx={monaco[0]} cy={monaco[1]} r="10" fill="var(--gold)" />
        <g filter="url(#soft)">
          <circle cx={monaco[0]} cy={monaco[1]} r="9" fill="var(--gold)" stroke="#FFFBF3" strokeWidth="2.5" />
        </g>
        <text x={monaco[0]} y={monaco[1] - 17} textAnchor="middle" className="map__monaco">Monaco</text>
        <text x={monaco[0]} y={monaco[1] + 21} textAnchor="middle" className="map__atelier">Notre atelier</text>
      </svg>

      <div className="map__legend">
        <span><i className="map__key map__key--pin" /> Notre atelier</span>
        <span><i className="map__key map__key--line" /> Communes livrées</span>
      </div>
      <div className="map__note">≈ 1<span>h</span> autour de Monaco</div>
    </div>
  );
}

// ---- Carte SPOT : plan d'accès boutique (Monte-Carlo) ----
function SpotMap({ drawn }) {
  const blocks = [
    [70, 70, 150, 90], [250, 60, 130, 80], [410, 70, 120, 70], [560, 60, 150, 90],
    [60, 210, 120, 80], [360, 215, 110, 70], [520, 220, 90, 60],
    [70, 330, 160, 70], [270, 335, 130, 70],
  ];
  return (
    <div className="map">
      <svg viewBox="0 0 800 470" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Plan d'accès à la boutique, 12 avenue de la Costa à Monaco">
        <defs>
          <linearGradient id="seaGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#BBD9DC" />
            <stop offset="1" stopColor="#9DC2C7" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="470" fill="#F4ECDB" />
        {/* port / mer en bas à droite */}
        <path d="M 560 470 L 800 470 L 800 300 Q 690 330 620 400 Q 590 440 560 470 Z" fill="url(#seaGrad2)" />
        <path d="M 560 470 Q 590 440 620 400 Q 690 330 800 300" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="4" />
        {[[660, 360], [720, 405], [610, 435]].map(([x, y], i) => (
          <path key={i} d={`M ${x} ${y} q 8 -5 16 0 t 16 0`} fill="none" stroke="rgba(58,104,112,.34)" strokeWidth="1.7" strokeLinecap="round" />
        ))}
        {/* blocs urbains */}
        {blocks.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="7" fill="#FBF3E5" stroke="rgba(42,32,24,.16)" strokeWidth="1.3" />
        ))}
        {/* avenues principales */}
        <path d="M 0 185 L 800 165" fill="none" stroke="rgba(156,107,63,.4)" strokeWidth="9" strokeLinecap="round" />
        <path d="M 470 0 L 430 470" fill="none" stroke="rgba(156,107,63,.4)" strokeWidth="9" strokeLinecap="round" />
        <path d="M 0 185 L 800 165" fill="none" stroke="#FBF3E5" strokeWidth="2" strokeDasharray="10 12" />
        <text x="120" y="150" className="map__city" style={{ fontSize: 13 }}>av. de la Costa</text>

        {/* marqueur boutique */}
        <circle className={"map__pulse" + (drawn ? " is-on" : "")} cx="452" cy="178" r="11" fill="var(--c-terracotta)" />
        <g filter="url(#soft)">
          <path d="M 452 156 a 16 16 0 1 0 0.1 0 Z" fill="var(--c-terracotta)" stroke="#FFFBF3" strokeWidth="2.5" />
          <circle cx="452" cy="172" r="5.5" fill="#FFFBF3" />
        </g>
        <path d="M 452 188 L 446 200 L 458 200 Z" fill="var(--c-terracotta)" />
        <text x="452" y="228" textAnchor="middle" className="map__monaco" style={{ fontSize: 17 }}>Maison Azur</text>
      </svg>
      <div className="map__legend">
        <span><i className="map__key map__key--pin" style={{ background: "var(--c-terracotta)", boxShadow: "0 0 0 3px color-mix(in srgb, var(--c-terracotta) 30%, transparent)" }} /> 12, av. de la Costa</span>
      </div>
    </div>
  );
}

Object.assign(window, { DeliveryMap });
