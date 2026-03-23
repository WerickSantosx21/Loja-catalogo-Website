document.addEventListener("DOMContentLoaded", () => {
    const botao = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu-lateral");

    if (botao && menu) {
        botao.addEventListener("click", () => {
            // Liga/Desliga a classe 'ativo' no menu
            menu.classList.toggle("ativo");

            // Troca o ícone dependendo se o menu está aberto ou não
            if (menu.classList.contains("ativo")) {
                botao.textContent = "✖";
            } else {
                botao.textContent = "☰";
            }
        });
    } else {
        console.error("Botão ou Menu não encontrados! Verifique as classes no HTML.");
    }
});