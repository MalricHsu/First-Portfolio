//等整個 HTML 結構載入完成後，再執行括號內的程式碼
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const checkOutBtn = document.querySelector(".checkout-btn");
  checkOutBtn.addEventListener("click", () => {
    alert("感謝您的購買！");
    localStorage.removeItem("cart");
    //重新載入
    location.reload();
  });
});

//渲染出商品間結帳頁面
function renderCart() {
  const cartList = document.querySelector(".cart-list");
  const totalPriceElement = document.querySelector(".total-price");
  const checkOutBtn = document.querySelector(".checkout-btn");

  //從瀏覽器的localstorage取出有關“cart“的資料或是空值
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  //如果cart目前是空值，就顯示目前購物車沒有東西
  if (cartItems.length === 0) {
    cartList.innerHTML = "<li class='empty-cart'>您的購物車是目前是空的</li>";
    totalPriceElement.textContent = "0.00";
    //結帳按鈕不能使用
    checkOutBtn.disabled = true;
    return;
  }

  //如果cart有東西，我們要先清空購物車的列表畫面，避免重複渲染
  //接下來要使用JS渲染內容
  cartList.innerHTML = "";

  //先宣告總金額為0
  let total = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    //先放一個商品的名稱
    //用bill放入 加減的按鈕＋商品數量＋垃圾桶包起來
    //在加減的按鈕和垃圾桶 加入 data-index ，可區別是索引的第幾個
    //用span 放入 數量＊價格數量

    li.innerHTML = `
      <span class="titleproduct">${item.title}</span>
      <div class="bills">
      <div class="quantity-control">
        <button class="decrease-btn" data-index="${index}">
          <i class="fa-solid fa-minus"></i>
        </button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase-btn" data-index="${index}">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <span class="totals">$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-index="${index}">
        <i class="fa-solid fa-trash"></i>
      </button>
      </div>
    `;

    //把li放入cartlist裡面
    cartList.appendChild(li);
    //把所購買的數量＊價格 在用總total加起來
    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = total.toFixed(2);
  //因為有商品，所以可以按下去購買
  checkOutBtn.disabled = false;

  // 加號按鈕
  document.querySelectorAll(".increase-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      cartItems[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    });
  });

  // 減號按鈕
  document.querySelectorAll(".decrease-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCart();
      }
    });
  });

  // 垃圾桶按鈕
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    });
  });
}
