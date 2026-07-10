<<<<<<< HEAD
# Qelvi — ghid mobil de utilizare

Site static, mobile-first, în limba română. Nu are dependențe externe și poate fi publicat direct pe Vercel.

## Rulare locală

Este necesar Node.js.

```bash
npm run dev
```

Deschide `http://localhost:3000`.

## Publicare prin GitHub + Vercel

```bash
git init
git add .
git commit -m "Add Qelvi mobile guide"
git branch -M main
git remote add origin URL_REPOSITORY_GITHUB
git push -u origin main
```

În Vercel:

1. Importă repository-ul GitHub.
2. Alege **Framework Preset: Other**.
3. Nu este necesară o comandă de build; proiectul este static.
4. Publică proiectul.

## Fișiere principale

- `index.html` — conținutul și pașii ghidului
- `styles.css` — design responsive, optimizat pentru mobil
- `app.js` — progres, navigare, rezumat și mărirea imaginilor
- `assets/screens/` — capturile de ecran Qelvi
- `vercel.json` — cache și headere pentru Vercel

## Modificarea textului

Caută în `index.html` secțiunile cu ID-urile `pasul-1` ... `pasul-11`.
=======
# Qelvi guide

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally http://localhost:5173.

## Vercel

Import the repository. Vercel should detect Vite automatically.
- Build command: npm run build
- Output directory: dist
>>>>>>> ba18b830d6be211c67300bdad2a9296e937ed99a
