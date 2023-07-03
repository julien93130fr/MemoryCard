// Sélection de l'élément contenant le résultat du jeu
const divResultat = document.querySelector("#resultat");

// Tableau du jeu initial avec toutes les cases vides
var tabJeu =
[ 
    [ 0,0,0,0],
    [ 0,0,0,0],
    [ 0,0,0,0],
    [ 0,0,0,0]
];

//  var tabResultat= [ 
  //  [ 1,4,3,4],
 //   [ 1,2,3,2],
 //   [ 7,8,6,5],
 //   [ 8,7,5,6]
 //];
 // Tableau contenant les valeurs du jeu à trouver
var tabResultat = genereTableauAleatoire();
// Tableau pour conserver la sélection précédente
var oldSelection = [];
// Nombre de cases affichées (pour vérifier si deux cases sont retournées)
var nbAffiche = 0;
// Variable pour contrôler l'état du jeu (si les cases sont cliquables ou non)
var ready = true;

// Affichage initial du tableau de jeu
afficherTableau();

// Fonction pour afficher le tableau de jeu dans le HTML
function afficherTableau()
{
    var txt = "";

    for(var i = 0; i < tabJeu.length; i++)
    {
        txt += "<div>";
            for(var j = 0; j < tabJeu[i].length; j++)
            {
                if (tabJeu[i][j]===0)
                 {
                    // Case vide affichée avec un bouton cliquable
                    txt +="<button  class='btn btn-primary m-2' style='width:100px;height:100px' onClick='verif(\""+i+"-"+j+"\")'>Afficher</button>";
                 }else
                    {
                        // Case avec une image affichée
                        txt += "<img src ='"+getImage(tabJeu[i][j])+"' style='width:100px;height:100px' class='m-2' >"
                    }
            }   
                 txt += "</div>";
    }
        divResultat.innerHTML = txt;
}

// Fonction pour récupérer le chemin de l'image en fonction de la valeur
function getImage(valeur) 
{
    var imgTxt= "image/"
    switch (valeur) {
        case 1: imgTxt += "elephant.png";
            
            break;
            case 2: imgTxt += "hippo.png";
            
            break;
            case 3: imgTxt += "snake.png";
            
            break;
            case 4: imgTxt += "monkey.png";
            
            break;
            case 5: imgTxt += "parrot.png";
            
            break;
            case 6: imgTxt += "panda.png";
            
            break;
            case 7:  imgTxt += "pig.png";
            
            break;
            case 8: imgTxt += "rabbit.png";

            break;
    
        default: console.log('cas non pris en compte ')
            
    }
   return imgTxt;
}

// Fonction appelée lorsqu'une case est cliquée
function verif(bouton)
{
    // Vérification si le jeu est prêt (pas en cours d'exécution d'une autre
    if (ready) 
    {
        // Incrémenter le nombre d'affichages
        nbAffiche++ 
        var ligne  = bouton.substr(0,1);
        var colonne = bouton.substr(2,1);
   
        // Affichage de la valeur de la case dans le tableau de jeu
        tabJeu[ligne][colonne] = tabResultat [ligne][colonne];
        afficherTableau();
    
        if (nbAffiche>1) 
        {
            ready = false;
            setTimeout(() =>
            {
          
                // Vérification si les deux cases sélectionnées sont différentes
                if (tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]])
                {
                    // Réinitialisation des valeurs des deux cases
                    tabJeu[ligne][colonne] = 0;
                    tabJeu[oldSelection[0]][oldSelection[1]] = 0;
                }

        afficherTableau();
        ready = true;
        nbAffiche = 0;
        oldSelection = [ligne,colonne]; 
        },500)
        
        
        }else{
        oldSelection = [ligne,colonne]; 
        }

    
    }
}

// Fonction pour générer un tableau aléatoire de valeurs pour le jeu
function genereTableauAleatoire()
{
    var tab = [];
    var nbImagePosition  = [0,0,0,0,0,0,0,0,];

    for (var i = 0; i < 4; i++)
    {
        var ligne = [];
        for (var j = 0; j < 4; j++)
        {
            var fin = false;
            while(!fin)
            {
                 
                 // Génération aléatoire d'un nombre entre 0 et 7 inclus    
                var randomImage = Math.floor(Math.random() * 8);
                if (nbImagePosition[randomImage] < 2)
                {
                    // Ajout de la valeur dans la ligne du tableau
                    ligne.push(randomImage+1);
                    nbImagePosition[randomImage]++;
                    fin = true;

                } 
            }

          
        }
        // Ajout de la ligne dans le tableau principal
        tab.push(ligne);
        
    }
    return tab;    
}

              

