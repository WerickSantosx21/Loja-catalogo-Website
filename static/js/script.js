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

// plugin de deslize
gsap.registerPlugin(ScrollTrigger);

// Animação da Imagem do Motor (Zoom e Fade)
gsap.from(".motor-img-box img", {
    scrollTrigger: { 
        trigger: ".motor-img-box", 
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
    },
    scale: 0.5,
    opacity: 0,
    duration: 1.5
});

// Registrar o plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Animação da Coluna de Estatísticas (Esquerda)
gsap.from(".col-stats .stat-item", {
    scrollTrigger: {
        trigger: ".ficha-tecnica-container",
        start: "top 80%", // Ativa quando o topo da seção chega em 80% da tela
    },
    x: -100,          // Vem de 100px da esquerda
    opacity: 0,
    duration: 1,
    stagger: 0.2,     // Um item aparece depois do outro
    ease: "power2.out"
});

// 2. Animação do Motor (Centro - Efeito de Zoom)
gsap.from(".motor-img-box img", {
    scrollTrigger: {
        trigger: ".ficha-tecnica-container",
        start: "top 75%",
    },
    scale: 0.7,       // Começa menor
    opacity: 0,
    duration: 1.5,
    ease: "back.out(1.7)" // Dá um leve efeito de "mola" no final
});

// 3. Animação da Coluna de Informações (Direita)
gsap.from(".info-col h3, .info-col p", {
    scrollTrigger: {
        trigger: ".ficha-tecnica-container",
        start: "top 80%",
    },
    x: 100,           // Vem de 100px da direita
    opacity: 0,
    duration: 1,
    stagger: 0.1,     // Efeito cascata nos textos
    ease: "power2.out"
});

// 4. BÔNUS: Efeito de Parallax Suave no Motor
// Enquanto o usuário scrola a seção, o motor se move levemente
gsap.to(".motor-img-box img", {
    scrollTrigger: {
        trigger: ".ficha-tecnica-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: -30 // Move 30px para cima acompanhando o scroll
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 }); // Começa a animação quando 10% do elemento está visível

// Seleciona e observa os cards de especificações
const specCards = document.querySelectorAll('.spec-card');
specCards.forEach((card) => observer.observe(card));

// Seleciona e observa a imagem de design
const designImage = document.querySelector('.design-image');
observer.observe(designImage);

// Seleciona e observa as imagens da galeria
const galleryImages = document.querySelectorAll('.gallery-image');
galleryImages.forEach((image) => observer.observe(image));