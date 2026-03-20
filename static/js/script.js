const botao = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu-lateral");

botao.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});

if (menu.classList.contains("ativo")) {
    botao.textContent = "✖";
} else {
    botao.textContent = "☰";
}