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
    const productData = await resp.json();

    const { _id, name, description, brand, imageUrl, price } = productData;

    const document.createElement("div");
  } catch (err) {
    console.log(err);
  }
};

const goToEdit = () => {
  window.location.assign("backoffice.html?id=" + id);
};
