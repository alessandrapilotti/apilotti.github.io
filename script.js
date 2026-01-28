/* --- NAVIGAZIONE --- */
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
        
        window.scrollTo({
            top: 0,
            behavior: 'instant' 
        });
    }
}

/* --- MENU MOBILE --- */
function toggleMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

/* --- ANIMAZIONE NUMERI ACHIEVEMENT --- */
const counters = document.querySelectorAll('.number');
const counterSpeed = 100;

const startCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / counterSpeed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(counter); 
        }
    });
};

const counterObserver = new IntersectionObserver(startCounter, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

/* --- SCROLL GALLERIA --- */
function scrollSlider(direction) {
    const slider = document.getElementById('mainSlider');
    if (slider) {
        const card = slider.querySelector('.custom-card');
        if (card) {
            const cardWidth = card.offsetWidth + 25; 
            slider.scrollBy({
                left: direction * cardWidth,
                behavior: 'smooth'
            });
        }
    }
}

/* --- GESTIONE COOKIES --- */
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    
    // Mostra il banner solo se non c'è già un consenso salvato
    if (banner) {
        const hasConsent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
        if (!hasConsent) {
            banner.style.display = 'block';
        }
    }
});

function acceptCookies() {
    const banner = document.getElementById('cookie-banner');
    document.cookie = "cookie_consent=true; max-age=" + (60 * 60 * 24 * 365) + "; path=/; SameSite=Lax";
    if (banner) banner.style.display = 'none';
    alert("Hai accettato i cookie.");
}

function rejectCookies() {
    const banner = document.getElementById('cookie-banner');
    document.cookie = "cookie_consent=false; path=/; SameSite=Lax";
    if (banner) banner.style.display = 'none';
    alert("Hai rifiutato i cookie.");
}