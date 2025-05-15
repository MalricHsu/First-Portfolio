const productList = document.querySelector(".product-list");

async function fetchProduct() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    const wantData = data.slice(0, 15);
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    wantData.forEach((product) => {
      const card = document.createElement("div");
      card.setAttribute("class", "product-card");

      const isFavorited = savedFavorites.includes(product.id);
      const favoriteIcon = isFavorited ? "❤️" : "🤍";

      card.innerHTML = `
        <button class="favorite-btn" onclick="toggleFavorite(${product.id}, this)">${favoriteIcon}</button>
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <div class="pricebtn">
          <p>＄${product.price}</p>
          <div class="allbutton">
            <button class="buy" onclick="addToCart(${product.id})">加入購物車</button>
          </div>
        </div>
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
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // 檢查是否已經存在這個商品
      const existingIndex = cart.findIndex((item) => item.id === product.id);

      if (existingIndex !== -1) {
        // 已存在 → 數量 +1
        cart[existingIndex].quantity += 1;
      } else {
        // 不存在 → 新增商品，設定數量為 1
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`「${product.title}」已加入購物車！`);
    })
    .catch((err) => {
      console.error("加入購物車失敗", err);
    });
}

//存回本地
localStorage.setItem("cart", JSON.stringify(cart));
alert(`「${productTitle}」已加入購物車！`);

function toggleFavorite(productId, btn) {
  let currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (currentFavorites.includes(productId)) {
    currentFavorites = currentFavorites.filter((id) => id !== productId);
    btn.textContent = "🤍";
  } else {
    currentFavorites.push(productId);
    btn.textContent = "❤️";
  }

  localStorage.setItem("favorites", JSON.stringify(currentFavorites));
}
