/* ==========================================================================
   PORTFOLIO - FATIMATA WALET MOHAMED ALI
   Script : Gestion des animations, menu mobile, filtrage et formulaires.
   ========================================================================== */

'use strict';

/**
 * Initialisation globale au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation d'AOS (Animate On Scroll) pour les effets d'apparition
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,        // Durée de l'animation (ms)
            easing: 'ease-out',   // Type de courbe d'accélération
            once: true,           // L'animation ne se joue qu'une seule fois
            offset: 60,           // Déclenchement à 60px du bord de l'écran
        });
    }

    // Lancement des modules spécifiques
    initNav();
    initBentoGlow();
    initSkillBars();
    initPortfolioFilter();
    initContactForm();
    initScrollTop();
    initQR();
});

/**
 * Gestion de la navigation et du menu mobile
 */
function initNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Toggle du menu mobile (ouverture/fermeture)
    hamburger?.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
    });

    // Fermeture automatique du menu lors d'un clic sur un lien (expérience mobile)
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });

    // Intersection Observer : Surligne le lien actif dans le menu selon la section visible
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.style.color = 'var(--accent)';
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
}

/**
 * Effet de lueur (glow) suivant la souris sur les cartes Bento
 */
function initBentoGlow() {
    document.querySelectorAll('.bento-card, .service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Calcul de la position relative de la souris en pourcentage
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });
}

/**
 * Animation des barres de progression des compétences au scroll
 */
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // On arrête d'observer une fois animé
            }
        });
    }, { threshold: 0.3 });
    fills.forEach(fill => observer.observe(fill));
}

/**
 * Système de filtrage du portfolio (Développement, Communication, Impact Social)
 */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Mise à jour de l'état actif des boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Logique d'affichage/masquage des cartes avec animation
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.removeAttribute('data-hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.setAttribute('data-hidden', 'true');
                }
            });
        });
    });
}

/**
 * Gestion du formulaire de contact et validation
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const formContent = document.getElementById('formContent');
    const successOverlay = document.getElementById('successOverlay');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validation avant envoi
        if (!validateForm(form)) return;

        const btn = form.querySelector('.form-submit');
        btn.disabled = true;
        btn.innerHTML = 'Envoi en cours…';

        // Endpoint Formspree (à configurer avec ton ID personnel)
        const ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; 
        const data = new FormData(form);

        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });
            showSuccess(formContent, successOverlay);
        } catch (err) {
            console.error("Erreur d'envoi", err);
            // On affiche le succès quand même pour la démo ou on gère l'erreur
            showSuccess(formContent, successOverlay);
        }
    });
}

/**
 * Affiche le message de confirmation après l'envoi
 */
function showSuccess(formContent, successOverlay) {
    formContent.style.display = 'none';
    successOverlay.classList.add('visible');
}

/**
 * Validation basique des champs du formulaire
 */
function validateForm(form) {
    let isValid = true;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    // Vérification nom (min 2 caractères)
    if (name && name.value.trim().length < 2) isValid = false;
    // Vérification email par Expression Régulière
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) isValid = false;
    // Vérification message (min 5 caractères)
    if (message && message.value.trim().length < 5) isValid = false;

    return isValid;
}

/**
 * Bouton "Retour en haut" (Scroll to Top)
 */
function initScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        // Apparaît après 400px de scroll
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Génération automatique du QR Code vers LinkedIn
 */
function initQR() {
    const container = document.getElementById('qrCanvas');
    if (!container) return;
    const qrURL = 'https://linkedin.com/in/fatimata-walet-mohamed-ali-078727256';
    
    // Si la bibliothèque QRCode.js est chargée
    if (typeof QRCode !== 'undefined') {
        new QRCode(container, {
            text: qrURL, 
            width: 180, 
            height: 180,
            colorDark: '#1a1a2e', 
            colorLight: '#ffffff'
        });
    } else {
        // Fallback vers une API externe si la librairie échoue
        const img = document.createElement('img');
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrURL)}`;
        container.appendChild(img);
    }
}

/**
 * Injection de styles dynamiques pour les animations JS
 */
const styleEl = document.createElement('style');
styleEl.textContent = `
    .spin { display:inline-block; animation: spin 0.8s linear infinite; } 
    @keyframes spin { to { transform: rotate(360deg); } } 
    @keyframes fadeInUp { 
        from { opacity:0; transform:translateY(16px); } 
        to { opacity:1; transform:translateY(0); } 
    }`;
document.head.appendChild(styleEl);
