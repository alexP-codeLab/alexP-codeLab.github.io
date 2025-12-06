// --- 1. Script para el menú móvil ---
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Función para abrir/cerrar el menú
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Cambiar icono de hamburguesa a 'X' y viceversa
    if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Función para cerrar el menú al hacer clic en un enlace (en móvil)
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});


// --- 2. Script para marcar el enlace activo al hacer scroll ---
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Un pequeño offset
        let sectionId = current.getAttribute('id');
        
        let link = document.querySelector('.nav-links a[href*=' + sectionId + ']');
        
        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
    
    // Caso especial para el inicio
    let homeLink = document.querySelector('.nav-links a[href="#inicio"]');
    if (sections.length > 0 && scrollY < sections[0].offsetTop) {
         document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
         if(homeLink) homeLink.classList.add('active');
    }
});


// --- 3. Efecto Máquina de Escribir (Typewriter) ---
const textElement = document.getElementById('typewriter');
const texts = ["Desarrollador Junior", "Estudiante de DAM", "Apasionado del Código", "Futuro Full Stack"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!textElement) return; // Protección por si no existe el elemento

    const currentText = texts[textIndex];
    
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa al terminar de escribir
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pausa antes de empezar el siguiente
    }

    setTimeout(type, typeSpeed);
}


// --- 4. Animación al hacer Scroll (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1 // Se activa cuando se ve el 10% del elemento
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Iniciar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar máquina de escribir
    type();

    // Iniciar observador de scroll
    const hiddenElements = document.querySelectorAll('.skill-category, .course-card, .timeline-item, .about-text, .about-education, .hero-text p, .cta-buttons');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
