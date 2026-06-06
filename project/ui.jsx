// ui.jsx — composants partagés Maison Azur
const { useState, useEffect, useRef } = React;

// --- Icônes (chrome UI, traits simples) ---
function Icon({ name, size = 20, stroke = 1.6, style }) {
  const p = {
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    cart: <><circle cx="9" cy="20" r="1.4" {...p} /><circle cx="18" cy="20" r="1.4" {...p} /><path d="M2.5 3h2.2l2.2 12.2a1.6 1.6 0 0 0 1.6 1.3h8.8a1.6 1.6 0 0 0 1.6-1.3L21.5 7H6" {...p} /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" {...p} /></>,
    close: <><path d="M5 5l14 14M19 5L5 19" {...p} /></>,
    arrow: <><path d="M4 12h16M14 6l6 6-6 6" {...p} /></>,
    arrowLeft: <><path d="M20 12H4M10 6l-6 6 6 6" {...p} /></>,
    plus: <><path d="M12 5v14M5 12h14" {...p} /></>,
    minus: <><path d="M5 12h14" {...p} /></>,
    check: <><path d="M4 12.5l5 5L20 6" {...p} /></>,
    pin: <><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" {...p} /><circle cx="12" cy="10" r="2.4" {...p} /></>,
    clock: <><circle cx="12" cy="12" r="9" {...p} /><path d="M12 7v5l3.5 2" {...p} /></>,
    phone: <><path d="M6.5 3.5h3l1.5 4-2 1.3a12 12 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" {...p} /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" {...p} /><path d="M3.5 6.5 12 13l8.5-6.5" {...p} /></>,
    insta: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" {...p} /><circle cx="12" cy="12" r="4" {...p} /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></>,
    leaf: <><path d="M20 4C9 4 4 9.5 4 16v4M20 4c0 9-5.5 13-12 13" {...p} /></>,
    star: <><path d="M12 3.5l2.4 5 5.5.7-4 3.8 1 5.5L12 16l-4.9 2.5 1-5.5-4-3.8 5.5-.7Z" {...p} /></>,
    truck: <><path d="M2.5 5.5h11v9h-11zM13.5 8.5h4l3 3v3h-7z" {...p} /><circle cx="6" cy="17.5" r="1.6" {...p} /><circle cx="17" cy="17.5" r="1.6" {...p} /></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" {...p} /><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" {...p} /></>,
    cal: <><rect x="3.5" y="5" width="17" height="15" rx="2" {...p} /><path d="M3.5 9.5h17M8 3v4M16 3v4" {...p} /></>,
    chef: <><path d="M7 14a4 4 0 0 1-1-7.8A4 4 0 0 1 13.7 5 4 4 0 0 1 18 12.2 4 4 0 0 1 17 14M7 14v5h10v-5M7 17h10" {...p} /></>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "block", flex: "none", ...style }} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

// --- Image : photo réelle (src) ou placeholder rayé légendé ---
function Ph({ label, tint = "ocre", ratio, height, className = "", style, src, overlay, zoom }) {
  const [failed, setFailed] = useState(false);
  const wrap = {
    position: "relative", width: "100%", overflow: "hidden",
    background: `var(--ph-${tint}-bg)`,
    ...(ratio ? { aspectRatio: ratio } : {}),
    ...(height ? { height } : {}),
    ...style,
  };
  const showPhoto = src && !failed;
  const stripes = {
    position: "absolute", inset: 0,
    backgroundImage: `repeating-linear-gradient(135deg, var(--ph-${tint}-line) 0 1px, transparent 1px 11px)`,
    opacity: 0.55,
  };
  return (
    <div className={"ph " + (showPhoto ? "ph--photo " : "") + (zoom ? "ph--zoom " : "") + className} style={wrap}>
      {showPhoto ? (
        <img className="ph__img" src={src} alt={label || ""} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <>
          <div style={stripes} />
          {label && (
            <span className="ph__tag">
              <span className="ph__dot" style={{ background: `var(--c-${tint})` }} />
              {label}
            </span>
          )}
        </>
      )}
      {showPhoto && overlay && <span className="ph__overlay" />}
    </div>
  );
}

// --- Eyebrow ---
function Eyebrow({ children, color }) {
  return <div className="eyebrow" style={color ? { color } : null}>{children}</div>;
}

// --- Boutons ---
function Btn({ children, onClick, variant = "solid", size = "md", icon, type, full, style }) {
  const cls = `btn btn--${variant} btn--${size}` + (full ? " btn--full" : "");
  return (
    <button className={cls} onClick={onClick} type={type || "button"} style={style}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={size === "lg" ? 19 : 17} />}
    </button>
  );
}

// --- Carte produit ---
function ProductCard({ p, onOpen, onAdd }) {
  return (
    <article className="card" onClick={() => onOpen(p.id)}>
      <div className="card__img">
        <Ph label={"photo · " + p.name.toLowerCase()} tint={p.tint} ratio="4 / 5" src={p.img} zoom overlay />
        {p.tag && <span className="card__tag">{p.tag}</span>}
      </div>
      <div className="card__body">
        <div className="card__head">
          <h3 className="card__name">{p.name}</h3>
          <span className="card__price">{p.price}€</span>
        </div>
        <p className="card__short">{p.short}</p>
        <div className="card__foot">
          <span className="card__unit">{p.unit}</span>
          <button
            className="card__add"
            onClick={(e) => { e.stopPropagation(); onAdd(p); }}
            aria-label={"Ajouter " + p.name}
          >
            <Icon name="plus" size={16} /> Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { Icon, Ph, Eyebrow, Btn, ProductCard });
