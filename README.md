# 💍 Phylidia & Guillaume — Site de Mariage

Site de mariage au style **Bridgerton** — enveloppe animée, lettre manuscrite, scroll reveal élégant.

## Structure des fichiers

```
/
├── index.html       ← Page principale
├── style.css        ← Tout le style Bridgerton
├── main.js          ← Animations (enveloppe, typewriter, countdown, galerie)
├── flowers.svg      ← Ornements floraux SVG
├── assets/          ← TES PHOTOS ET VIDÉOS ICI
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── gallery1.jpg
│   ├── gallery2.jpg
│   ├── gallery3.jpg
│   ├── gallery4.jpg
│   ├── gallery5.jpg
│   └── video-couple.mp4  (optionnel)
└── README.md
```

## Déploiement sur GitHub Pages

1. Crée un repo GitHub (ex: `BibiUnion2` ou `mariage-phylidia-guillaume`)
2. Uploade tous les fichiers à la racine
3. Va dans **Settings → Pages → Source → main → / (root)**
4. Ton site sera disponible sur `https://TONNOM.github.io/NOM-DU-REPO/`

## Personnalisation

Cherche `✏️ PERSONNALISE` dans `index.html` pour trouver tous les endroits à modifier :

| Ce qu'il faut changer | Où |
|---|---|
| Vraie date de mariage | `data-date="2025-09-20T15:00:00"` dans le countdown |
| Date limite RSVP | Texte dans la section RSVP |
| Lieu & adresse | Section "Le Lieu" |
| Horaires du programme | Section "Le Déroulé du Jour" |
| Infos hébergement | Section "Hébergement" |
| Citation personnelle | Section "De nos Cœurs aux Vôtres" |
| Texte de la lettre | Variable `LETTER_TEXT` dans `main.js` |

## Ajouter tes photos

Place tes photos dans le dossier `assets/` :

```
assets/photo1.jpg    → Photo principale 1 (page d'accueil)
assets/photo2.jpg    → Photo principale 2
assets/photo3.jpg    → Photo principale 3
assets/gallery1.jpg  → Galerie photo 1
... etc
```

**Pour une vidéo** dans la galerie, décommente ce bloc dans `index.html` :
```html
<video src="assets/video-couple.mp4" autoplay muted loop playsinline></video>
```

## Formulaire RSVP avec Formspree (gratuit)

1. Crée un compte sur [formspree.io](https://formspree.io)
2. Crée un nouveau formulaire → récupère ton ID (ex: `xrgpkqdo`)
3. Dans `index.html`, modifie le `<form>` :
```html
<form class="rsvp-form" id="rsvp-form" 
      action="https://formspree.io/f/xrgpkqdo" 
      method="POST">
```
4. Dans `main.js`, remplace la simulation par un vrai fetch :
```javascript
const res = await fetch(form.action, {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
});
```

Tu recevras les RSVP directement par email !

## Palette de couleurs (Bridgerton)

| Couleur | Variable CSS | Usage |
|---|---|---|
| Crème parchemin | `--cream` | Fond principal |
| Or | `--gold` | Accents, bordures |
| Bleu ciel sauge | `--blue-sage` | Dégradés |
| Vert sauge | `--green-sage` | Ornements, feuilles |
| Rose poudré | `--rose` | Fleurs, pétales |
| Brun encre | `--ink` | Texte principal |

## Polices utilisées (Google Fonts)

- **Playfair Display** — Titres élégants
- **Cormorant Garamond** — Corps du texte raffiné  
- **Dancing Script** — Lettre manuscrite, signature

---

*Fait avec ♡ — Bon mariage à vous deux !*
