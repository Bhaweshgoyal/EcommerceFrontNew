// const RemoveBtn = document.getElementsById("RemoveBtn");
// ?Events

// RemoveBtn.addEventListener("click", RemoveItem)

const orderDetails = document.getElementById("orderDetails");
const priceDetails = document.getElementById("priceDetails");
console.log();
async function RemoveItem() {
  let token = localStorage.getItem("token");
  console.log(token);
  await fetch(BASE_URL + "/removeProduct", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
}

function loadOrderDetails() {
  const cartId = localStorage.getItem("cartId");

  const URI = `/getAllOrdersProduct?orderID=${cartId}`;

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  fetch(BASE_URL + URI, {
    method: "GET", // or 'PUT'
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      renderOrderDetails(data.data);
      // renderProductDetails(data.data)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function renderOrderDetails(data) {
  let orderDetailsHtml =
    '<div class="order-details-title fw-bold">Order Details</div>';
  var ProductDetails = {
    cost: 0,
  };
  for (i = 0; i < data.length; i++) {
    let Name = [];
    // var cost = 0 ;
    await fetch(BASE_URL + `/Product/getProduct/${data[i].productId}`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          ProductDetails.id = data.data[0].id;
          //   ProductDetails.rate = data.data[0].cost;
          Name.push(data.data[0].name);
          ProductDetails.cost = data.data[0].cost;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    //   console.log(ProductDetails.id)
    orderDetailsHtml +=
      '<div class="order-details-product d-flex flex-row">' +
      '<div class="order-details-product-img d-flex">' +
      '<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg">' +
      "</div>" +
      '<div class="order-details-product-data d-flex flex-column">' +
      "<div>" +
      Name[0] +
      "</div>" +
      //   + '<div>&#8377; ' + ProductDetails.rate + '</div>'
      "</div>" +
    //   '<div class="order-details-product-actions d-flex flex-column">' +
    //   `<div class="order-details-product-remove btn btn-info RemoveBtn" id = ${ProductDetails.id} name = ${Name[0]} >
    //   Remove
    //   </div>` +
    //   "</div>" +
      "</div>";
  }

  let priceDetailsHtml =
    '<div class="price-details-title fw-bold">Price Details</div>' +
    '<div class="price-details-data">' +
    '<div class="price-details-item d-flex flex-row justify-content-between">' +
    "<div>Price</div>" +
    "<div>&#8377; " +
    ProductDetails.cost +
    "</div>" +
    "</div>" +
    '<div class="price-details-item d-flex flex-row justify-content-between">' +
    "<div>Discount</div>" +
    "<div>&#8377; 0</div>" +
    "</div>" +
    '<div class="price-details-item d-flex flex-row justify-content-between">' +
    "<div>Delivery Charges</div>" +
    "<div>FREE</div>" +
    "</div>" +
    '<div class="price-details-item d-flex flex-row justify-content-between">' +
    "<div>Total</div>" +
    "<div>&#8377; " +
    ProductDetails.cost +
    "</div>" +
    "</div>" +
    "</div>";

  orderDetails.innerHTML = orderDetailsHtml;
  priceDetails.innerHTML = priceDetailsHtml;
}

loadOrderDetails();
