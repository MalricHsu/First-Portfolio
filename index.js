const buttons = document.querySelectorAll(".tab-button");
const infos = document.querySelectorAll(".tab-content");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;

    buttons.forEach((b) => {
      b.classList.remove("live");
    });
    infos.forEach((i) => {
      i.classList.remove("live");
    });

    button.classList.add("live");

    const activeInfo = document.querySelector(
      `.tab-content[data-tab="${tabId}"]`
    );
    activeInfo.classList.add("live");
  });
});
buttons[0].classList.add("live");
infos[0].classList.add("live");
