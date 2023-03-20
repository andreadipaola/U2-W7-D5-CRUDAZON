const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const URL = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";

const method = id ? "PUT" : "POST";

const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MjBjMWY4MWI0MjAwMTM5YjI3YzUiLCJpYXQiOjE2NzkwNDA3MDUsImV4cCI6MTY4MDI1MDMwNX0._BPCWhG94dOIx4zEgf7S0GmYpDfEV82NWOd7SW4mX6s";

const HEADERS = { headers: { Authorization: `Bearer ${AUTH_KEY}` } };

const productForm = document.getElementById("product-form");
const alert = document.getElementById("alert");

window.onload = async () => {
  if (id) {
    const backofficeMode = document.getElementById("backoffice-mode");
    backofficeMode.classList.add("bg-warning");
    backofficeMode.classList.add("text-black");
    backofficeMode.innerText = "Modalità Modifica";
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
      // submitBtn.setAttribute("data-bs-toggle", "modal");
      // submitBtn.setAttribute("data-bs-target", "#edit-modal-confirm");
    } catch (err) {
      console.log(err);
    }
  }
};

// INIZIO PARTE RELATIVA ALLA CREAZIONE/MODIFICA DI UN NUOVO PRODOTTO
const createProduct = async (event) => {
  event.preventDefault();

  const product = {
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    brand: document.getElementById("product-brand").value,
    imageUrl: document.getElementById("product-image").value,
    price: document.getElementById("product-price").value
  };

  // console.log(product);

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
        alert.classList.remove("d-none");
        alert.classList.add("alert-warning");
        alert.innerText = "Prodotto modificato con successo!";
        console.log("Prodotto # " + createdProduct._id + " modificato con successo");
        setTimeout(() => {
          // productForm.classList.remove("was-validated");
          alert.classList.add("d-none");
        }, 3000);
      } else {
        alert.classList.remove("d-none");
        console.log("Prodotto # " + createdProduct._id + " creato con successo");
        setTimeout(() => {
          productForm.classList.remove("was-validated");
          productForm.reset();
          alert.classList.add("d-none");
        }, 3000);
      }
    } else {
      throw new Error("C'è qualcosa che non va con la tua richiesta");
    }
  } catch (err) {
    console.log(err);
  }
  // FINE SEZIONE DEDICATA ALLA CREAZIONE/MODIFICA DI UN PRODOTTO
};

const deleteProduct = async () => {
  try {
    const res = await fetch(URL, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${AUTH_KEY}` }
    });
    const deletedProduct = await res.json();

    console.log("Prodotto# " + deletedProduct.name + " eliminato correttamente!");
    window.location.assign("index.html");
  } catch (err) {
    console.log(err);
  }
};

function checkForm() {
  // SELEZIONO ELEMENTI DEL MODALE
  const resetModalHeader = document.getElementById("reset-modal-header");
  const resetModalBody = document.getElementById("reset-modal-body");
  const resetModalConfirmBtn = document.getElementById("reset-modal-confirm-btn");
  // CONTROLLO SE I CAMPI DEL FORM SONO VUOTI
  let isEmpty = null;
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value ? (isEmpty = false) : (isEmpty = true)));
  const textArea = document.querySelector("textarea");
  // MODIFICO IL MODALE IN BASE ALLA CONDIZONE CHE HO
  if (!textArea.value && isEmpty) {
    resetModalHeader.innerText = "Attenzione!";
    resetModalBody.innerText = "I campi sono già vuoti!!";
    resetModalConfirmBtn.classList.add("d-none");
  } else {
    resetModalHeader.innerText = "Conferma!";
    resetModalBody.innerText = "Sei sicuro di voler cancellare i campi?";
    resetModalConfirmBtn.classList.remove("d-none");
  }
}

function deleteForm() {
  document.getElementById("product-form").reset();
}
