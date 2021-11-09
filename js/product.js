let searchParams = new URLSearchParams(location.search); //mise en place des variables
let paramsId = searchParams.get("id");
let urlId = `http://kanap.helpautos.com/api/products/${paramsId}`;
let product = "";


function getPostId() { // Afficher le produit avec l'id 
  fetch(urlId) // connection à l'api
    .then(function (res) {
      if (res) {
        return res.json();
      }
    })
    .then(async function (value) { //récupération de la requête
      product = await value;
      if (product) {
        getPost(product);
      }
    })
    .catch(function (err) { //gestion des erreurs
      getError();
    })
};
getPostId();


function getPost(product) { //affichage du produit demandé

  let item = document.querySelector('.item');
  let article = document.createElement('article');
  item.appendChild(article);
  article.innerHTML = `
    <div class="item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="item__content">
      <div class="item__content__titlePrice">
        <h1 id="title">${product.name}</h1>
        <p>Prix : <span id="price">${product.price}</span>€</p>
      </div>
      <div class="item__content__description">
        <p class="item__content__description__title">Description :</p>
        <p id="description">${product.description}</p>
      </div>
      <div class="item__content__settings">
        <div class="item__content__settings__color">
          <label for="color-select">Choisir une couleur :</label>
          <select name="color-select" id="colors">
              <option value="">--SVP, choisissez une couleur --</option>
              ${product.colors.map(color =>`<option value="${color}">${color}</option>`)}
          </select>
        </div>
        <div class="item__content__settings__quantity">
          <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
          <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
        </div>
      </div>
      <div class="item__content__addButton">
        <button id="addToCart">Ajouter au panier</button>
      </div>
      </div>`;


  function addToCart() { //fonction d'ajout au panier 

    const colors = document.querySelector('#colors');
    const quantity = document.querySelector('#quantity');
    const btnAddToCart = document.querySelector("#addToCart");


    btnAddToCart.addEventListener('click', (e) => {
      e.preventDefault();
      addToStorage();
    })


    function addToStorage() { //fonction d'ajout au stockage
      let kanapStorage = [];
      let kanap = {
        id: paramsId,
        image: product.imageUrl,
        name: product.name,
        altTxt: product.altTxt,
        price: product.price,
        color: colors.value,
        quantity: quantity.value
      };

      // stockage du panier avec la fonction LOCALSTORAGE

      // si la couleur et les quantités sont remplies, j'ajoute au localstorage
      
      if (colors.value && quantity.value != 0 && quantity.value < 100) { //s'il y a une couleur et une quantité

        let getStorage = JSON.parse(localStorage.getItem('kanap'));

        if (getStorage != null) {

          const hasColor = getStorage.filter(
            (x) => x.id === kanap.id && x.color === colors.value);

          if (hasColor && hasColor.length) {
            hasColor[0].quantity = parseInt(hasColor[0].quantity)
            hasColor[0].quantity += parseInt(quantity.value);
          } else {

            getStorage.push(kanap);
            
          }
          alert('Produit ajouté au panier');
          localStorage.setItem("kanap", JSON.stringify(getStorage));
          
        } else {
          
          kanapStorage.push(kanap);
          localStorage.setItem("kanap", JSON.stringify(kanapStorage));
         
          
        }

      } else {
        alert('Veuillez choisir une couleur et une quantité');
      }

    }

  };
  addToCart();
};

function getError() { //fonction pour les erreurs
  let item = document.querySelector('.item');
  let article = document.createElement('article');
  item.appendChild(article);
  article.innerHTML = `<div class="item__content__titlePrice">
  <p id="description">La fiche produit n'est pas disponible pour le moment, veuillez réessayer ultérieurement ou contactez-nous <a href="mailto:support@name.com">par mail</a></p>
  </div>`;
  let emailTo = document.querySelector('#description a');
  console.log(emailTo);
  emailTo.style.color = "white";
  emailTo.style.textDecoration = "none";
  emailTo.style.fontWeight = "bold";
};