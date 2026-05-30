# Portfolio - El Mahdi BENKHIDER

Documentation du projet pour faciliter l'ajout de modifications et de fonctionnalités futures.

---

## 1. Aperçu général

Portfolio statique monopage (SPA-like) hébergé sur **GitHub Pages**.  
Technologies : **HTML5** + **CSS3** + **JavaScript vanilla** (aucun framework).

### Structure des fichiers

```
Portfolio-main/
├── index.html                 ← Page unique du portfolio
├── images/                    ← Images, badges, captures
│   ├── bg_1.png               Photo de profil
│   ├── AZ104.png              Badge certification AZ-104
│   ├── AZ900.png              Badge certification AZ-900
│   ├── DP900.png              Badge certification DP-900
│   ├── github.png             Badge GitHub
│   ├── livecorp-helm.jpg      Capture projet Helm
│   ├── microservices-demo.jpg Capture projet Microservices
│   ├── project-1.jpg → 6.jpg  Captures projets (6)
├── El Mahdi_Benkhider.pdf    ← CV téléchargeable
├── .nojekyll                  ← Désactive Jekyll pour GitHub Pages
└── documentation-projet.md   ← Ce fichier
```

---

## 2. Sections du portfolio (ordre d'apparition)

### 2.1 Navbar (lignes 904–921)
- Logo "El Mahdi" à gauche
- Menu burger responsive (7 liens : Accueil, À propos, Expériences, Certifications, Compétences, Projets, Contact)
- Active link mis à jour dynamiquement au scroll (scroll spy, JS lignes 1318–1336)
- Bouton burger (`#navToggle`) avec animation icône bars ↔ times

### 2.2 Hero (lignes 927–942)
- Photo de profil (cercle avec bordure animée)
- Texte d'introduction + sous-titre "Ingénieur DevOps Passionné"
- 2 boutons : "Me contacter" (scroll vers #contact) et "Mes projets" (scroll vers #projects)

### 2.3 À propos (lignes 945–985)
- Photo + description personnelle (listes à puces avec `▹`)
- Compteur animé (0 → 10 projets, JS lignes 1351–1380)
- Bouton "Télécharger CV" (PDF)

### 2.4 Expériences (lignes 988–1074)
- Grille 2 colonnes (passe à 1 colonne en mobile)
- 7 cartes d'expérience avec : date, titre, entreprise, description, compétences
- Organisées en 2 groupes (colonne gauche : 3 cartes, colonne droite : 4 cartes)

### 2.5 Certifications (lignes 1077–1102)
- Grille 4 colonnes (2 en tablette, 2 en mobile)
- 4 badges cliquables (liens Credly) : AZ-104, AZ-900, DP-900, GitHub
- Overlay au hover avec icône external-link

### 2.6 Compétences (lignes 1105–1131)
- Grille 2 colonnes
- 17 barres de progression avec pourcentages (Terraform 90%, Docker 80%, etc.)
- Animées via Intersection Observer (fade-in)

### 2.7 Projets (lignes 1134–1199)
- Grille 3 colonnes (2 en tablette, 1 en mobile)
- 8 cartes projet avec image + overlay au hover (titre, tag, lien GitHub éventuel)

### 2.8 Contact (lignes 1202–1231)
- Grille 4 colonnes (2 en tablette, 1 en mobile)
- 4 cartes : Adresse, Téléphone, Email, LinkedIn
- Icônes avec animation au hover

### 2.9 Témoignages (lignes 1234–1261)
- Grille 3 colonnes
- 3 cartes témoignage (nom, titre, citation avec guillemets stylisés)
- Bouton "Voir toutes les recommandations" vers LinkedIn

### 2.10 Footer (lignes 1266–1275)
- Lien GitHub + LinkedIn (cercles avec hover)
- Copyright dynamique (année gérée par JS)

### 2.11 Back to Top (lignes 1278–1280)
- Bouton flottant en bas à droite
- Apparaît après 400 px de scroll (JS lignes 1386–1395)

---

## 3. Système de design

### Couleurs (variables CSS, lignes 38–55)
| Variable         | Valeur    | Usage                     |
|------------------|-----------|---------------------------|
| `--primary`      | `#8b5cf6` | Violet (accent principal) |
| `--primary-light`| `#a78bfa` | Violet clair              |
| `--secondary`    | `#06b6d4` | Cyan                      |
| `--bg`           | `#0f0a1a` | Fond sombre               |
| `--text`         | `#f1f0f7` | Texte principal           |
| `--glass`        | rgba(...) | Effet verre (transparence)|

### Typographie
- Police : **Poppins** (Google Fonts)
- Tailles : clamp() pour le responsive fluide
- Titres de section : dégradé violet → cyan avec `background-clip: text`

### Composants réutilisables
- `.glass-card` — Carte avec effet de verre, hover avec glow
- `.btn / .btn-primary / .btn-outline` — Boutons arrondis avec dégradé
- `.fade-in` — Animation d'apparition au scroll (Intersection Observer)
- `.section-title` — Titre de section avec grand texte d'arrière-plan

### Responsive
- Breakpoints : 992px (tablet), 768px (portrait), 576px (mobile)
- Menu burger activé à 992px
- Grilles : passage progressif à 1 colonne

---

### 2.12 GitHub Stats (dans la section À propos)
- 3 statistiques en direct via l'API GitHub : repos, stars, followers
- Animé au scroll avec `IntersectionObserver`
- Fallback silencieux si l'API échoue (affiche 0)

### 2.13 Lightbox certificats (lignes ~1661–1671)
- Clique sur un badge de certification → overlay plein écran avec image agrandie
- Bouton "Voir sur Credly" pour ouvrir le lien d'origine
- Fermeture : bouton ×, clic sur l'overlay, touche Échap
- `body.style.overflow = 'hidden'` pendant l'ouverture (empêche le scroll)

### 2.14 Formulaire de contact (lignes ~1545–1570)
- Formulaire avec validation en temps réel (blur)
- Champ : Nom, Email, Sujet, Message
- Validation : nom ≥ 2 car., email valide (regex), message ≥ 10 car.
- Envoi via **Formspree** (remplacer `https://formspree.io/f/xxxxxx` par ton ID)
- Animation de chargement (spinner) + toast de confirmation
- Note : le formulaire ne fonctionnera pas tant que tu n'auras pas remplacé l'ID Formspree

### 2.15 Carrousel témoignages (lignes ~1608–1650)
- Défilement automatique (toutes les 5s) avec pause au survol
- Navigation par points cliquables
- Swipe tactile (glisser pour passer au suivant/précédent)
- S'arrête si un seul témoignage

### 2.16 Curseur personnalisé (lignes ~1673–1675)
- Petit point violet + anneau qui suit la souris
- L'anneau a un léger retard (effet de traînée fluide, 12% d'inertie)
- Agrandissement au survol des éléments interactifs (liens, boutons, cartes)
- Désactivé automatiquement sur les appareils tactiles

