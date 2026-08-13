// ==================== NAVIGATION & MENU TOGGLE ====================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ====================
navItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = '';
            setTimeout(() => {
                entry.target.style.opacity = '1';
            }, 10);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe fade-in elements
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(element => {
    observer.observe(element);
});

// ==================== BUTTON INTERACTIONS ====================
// "Read More" button interaction
const readMoreBtn = document.getElementById('readMoreBtn');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        alert('📚 Learn more about our school\'s comprehensive education programs and commitment to excellence!');
        readMoreBtn.classList.add('pulse');
        setTimeout(() => readMoreBtn.classList.remove('pulse'), 600);
    });
}

// "View Program" / "Learn More" buttons
const actionButtons = document.querySelectorAll('.card .btn-small');
actionButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cardTitle = btn.closest('.card').querySelector('h3').textContent;
        showNotification(`🎯 You selected: ${cardTitle}`, 'success');
        
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    });
});

// ==================== IMAGE SLIDER ====================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const sliderButtons = document.querySelectorAll('.slider-btn');

let currentSlideIndex = 0;
let sliderInterval;

function showSlide(index) {
    if (!slides.length) return;

    currentSlideIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

function startSlider() {
    if (!slides.length) return;

    clearInterval(sliderInterval);
    sliderInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 3500);
}

sliderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const direction = Number(button.dataset.direction || 1);
        showSlide(currentSlideIndex + direction);
        startSlider();
    });
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = Number(dot.dataset.index || 0);
        showSlide(index);
        startSlider();
    });
});

if (slides.length) {
    showSlide(currentSlideIndex);
    startSlider();
}

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            const name = contactForm.querySelector('input[type="text"]').value;
            showNotification(`✅ Thank you ${name}! Your message has been sent.`, 'success');
            contactForm.reset();
            
            // Reset border colors
            inputs.forEach(input => {
                input.style.borderColor = '#ddd';
            });
        } else {
            showNotification('❌ Please fill in all fields!', 'error');
        }
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Alt + H = Go to Home
    if (e.altKey && e.key === 'h') {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + C = Go to Contact
    if (e.altKey && e.key === 'c') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== CARD HOVER EFFECTS ====================
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        const cardImage = card.querySelector('.image-placeholder');
        if (cardImage) {
            cardImage.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        const cardImage = card.querySelector('.image-placeholder');
        if (cardImage) {
            cardImage.style.transform = 'scale(1)';
        }
    });
});

// ==================== SCROLL ANIMATIONS FOR CARDS ====================
const cardImage = document.querySelectorAll('.card-image');
cardImage.forEach(img => {
    img.style.transition = 'transform 0.3s ease';
});

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
            link.style.color = '#3498db';
        } else {
            link.style.color = 'white';
        }
    });
});

// ==================== ADD PULSE ANIMATION ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .pulse {
        animation: pulse 0.6s ease-in-out;
    }
    
    .nav-links a.active {
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ==================== INTERACTIVE LOGO ====================
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    logo.style.cursor = 'pointer';
}

// ==================== DOUBLE-CLICK TO MAXIMIZE ====================
const cards2 = document.querySelectorAll('.card');
cards2.forEach(card => {
    card.addEventListener('dblclick', () => {
        card.style.transform = 'scale(1.1)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
        }, 200);
    });
});

// ==================== CONSOLE GREETING ====================
console.log('%c🎓 Welcome to Iyunga Secondary School!', 'font-size: 20px; color: #3498db; font-weight: bold;');
console.log('%cInteractive features enabled:', 'font-size: 14px; color: #27ae60; font-weight: bold;');
console.log('✓ Smooth scrolling navigation');
console.log('✓ Mobile-responsive menu');
console.log('✓ Scroll animations');
console.log('✓ Interactive buttons');
console.log('✓ Contact form validation');
console.log('✓ Keyboard shortcuts (Alt+H for Home, Alt+C for Contact)');
console.log('%cHave a great experience! 🚀', 'font-size: 12px; color: #e74c3c;');