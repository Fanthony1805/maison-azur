// pages-main.jsx — Accueil, Maison (à propos), Galerie, Contact
const { useState: useStateM } = React;

// ============ ACCUEIL ============
function HomePage({ go, openProduct, addToCart }) {
  const featured = PRODUCTS.filter((p) =>
    ["tarte-citron-menton", "entremets-mimosa", "paris-nice", "macarons-12"].includes(p.id)
  );
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero__text">
          <Eyebrow>Pâtisserie méditerranéenne · Côte d'Azur</Eyebrow>
          <h1 className="hero__title">
            Le goût du Sud,<br /><em>fait main</em> chaque matin.
          </h1>
          <p className="hero__lede">
            Maison Azur cueille la Riviera dans chaque dessert : citron de Menton,
            fleur d'oranger, amande de Provence. À emporter, livré autour de Monaco,
            ou créé sur mesure pour vos grands jours.
          </p>
          <div className="hero__cta">
            <Btn size="lg" icon="arrow" onClick={() => go("shop")}>Découvrir la boutique</Btn>
            <Btn size="lg" variant="ghost" onClick={() => go("custom")}>Commander sur mesure</Btn>
          </div>
          <div className="hero__meta">
            <span><Icon name="truck" size={18} /> Livraison ~1h autour de Monaco</span>
            <span><Icon name="bag" size={18} /> Click &amp; collect en boutique</span>
          </div>
        </div>
        <div className="hero__art">
          <Ph label="photo · vitrine & entremets signature" tint="terracotta" className="hero__img" src={PHOTOS.hero} zoom />
          <div className="hero__badge">
            <span className="hero__badge-k">Maison</span>
            <span className="hero__badge-v">Azur</span>
            <span className="hero__badge-s">Monaco · depuis 2009</span>
          </div>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="strip">
        {[
          { i: "leaf", t: "Produits de la Riviera", d: "Citron de Menton IGP, amande de Provence, miel de lavande." },
          { i: "chef", t: "100% fait maison", d: "Tourage, crèmes et glaçages réalisés chaque jour à l'atelier." },
          { i: "cal", t: "Commande anticipée", d: "48h pour les pièces sur mesure, J+1 pour la boutique." },
        ].map((s) => (
          <div className="strip__item" key={s.t}>
            <div className="strip__ic"><Icon name={s.i} size={22} /></div>
            <div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          </div>
        ))}
      </section>

      {/* SÉLECTION */}
      <section className="section">
        <div className="section__head">
          <div>
            <Eyebrow color="var(--c-terracotta)">La sélection</Eyebrow>
            <h2 className="section__title">Les incontournables de la maison</h2>
          </div>
          <button className="link" onClick={() => go("shop")}>
            Toute la boutique <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="grid grid--4">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} onOpen={openProduct} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="section section--cat">
        <Eyebrow color="var(--c-azur)">Le catalogue</Eyebrow>
        <h2 className="section__title">Cinq univers gourmands</h2>
        <div className="cats">
          {CATEGORIES.map((c, i) => (
            <button className="cat" key={c.id} onClick={() => go("shop", { cat: c.id })}>
              <Ph label={c.label.toLowerCase()} tint={["ocre", "terracotta", "caramel", "ocre", "terracotta"][i]} ratio="5 / 4" src={c.img} zoom overlay />
              <div className="cat__body">
                <h3>{c.label}</h3>
                <p>{c.blurb}</p>
                <span className="cat__go"><Icon name="arrow" size={16} /></span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SUR MESURE */}
      <section className="custom-band">
        <div className="custom-band__art">
          <Ph label="photo · pièce montée mariage" tint="caramel" className="custom-band__img" src={PHOTOS.custom} zoom />
        </div>
        <div className="custom-band__text">
          <Eyebrow color="var(--c-ocre)">Événements & traiteur</Eyebrow>
          <h2 className="section__title">Une pièce unique pour vos grands jours</h2>
          <p>
            Mariages, baptêmes, réceptions d'entreprise sur la Riviera : nous concevons
            pièces montées, wedding cakes et buffets sucrés à votre image, dressés sur place.
          </p>
          <ul className="ticks">
            <li><Icon name="check" size={16} /> Dégustation & devis sous 48h</li>
            <li><Icon name="check" size={16} /> De 20 à 300 convives</li>
            <li><Icon name="check" size={16} /> Livraison & installation incluses</li>
          </ul>
          <Btn size="lg" icon="arrow" onClick={() => go("custom")}>Demander un devis</Btn>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="story">
        <div className="story__text">
          <Eyebrow color="var(--c-terracotta)">La maison</Eyebrow>
          <h2 className="section__title">De notre atelier de Monaco à votre table</h2>
          <p>
            Maison Azur est née d'un comptoir du Carré d'Or, à Monte-Carlo. Le chef
            Élie Roman y marie la rigueur de la grande pâtisserie française et la lumière
            des produits du pays niçois.
          </p>
          <button className="link" onClick={() => go("about")}>
            Notre histoire <Icon name="arrow" size={16} />
          </button>
        </div>
        <Ph label="photo · le chef à l'atelier" tint="terracotta" className="story__img" src={PHOTOS.atelier} zoom />
      </section>

      {/* AVIS */}
      <section className="quote">
        <div className="quote__stars">
          {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={20} />)}
        </div>
        <blockquote>
          « La meilleure tarte au citron de la Côte. Commande en ligne simple, retrait à
          l'heure, et l'entremets pour l'anniversaire de ma fille était une œuvre d'art. »
        </blockquote>
        <cite>— Camille R., Saint-Jean-Cap-Ferrat</cite>
      </section>

      {/* ZONE DE LIVRAISON */}
      <section className="section">
        <div className="zone">
          <div className="zone__map">
            <DeliveryMap variant="zone" />
          </div>
          <div className="zone__text">
            <Eyebrow color="var(--c-azur)">Livraison</Eyebrow>
            <h2 className="section__title">Nous livrons tout autour de Monaco</h2>
            <p>Soit environ une heure de route depuis notre atelier. Une commune ne figure pas dans la liste ? Écrivez-nous.</p>
            <div className="chips">
              {COMMUNES.map((c) => <span className="chip" key={c}>{c}</span>)}
            </div>
          </div>
        </div>
      </section>

      <FinalCta go={go} />
    </div>
  );
}

