// Initialize EmailJS
(function() {
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
})();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .stat, .book-item, .benefit-item, .type-card, .step, .faq-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Chat Widget Functions
function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    chatPopup.classList.toggle('active');
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';
            botMessage.innerHTML = `<p>Thank you for your message. We'll get back to you soon!</p>`;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Chat input enter key
document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Service booking and chat functions
function bookService(serviceName) {
    console.log(`Booking service: ${serviceName}`);
    // Implement booking logic
}

function chatService(serviceName) {
    console.log(`Chatting about service: ${serviceName}`);
    toggleChat();
}

// Service card button event listeners
document.querySelectorAll('.btn-service').forEach(button => {
    button.addEventListener('click', function() {
        const serviceCard = this.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        
        if (this.textContent.includes('Chat')) {
            chatService(serviceName);
        } else if (this.textContent.includes('Book')) {
            bookService(serviceName);
        }
    });
});

// Hero section button event listeners
document.querySelector('.hero-buttons .btn-primary')?.addEventListener('click', function() {
    openBookingModal();
});

document.querySelector('.hero-buttons .btn-secondary')?.addEventListener('click', function() {
    toggleChat();
});

// Booking Modal Functions
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Booking Form Submission
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        age: formData.get('age'),
        email: formData.get('email'),
        mobile: formData.get('mobile'),
        problem: formData.get('problem'),
        service: formData.get('service')
    };
    
    // Send email using EmailJS or similar service
    sendBookingEmail(data);
    
    // Show thank you modal
    closeBookingModal();
    document.getElementById('thankYouModal').classList.add('active');
    
    // Reset form
    this.reset();
});

// Email sending function
function sendBookingEmail(data) {
    // EmailJS configuration
    // Replace these with your actual EmailJS service and template IDs
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    
    const templateParams = {
        to_email: 'pratima@lightwithin.co.in',
        from_name: data.name,
        from_email: data.email,
        subject: 'New Appointment Booking Request',
        message: `
New appointment booking request:

Name: ${data.name}
Age: ${data.age}
Email: ${data.email}
Mobile: ${data.mobile}
Service: ${data.service || 'Not specified'}

Problem Description:
${data.problem}

This is an automated message from the Holistic Healing Center website.
        `,
        name: data.name,
        age: data.age,
        email: data.email,
        mobile: data.mobile,
        service: data.service || 'Not specified',
        problem: data.problem
    };
    
    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
        }, function(error) {
            console.log('Email failed to send:', error);
            // Fallback: show success message even if email fails
            // In a real implementation, you might want to handle this differently
        });
}

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const bookingModal = document.getElementById('bookingModal');
    const thankYouModal = document.getElementById('thankYouModal');
    
    if (e.target === bookingModal) {
        closeBookingModal();
    }
    
    if (e.target === thankYouModal) {
        closeThankYouModal();
    }
});

// Contact form submission
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const selectedService = formData.get('service') || 'General Inquiry';
    
    alert(`Thank you for your message about ${selectedService}. We'll get back to you soon!`);
    this.reset();
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}); 