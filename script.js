document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.about-card, .feature-item, .subscription-step, .device-frame');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.setAttribute('aria-expanded', 'false');
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', item.classList.contains('active'));
        });
    });

    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    const navLinks = document.querySelectorAll('.nav-link');

    sectionLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = [...document.querySelectorAll('main section[id]')];
    const setActiveLink = function() {
        const current = sections
            .filter(section => section.getBoundingClientRect().top <= 130)
            .pop();

        navLinks.forEach(link => {
            link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`);
        });
    };

    setActiveLink();
    window.addEventListener('scroll', setActiveLink, { passive: true });
});
