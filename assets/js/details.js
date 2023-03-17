const URL = "https://striveschool-api.herokuapp.com/api/product/";
const authKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MjBjMWY4MWI0MjAwMTM5YjI3YzUiLCJpYXQiOjE2NzkwNDA3MDUsImV4cCI6MTY4MDI1MDMwNX0._BPCWhG94dOIx4zEgf7S0GmYpDfEV82NWOd7SW4mX6s";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");
console.log("SELECTED ID: ", id);

window.onload = async () => {
  const productDetails = document.getElementById("product-details");
  try {
    const resp = await fetch(URL + id);
    const product = await resp.json();

    const id = product._id;
    const name = product.name;
    const description = product.description;
    const brand = product.brand;
    const imageUrl = product.imageUrl;
    const price = product.price;

    const card = document.createElement("div");
    card.className = "card";

    const cardImage = document.createElement("img");
    cardImage.className = "card-img-top";
    cardImage.setAttribute("src", product.imageUrl);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = product.name;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerText = product.description;

    const cardLink = document.createElement("a");
    cardLink.className = "btn btn-primary";
    cardImage.setAttribute("href", `details.html?id=${product._id}`);
    cardLink.innerText = "Visualizza Prodotto";

    cardBody.append(cardTitle, cardText, cardLink);
    card.append(cardImage, cardBody);
    productDetails.append(card);
  } catch (err) {
    console.log(err);
  }
};

const goToEdit = () => {
  window.location.assign("backoffice.html?id=" + id);
};
