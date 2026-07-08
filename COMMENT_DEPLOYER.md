# Comment mettre ton site en ligne

Tu as deux façons de faire. La première (Vercel + GitHub) ne demande rien
d'installer sur ton ordinateur. La deuxième (Netlify Drop) est encore plus
rapide si tu as déjà Node.js installé.

---

## Option 1 — Vercel via GitHub (recommandé, tout se passe dans le navigateur)

1. Va sur https://github.com et crée un compte gratuit si tu n'en as pas.
2. Clique sur le bouton vert "New" (ou "+" en haut à droite → "New repository").
3. Donne un nom au repository, par exemple `formation-excel-powerbi`, laisse-le
   "Public", puis clique "Create repository".
4. Sur la page qui s'affiche, clique sur "uploading an existing file".
5. Glisse-dépose TOUS les fichiers et dossiers de ce zip (garde la structure :
   `src/`, `index.html`, `package.json`, `vite.config.js`) puis clique
   "Commit changes".
6. Va sur https://vercel.com et crée un compte gratuit avec "Continue with GitHub".
7. Clique "Add New… → Project", choisis le repository que tu viens de créer,
   puis clique "Deploy". Vercel détecte automatiquement Vite et construit le site.
8. Après 1 à 2 minutes, Vercel te donne un lien du type
   `formation-excel-powerbi.vercel.app` — c'est ton site en ligne.

Chaque fois que tu modifies un fichier sur GitHub, Vercel republie le site
automatiquement.

---

## Option 2 — Netlify Drop (si tu as Node.js installé sur ton ordinateur)

1. Installe Node.js si ce n'est pas déjà fait : https://nodejs.org (version LTS).
2. Décompresse ce zip, ouvre un terminal dans le dossier, puis tape :
   ```
   npm install
   npm run build
   ```
3. Un dossier `dist` est créé.
4. Va sur https://app.netlify.com/drop et glisse le dossier `dist` dans la zone
   indiquée. Le site est en ligne immédiatement, avec un lien du type
   `nom-aleatoire.netlify.app`.

---

## Formulaire d'inscription

Le formulaire est déjà connecté à Formspree (adresse
`https://formspree.io/f/mjgqdrwg`). Chaque inscription t'arrive directement
par e-mail, à l'adresse que tu as utilisée pour créer ton compte Formspree.
Rien à faire de plus une fois le site en ligne — teste juste une première
inscription toi-même pour vérifier que le mail arrive bien.

---

## Ensuite (optionnel)

- Sur Vercel comme sur Netlify, tu peux ajouter ton propre nom de domaine
  (ex: `formation-dimitri.fr`) dans les réglages du projet, onglet "Domains".
