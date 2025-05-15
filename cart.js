document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const checkOutBtn = document.querySelector(".checkout-btn");
  checkOutBtn.addEventListener("click", () => {
    alert("感謝您的購買！");
    localStorage.removeItem("cart");
    location.reload();
  });
});

function renderCart() {
  const cartList = document.querySelector(".cart-list");
  const totalPriceElement = document.querySelector(".total-price");
  const checkOutBtn = document.querySelector(".checkout-btn");

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
    cartList.innerHTML =
      "<li class='empty-cart' style='font-size:20px ;font-weight:500'>購物車是空的</li>";
    totalPriceElement.textContent = "0.00";
    checkOutBtn.disabled = true;
    return;
  }

  cartList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <span class="titleproduct">${item.title}</span>
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
    `;

    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = total.toFixed(2);
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
