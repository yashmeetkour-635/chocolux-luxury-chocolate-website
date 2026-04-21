     /* ---- Navbar shadow on scroll ---- */
        const navbar = document.querySelector('.nav-bar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        });

        /* ---- Scroll-reveal with stagger for sibling groups ---- */
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        /* Stagger siblings that share the same parent grid */
        function observeWithStagger(selector) {
            const groups = {};
            document.querySelectorAll(selector).forEach(el => {
                const parent = el.parentElement;
                if (!groups[parent]) groups[parent] = [];
                groups[parent].push(el);
            });
            Object.values(groups).forEach(siblings => {
                siblings.forEach((el, i) => {
                    el.style.transitionDelay = `${i * 0.13}s`;
                    revealObserver.observe(el);
                });
            });
        }

        observeWithStagger('.reveal');

        /* Non-staggered reveals */
        document.querySelectorAll('.reveal-left, .reveal-right').forEach(el => {
            revealObserver.observe(el);
        });
