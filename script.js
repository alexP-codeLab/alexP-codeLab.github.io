// --- Script para el menú móvil ---
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

// --- Script para marcar el enlace activo al hacer scroll ---
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
                // Quitar 'active' de todos
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                // Añadir 'active' al actual
                link.classList.add('active');
            }
        }
    });
    
    // Caso especial para el inicio
    let homeLink = document.querySelector('.nav-links a[href="#inicio"]');
    if (scrollY < sections[0].offsetTop) {
         document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
         homeLink.classList.add('active');
    }

});