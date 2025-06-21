// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuButton.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('bg-white/80');
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.add('bg-white/80');
        navbar.classList.remove('bg-white/95');
        navbar.classList.remove('shadow-lg');
    }
});

// Initialize AOS Animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const professions = ["Pengembang Web", "Mahasiswa Sistem Informasi", "Freelancer", "Tech Enthusiast"];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        typingText.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(typeWriter, 500);
    } else {
        const typingSpeed = isDeleting ? 100 : 150;
        setTimeout(typeWriter, typingSpeed);
    }
}

// Start typing animation
setTimeout(typeWriter, 1000);

// Custom Cursor Effect
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Make cursor interactive with clickable elements
document.querySelectorAll("a, button, input, textarea").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "scale(1.5)";
        cursorOutline.style.width = "30px";
        cursorOutline.style.height = "30px";
        cursorOutline.style.borderColor = "rgba(99, 102, 241, 0.8)";
    });
    
    el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "scale(1)";
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.borderColor = "rgba(99, 102, 241, 0.5)";
    });
});

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6366f1" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#6366f1", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            }
        });
    }
});

// Contact Form with EmailJS
const contactForm = document.getElementById('contact-form');
const formAlert = document.getElementById('form-alert');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
        submitButton.disabled = true;
        
        // Hide previous alerts
        formAlert.classList.add('hidden');
        
        // Send email using EmailJS
        emailjs.sendForm('service_ee606ea', 'template_dgafmdh', this)
            .then(() => {
                // Show success message
                formAlert.textContent = 'Pesan berhasil dikirim! Saya akan segera menghubungi Anda.';
                formAlert.className = 'mt-4 p-4 bg-green-500/20 text-green-100 rounded-xl';
                formAlert.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();
            })
            .catch((error) => {
                // Show error message
                formAlert.textContent = 'Gagal mengirim pesan. Silakan coba lagi atau hubungi saya melalui email langsung.';
                formAlert.className = 'mt-4 p-4 bg-red-500/20 text-red-100 rounded-xl';
                formAlert.classList.remove('hidden');
                console.error('Error sending email:', error);
            })
            .finally(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
    });
}

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await axios.get('projects.json');
        const projects = response.data.projects;
        const projectList = document.getElementById('project-list');
        const showMoreButton = document.getElementById('show-more-projects');
        const emptyProjectMessage = document.getElementById('empty-project-message');
        
        if (projects.length === 0) {
            projectList.style.display = 'none';
            showMoreButton.style.display = 'none';
            emptyProjectMessage.classList.remove('hidden');
            return;
        }
        
        let initialProjects = projects.slice(0, 3);
        let allProjects = projects;
        let showingAll = false;
        
        function renderProjects(projectsToShow) {
            let projectHTML = '';
            projectsToShow.forEach((project, index) => {
                projectHTML += `
                    <div class="project-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="relative overflow-hidden h-48">
                            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-3 text-gray-800 hover:text-indigo-600 transition-colors">${project.title}</h3>
                            <p class="text-gray-600 mb-4 leading-relaxed">${project.description}</p>
                            <div class="flex flex-wrap gap-2 mb-6">
                                ${project.technologies.map(tech => `<span class="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-200/50 hover:bg-indigo-500/20 transition-colors">${tech}</span>`).join('')}
                            </div>
                            <a href="${project.link}" class="inline-flex items-center text-indigo-600 font-semibold hover:text-purple-600 transition-colors group">
                                Lihat Detail 
                                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </a>
                        </div>
                    </div>
                `;
            });
            projectList.innerHTML = projectHTML;
            
            // Re-initialize AOS for new elements
            AOS.refresh();
        }
        
        renderProjects(initialProjects);
        
        showMoreButton.addEventListener('click', () => {
            if (showingAll) {
                renderProjects(initialProjects);
                showMoreButton.innerHTML = '<i class="fas fa-arrow-down mr-2"></i>Lihat Lebih Banyak';
                showingAll = false;
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            } else {
                renderProjects(allProjects);
                showMoreButton.innerHTML = '<i class="fas fa-arrow-up mr-2"></i>Tampilkan Sedikit';
                showingAll = true;
            }
        });
        
        if (projects.length <= 3) {
            showMoreButton.style.display = 'none';
        }
        
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('project-list').style.display = 'none';
        document.getElementById('show-more-projects').style.display = 'none';
        document.getElementById('empty-project-message').classList.remove('hidden');
        document.getElementById('empty-project-message').innerHTML = `
            <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto" data-aos="zoom-in">
                <div class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-exclamation-triangle text-3xl text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Gagal Memuat Proyek</h3>
                <p class="text-gray-600 leading-relaxed">Sedang mengalami kesalahan dalam memuat daftar proyek. Silakan coba lagi nanti atau hubungi saya langsung.</p>
            </div>
        `;
    }
}



// Load projects when page is loaded
document.addEventListener('DOMContentLoaded', loadProjects);