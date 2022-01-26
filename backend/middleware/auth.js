const jwt = require('jsonwebtoken'); //package qui vérifie les token d'authenfication
// token permet au back-end de vérifier que la requête est correctement authentifiée

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
// extrait le token du header authorization de la requête
// récupère le token sans l'espace et sans "bearer"

    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //décode le token selon une clef (possibilité de la renforcer)
// verify décode le token grâce à la clef   

    const userId = decodedToken.userId;  
// extraction du userId du token

    req.auth = { userId };  
// Ajout d'un objet auth à l'objet de requête qui contient le userId extrait du token
    
    if (req.body.userId && req.body.userId !== userId) { 
// compare le userid à celui extrait du token

      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};