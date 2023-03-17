const URL = "https://striveschool-api.herokuapp.com/api/product/";
const authKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MjBjMWY4MWI0MjAwMTM5YjI3YzUiLCJpYXQiOjE2NzkwNDA3MDUsImV4cCI6MTY4MDI1MDMwNX0._BPCWhG94dOIx4zEgf7S0GmYpDfEV82NWOd7SW4mX6s";

const loadProducts = async () => {
  try {
    const res = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${authKey}`
      }
    });
    console.log("res", res);

    if (res.status === 400)
      throw new Error("Hai scrtitto male qualcosa! Controlla la tua richiesta");
    if (res.status === 404) throw new Error("Quello che cerchi non è qui!");
    if (!res.ok) throw new Error("Non sappiamo cosa sia ma c'è un problema!");

    const products = await res.json();
    const row = document.querySelector("#row");
    console.log(row);
    products.forEach((product) => {
      const column = document.createElement("div");
      column.className = "col-md-4";

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
      cardLink.href = "details.html?id=" + product._id;
      cardLink.innerText = "Visualizza Prodotto";

      cardBody.append(cardTitle, cardText, cardLink);
      card.append(cardImage, cardBody);
      column.append(card);
      row.append(column);
    });
    console.log(products);
  } catch (err) {
    console.log(err.message);
  }
};

window.onload = () => {
  loadProducts();
};
