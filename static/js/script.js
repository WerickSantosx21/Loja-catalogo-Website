document.addEventListener("DOMContentLoaded", () => {

    /* ===== CUSTOM CURSOR ===== */
    const cursor = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursor.className = 'cursor';
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorRing);

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animateCursor() {
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top  = ry + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* ===== NAVBAR SCROLL ===== */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    /* ===== MENU ===== */
    const menuBtn  = document.getElementById('menuBtn');
    const menuLat  = document.getElementById('menuLateral');
    const overlay  = document.getElementById('menuOverlay');

    function toggleMenu(state) {
        menuLat?.classList.toggle('ativo', state);
        overlay?.classList.toggle('ativo', state);
        menuBtn?.classList.toggle('open', state);
    }

    menuBtn?.addEventListener('click', () => toggleMenu(!menuLat.classList.contains('ativo')));
    overlay?.addEventListener('click', () => toggleMenu(false));

    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

    /* ===== MEDIA SECTION OBSERVER ===== */
    const mediaSection = document.querySelector('.media-section');
    const grupo1 = document.querySelectorAll('.grupo-1');
    const grupo2 = document.querySelectorAll('.grupo-2');

    if (mediaSection) {
        new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                grupo1.forEach(c => c.classList.add('show'));
                setTimeout(() => grupo2.forEach(c => c.classList.add('show')), 300);
            } else {
                [...grupo1, ...grupo2].forEach(c => c.classList.remove('show'));
            }
        }, { threshold: 0.2 }).observe(mediaSection);
    }

    /* ===== VIDEO HOVER ===== */
    document.querySelectorAll('.media-card').forEach(card => {
        const video = card.querySelector('.card-video');
        if (!video) return;
        card.addEventListener('mouseenter', () => { video.currentTime = 0; video.play().catch(() => {}); });
        card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
    });

    /* ===== ATHLETE CAROUSEL ===== */
    const athletes = [
        {
            sport: 'FÓRMULA 1',
            title: 'Max Verstappen\ndomina a F1',
            desc: 'Max Verstappen domina a F1 com maestria, conquistando títulos e quebrando recordes com agressividade e consistência incomparáveis.',
            image: '/static/img/maxverstappen.jpg',
            num: '01'
        },
        {
            sport: 'FUTEBOL',
            title: 'Neymar Jr.\nmaior artilheiro',
            desc: 'Neymar ultrapassa Pelé e faz história como maior artilheiro da Seleção Brasileira, com dribles e gols inesquecíveis.',
            image: '/static/img/Neymar.jpg',
            num: '02'
        },
        {
            sport: 'ESQUI ALPINO',
            title: 'Lucas Braathen\nsurpreende o mundo',
            desc: 'Brasileiro se destaca nas Olimpíadas de inverno, mostrando talento e determinação em um esporte pouco tradicional para o país.',
            image: '/static/img/lucas.jpg',
            num: '03'
        },
        {
            sport: 'E-SPORTS',
            title: 'Gaules\ndomina a cena',
            desc: 'Um dos maiores nomes do e-sports, Gaules conquista fãs ao redor do mundo com habilidade excepcional e carisma único.',
            image: '/static/img/gaules.jpg',
            num: '04'
        }
    ];

    let cur = 0;
    const elSport  = document.getElementById('athleteSport');
    const elTitle  = document.getElementById('athleteTitle');
    const elDesc   = document.getElementById('athleteDesc');
    const elImg    = document.getElementById('athleteImage');
    const elLink   = document.getElementById('athleteLink');
    const elNum    = document.getElementById('athleteNum');
    const prevBtn  = document.getElementById('prevBtn');
    const nextBtn  = document.getElementById('nextBtn');
    const progress = document.getElementById('progressBar');
    const carousel = document.querySelector('.athlete-carousel');

    if (elTitle && carousel) {
        function updateCarousel(dir) {
            carousel.classList.add('out');
            setTimeout(() => {
                const a = athletes[cur];
                if (elSport)  elSport.textContent  = a.sport;
                if (elTitle)  elTitle.innerHTML    = a.title.replace('\n','<br>');
                if (elDesc)   elDesc.textContent   = a.desc;
                if (elImg)  { elImg.src = a.image; elImg.alt = a.title; }
                if (elLink)   elLink.href = '#';
                if (elNum)    elNum.textContent    = a.num;
                if (progress) progress.style.width = ((cur + 1) / athletes.length * 100) + '%';
                carousel.classList.remove('out');
            }, 420);
        }

        nextBtn?.addEventListener('click', () => { cur = (cur + 1) % athletes.length; updateCarousel(1); });
        prevBtn?.addEventListener('click', () => { cur = (cur - 1 + athletes.length) % athletes.length; updateCarousel(-1); });

        // Auto-advance
        setInterval(() => { cur = (cur + 1) % athletes.length; updateCarousel(1); }, 7000);

        updateCarousel(0);
    }

    /* ===== MANIFESTO WORDS ===== */
    const words = document.querySelectorAll('.manifesto-text .word');
    if (words.length) {
        new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                words.forEach((w, i) => {
                    setTimeout(() => w.classList.add('visible'), i * 80);
                });
            }
        }, { threshold: 0.4 }).observe(document.querySelector('.manifesto-section'));
    }

    /* ===== GSAP SCROLL ANIMATIONS (Races page) ===== */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.tech-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%' },
                y: 50, opacity: 0, duration: 0.7, delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.lineup-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%' },
                y: 60, opacity: 0, duration: 0.8, delay: i * 0.15,
                ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.gallery-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: 'top 90%' },
                scale: 0.95, opacity: 0, duration: 0.7, delay: i * 0.08,
                ease: 'power2.out'
            });
        });

        gsap.from('.motor-visual img', {
            scrollTrigger: { trigger: '.motor-section', start: 'top 70%' },
            rotate: 5, scale: 0.9, opacity: 0, duration: 1.2,
            ease: 'power3.out'
        });
    }

});
