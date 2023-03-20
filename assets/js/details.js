const URL = "https://striveschool-api.herokuapp.com/api/product/";
const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MjBjMWY4MWI0MjAwMTM5YjI3YzUiLCJpYXQiOjE2NzkwNDA3MDUsImV4cCI6MTY4MDI1MDMwNX0._BPCWhG94dOIx4zEgf7S0GmYpDfEV82NWOd7SW4mX6s";
// OTTENGO L'OGGETTO PARAMS CHE CONTIENE LA STRINGA VISIBILE NELLA BARRA DEGLI INDIRIZI DI QUESTA PAGINA. TALE STRINGA È STATA CREATA NELLA PAGINA INDEX.HTML E CONTIENE ANCHE L'ID DEL PRODOTTO SUL QUALE ABBIAMO CLICCATO PER ARRIVARE SU QUESTA PAGINA SPECIFICA
const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

// Questo solo se volessi accedere ad altre risorse da utilizzare in una fetch successiva
// ovviamente dovrei comporre la stringa nella pagina index.html che comprenda anche questo id in modo da recuperarlo in un secondo momento
// const pexelsId = URLSearchParams(window.location.search).get("PexelsId");

const fetchProducts = async () => {
  const productDetailsContainer = document.getElementById("product-details-container");
  try {
    const res = await fetch(URL + id, {
      headers: {
        Authorization: `Bearer ${AUTH_KEY}`
      }
    });
    const product = await res.json();
    console.log(product);

    const { brand, createdAt, description, imageUrl, name, price, updatedAt, _id } = product;

    const productImage = document.createElement("img");
    productImage.className = "image-fluid w-75";
    productImage.src = imageUrl;

    const productBrand = document.createElement("p");
    productBrand.className = "mt-3 fs-3";
    productBrand.innerText = brand;

    const productName = document.createElement("h1");
    productName.className = "fw-bold";
    productName.innerText = name;

    const productDescription = document.createElement("p");
    productDescription.className = "mb-3";
    productDescription.innerText = description;

    const productPrice = document.createElement("p");
    productPrice.className = "fs-1";
    productPrice.innerText = `${price} €`;

    const serverDetails = document.createElement("h6");
    serverDetails.className = "bg-light p-3 mt-5";
    serverDetails.innerText = "Dettagli del server";

    const serverDetailsList = document.createElement("ul");
    serverDetailsList.className = "list-group list-group-flush mb-5";

    const firstServerDetail = document.createElement("li");
    firstServerDetail.className = "list-group-item ps-2";
    firstServerDetail.innerHTML = `<strong>ID:</strong> ${_id}`;

    const secondServerDetail = document.createElement("li");
    secondServerDetail.className = "list-group-item ps-2";
    secondServerDetail.innerHTML = `<strong>Prodotto Creato il:</strong> ${createdAt}</li>`;

    const thirdServerDetail = document.createElement("li");
    thirdServerDetail.className = "list-group-item ps-2";
    thirdServerDetail.innerHTML = `<strong>Prodotto Modificato il:</strong> ${updatedAt}`;

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning mb-5";
    editBtn.innerText = "Modifica prodotto";
    editBtn.onclick = goToEdit;

    serverDetailsList.append(firstServerDetail, secondServerDetail, thirdServerDetail);
    productDetailsContainer.innerHTML = "";
    productDetailsContainer.append(productImage, productBrand, productName, productDescription, productPrice, serverDetails, serverDetailsList, editBtn);
  } catch (err) {
    console.log(err);
  }
};

window.onload = fetchProducts;

const goToEdit = () => {
  window.location.assign("backoffice.html?id=" + id);
};
