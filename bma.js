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
            themeToggle.setAttribute('aria-pressed', 'true');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.setAttribute('aria-pressed', 'false');
        }
    };

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.setAttribute('aria-pressed', 'true');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.setAttribute('aria-pressed', 'false');
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

    // --- Language Switcher ---
    const langToggle = document.getElementById('lang-toggle');
    const aboutSection = document.getElementById('about');
    const sectionTitles = document.querySelectorAll('.section-title');
    const translations = {
        EN: {
            about: `<h2 class="section-title">About Me</h2><p class="section-intro">I am a passionate and driven Computer Science student from the Islamic University of Gaza, with a strong focus on full-stack web development. My journey in tech is fueled by a love for building elegant, efficient, and user-friendly digital experiences. I am a lifelong learner, constantly exploring new technologies to enhance my skills and deliver high-quality solutions.</p><a href=\"Bahaa AbuTaha - CV.pdf\" class=\"btn\" download> <i class=\"fas fa-download\"></i> Download Resume</a>`,
            titles: ["About Me", "Education & Experience", "Core Skills", "My Projects", "Get In Touch"]
        },
        AR: {
            about: `<h2 class=\"section-title\">عنّي</h2><p class=\"section-intro\">أنا طالب علوم حاسوب شغوف من الجامعة الإسلامية بغزة، أركز على تطوير الويب الكامل. شغفي بالتقنية يدفعني لبناء تجارب رقمية أنيقة وسهلة الاستخدام. أتعلم باستمرار تقنيات جديدة لتطوير مهاراتي وتقديم حلول عالية الجودة.</p><a href=\"Bahaa AbuTaha - CV.pdf\" class=\"btn\" download> <i class=\"fas fa-download\"></i> تحميل السيرة الذاتية</a>`,
            titles: ["عنّي", "التعليم والخبرة", "المهارات الأساسية", "مشاريعي", "تواصل معي"]
        }
    };
    let currentLang = localStorage.getItem('lang') || 'EN';
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        langToggle.textContent = lang;
        // About section
        if (aboutSection) aboutSection.innerHTML = translations[lang].about;
        // Section titles
        document.querySelectorAll('.section-title').forEach((el, i) => {
            if (translations[lang].titles[i]) el.textContent = translations[lang].titles[i];
        });
    }
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'EN' ? 'AR' : 'EN');
        });
        setLanguage(currentLang);
    }

    // --- Typewriter Effect for Profile Title ---
    function typeWriter(element, text, speed = 80, loop = true) {
        let i = 0;
        function type() {
            if (i <= text.length) {
                element.textContent = text.slice(0, i);
                i++;
                setTimeout(type, speed);
            } else if (loop) {
                setTimeout(() => {
                    i = 0;
                    type();
                }, 1200);
            }
        }
        type();
    }
    const profileTitle = document.querySelector('.profile-title');
    if (profileTitle) {
        typeWriter(profileTitle, 'Full-Stack Developer');
    }
});
