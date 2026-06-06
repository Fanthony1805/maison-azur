// app.jsx — shell, navigation, footer, routing, panier, tweaks
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#BC5A2E",
  "fonts": "dmserif-mulish",
  "btnShape": "soft",
  "bg": "cream"
}/*EDITMODE-END*/;

const FONT_MAP = {
  "cormorant-jost":   { head: "'Cormorant Garamond', Georgia, serif", body: "'Jost', system-ui, sans-serif", hw: 600 },
  "dmserif-mulish":   { head: "'DM Serif Display', Georgia, serif",   body: "'Mulish', system-ui, sans-serif", hw: 400 },
  "marcellus-jost":   { head: "'Marcellus', Georgia, serif",          body: "'Jost', system-ui, sans-serif", hw: 400 },
};
const BTN_RADIUS = { soft: "10px", square: "0px", pill: "999px" };

const NAV = [
  { id: "home", label: "Accueil" },
  { id: "shop", label: "Boutique" },
  { id: "custom", label: "Sur mesure" },
  { id: "gallery", label: "Galerie" },
  { id: "about", label: "Maison" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem("ma_route")) || { name: "home" }; }
    catch { return { name: "home" }; }
  });
  const [cart, setCart] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem("ma_cart")) || []; } catch { return []; }
  });
  const [menuOpen, setMenuOpen] = useStateA(false);

  useEffectA(() => { localStorage.setItem("ma_cart", JSON.stringify(cart)); }, [cart]);
  useEffectA(() => { localStorage.setItem("ma_route", JSON.stringify(route)); }, [route]);

  // Animations au scroll : révèle les blocs à l'entrée dans le viewport
  useEffectA(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parts = [".section", ".strip__item", ".card", ".cat", ".custom-band", ".story__text", ".story__img", ".quote", ".zone__map", ".zone__text", ".value", ".masonry__item", ".phead", ".about__hero", ".about__split-img", ".about__split-text", ".pdp__media", ".pdp__info", ".contact__row", ".contact__form", ".choice", ".finalcta"];
    const els = Array.from(document.querySelectorAll(parts.map((s) => ".main " + s).join(", ")));
    if (reduce) { els.forEach((el) => el.classList.add("is-in")); return; }
    els.forEach((el) => {
      el.classList.add("reveal");
      const sibs = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.transitionDelay = Math.min(sibs, 5) * 70 + "ms";
    });
    let raf = 0;
    const reveal = () => {
      raf = 0;
      const h = window.innerHeight || document.documentElement.clientHeight;
      for (const el of els) {
        if (el.classList.contains("is-in")) continue;
        if (el.getBoundingClientRect().top < h * 0.9) el.classList.add("is-in");
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(reveal); };
    reveal();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // failsafe : si le scroll n'est pas capté, tout est révélé après coup
    const t = setTimeout(() => els.forEach((el) => el.classList.add("is-in")), 2600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf); clearTimeout(t);
    };
  }, [route]);

  const go = (name, props) => { setRoute({ name, ...(props || {}) }); setMenuOpen(false); window.scrollTo({ top: 0 }); };
  const openProduct = (id) => go("product", { id });

  const addToCart = (p, qty = 1) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      if (ex) return c.map((i) => i.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...c, { id: p.id, name: p.name, price: p.price, unit: p.unit, tint: p.tint, img: p.img, qty }];
    });
  };
  const setQty = (id, qty) => setCart((c) => c.map((i) => i.id === id ? { ...i, qty } : i));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const f = FONT_MAP[t.fonts] || FONT_MAP["cormorant-jost"];
  const rootStyle = {
    "--c-accent": t.accent,
    "--font-head": f.head,
    "--font-body": f.body,
    "--head-weight": f.hw,
    "--btn-radius": BTN_RADIUS[t.btnShape] || "10px",
    "--bg": t.bg === "white" ? "#ffffff" : "var(--cream)",
  };

  let view;
  switch (route.name) {
    case "shop": view = <ShopPage go={go} openProduct={openProduct} addToCart={addToCart} initialCat={route.cat} />; break;
    case "product": view = <ProductPage id={route.id} go={go} addToCart={addToCart} openProduct={openProduct} />; break;
    case "custom": view = <CustomPage go={go} />; break;
    case "gallery": view = <GalleryPage go={go} />; break;
    case "about": view = <AboutPage go={go} />; break;
    case "contact": view = <ContactPage />; break;
    case "cart": view = <CartPage go={go} cart={cart} setQty={setQty} removeItem={removeItem} clearCart={clearCart} />; break;
    default: view = <HomePage go={go} openProduct={openProduct} addToCart={addToCart} />;
  }

  return (
    <div className="app" style={rootStyle}>
      <div className="announce">
        <span>✷</span>
        <p>Livraison offerte dès 60 € · Monaco &amp; Riviera — commandé avant 16h, préparé dès le lendemain</p>
        <span>✷</span>
      </div>
      <header className="nav">
        <div className="nav__inner">
          <button className="brand" onClick={() => go("home")}>
            <span className="brand__sun" />
            <span className="brand__name">Maison<em>Azur</em></span>
          </button>

          <nav className={"nav__links " + (menuOpen ? "is-open" : "")}>
            {NAV.map((n) => (
              <button key={n.id} className={"nav__link " + (route.name === n.id ? "is-active" : "")} onClick={() => go(n.id)}>
                {n.label}
              </button>
            ))}
          </nav>

          <div className="nav__right">
            <button className="cartbtn" onClick={() => go("cart")} aria-label="Panier">
              <Icon name="cart" size={21} />
              {cartCount > 0 && <span className="cartbtn__badge">{cartCount}</span>}
            </button>
            <button className="burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
              <Icon name={menuOpen ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </header>

      <main className="main">{view}</main>

      <footer className="foot">
        <div className="foot__top">
          <div className="foot__brand">
            <button className="brand brand--foot" onClick={() => go("home")}>
              <span className="brand__sun" />
              <span className="brand__name">Maison<em>Azur</em></span>
            </button>
            <p>Pâtisserie méditerranéenne, faite main à Monaco. Livrée dans tout Monaco et la Riviera.</p>
            <div className="foot__social">
              <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}><Icon name="insta" size={20} /></a>
              <a href="#" aria-label="Email" onClick={(e) => e.preventDefault()}><Icon name="mail" size={20} /></a>
              <a href="#" aria-label="Téléphone" onClick={(e) => e.preventDefault()}><Icon name="phone" size={20} /></a>
            </div>
          </div>
          <div className="foot__cols">
            <div className="foot__col">
              <h5>Boutique</h5>
              {CATEGORIES.map((c) => <button key={c.id} onClick={() => go("shop", { cat: c.id })}>{c.label}</button>)}
            </div>
            <div className="foot__col">
              <h5>La maison</h5>
              <button onClick={() => go("about")}>Notre histoire</button>
              <button onClick={() => go("custom")}>Sur mesure</button>
              <button onClick={() => go("gallery")}>Galerie</button>
              <button onClick={() => go("contact")}>Contact</button>
            </div>
            <div className="foot__col">
              <h5>Infos</h5>
              <span>12, avenue de la Costa</span>
              <span>98000 Monaco</span>
              <span>Mar–Dim · 7h30–19h30</span>
              <span>+377 93 00 00 00</span>
            </div>
          </div>
        </div>
        <div className="foot__bottom">
          <span>© 2026 Maison Azur · Maquette de démonstration</span>
          <span>Mentions légales · CGV · Allergènes</span>
        </div>
      </footer>

      <TweaksPanel>
        <TweakSection label="Identité visuelle" />
        <TweakColor label="Accent principal" value={t.accent}
          options={["#BC5A2E", "#C9962F", "#9C6B3F", "#8A4B2A", "#6E4A28"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="Polices" value={t.fonts}
          options={[
            { value: "dmserif-mulish", label: "DM Serif + Mulish (affirmé)" },
            { value: "cormorant-jost", label: "Cormorant + Jost (élégant)" },
            { value: "marcellus-jost", label: "Marcellus + Jost (classique)" },
          ]}
          onChange={(v) => setTweak("fonts", v)} />
        <TweakRadio label="Boutons" value={t.btnShape}
          options={["soft", "square", "pill"]}
          onChange={(v) => setTweak("btnShape", v)} />
        <TweakRadio label="Fond" value={t.bg}
          options={["cream", "white"]}
          onChange={(v) => setTweak("bg", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
