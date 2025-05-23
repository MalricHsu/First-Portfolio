const productList = document.querySelector(".product-list");

//將商品顯示出來
async function fetchProduct() {
  try {
    //取的fakestoreAPI
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    //取出只要18項商品
    const wantData = data.slice(0, 18);
    //從瀏覽器的localStorage裡面取出“favorites“有關的資料，如果沒有傳空值
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    //再把每一項都列出來
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
    //抓取錯誤
  } catch (error) {
    console.log("無法取得商品", error);
    productList.innerHTML = `<p style="color:red">載入商品失敗，請稍後再試。</p>`;
  }
}

fetchProduct();

//已加入到購物車
async function addToCart(productId) {
  try {
    //API裡面取出商品資料
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await res.json();

    //從瀏覽器的localStorage裡面取出“cart“有關的資料，如果沒有傳空值
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 檢查商品是否已經存在購物車
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    //如果已存在，數量＋1
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
      //如果不存在，新增商品，並設定數量為1
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    //儲存到瀏覽器的localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`「${product.title}」已加入購物車！`);
  } catch (err) {
    console.error("加入購物車失敗", err);
  }
}

//點擊按鈕後切換商品是否為收藏
function toggleFavorite(productId, btn) {
  //從瀏覽器的localStorage取出目前“favorites“有關的資料，如果沒有傳空值
  let currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  //如果有已經有收藏，點下去就移除，如果沒有點收藏，就新增
  if (currentFavorites.includes(productId)) {
    currentFavorites = currentFavorites.filter((id) => id !== productId);
    btn.textContent = "🤍";
  } else {
    currentFavorites.push(productId);
    btn.textContent = "❤️";
  }

  localStorage.setItem("favorites", JSON.stringify(currentFavorites));
}
