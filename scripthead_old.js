document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll("nav a");
    const scrollBtn = document.getElementById("scrollToTop");

    const toggle = document.getElementById('menuToggle');
    const navList = document.querySelector('nav ul');

    toggle.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });

        scrollBtn.classList.toggle("visible", window.scrollY > 300);
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const navMenu = document.getElementById('navMenu');
    const navLinksA = navMenu.querySelectorAll('a');

    navLinksA.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show'); // fecha o menu
            }
        });
    });
});

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}