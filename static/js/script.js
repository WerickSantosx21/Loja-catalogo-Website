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

// Faz os cards aparecerem suavemente conforme o scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.card-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s ease-out';
    observer.observe(card);
});