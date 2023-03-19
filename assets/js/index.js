const URL = "https://striveschool-api.herokuapp.com/api/product/";
const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MjBjMWY4MWI0MjAwMTM5YjI3YzUiLCJpYXQiOjE2NzkwNDA3MDUsImV4cCI6MTY4MDI1MDMwNX0._BPCWhG94dOIx4zEgf7S0GmYpDfEV82NWOd7SW4mX6s";
const HEADERS = { headers: { Authorization: `Bearer ${AUTH_KEY}` } };

// QUESTA FUNZIONE MI PERMETTE
const loadProducts = async () => {
  // INCLUDENDO IL MIO CODICE NEL TRY POSSO SUCCESSIVAMENTE GESTIRE EVENTUALI ERRORI GENERATI NEL CATCH
  try {
    // ATTENDO CHE ARRIVI UN OGGETTO DI TIPO resONSE DOPO UNA CHIAMATA AD UN API
    const res = await fetch(URL, HEADERS);
    console.log("resonseObject: ", res);

    // GESTISCO DEI CODICI DI ERRORE SPECIFICI ATTRAVERSO IL THROW CHE VERRANNO POI CATTURATI DAL CATCH
    if (res.status === 400)
      throw new Error("Hai scrtitto male qualcosa! Controlla la tua richiesta");
    if (res.status === 404) throw new Error("Quello che cerchi non è qui!");
    if (!res.ok) throw new Error("Non sappiamo cosa sia ma c'è un problema!");

    // TRASFORMO IL MIO OGGETTO resONSE IN FORMATO JSON IN MODO DA POTERLO UTILIZZARE A MIO PIACIMENTO
    const products = await res.json();

    // CREO DINAMICAMENTE LE CARDS CHE ANDRANNO A CONTENERE I MIEI PRODOTTI
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

      const cardBrand = document.createElement("p");
      cardBrand.className = "card-brand";
      cardBrand.innerText = product.brand;

      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.innerText = product.name;

      const cardDescription = document.createElement("p");
      cardDescription.className = "card-description";
      cardDescription.innerText = product.description;

      const cardPrice = document.createElement("p");
      cardPrice.className = "card-price";
      cardPrice.innerText = `${product.price} €`;

      const cardLink = document.createElement("a");
      cardLink.className = "btn btn-primary";
      cardLink.href = "details.html?id=" + product._id;
      cardLink.innerText = "Scopri di più";

      cardBody.append(
        cardBrand,
        cardTitle,
        cardDescription,
        cardPrice,
        cardLink
      );
      card.append(cardImage, cardBody);
      column.append(card);
      row.append(column);
    });
    console.log(products);
    // QUI (CATCH) GESTISCO GLI EVENTUALI ERRORI GENERATI NEL TRY
  } catch (err) {
    console.log(err.message);
  }
};

// AL CARICAMENTO DELLA PAGINA RICHIAMO LA FUNZIONE DICHIARATA IN PRECEDENZA
window.onload = () => {
  loadProducts();
};
