const productList = document.getElementById("product-list");

async function fetchProduct() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    const wantData = data.slice(0, 15);
    wantData.forEach((product) => {
      const card = document.createElement("div");
      card.setAttribute("class", "product-card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">加入購物車</button>
      `;
      productList.appendChild(card);
    });
  } catch (error) {
    console.log("無法取得商品", error);
    productList.innerHTML = "<p>載入商品失敗，請稍後再試。</p>";
  }
}

fetchProduct();
function addToCart(productId) {
  alert(`你按了商品 ID ${productId} 的「加入購物車」`);
}
