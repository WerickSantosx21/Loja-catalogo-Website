document.addEventListener("DOMContentLoaded", () => {
    const botao = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu-lateral");

    if (botao && menu) {
        botao.addEventListener("click", () => {
            menu.classList.toggle("ativo");
            botao.textContent = menu.classList.contains("ativo") ? "✖" : "☰";
        });
    }

    const car = document.querySelector(".car-image");
    const text = document.querySelector(".text-container");

    if (car && text) {
        const carObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    car.classList.add("show");
                    text.classList.add("show");
                } else {
                    car.classList.remove("show");
                    text.classList.remove("show");
                }
            });
        }, { threshold: 0.3 });

        carObserver.observe(car);
    }

    const mediaSection = document.querySelector(".media-section");
    const grupo1 = document.querySelectorAll(".grupo-1");
    const grupo2 = document.querySelectorAll(".grupo-2");

    if (mediaSection) {
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    grupo1.forEach(card => card.classList.add("show"));

                    setTimeout(() => {
                        grupo2.forEach(card => card.classList.add("show"));
                    }, 350);
                }
            });
        }, { threshold: 0.25 });

        cardsObserver.observe(mediaSection);
    }
});