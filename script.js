const navbarLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('.container > div');
const carouselContainer = document.querySelector('.carousel-container');

// FUNCIÓN MOSTRAR LA SECCIÓN ACTIVA
function showSection(sectionId) {
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Mostrar el carrusel solo si estamos en la sección de "Inicio"
    if (sectionId === 'inicio') {
        carouselContainer.style.display = 'block';
    } else {
        carouselContainer.style.display = 'none';
    }

    navbarLinks.forEach(nav => {
        if (nav.getAttribute('href').substring(1) === sectionId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });
}

// CLIC A CADA SECCIÓN DE LA BARRA DE NAVEGACIÓN
navbarLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        const sectionId = this.getAttribute('href').substring(1);
        showSection(sectionId);
    });
});

// Mostrar solo la sección de "Inicio" al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showSection('inicio');
});

// FUNCIÓN CLIC EN EL LOGO VUELVE AL INICIO
showSection('inicio');
const logo = document.getElementById('logo');
logo.addEventListener('click', function() {
    showSection('inicio');
});

// FUNCIÓN TEXTOS DESPLEGABLES
document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll(".circle");

    circles.forEach(function(circle) {
        circle.addEventListener("click", function() {
            const content = this.querySelector('.collapsible-content');
            const isActive = this.classList.contains("active");

            // Cierra todas las secciones activas
            circles.forEach(function(btn) {
                btn.classList.remove("active");
                btn.querySelector('.collapsible-content').style.display = "none";
            });

            // Abre la sección si no estaba activa
            if (!isActive) {
                this.classList.add("active");
                content.style.display = "block";
            }
        });
    });
});

// CARRUSEL 
let slideIndex = 0;
const images = [
    "imagenes/hdd.jpeg",
    "imagenes/limpieza_hardware.jpeg",
    "imagenes/pasta_termica.jpeg",
    "imagenes/recuperar_datos.jpeg"
];

// CAMBIAR LA IMAGEN Y ACTUALIZAR LOS INDICADORES
function changeSlide(direction) {
    const carouselImage = document.getElementById("carousel-image");
    carouselImage.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out"; 
    carouselImage.style.opacity = 0; 
    carouselImage.style.transform = "scale(0.95)";

    setTimeout(() => {
        slideIndex = (slideIndex + direction + images.length) % images.length;
        carouselImage.src = images[slideIndex];
        updateIndicators();  
        carouselImage.style.opacity = 1; 
        carouselImage.style.transform = "scale(1)";
    }, 1000);
}

// ACTUALIZAR LOS INDICADORES ACTIVOS
function updateIndicators() {
    const indicators = document.querySelectorAll('.carousel-indicators div');
    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// CAMBIAR LA IMAGEN Y ACTUALIZAR LOS INDICADORES
function changeSlide(direction) {
    const carouselImage = document.getElementById("carousel-image");
    carouselImage.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"; 
    carouselImage.style.opacity = 0; 
    carouselImage.style.transform = "scale(0.95)";

    setTimeout(() => {
        slideIndex = (slideIndex + direction + images.length) % images.length;
        carouselImage.src = images[slideIndex];
        updateIndicators();  
        carouselImage.style.opacity = 1; 
        carouselImage.style.transform = "scale(1)";
    }, 500); 
}

// CAMBIAR LA IMAGEN AL HACER CLIC EN UN INDICADOR
function goToSlide(index) {
    const carouselImage = document.getElementById("carousel-image");
    carouselImage.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"; 
    carouselImage.style.opacity = 0; 
    carouselImage.style.transform = "scale(0.95)";

    setTimeout(() => {
        slideIndex = index;
        carouselImage.src = images[slideIndex];
        updateIndicators();
        carouselImage.style.opacity = 1; 
        carouselImage.style.transform = "scale(1)";
    }, 500); 
}

// INTERVALO PARA CAMBIAR LA IMAGEN
setInterval(() => {
    changeSlide(1); 
}, 7000); 

// INICIALIZAR INDICADORES
document.addEventListener('DOMContentLoaded', () => {
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    updateIndicators();
});

// ALERTA AL ENVIAR UN MENSAJE DEL FORMULARIO
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var formData = new FormData(this);

    fetch('emails.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: 'Éxito!',
                text: data.message,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.message,
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al enviar el mensaje.',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
        });
    });
});

// DETALLE SERVICIO
let detalleVisible = false;

function expandirServicio(servicio) {
    if (detalleVisible) return; 

    let titulo, descripcion, imagen;

    switch(servicio) {
        case 'servicio1':
            titulo = 'Upgrade de Piezas';
            descripcion = 'EXPLICAR LA IMPORTANCIA DEL CAMBIO DE COMPONENTES, POR EJEMPLO HDD VS SSD';
            imagen = 'imagenes/hdd.jpeg';
            break;
        case 'servicio2':
            titulo = 'Limpieza Interna';
            descripcion = 'Realizamos una limpieza exhaustiva de tu notebook, mejorando su rendimiento y evitando sobrecalentamientos...';
            imagen = 'imagenes/limpieza_hardware.jpeg';
            break;
        case 'servicio3':
            titulo = 'Cambio de Pasta Térmica';
            descripcion = 'Cambiamos la pasta térmica de tu procesador para asegurar un mejor rendimiento y mayor vida útil...';
            imagen = 'imagenes/pasta_termica.jpeg';
            break;
        case 'servicio4':
            titulo = 'Recuperación de Datos';
            descripcion = 'Recuperamos tus datos de discos duros dañados o formateados accidentalmente...';
            imagen = 'imagenes/recuperar_datos.jpeg';
            break;
        default:
            return;
    }

    document.getElementById('titulo-servicio').textContent = titulo;
    document.getElementById('descripcion-servicio').textContent = descripcion;
    document.getElementById('imagen-servicio').src = imagen;

    const servicios = document.getElementById('servicios');
    const detalleServicio = document.getElementById('detalle-servicio');

    servicios.style.opacity = '0';
    setTimeout(() => {
        servicios.style.display = 'none';
        detalleServicio.style.display = 'block';
        requestAnimationFrame(() => {
            detalleServicio.classList.add('mostrar');
            document.getElementById('imagen-servicio').classList.add('fade-in', 'show');
        });
        detalleVisible = true; 
    }, 300);
}

function volver() {
    if (!detalleVisible) return;

    const detalleServicio = document.getElementById('detalle-servicio');
    const servicios = document.getElementById('servicios');

    detalleServicio.classList.remove('mostrar');
    document.getElementById('imagen-servicio').classList.remove('fade-in', 'show');

    detalleServicio.addEventListener('transitionend', () => {
        detalleServicio.style.display = 'none';
        servicios.style.display = 'grid';
        servicios.style.opacity = '1';
        detalleVisible = false;
    }, { once: true });

    setTimeout(() => {
        servicios.style.opacity = '1';
    }, 400);
}

// OCULTAR EL DETALLE AL CAMBIAR DE SECCION
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (document.getElementById('detalle-servicio').style.display === 'block') {
            volver(); 
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('detalle-servicio').style.display = 'none';
    document.getElementById('servicios').style.display = 'grid';
});