function FinalCta({ go }) {
  return (
    <section className="finalcta">
      <Eyebrow color="rgba(255,255,255,.7)">Faim de Sud ?</Eyebrow>
      <h2>Composez votre commande dès aujourd'hui.</h2>
      <div className="finalcta__btns">
        <Btn size="lg" variant="light" icon="arrow" onClick={() => go("shop")}>Ouvrir la boutique</Btn>
        <Btn size="lg" variant="outline-light" onClick={() => go("contact")}>Nous trouver</Btn>
      </div>
    </section>
  );
}

// ============ MAISON / À PROPOS ============
function AboutPage({ go }) {
  return (
    <div className="page page--narrow">
      <header className="phead">
        <Eyebrow color="var(--c-terracotta)">La maison</Eyebrow>
        <h1 className="phead__title">Une maison de pâtisserie à Monaco</h1>
        <p className="phead__lede">
          Depuis 2009, Maison Azur cultive une idée simple : la grande pâtisserie peut
          avoir le goût du soleil.
        </p>
      </header>

      <Ph label="photo · la devanture, cœur de Monaco" tint="terracotta" className="about__hero" src={PHOTOS.devanture} zoom />

      <div className="prose">
        <p>
          Tout commence dans le Carré d'Or de Monte-Carlo, dans un atelier de vingt mètres
          carrés. Le chef <strong>Élie Roman</strong>, formé chez les meilleures maisons
          parisiennes, revient sur sa Riviera natale avec une obsession : faire entrer
          dans ses desserts les citrons de Menton, les amandes de Provence et la fleur
          d'oranger de son enfance.
        </p>
        <p>
          Quinze ans plus tard, l'esprit n'a pas changé. Tout est <strong>fait maison</strong>,
          chaque jour : les feuilletages sont tourés à la main, les crèmes montées le matin,
          les fruits travaillés au rythme des saisons.
        </p>
      </div>

      <div className="values">
        {[
          { i: "leaf", t: "Le terroir d'abord", d: "Producteurs du pays niçois et de Provence, en circuit court." },
          { i: "chef", t: "Le geste artisan", d: "Aucune sous-traitance : tout sort de notre atelier." },
          { i: "star", t: "L'exigence du beau", d: "Un dessert se mange d'abord avec les yeux." },
        ].map((v) => (
          <div className="value" key={v.t}>
            <div className="value__ic"><Icon name={v.i} size={24} /></div>
            <h3>{v.t}</h3>
            <p>{v.d}</p>
          </div>
        ))}
      </div>

      <div className="about__split">
        <Ph label="photo · l'équipe en cuisine" tint="ocre" className="about__split-img" src={PHOTOS.equipe} zoom />
        <div className="about__split-text">
          <Eyebrow color="var(--c-azur)">L'équipe</Eyebrow>
          <h2 className="section__title">Huit mains, une même maison</h2>
          <p>
            Élie est entouré de trois chefs de partie et d'une cheffe confiseuse qui perpétue
            la tradition des calissons. Ensemble, ils signent chaque pièce qui sort de
            l'atelier.
          </p>
          <Btn size="lg" icon="arrow" onClick={() => go("custom")}>Travailler avec nous</Btn>
        </div>
      </div>
      <FinalCta go={go} />
    </div>
  );
}

