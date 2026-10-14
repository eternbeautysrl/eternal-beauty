document.addEventListener('DOMContentLoaded', () => {
    // MENIU PENTRU TELEFON ȘI TABLETĂ
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');

            menuBtn.setAttribute('aria-expanded', String(isOpen));
            menuBtn.setAttribute(
                'aria-label',
                isOpen ? 'Închide meniul' : 'Deschide meniul'
            );

            menuBtn.textContent = isOpen ? '✕' : '☰';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', 'Deschide meniul');
                menuBtn.textContent = '☰';
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                navLinks.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.textContent = '☰';
            }
        });
    }

    // ANIMAȚII LA DERULARE
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // EVIDENȚIAZĂ PAGINA CURENTĂ ÎN MENIU
    const currentPage = (
        window.location.pathname.split('/').pop() || 'index.html'
    ).toLowerCase();

    document.querySelectorAll('[data-page]').forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // PREIA PRODUSUL SELECTAT DIN URL
    const params = new URLSearchParams(window.location.search);
    const selectedProduct = params.get('produs');
    const productField = document.getElementById('produsSelect');

    if (selectedProduct && productField) {
        productField.value = selectedProduct;
    }

    // ANUL CURENT ÎN SUBSOL
    document.querySelectorAll('[data-year]').forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // MESAJ DE CONFIRMARE PENTRU FORMULAR
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            formMessage.textContent =
                'Formularul a fost completat. Pentru trimiterea reală a mesajului trebuie conectat un serviciu de email sau un backend.';

            formMessage.classList.remove('hidden');
        });
    }
});