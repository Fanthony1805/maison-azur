// pages-shop.jsx — Boutique (catalogue) & Page produit
const { useState: useStateS } = React;

// ============ BOUTIQUE ============
function ShopPage({ go, openProduct, addToCart, initialCat }) {
  const [cat, setCat] = useStateS(initialCat || "all");
  const list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <div className="page">
      <header className="phead phead--shop">
        <Eyebrow color="var(--c-terracotta)">La boutique</Eyebrow>
        <h1 className="phead__title">Nos pâtisseries du jour</h1>
        <p className="phead__lede">
          Commandez en ligne pour un retrait en boutique ou une livraison autour de Monaco.
          Préparé J+1.
        </p>
      </header>

      <div className="filters">
        <button className={"filter " + (cat === "all" ? "is-active" : "")} onClick={() => setCat("all")}>
          Tout ({PRODUCTS.length})
        </button>
        {CATEGORIES.map((c) => {
          const n = PRODUCTS.filter((p) => p.cat === c.id).length;
          return (
            <button key={c.id} className={"filter " + (cat === c.id ? "is-active" : "")} onClick={() => setCat(c.id)}>
              {c.label} ({n})
            </button>
          );
        })}
      </div>

      <div className="grid grid--3">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} onOpen={openProduct} onAdd={addToCart} />
        ))}
      </div>

      <div className="shop-note">
        <Icon name="cal" size={20} />
        <p>Besoin d'une pièce sur mesure ou d'un grand format pour un événement ?
          <button className="link link--inline" onClick={() => go("custom")}>Demandez un devis</button>.</p>
      </div>
    </div>
  );
}

// ============ PAGE PRODUIT ============
function ProductPage({ id, go, addToCart, openProduct }) {
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  const [qty, setQty] = useStateS(1);
  const [mode, setMode] = useStateS("collect"); // collect | delivery
  const [added, setAdded] = useStateS(false);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 3);
  const relFill = related.length ? related : PRODUCTS.filter((x) => x.id !== p.id).slice(0, 3);

  const doAdd = () => {
    addToCart(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="page">
      <button className="back" onClick={() => go("shop")}>
        <Icon name="arrowLeft" size={18} /> Retour à la boutique
      </button>

      <div className="pdp">
        <div className="pdp__media">
          <Ph label={"photo · " + p.name.toLowerCase()} tint={p.tint} className="pdp__img" src={p.img} zoom />
          <div className="pdp__thumbs">
            <Ph label="vue 2" tint={p.tint} ratio="1 / 1" src={p.img} />
            <Ph label="vue 3" tint={p.tint} ratio="1 / 1" />
            <Ph label="détail" tint={p.tint} ratio="1 / 1" />
          </div>
        </div>

        <div className="pdp__info">
          {p.tag && <span className="pdp__tag">{p.tag}</span>}
          <h1 className="pdp__name">{p.name}</h1>
          <div className="pdp__price">{p.price}€ <span>· {p.unit}</span></div>
          <p className="pdp__desc">{p.short}</p>

          <div className="pdp__notes">
            {p.notes.map((n) => (
              <span className="pdp__note" key={n}><Icon name="check" size={14} /> {n}</span>
            ))}
          </div>

          <div className="pdp__mode">
            <button className={"modebtn " + (mode === "collect" ? "is-active" : "")} onClick={() => setMode("collect")}>
              <Icon name="bag" size={18} />
              <span><strong>Click &amp; collect</strong>Retrait dès demain</span>
            </button>
            <button className={"modebtn " + (mode === "delivery" ? "is-active" : "")} onClick={() => setMode("delivery")}>
              <Icon name="truck" size={18} />
              <span><strong>Livraison</strong>Autour de Monaco</span>
            </button>
          </div>

          <div className="pdp__buy">
            <div className="stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Moins"><Icon name="minus" size={16} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Plus"><Icon name="plus" size={16} /></button>
            </div>
            <Btn size="lg" full icon={added ? "check" : "cart"} onClick={doAdd}>
              {added ? "Ajouté au panier" : `Ajouter — ${(p.price * qty)}€`}
            </Btn>
          </div>

          <div className="pdp__allerg">
            <strong>Allergènes :</strong> {p.allergens}
          </div>
        </div>
      </div>

      <section className="section">
        <h2 className="section__title">Vous aimerez aussi</h2>
        <div className="grid grid--3">
          {relFill.map((r) => (
            <ProductCard key={r.id} p={r} onOpen={openProduct} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ShopPage, ProductPage });
