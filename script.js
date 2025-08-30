// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Testimonial Slider
let currentSlide = 1;
const testimonialItems = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    // Hide all slides
    testimonialItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (n > testimonialItems.length) currentSlide = 1;
    if (n < 1) currentSlide = testimonialItems.length;
    
    testimonialItems[currentSlide - 1].classList.add('active');
    dots[currentSlide - 1].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide += 1);
}

function prevSlide() {
    showSlide(currentSlide -= 1);
}

// Auto-advance testimonials
setInterval(nextSlide, 5000);

// Initialize first slide
showSlide(1);

// Price Estimator
function calculateEstimate() {
    const projectType = document.getElementById('estimator-type').value;
    const squareFootage = parseInt(document.getElementById('square-footage').value);
    const designStyle = document.getElementById('design-style').value;
    const timeline = document.getElementById('timeline').value;
    
    if (!projectType || !squareFootage || !designStyle || !timeline) {
        alert('Please fill in all fields to get an estimate.');
        return;
    }
    
    // Base rates per square foot
    const baseRates = {
        'residential': 150,
        'commercial': 200,
        'renovation': 100
    };
    
    // Style multipliers
    const styleMultipliers = {
        'modern': 1.0,
        'traditional': 1.2,
        'luxury': 1.5,
        'minimalist': 0.9
    };
    
    // Timeline multipliers
    const timelineMultipliers = {
        '3-6': 1.0,
        '6-12': 1.1,
        '12+': 1.2
    };
    
    const baseRate = baseRates[projectType];
    const styleMultiplier = styleMultipliers[designStyle];
    const timelineMultiplier = timelineMultipliers[timeline];
    
    const totalEstimate = squareFootage * baseRate * styleMultiplier * timelineMultiplier;
    
    const resultDiv = document.getElementById('estimateResult');
    resultDiv.innerHTML = `
        <h3>Project Estimate</h3>
        <p><strong>Estimated Cost:</strong> $${totalEstimate.toLocaleString()}</p>
        <p><strong>Project Type:</strong> ${projectType.charAt(0).toUpperCase() + projectType.slice(1)}</p>
        <p><strong>Square Footage:</strong> ${squareFootage} sq ft</p>
        <p><strong>Design Style:</strong> ${designStyle.charAt(0).toUpperCase() + designStyle.slice(1)}</p>
        <p><strong>Timeline:</strong> ${timeline} months</p>
        <p><em>*This is a rough estimate. Final pricing will be determined after consultation.</em></p>
    `;
    resultDiv.classList.add('show');
}

// Form Submissions
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! We will contact you soon to schedule your consultation.');
    this.reset();
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    this.reset();
});

document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! You will receive your free consultation details via email.');
    this.reset();
    closeLeadPopup();
});

document.getElementById('bookingPopupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! We will contact you soon to confirm your consultation appointment.');
    this.reset();
    closeBookingPopup();
});

// Popup Functions
function openLeadPopup() {
    document.getElementById('leadPopup').classList.add('show');
}

function closeLeadPopup() {
    document.getElementById('leadPopup').classList.remove('show');
}

function openBookingForm() {
    document.getElementById('bookingPopup').classList.add('show');
}

function closeBookingPopup() {
    document.getElementById('bookingPopup').classList.remove('show');
}

// Close popups when clicking outside
document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
});

// Close popups with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup-overlay').forEach(overlay => {
            overlay.classList.remove('show');
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.instagram-item, .project-item, .about-image, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Auto-show lead popup after 2 seconds
setTimeout(() => {
    if (!sessionStorage.getItem('popupShown')) {
        openLeadPopup();
        sessionStorage.setItem('popupShown', 'true');
    }
}, 2000);

// WhatsApp and Call button functionality
document.querySelector('.whatsapp-button').addEventListener('click', function(e) {
    // You can add tracking or analytics here
    console.log('WhatsApp button clicked');
});

document.querySelector('.call-button').addEventListener('click', function(e) {
    // You can add tracking or analytics here
    console.log('Call button clicked');
});

// Form validation enhancement
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        }
    });
    
    return isValid;
}

// Enhanced form submission with validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollY + windowHeight > sectionTop + sectionHeight * 0.3) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
