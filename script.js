// --- 1. CURSOR PERSONALIZADO MAGNÉTICO ---
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // El punto sigue al ratón instantáneamente
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // El círculo exterior tiene un pequeño delay (efecto smooth)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// --- 2. EFECTO TILT 3D (Vanilla JS - Sin librerías) ---
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Si el ratón está cerca o sobre la tarjeta
        if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        ) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculamos la rotación (limitada a 10 grados)
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.transition = "transform 0.1s";
        } else {
            // Resetear si el ratón sale
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
            card.style.transition = "transform 0.5s ease";
        }
    });
});


// --- 3. MÁQUINA DE ESCRIBIR ---
const texts = ["Developer", "Student", "Problem Solver"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    const typeElement = document.getElementById("typewriter");
    if(typeElement) {
        typeElement.textContent = letter;
    }

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Espera 2s antes de borrar
    } else {
        setTimeout(type, 100);
    }
})();


// --- 4. MENÚ MÓVIL ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if(icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

