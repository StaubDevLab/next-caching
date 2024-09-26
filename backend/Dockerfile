# Étape 1 : Utiliser l'image officielle Node.js
FROM node:22-alpine
# Étape 2 : Créer un répertoire de travail pour l'application
WORKDIR /app

# Étape 3 : Copier le fichier package.json et package-lock.json
COPY ./package.json /app/

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du code de l'application
COPY . .

# Étape 6 : Exposer le port que ton application utilisera (généralement 3333 avec AdonisJS)
EXPOSE 8080

# Étape 7 : Démarrer l'application
CMD ["npm", "run", "start"]
