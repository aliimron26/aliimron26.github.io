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
    anchor.addEventListener('click', function (e) {
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

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('header');
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('bg-white/80');
    } else {
        navbar.classList.add('bg-white/80');
        navbar.classList.remove('bg-white/95');
    }
});

// Fungsi untuk menampilkan proyek dari file JSON
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
                    <div class="project-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl fade-in" style="animation-delay: ${index * 0.1}s">
                        <div class="relative overflow-hidden">
                            <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">${project.title}</h3>
                            <p class="text-gray-600 mb-4 leading-relaxed">${project.description}</p>
                            <div class="flex flex-wrap gap-2 mb-6">
                                ${project.technologies.map(tech => `<span class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200/50">${tech}</span>`).join('')}
                            </div>
                            <a href="proyek/${project.title.toLowerCase().replace(/\s+/g, '-')}.html" class="inline-flex items-center text-blue-600 font-semibold hover:text-purple-600 transition-colors group">
                                Lihat Detail 
                                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </a>
                        </div>
                    </div>
                `;
            });
            projectList.innerHTML = projectHTML;
            
            // Re-observe new elements for fade-in animation
            document.querySelectorAll('.project-card.fade-in').forEach(el => {
                observer.observe(el);
            });
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
            <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
                <div class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-exclamation-triangle text-3xl text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Gagal Memuat Proyek</h3>
                <p class="text-gray-600 leading-relaxed">Sedang mengalami kesalahan dalam memuat daftar proyek. Silakan coba lagi nanti atau hubungi saya langsung.</p>
            </div>
        `;
    }
}

// Load projects saat halaman dimuat
window.addEventListener('load', loadProjects);
