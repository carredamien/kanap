//APPROCHE MODULES UNIQUEMENT SUR LA PAGE SCRIPT.JS
let app = {

  url: `http://kanap.helpautos.com/api/products`, //Initialisation des variables
  products: "",

  init: function () { // fonction init pour démarrer les objets
    app.getPosts();
  },

  getPosts: function () { //fonction pour récupérer les produits de l'api
    fetch(app.url) //ici je me connecte a l'api
      .then(function (res) { // je reçois la réponse 
        if (res.ok) {
          return res.json();
        }
      })
      .then(async function (value) { //je récupére la promesse
        app.products = await value;
        //displayed posts
        app.displayPost(app.products); // je lance la fonction qui affiche les produits
      })
      .catch(function (err) { // s'il y a une erreur, je lance une fonction qui prévient l'utilisateur
        //displayed error
        app.displayError();

      })
  },

  displayPost: function () { // function pour afficher les produits
    if (app.products) {
      for (product of app.products) {
        let items = document.querySelector('#items');
        let a = document.createElement('a');
        items.appendChild(a);
        let article = document.createElement('article');
        a.appendChild(article);
        let articleImg = document.createElement('img');
        articleImg.src = product.imageUrl;
        article.appendChild(articleImg);
        let articleTitle = document.createElement('h3');
        article.appendChild(articleTitle);
        let articleP = document.createElement('p');
        article.appendChild(articleP);
        a.href = `./product.html?id=${product._id}`;
        articleImg.setAttribute('alt', product.altTxt);
        articleTitle.innerHTML = product.name;
        articleP.innerHTML = product.description;
      }

      const searchParams = new URLSearchParams(location.search); // je redirige sur la fiche produit selon l'id
      searchParams.get("id");
      if (searchParams.has('id')) {
        location.pathname = `/front/html/product.html`;
      } else {
        window.location.href; // sinon je reste sur la page d'accueil
      }
    }
  },

  displayError: function () { //fonction d'affichage d'erreur
    let titleH2 = document.querySelector('.limitedWidthBlock .titles h2');
    titleH2.innerHTML = "Nous sommes désolés, une erreur est survenue";
  }

};

document.addEventListener('DOMContentLoaded', app.init); //démarrage de la fonction init une fois le dom chargé