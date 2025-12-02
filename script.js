// Animation AOS
AOS.init({
    duration: 700,
    offset: 120,
    easing: 'ease-in-out',
    once: true,
});

// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (toggle) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// Newsletter form - Local Storage
const newsletterForm = document.querySelector('#newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = newsletterForm.querySelector('input[type="email"]').value;
        const messageDiv = document.querySelector('#newsletter-message');

        // Validation simple
        if (!email || !email.includes('@')) {
            showMessage(messageDiv, 'Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Récupérer les emails stockés
        let subscribedEmails = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');

        // Vérifier si l'email existe déjà
        if (subscribedEmails.includes(email)) {
            showMessage(messageDiv, 'Vous êtes déjà inscrit à notre newsletter !', 'error');
            return;
        }

        // Ajouter l'email
        subscribedEmails.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribedEmails));

        // Afficher le succès
        showMessage(messageDiv, '✓ Merci ! Vous êtes maintenant inscrit à notre newsletter.', 'success');

        // Réinitialiser le formulaire
        newsletterForm.reset();

        // Masquer le message après 5 secondes
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    });
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `newsletter-message ${type}`;
    element.style.display = 'block';
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});