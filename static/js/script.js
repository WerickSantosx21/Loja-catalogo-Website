const botao = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu-lateral");

botao.addEventListener("click", () => {
    menu.classList.toggle("ativo");

    // A lógica de trocar o texto tem que estar aqui dentro!
    if (menu.classList.contains("ativo")) {
        botao.textContent = "✖";
    } else {
        botao.textContent = "☰";
    }


export default function Navbar() {
    return (
        <div class="menu-lateral">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/Races">Races</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</div>
    )
}
});