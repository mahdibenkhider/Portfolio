#!/bin/bash
# Script de déploiement vers GitHub Pages
# Usage: bash deploy.sh

set -e

echo "🔨 Build du projet..."
npm run build

echo "📦 Copie des fichiers buildés vers Portfolio/"
rm -rf /home/mahdi/Documents/Portfolio/assets \
       /home/mahdi/Documents/Portfolio/index.html \
       /home/mahdi/Documents/Portfolio/El\ Mahdi_Benkhider.pdf \
       /home/mahdi/Documents/Portfolio/.nojekyll 2>/dev/null

cp -r dist/* /home/mahdi/Documents/Portfolio/
touch /home/mahdi/Documents/Portfolio/.nojekyll

echo "🚀 Push vers GitHub..."
cd /home/mahdi/Documents/Portfolio
git add -A
git commit -m "Deploy $(date +%Y-%m-%d_%H:%M)"
git push origin main

echo "✅ Déploiement terminé !"
