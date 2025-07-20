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
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('.nav-link');

    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        mobileNavToggle.setAttribute('aria-expanded', 'true');
        // Trap focus inside sidebar
        sidebar.setAttribute('tabindex', '-1');
        sidebar.focus();
    }
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        sidebar.removeAttribute('tabindex');
    }

    mobileNavToggle.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Close sidebar when clicking on the overlay
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar when clicking a nav link (on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    // Close sidebar when clicking on the main content
    mainContent.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll(".content-section");
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
