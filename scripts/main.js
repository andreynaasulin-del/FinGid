/**
 * ФинГид — Main JavaScript
 * Handles: Tab switching, FAQ accordion, Smooth scroll
 */

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initFAQ();
    initSmoothScroll();
    initCardAnimations();
});

/**
 * Tab Navigation
 * Switches between "Для физических лиц" and "Для предпринимателей"
 */
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Re-trigger card animations
                const cards = targetSection.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = `slideUp 0.6s ease forwards`;
                    card.style.animationDelay = `${0.1 + index * 0.05}s`;
                });
            }
            
            // Scroll to section smoothly
            window.scrollTo({
                top: document.querySelector('.main').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * FAQ Accordion
 * Expands/collapses FAQ items
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Card scroll animations using Intersection Observer
 */
function initCardAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all cards immediately
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '1';
        });
        return;
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Add link tracking (placeholder for analytics)
 */
document.addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (card) {
        const bankName = card.querySelector('.card-bank')?.textContent || 'Unknown';
        const cardTitle = card.querySelector('.card-title')?.textContent || 'Unknown';
        
        // Placeholder for analytics tracking
        console.log(`[ФинГид] Клик: ${bankName} — ${cardTitle}`);
        
        // Future: Send to analytics
        // gtag('event', 'card_click', { bank: bankName, product: cardTitle });
    }
});

/**
 * Sticky header shadow on scroll
 */
let lastScrollY = 0;
window.addEventListener('scroll', function() {
    const navTabs = document.querySelector('.nav-tabs');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navTabs.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navTabs.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }
    
    lastScrollY = currentScrollY;
}, { passive: true });
