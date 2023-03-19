const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";

const method = id ? "PUT" : "POST";

const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MjBjMWY4MWI0MjAwMTM5YjI3YzUiLCJpYXQiOjE2NzkwNDA3MDUsImV4cCI6MTY4MDI1MDMwNX0._BPCWhG94dOIx4zEgf7S0GmYpDfEV82NWOd7SW4mX6s";

const HEADERS = { headers: { Authorization: `Bearer ${AUTH_KEY}` } };
window.onload = async () => {
  if (id) {
    //  UI POSSO MODIFICARE IL TITOLO (H1) SE ARRIVO CON UN ID
    document.getElementById("delete-btn").classList.remove("d-none");

    try {
      const res = await fetch(URL, HEADERS);
      const product = await res.json();
      const { name, description, brand, imageUrl, price } = product;

      document.getElementById("product-name").value = name;
      document.getElementById("product-description").value = description;
      document.getElementById("product-brand").value = brand;
      document.getElementById("product-image").value = imageUrl;
      document.getElementById("product-price").value = price;

      const submitBtn = document.getElementById("submit-btn");
      submitBtn.classList.remove("btn-primary");
      submitBtn.classList.add("btn-warning");
      submitBtn.innerText = "Modifica Prodotto";
      submitBtn.setAttribute("data-bs-toggle", "modal");
      submitBtn.setAttribute("data-bs-target", "#edit-modal-confirm");
    } catch (err) {
      console.log(err);
    }
  }
};

// INIZIO PARTE RELATIVA ALLA CREAZIONE DI UN NUOVO PRODOTTO
const createProduct = async (event) => {
  event.preventDefault();

  const product = {
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    brand: document.getElementById("product-brand").value,
    imageUrl: document.getElementById("product-image").value,
    price: document.getElementById("product-price").value
  };

  console.log(product);

  try {
    const res = await fetch(URL, {
      method: method,
      body: JSON.stringify(product),
      headers: {
        Authorization: `Bearer ${AUTH_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      const createdProduct = await res.json();
      if (id) {
        console.log(
          "Pronotto # " + createdProduct._id + " modificato con successo"
        );
      } else {
        console.log(
          "Prodotto # " + createdProduct._id + " creato con successo"
        );
      }
    } else {
      throw new Error("C'è qualcosa che non va con la tua richiesta");
    }
  } catch (err) {
    console.log(err);
  }
  // FINE SEZIONE DEDICATA ALLA CREAZIONE DI UN PRODOTTO
};

const deleteProduct = async () => {
  try {
    const res = await fetch(URL, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${AUTH_KEY}` }
    });
    const deletedProduct = await res.json();

    console.log(
      "Prodotto# " + deletedProduct.name + " eliminato correttamente!"
    );
    window.location.assign("index.html");
  } catch (err) {
    console.log(err);
  }
};
