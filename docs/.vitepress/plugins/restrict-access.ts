import type { Plugin } from 'vite';

// Liste des hôtes autorisés
const allowedHosts = [
  'localhost',
  '127.0.0.1',
  // Ajoutez ici vos domaines ou adresses IP autorisés
  'votredomaine.com',
  '192.168.1.100' // Exemple d'adresse IP
];

export function restrictAccess(): Plugin {
  return {
    name: 'restrict-access',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const host = req.headers.host?.split(':')[0] || '';
        const referer = req.headers.referer || '';
        
        // Vérifier si l'hôte est autorisé
        if (!allowedHosts.includes(host) && !allowedHosts.some(allowed => referer.includes(allowed))) {
          res.statusCode = 403;
          res.end('Accès non autorisé');
          return;
        }
        
        next();
      });
    }
  };
}