// ============ GALERIE ============
function GalleryPage({ go }) {
  return (
    <div className="page">
      <header className="phead">
        <Eyebrow color="var(--c-ocre)">Galerie</Eyebrow>
        <h1 className="phead__title">Le plaisir des yeux</h1>
        <p className="phead__lede">Un aperçu de la vitrine, de l'atelier et de quelques pièces sur mesure.</p>
      </header>
      <div className="masonry">
        {GALLERY.map((g) => (
          <figure className={"masonry__item " + (g.span ? "masonry__item--" + g.span : "")} key={g.id}>
            <Ph label={"photo · " + g.label} tint={g.tint} className="masonry__img" src={g.img} zoom overlay />
          </figure>
        ))}
      </div>
      <FinalCta go={go} />
    </div>
  );
}

// ============ CONTACT ============
function ContactPage() {
  const [sent, setSent] = useStateM(false);
  return (
    <div className="page page--narrow">
      <header className="phead">
        <Eyebrow color="var(--c-azur)">Contact</Eyebrow>
        <h1 className="phead__title">Nous trouver, nous écrire</h1>
      </header>

      <div className="contact">
        <div className="contact__info">
          <div className="contact__row">
            <div className="contact__ic"><Icon name="pin" size={20} /></div>
            <div>
              <h4>La boutique</h4>
              <p>12, avenue de la Costa<br />98000 Monaco</p>
            </div>
          </div>
          <div className="contact__row">
            <div className="contact__ic"><Icon name="clock" size={20} /></div>
            <div>
              <h4>Horaires</h4>
              <p>Mardi – Dimanche · 7h30 – 19h30<br />Fermé le lundi</p>
            </div>
          </div>
          <div className="contact__row">
            <div className="contact__ic"><Icon name="phone" size={20} /></div>
            <div>
              <h4>Téléphone</h4>
              <p>+377 93 00 00 00</p>
            </div>
          </div>
          <div className="contact__row">
            <div className="contact__ic"><Icon name="mail" size={20} /></div>
            <div>
              <h4>Email</h4>
              <p>bonjour@maison-azur.fr</p>
            </div>
          </div>
          <div className="contact__map"><DeliveryMap variant="spot" /></div>
        </div>

        <form className="contact__form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <h3>Une question ? Un mot doux ?</h3>
          {sent ? (
            <div className="sent">
              <div className="sent__ic"><Icon name="check" size={28} /></div>
              <h4>Message envoyé</h4>
              <p>Merci ! Nous revenons vers vous très vite.</p>
            </div>
          ) : (
            <>
              <label className="field">
                <span>Nom</span>
                <input required type="text" placeholder="Votre nom" />
              </label>
              <label className="field">
                <span>Email</span>
                <input required type="email" placeholder="vous@email.fr" />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea required rows="4" placeholder="Votre message…" />
              </label>
              <Btn type="submit" size="lg" full icon="arrow">Envoyer</Btn>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, AboutPage, GalleryPage, ContactPage, FinalCta });
