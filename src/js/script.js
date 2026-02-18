document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-links li.active').forEach(li => {
        const text = li.textContent.trim();
        li.textContent = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--delay', `${i * 0.1}s`);
            span.style.setProperty('--underline-delay', `${i * 0.1 + 0.1}s`);
            li.appendChild(span);
        });
    });
    document.querySelectorAll('img:not(.ad img, .logo img)').forEach(img => {
        img.addEventListener('mouseenter', () => {
            if (document.querySelector('.zoom-img')) document.querySelector('.zoom-img').remove();
            const zoomImg = document.createElement('img');
            zoomImg.src = img.src;
            zoomImg.className = 'zoom-img';
            document.body.appendChild(zoomImg);

            setTimeout(() => {
                const imgRatio = img.naturalWidth / img.naturalHeight;
                const viewportRatio = innerWidth / innerHeight;

                if (viewportRatio  <= imgRatio) {
                    zoomImg.style.width = "90vw";
                    zoomImg.style.height = `${90 * innerWidth / imgRatio / innerHeight}vh`;
                } else {
                    zoomImg.style.width = `${90 * innerHeight * imgRatio / innerWidth}vw`;
                    zoomImg.style.height = "90vh";
                }

                zoomImg.addEventListener('mouseleave', () => {
                    zoomImg.style.width = "0";
                    zoomImg.style.height = "0";

                    zoomImg.addEventListener("transitionend", () => {
                        zoomImg.remove();
                    }, { once: true });
                }, { once: true });
            }, 0);
        });
    });
});
