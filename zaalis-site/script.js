// --- 1. ROUTER LOGIC ---
// Simulates multi-page behavior within a single file

const appRoot = document.getElementById('app-root');
const templates = {
    'home': document.getElementById('tpl-home'),
    'blockchain': document.getElementById('tpl-blockchain'),
    'logistique': document.getElementById('tpl-logistique'),
    'contact': document.getElementById('tpl-contact')
};

function renderPage() {
    // Get hash or default to home
    let hash = window.location.hash.slice(1) || 'home';

    // Validate hash
    if (!templates[hash]) hash = 'home';

    // Update Active Link in Nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('active');
        }
    });

    // Render Content
    appRoot.innerHTML = '';
    const clone = templates[hash].content.cloneNode(true);
    appRoot.appendChild(clone);

    // Re-initialize Lucide Icons
    lucide.createIcons();

    // Re-initialize Observers for Animations
    setupObservers();

    // Scroll to top
    window.scrollTo(0, 0);

    // Mobile menu close smoothly
    const menu = document.getElementById('burgerMenu');
    const btn = document.getElementById('burgerBtn');
    if (menu) menu.classList.remove('show');
    if (btn) btn.classList.remove('active');
}

// Listen for hash changes
window.addEventListener('hashchange', renderPage);

// Initial Render
window.addEventListener('DOMContentLoaded', () => {
    renderPage();
    lucide.createIcons();
});


// --- 2. ANIMATION OBSERVERS ---
function setupObservers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}


// --- 3. UI INTERACTIONS ---

// Navbar Scroll Effect
// Navbar Scroll Effect - Removed as CSS handles fixed positioning and glass style.
// window.addEventListener('scroll', ...);
// window.addEventListener('DOMContentLoaded', ...);

// Mobile Menu Toggle (Final Burger Version)
const btn = document.getElementById('burgerBtn');
const menu = document.getElementById('burgerMenu');

if (btn && menu) {
    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const iconWrapper = btn;
        const isVisible = menu.classList.contains('show');

        if (isVisible) {
            menu.classList.remove('show');
            iconWrapper.classList.remove('active');
        } else {
            menu.classList.add('show');
            iconWrapper.classList.add('active');
        }
    });

    // Close menu when clicking links
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            btn.classList.remove('active');
        });
    });

    // Prevent propagation inside menu
    menu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            btn.classList.remove('active');
        }
    });
}
