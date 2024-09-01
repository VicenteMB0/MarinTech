const navbarLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('.container > div');

// FUNCIÓN MOSTRAR LA SECCIÓN ACTIVA
function showSection(sectionId) {
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
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

// FUNCIÓN CLIC EN EL LOGO VUELVE AL INICIO
showSection('inicio');
const logo = document.getElementById('logo');
logo.addEventListener('click', function() {
    showSection('inicio');
});

// FUNCIÓN TEXTOS DESPLEGABLES
document.addEventListener("DOMContentLoaded", function() {
    const collapsibles = document.querySelectorAll(".collapsible");
    
    collapsibles.forEach(function(button) {
        button.addEventListener("click", function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains("active");

            collapsibles.forEach(function(btn) {
                btn.classList.remove("active");
                btn.nextElementSibling.style.display = "none";
            });
            
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

// CAMBIAR LA IMAGEN PARA LA DERECHA
function changeSlide(direction) {
    const carouselImage = document.getElementById("carousel-image");
    carouselImage.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out"; 
    carouselImage.style.opacity = 0; 
    carouselImage.style.transform = "scale(0.95)";

    setTimeout(() => {
        slideIndex = (slideIndex + direction + images.length) % images.length;
        carouselImage.src = images[slideIndex];
        carouselImage.style.opacity = 1; 
        carouselImage.style.transform = "scale(1)";
    }, 1000);
}

// INTERVALO PARA CAMBIAR LA IMAGEN
setInterval(() => {
    changeSlide(1); 
}, 5000); 


// AJUSTES AL CARRUSEL
function showSection(sectionId) {
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Mostrar el carrusel solo en la sección 'inicio'
    const carouselContainer = document.querySelector('.carousel-container');
    if (sectionId === 'inicio') {
        carouselContainer.style.display = 'flex';
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
function expandirServicio(servicio) {
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

    document.getElementById('servicios').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('servicios').style.display = 'none';
        document.getElementById('detalle-servicio').style.display = 'block';
        setTimeout(() => {
            document.getElementById('detalle-servicio').classList.add('mostrar');
            document.getElementById('imagen-servicio').classList.add('fade-in', 'show');
        }, 10); 
    }, 300); 
}

function volver() {
    document.getElementById('detalle-servicio').classList.remove('mostrar');
    document.getElementById('imagen-servicio').classList.remove('fade-in', 'show');

    setTimeout(() => {
        document.getElementById('detalle-servicio').style.display = 'none';
        document.getElementById('servicios').style.display = 'grid';
        document.getElementById('servicios').style.opacity = '1';
    }, 300); 
}