### 2.17 Toast notification (lignes ~1677–1681)
- Notification flottante en bas centré
- Types : `success` (vert), `error` (rouge), `info` (violet)
- Disparaît automatiquement après 4 secondes

---

## 4. Services externes

| Service | Usage | Lien |
|---------|-------|------|
| GitHub API | Stats en direct | https://api.github.com/users/mahdibenkhider |
| Formspree | Envoi du formulaire de contact | https://formspree.io (gratuit, inscription requise) |
| GitHub Pages | Hébergement | https://pages.github.com |
| Font Awesome 6.5.1 | Icônes | https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css |
| Google Fonts (Poppins) | Typographie | https://fonts.googleapis.com |

## 5. JavaScript (fonctions principales, lignes ~1688–2024)

| Fonctionnalité          | Description                                    |
|-------------------------|------------------------------------------------|
| Menu burger             | Toggle navigation mobile + aria-expanded       |
| Scroll spy              | Active link mis à jour au scroll               |
| Intersection Observer   | Animation fade-in des éléments                  |
| Compteur animé          | 0 → 10 projets avec requestAnimationFrame       |
| Année dynamique         | Copyright mis à jour avec l'année courante      |
| Back to top             | Bouton visible après 400px de scroll            |

---

## 5. Accessibilité
- `skip-link` (ligne 110) pour passer au contenu principal
- Attributs `aria-label`, `aria-expanded`, `role`
- `focus-visible` rings personnalisés
- Images avec `alt` text
- Liens avec `rel="noopener"` pour sécurité

---

## 6. Guide pour les modifications futures

### Ajouter une certification
1. Ajouter l'image dans `images/`
2. Copier un bloc `<a class="cert-card">` (lignes 1084–1099)
3. Modifier `href`, `src`, `alt`, `aria-label`

### Ajouter une expérience
1. Copier un bloc `<article class="experience-card">` (ex. lignes 997–1009)
2. Placer dans la colonne gauche ou droite (`<div>` à ligne 996 ou 1026)

### Ajouter une compétence
1. Copier un `<div class="skill-item">` (ex. ligne 1112)
2. Modifier `data-pct`, le texte, `style="width:…%"` et le pourcentage affiché

### Ajouter un projet
1. Ajouter l'image dans `images/`
2. Copier un `<div class="project-card">` (ex. lignes 1141–1147)
3. Optionnel : ajouter `wide` pour occuper 2 colonnes → `.project-card.wide`

### Modifier les informations personnelles
- Coordonnées : cartes contact (lignes 1209–1228)
- Liens sociaux : footer (lignes 1270–1271)
- CV : chemin `./El Mahdi_Benkhider.pdf` (mettre à jour le PDF)

### Changer les couleurs / thème
- Modifier les variables CSS dans `:root` (lignes 38–55)
- Le fond animé est géré par `body::before` (lignes 70–78)

---

## 7. Déploiement

Hébergé sur **GitHub Pages** via le dépôt `mahdibenkhider/Portfolio-main`.  
Pour déployer : `git push` sur la branche `main`.  
Le fichier `.nojekyll` empêche Jekyll de traiter le site.
