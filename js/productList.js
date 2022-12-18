const categoryList = document.getElementById("categoryList");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const clear = document.getElementById("clear");

function loadCategories() {
  fetch(BASE_URL + "/categories", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      renderCategories(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function loadProducts() {
  let URI = `/Product/getallProduct`;

  const data = {};

  if (window.location.search.includes("?")) {
    let categoryIdElement = window.location.search.split("=");
    data.id = categoryIdElement[1];

    URI = `/Product/getallProduct/${data.id}`;
  }

  fetch(BASE_URL + URI, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      renderProducts(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function renderCategories(categories) {
  let categoryListHtml = "";
  for (i = 0; i < categories.length; i++) {
    categoryListHtml +=
      '<a class="d-flex text-decoration-none" href="productList.html?categoryId=' +
      categories[i].id +
      '">' +
      categories[i].name +
      "</a>";
  }

  categoryList.innerHTML = categoryListHtml;
}

function renderProducts(products) {
  let productListHtml = "";
  for (i = 0; i < products.length; i++) {
    productListHtml +=
      '<a class="product-item text-decoration-none d-inline-block" href="productDetails.html?productId=' +
      products[i].id +
      '">' +
      '<div class="product-img">' +
      '<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg">' +
      "</div>" +
      '<div class="product-name text-center">' +
      products[i].name +
      "</div>" +
      '<div class="product-price text-center">&#8377; ' +
      products[i].cost +
      "</div>" +
      "</a>";
  }

  productList.innerHTML = productListHtml;
}

loadCategories();
loadProducts();

function searchProduct(e) {
  const data = {
    name: searchInput.value,
    min: minPrice.value,
    max: maxPrice.value,
  };
  //   console.log(data.name)
  // if(data.name == "" ){
  let URI = "/Product/between";
  fetch(BASE_URL + URI, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      renderProducts(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
//   }
if(!data.name == ""){
    URI = `/Product/getallProductByName/${data.name}`;
    fetch(BASE_URL + URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        renderProducts(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}
  //   let URI = "/products?";
  //   new URLSearchParams(data)
}

function clearAllFilter(e) {
  window.location.href = "productList.html";
}
searchInput.addEventListener("keyup", searchProduct);
minPrice.addEventListener("change", searchProduct);
maxPrice.addEventListener("change", searchProduct);
clear.addEventListener("click", clearAllFilter);
