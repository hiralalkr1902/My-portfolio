document.addEventListener('DOMContentLoaded', () => {

    // 1. Typed.js Initialization
    if (document.querySelector('#element')) {
        new Typed('#element', {
            strings: ['HTML, CSS, JavaScript, React, Node.js, SQL and MongoDB.'],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // 2. IntersectionObserver for Smooth Scroll-Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

    // Staggered card animation delay
    document.querySelectorAll('.skillsGrid, .educationGrid, .projectsGrid, .experienceGrid').forEach(grid => {
        Array.from(grid.children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.08}s`;
        });
    });

    // 3. Theme Toggle (VS Code Dark <-> Light)
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Check saved preference or fallback to dark theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'editor-theme-dark';
    body.className = savedTheme;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('editor-theme-dark')) {
                body.classList.replace('editor-theme-dark', 'editor-theme-light');
                localStorage.setItem('portfolio-theme', 'editor-theme-light');
            } else {
                body.classList.replace('editor-theme-light', 'editor-theme-dark');
                localStorage.setItem('portfolio-theme', 'editor-theme-dark');
            }
        });
    }

    // 4. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        });
    }

    // 5. Active Section Scroll Highlighter
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });
});