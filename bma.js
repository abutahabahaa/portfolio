/*
* BMA Professional Portfolio JS - Style 2
* Author: Bahaa AbuTaha (Redesigned by Gemini)
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- Theme Toggler --- 
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the saved theme
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
        }
    };

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Apply theme on initial load
    applyTheme();

    // --- Mobile Navigation --- 
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    mobileNavToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking on the main content
    mainContent.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Auto-update Footer Year ---
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Say Hello Button --- 
    const sayHelloBtn = document.getElementById('say-hello-btn');
    if(sayHelloBtn) {
        sayHelloBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:abutahabahaa6@gmail.com';
        });
    }
});
