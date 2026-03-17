// Navigation & Mobile Menu Components
const hamburger = document.querySelector('.hamburger');
const mobileClose = document.querySelector('.mobile-close');
const navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');

const toggleMenu = () => {
    if (!navLinks) return;
    navLinks.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
    
    // Lock/Unlock scroll
    if (navLinks.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
};

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Certificate Modal Logic
const modal = document.getElementById('certModal');
const certViewer = document.getElementById('certViewer');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

if (modal) {
    // Open modal on certificate link click
    document.querySelectorAll('.cert-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfUrl = link.getAttribute('href');
            // Get the name from the sibling h3
            const certName = link.previousElementSibling ? link.previousElementSibling.innerText : "Certificate";
            
            if (modalTitle) modalTitle.innerText = certName;
            if (certViewer) certViewer.src = pdfUrl;
            modal.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal function
    const closeModal = () => {
        modal.classList.remove('active');
        if (certViewer) certViewer.src = ""; // Stop PDF from playing/loading
        body.style.overflow = 'auto';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
