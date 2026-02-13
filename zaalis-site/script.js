// --- 1. INITIALIZATION ---

// Initial Render - Optimize to prevent CLS
window.addEventListener('DOMContentLoaded', () => {
    // Initialize icons
    lucide.createIcons();

    // Initialize Observers for Animations
    setupObservers();
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
