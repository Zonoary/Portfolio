(function(){
    // Typed Text Effect
    const phrases = ['Développeur Web Full-Stack', 'Expert en Web Scraping', 'Spécialiste Data & PHP', 'Étudiant Master ESIIA'];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;
    const typedEl = document.getElementById('typed-text');
    function typeEffect() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            typedEl.textContent = current.substring(0, charIdx--);
            if (charIdx < 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
        } else {
            typedEl.textContent = current.substring(0, charIdx++);
            if (charIdx > current.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
        }
        setTimeout(typeEffect, isDeleting ? 40 : 80);
    }
    typeEffect();

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('glass');
            navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        } else {
            navbar.classList.remove('glass');
            navbar.style.borderBottom = 'none';
        }
    });

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Scroll animations (fade-in) - Content always visible, adds class for smooth reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                    setTimeout(() => { bar.style.width = bar.dataset.width; }, 300);
                });

                // Animate counters
                entry.target.querySelectorAll('.counter').forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    let current = 0;
                    const increment = target / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) { current = target; clearInterval(timer); }
                        counter.textContent = Math.floor(current) + '+';
                    }, 30);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projectsGrid .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('gradient-bg', 'text-white');
                b.classList.add('glass-light', 'text-dark-300');
            });
            btn.classList.add('gradient-bg', 'text-white');
            btn.classList.remove('glass-light', 'text-dark-300');

            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.classList.add('visible');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const subject = document.getElementById('formSubject').value;
        const message = document.getElementById('formMessage').value;

        if (name && email && subject && message) {
            const mailBody = `Nom: ${name}%0AEmail: ${email}%0ASujet: ${subject}%0A%0A${message}`;
            window.location.href = `mailto:zoonoary01@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailBody}`;
            toastMessage.textContent = 'Ouverture de votre client email...';
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 4000);
            contactForm.reset();
        }
    });

    // Back to top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(16px)';
            backToTop.style.pointerEvents = 'none';
        }
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Particles
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 1;
        particle.style.cssText = `
            width:${size}px;height:${size}px;
            left:${Math.random()*100}%;top:${Math.random()*100}%;
            background:${['#00d4ff','#a855f7','#ec4899','#06b6d4'][Math.floor(Math.random()*4)]};
            opacity:${Math.random()*0.5+0.1};
            animation-delay:${Math.random()*6}s;
            animation-duration:${Math.random()*4+4}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-white');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active', 'text-white');
            }
        });
    });
})();