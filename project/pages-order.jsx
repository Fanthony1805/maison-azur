// pages-order.jsx — Commande sur mesure & Panier / Paiement
const { useState: useStateO } = React;

// ============ COMMANDE SUR MESURE ============
function CustomPage({ go }) {
  const [step, setStep] = useStateO(0);
  const [data, setData] = useStateO({
    type: "", convives: 40, date: "", parfums: [], nom: "", email: "", tel: "", message: "",
  });
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleParfum = (f) =>
    setData((d) => ({ ...d, parfums: d.parfums.includes(f) ? d.parfums.filter((x) => x !== f) : [...d.parfums, f] }));

  const parfums = ["Citron de Menton", "Fleur d'oranger", "Pistache", "Chocolat grand cru", "Vanille", "Framboise", "Praliné noisette", "Fruits rouges"];
  const steps = ["L'occasion", "Les détails", "Vos coordonnées"];
  const canNext = step === 0 ? data.type : step === 1 ? data.date : true;

  return (
    <div className="page page--narrow">
      <header className="phead">
        <Eyebrow color="var(--c-ocre)">Sur mesure</Eyebrow>
        <h1 className="phead__title">Créons votre pièce ensemble</h1>
        <p className="phead__lede">
          Décrivez votre projet : nous revenons vers vous sous 48h avec une proposition et un devis.
        </p>
      </header>

      {step < 3 ? (
        <div className="wizard">
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s} className={i === step ? "is-active" : i < step ? "is-done" : ""}>
                <span className="steps__n">{i < step ? <Icon name="check" size={14} /> : i + 1}</span>
                {s}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <div className="wstep">
              <div className="choices">
                {CUSTOM_HERO.map((c) => (
                  <button
                    key={c.id}
                    className={"choice " + (data.type === c.name ? "is-active" : "")}
                    onClick={() => set("type", c.name)}
                  >
                    <Ph label={c.name.toLowerCase()} tint={c.tint} ratio="16 / 9" src={c.img} zoom overlay />
                    <div className="choice__body">
                      <h3>{c.name}</h3>
                      <p>{c.blurb}</p>
                    </div>
                    <span className="choice__check"><Icon name="check" size={15} /></span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="wstep wstep--form">
              <label className="field">
                <span>Date de l'événement</span>
                <input type="date" value={data.date} onChange={(e) => set("date", e.target.value)} />
              </label>
              <label className="field">
                <span>Nombre de convives : <strong>{data.convives}</strong></span>
                <input type="range" min="10" max="300" step="5" value={data.convives} onChange={(e) => set("convives", +e.target.value)} className="range" />
                <div className="range__scale"><span>10</span><span>300</span></div>
              </label>
              <div className="field">
                <span>Parfums souhaités <em>(plusieurs choix)</em></span>
                <div className="pickchips">
                  {parfums.map((f) => (
                    <button key={f} type="button" className={"pickchip " + (data.parfums.includes(f) ? "is-active" : "")} onClick={() => toggleParfum(f)}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="wstep wstep--form">
              <div className="field-row">
                <label className="field"><span>Nom</span><input type="text" value={data.nom} onChange={(e) => set("nom", e.target.value)} placeholder="Votre nom" /></label>
                <label className="field"><span>Téléphone</span><input type="tel" value={data.tel} onChange={(e) => set("tel", e.target.value)} placeholder="06 …" /></label>
              </div>
              <label className="field"><span>Email</span><input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="vous@email.fr" /></label>
              <label className="field"><span>Votre projet</span><textarea rows="4" value={data.message} onChange={(e) => set("message", e.target.value)} placeholder="Thème, couleurs, contraintes, lieu de livraison…" /></label>
            </div>
          )}

          <div className="wnav">
            {step > 0
              ? <Btn variant="ghost" onClick={() => setStep((s) => s - 1)}>Retour</Btn>
              : <span />}
            <Btn icon="arrow" onClick={() => (step < 2 ? setStep((s) => s + 1) : setStep(3))} style={!canNext ? { opacity: .4, pointerEvents: "none" } : null}>
              {step < 2 ? "Continuer" : "Envoyer la demande"}
            </Btn>
          </div>
        </div>
      ) : (
        <div className="confirm">
          <div className="confirm__ic"><Icon name="check" size={34} /></div>
          <h2>Demande envoyée !</h2>
          <p>Merci {data.nom || ""}. Nous étudions votre projet « {data.type} » pour {data.convives} convives
            et revenons vers vous sous 48h avec une proposition et un devis.</p>
          <div className="confirm__btns">
            <Btn variant="ghost" onClick={() => go("home")}>Retour à l'accueil</Btn>
            <Btn icon="arrow" onClick={() => go("shop")}>Voir la boutique</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ PANIER / PAIEMENT ============
function CartPage({ go, cart, setQty, removeItem, clearCart }) {
  const [stage, setStage] = useStateO("cart"); // cart | checkout | done
  const [mode, setMode] = useStateO("collect");
  const [form, setForm] = useStateO({ nom: "", email: "", tel: "", commune: "Monaco", date: "", creneau: "10:00 – 12:00", notes: "" });
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const fee = mode === "delivery" ? (subtotal >= 60 ? 0 : 8) : 0;
  const total = subtotal + fee;

  if (cart.length === 0 && stage !== "done") {
    return (
      <div className="page page--narrow">
        <div className="empty">
          <div className="empty__ic"><Icon name="cart" size={32} /></div>
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos pâtisseries du jour et composez votre commande.</p>
          <Btn size="lg" icon="arrow" onClick={() => go("shop")}>Ouvrir la boutique</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--narrow">
      <header className="phead phead--tight">
        <Eyebrow color="var(--c-terracotta)">{stage === "done" ? "Confirmation" : "Votre panier"}</Eyebrow>
        <h1 className="phead__title">
          {stage === "cart" ? "Récapitulatif de commande" : stage === "checkout" ? "Retrait & coordonnées" : "Commande confirmée"}
        </h1>
      </header>

      {stage === "done" ? (
        <div className="confirm">
          <div className="confirm__ic"><Icon name="check" size={34} /></div>
          <h2>Merci {form.nom || ""} !</h2>
          <p>
            Votre commande de <strong>{total}€</strong> est enregistrée.
            {mode === "collect"
              ? ` Retrait en boutique le ${form.date || "(date à confirmer)"}, créneau ${form.creneau}.`
              : ` Livraison à ${form.commune} le ${form.date || "(date à confirmer)"}.`}
            {" "}Un email de confirmation vient de partir.
          </p>
          <div className="confirm__btns">
            <Btn variant="ghost" onClick={() => go("home")}>Accueil</Btn>
            <Btn icon="arrow" onClick={() => go("shop")}>Commander à nouveau</Btn>
          </div>
        </div>
      ) : (
        <div className="checkout">
          <div className="checkout__main">
            {stage === "cart" && (
              <div className="lines">
                {cart.map((i) => (
                  <div className="line" key={i.id}>
                    <div className="line__img"><Ph label="" tint={i.tint} ratio="1 / 1" src={i.img} /></div>
                    <div className="line__info">
                      <h4>{i.name}</h4>
                      <span>{i.unit} · {i.price}€</span>
                    </div>
                    <div className="stepper stepper--sm">
                      <button onClick={() => setQty(i.id, Math.max(1, i.qty - 1))} aria-label="Moins"><Icon name="minus" size={14} /></button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Plus"><Icon name="plus" size={14} /></button>
                    </div>
                    <div className="line__sum">{i.price * i.qty}€</div>
                    <button className="line__del" onClick={() => removeItem(i.id)} aria-label="Retirer"><Icon name="close" size={16} /></button>
                  </div>
                ))}
                <button className="link link--inline" onClick={() => go("shop")}><Icon name="plus" size={15} /> Ajouter d'autres pâtisseries</button>
              </div>
            )}

            {stage === "checkout" && (
              <div className="cform">
                <div className="pdp__mode pdp__mode--block">
                  <button className={"modebtn " + (mode === "collect" ? "is-active" : "")} onClick={() => setMode("collect")}>
                    <Icon name="bag" size={18} /><span><strong>Click &amp; collect</strong>Gratuit · Monte-Carlo</span>
                  </button>
                  <button className={"modebtn " + (mode === "delivery" ? "is-active" : "")} onClick={() => setMode("delivery")}>
                    <Icon name="truck" size={18} /><span><strong>Livraison</strong>Autour de Monaco</span>
                  </button>
                </div>

                <div className="field-row">
                  <label className="field"><span>Nom</span><input value={form.nom} onChange={(e) => setF("nom", e.target.value)} placeholder="Votre nom" /></label>
                  <label className="field"><span>Téléphone</span><input value={form.tel} onChange={(e) => setF("tel", e.target.value)} placeholder="06 …" /></label>
                </div>
                <label className="field"><span>Email</span><input type="email" value={form.email} onChange={(e) => setF("email", e.target.value)} placeholder="vous@email.fr" /></label>

                {mode === "delivery" && (
                  <label className="field"><span>Commune de livraison</span>
                    <select value={form.commune} onChange={(e) => setF("commune", e.target.value)}>
                      {COMMUNES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </label>
                )}

                <div className="field-row">
                  <label className="field"><span>{mode === "collect" ? "Date de retrait" : "Date de livraison"}</span>
                    <input type="date" value={form.date} onChange={(e) => setF("date", e.target.value)} /></label>
                  <label className="field"><span>Créneau</span>
                    <select value={form.creneau} onChange={(e) => setF("creneau", e.target.value)}>
                      <option>08:00 – 10:00</option><option>10:00 – 12:00</option>
                      <option>14:00 – 16:00</option><option>16:00 – 18:00</option>
                    </select>
                  </label>
                </div>
                <label className="field"><span>Note (optionnel)</span><textarea rows="2" value={form.notes} onChange={(e) => setF("notes", e.target.value)} placeholder="Message sur le gâteau, allergies…" /></label>
              </div>
            )}
          </div>

          <aside className="summary">
            <h3>Total</h3>
            <div className="summary__row"><span>Sous-total</span><span>{subtotal}€</span></div>
            <div className="summary__row">
              <span>{mode === "delivery" ? "Livraison" : "Retrait boutique"}</span>
              <span>{mode === "delivery" ? (fee === 0 ? "Offerte" : fee + "€") : "Gratuit"}</span>
            </div>
            {mode === "delivery" && fee > 0 && <p className="summary__hint">Livraison offerte dès 60€.</p>}
            <div className="summary__total"><span>À payer</span><span>{total}€</span></div>

            {stage === "cart"
              ? <Btn size="lg" full icon="arrow" onClick={() => setStage("checkout")}>Valider le panier</Btn>
              : (
                <>
                  <Btn size="lg" full icon="check" onClick={() => { setStage("done"); clearCart(); }}>Payer {total}€</Btn>
                  <button className="link" style={{ marginTop: 12 }} onClick={() => setStage("cart")}><Icon name="arrowLeft" size={15} /> Retour au panier</button>
                </>
              )}
            <p className="summary__safe"><Icon name="check" size={14} /> Paiement sécurisé · Préparé J+1</p>
          </aside>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CustomPage, CartPage });
