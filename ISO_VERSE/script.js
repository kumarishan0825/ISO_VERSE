 const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const reveals = document.querySelectorAll('.reveal');

        if ('IntersectionObserver' in window && !reduceMotion) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.14 });
            reveals.forEach((element) => revealObserver.observe(element));
        } else {
            reveals.forEach((element) => element.classList.add('is-visible'));
        }

        const journey = document.querySelector('.journey-map');
        const progressPath = document.querySelector('.map-progress');
        const marker = document.querySelector('.map-marker');
        const markerHalo = document.querySelector('.map-marker-halo');
        const pathLength = progressPath.getTotalLength();
        progressPath.style.strokeDasharray = pathLength;
        progressPath.style.strokeDashoffset = pathLength;

        function updateJourney() {
            const rect = journey.getBoundingClientRect();
            const travel = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - rect.top) / (rect.height + window.innerHeight * 0.2)));
            const point = progressPath.getPointAtLength(pathLength * travel);
            progressPath.style.strokeDashoffset = pathLength * (1 - travel);
            marker.setAttribute('cx', point.x);
            marker.setAttribute('cy', point.y);
            markerHalo.setAttribute('cx', point.x);
            markerHalo.setAttribute('cy', point.y);
        }

        updateJourney();
        window.addEventListener('scroll', updateJourney, { passive: true });
        window.addEventListener('resize', updateJourney);

        const parallaxImage = document.querySelector('[data-parallax]');
        if (!reduceMotion) {
            window.addEventListener('scroll', () => {
                const amount = Number(parallaxImage.dataset.parallax);
                const offset = Math.max(-18, Math.min(18, (window.scrollY - parallaxImage.offsetTop) * amount));
                parallaxImage.style.translate = `0 ${offset}px`;
            }, { passive: true });
        }