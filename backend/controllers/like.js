const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) =>{
   
    if(req.body.like === 1){ // Si l'utilisateur clique sur "j'aime"
        Sauce
            .findOne( // recherche dans la bdd
                {_id: req.params.id} 
            )

            .then(sauce => {

                if(sauce.usersLiked.includes(req.body.userId)) { 
                    // si cet utilisateur est déjà présent dans le tableau 
                    // des utilisateurs qui aiment cette sauce
                    res.status(200).json({ message: "Cet utilisateur a déjà dit qu'il aimait cette sauce !"})
                   
                }
               
                if(!sauce.usersLiked.includes(req.body.userId)){
                    // si cet utilisateur n'est pas présent dans le tableau 
                    // des utilisateurs qui aiment cette sauce
                    Sauce
                        .updateOne(
                            {_id:req.params.id}, 
                            { $push: { usersLiked: req.body.userId }, //ajoute cet utilisateur dans le tableau des utilisateurs qui aiment cette sauce
                            $inc: { likes: +1 } } //incrémente un champ d'une valeur spécifiée
                        )
                        .then(() => res.status(200).json({ message: "Un nouvel utilisateur aime cette sauce !"}))
                        .catch(error => res.status(400).json({ error }));
                }

            })
            .catch(error => res.status(400).json({ error }));
            
    }

    else if(req.body.like === -1){  // Si le bouton like est grisé
        Sauce 
            .findOne( // recherche dans la bdd
                {_id: req.params.id} 
            )

            .then(sauce => {
                if(sauce.usersDisliked.includes(req.body.userId)){ 
                    // si l'utilisateur est déjà dans le tableau des utilisateurs
                    // qui n'aiment cette sauce
                    res.status(200).json({message: "L'utilisateur a déjà dit qu'il n'aimait pas cette sauce"})
                    
                }

                if(!sauce.usersDisliked.includes(req.body.userId)){ 
                    // si l'utilisateur n'est pas dans le tableau des utilisateurs
                    // qui n'aiment pas cette sauce
                    Sauce
                        .updateOne(
                            {_id:req.params.id},
                            { $push:{ usersDisliked: req.body.userId}, //ajoute l'utilisateur
                                // au tableau de ceux qui n'aiment pas la sauce

                            $inc: { dislikes:+1 } } // dislike est à 1
                        )
                        .then(() => res.status(200).json({message: "L'utilisateur n'aime pas cette sauce"}))
                        .catch(error => res.status(400).json({ error }))
                }

            })

            .catch(error => res.status(400).json({ error }));

    } 

   else if(req.body.like === 0){
        Sauce 
            .findOne( // recherche dans la bdd
                {_id: req.params.id} 
            )
            .then(sauce => {
                if(sauce.usersLiked.includes(req.body.userId)){ 
                    // si l'utilisateur est déjà dans le tableau des utilisateurs
                    // qui aiment cette sauce
                    Sauce
                        .updateOne(
                            {_id:req.params.id},
                            {$pull: { usersLiked : req.body.userId}, // on retire l'utilisateur
                            // du tableau de ceux qui aiment cette sauce
                            $inc : { likes : -1}} // retire un like
                        )
                        .then(() => res.status(200).json({message: "L'utilisateur n'aime plus cette sauce"}))
                        .catch(error => res.status(400).json({ error }))
                }
                
                if(sauce.usersDisliked.includes(req.body.userId)){ 
                    // si l'utilisateur est déjà dans le tableau des utilisateurs
                    // qui n'aiment cette sauce
                    Sauce
                        .updateOne(
                            {_id:req.params.id},
                            {$pull: { usersDisliked : req.body.userId}, // on retire l'utilisateur
                            // du tableau de ceux qui n'aiment pas cette sauce
                            $inc : { dislikes : -1}} // retire un dislike
                        )
                        .then(() => res.status(200).json({message: "L'utilisateur retire son dislike"}))
                        .catch(error => res.status(400).json({ error }))
                }

            })
            .catch(error => res.status(400).json({ error }))
    } else {
        res.status(500).json({message: "Action non reconnue"})
    };
  
};