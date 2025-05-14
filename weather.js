document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const weather = document.querySelector(".weather");

  // 如果沒輸入城市名稱，顯示錯誤並隱藏 weather 區塊
  if (!city) {
    alert("請輸入城市名稱");
    return;
  }

  const apiKey = config.apiKey;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&lang=zh_tw&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (res.status >= 400) {
      throw new Error("無法取得資料，請檢查城市名稱");
    }
    const data = await res.json();

    // 取出天氣的 icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // 取出需要顯示的資料
    const weatherHTML = `
  <h2>${data.name} 的天氣</h2>
  <img src="${iconUrl}" alt="天氣圖示">
  <div class="weather-info">
  <p>天氣狀況：${data.weather[0].description}</p>
<p>氣溫：${data.main.temp.toFixed(1)}°C</p>
  <p>濕度：${data.main.humidity}%</p>
  </div>
`;

    // 顯示天氣資料
    weather.innerHTML = weatherHTML;
    weather.classList.remove("hidden"); // 查詢成功後顯示 #weather
  } catch (err) {
    console.log(err);
    weather.classList.remove("hidden");
    weather.innerHTML = `<p style="color:red; font-weight:700">${err.message}</p>`;
  }
});
