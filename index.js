document.addEventListener('mousemove', (e) => {
    // const parallaxBg = document.querySelector('.parallax-bg');
    const content = document.querySelector('.content');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const moveX = (mouseX / windowWidth - 0.5) * 20;
    const moveY = (mouseY / windowHeight - 0.5) * 20;
    
    // parallaxBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    content.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
});

particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
        line_linked: { enable: false, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 0 }, remove: { particles_nb: 2 } }
    },
    retina_detect: true
});

document.addEventListener('scroll', () => {
    const particles = document.getElementById('particles-js');
    const target = document.getElementById('target'); // Target the h1 Ahmed Khalid
    const targetOffset = target.getBoundingClientRect().top;

    if (targetOffset <= 0) {
        particles.style.position = 'fixed';
        particles.style.marginTop = '0vh';
    } else {
        particles.style.position = 'absolute';
        particles.style.marginTop = '50vh';
    }
});

$(document).ready(function(){
// Add smooth scrolling to all links
$("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
    });
    } // End if
});
});


import { discordBotSkills, gameDevSkills, discordBotProjects, gameDevProjects } from './data.js'; 

document.addEventListener('DOMContentLoaded', function () {
    const discordBotBtn = document.getElementById('discordBotBtn');
    const gameDevBtn = document.getElementById('gameDevBtn');
    const skillsSection = document.querySelector('.skills-section');
    const projectsSection = document.getElementById('projects');

    function createDivider(text) {
        const divider = document.createElement('div');
        divider.className = 'projects-divider';
        divider.innerHTML = `
            <div class="divider-line"></div>
            <span class="divider-text">${text}</span>
            <div class="divider-line"></div>
        `;
        return divider;
    }

    function updateSkills(skills) {
        skillsSection.innerHTML = '';
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.classList.add('skill');
            if (skill.icon) {
                skillElement.innerHTML = `
                    <div class="skill-name">
                        <div class="skill-icon">
                            <i class="${skill.icon}"></i>
                        </div>
                        ${skill.name}
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="max-width: ${skill.level};"></div>
                    </div>
                `;
            } else {
                skillElement.innerHTML = `
                    <div class="skill-name">
                        <div class="skill-icon">
                            <i style="transform: scale(0.025)">${skill.svg}</i>
                        </div>
                        ${skill.name}
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="max-width: ${skill.level};"></div>
                    </div>
                `;
            }
            skillsSection.appendChild(skillElement);
        });
    }

    function createDivider(text) {
        const dividerContainer = document.createElement('div');
        dividerContainer.className = 'projects-divider-container';
        dividerContainer.innerHTML = `
            <div class="projects-divider">
                <div class="divider-line"></div>
                <span class="divider-text">${text}</span>
                <div class="divider-line"></div>
            </div>
        `;
        return dividerContainer;
    }
    
    function updateProjects(projects) {
        projectsSection.innerHTML = '<h2>Projects</h2>';
        const projectsContainer = document.createElement('div');
        projectsContainer.className = 'projects-grid';
        
        // Find the index where server setup projects start (index 7 based on your data)
        const serverSetupStartIndex = 7;
        
        // Add Discord bot projects
        projects.slice(0, serverSetupStartIndex).forEach(project => {
            projectsContainer.appendChild(addProjectCard(project));
        });
        
        // Add divider if we're showing Discord projects
        if (projects === discordBotProjects) {
            projectsSection.appendChild(projectsContainer);
            projectsSection.appendChild(createDivider('Discord Server Setups'));
            
            // Create new container for server setup projects
            const serverSetupContainer = document.createElement('div');
            serverSetupContainer.className = 'projects-grid';
            
            // Add server setup projects
            projects.slice(serverSetupStartIndex).forEach(project => {
                serverSetupContainer.appendChild(addProjectCard(project));
            });
            
            projectsSection.appendChild(serverSetupContainer);
        } else {
            // For game dev projects, just add all projects to the grid
            projects.forEach(project => {
                projectsContainer.appendChild(addProjectCard(project));
            });
            projectsSection.appendChild(projectsContainer);
        }
    }
    
    function addProjectCard(project) {
        const card = document.createElement('a');
        card.href = project.url;
        card.target = "_blank";
        card.className = 'card';
        
        let descriptionBox = '';
        if (project.note) {
            descriptionBox = `
                <div class="card__description">
                    <p style="margin-bottom: 60px; font-weight: 700;">${project.note}</p>
                </div>
            `;
        }
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.name}" class="card__img">
            <span class="card__footer">
                <span>${project.name}</span>
                <span>${project.description}</span>
            </span>
            <span class="card__action">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                </svg>
            </span>
            ${descriptionBox}
        `;
        return card;
    }

    discordBotBtn.addEventListener('click', function () {
        updateSkills(discordBotSkills);
        updateProjects(discordBotProjects);
        document.getElementById('skills-text').textContent = '(as a Discord Bot Developer & Setup Specialist)';
    });

    gameDevBtn.addEventListener('click', function () {
        updateSkills(gameDevSkills);
        updateProjects(gameDevProjects);
        document.getElementById('skills-text').textContent = '(as a Game Developer)';
    });

    // Initialize with Discord Bot Developer skills and projects
    discordBotBtn.click();
});

var docWidth = document.documentElement.offsetWidth;
[].forEach.call(
document.querySelectorAll('*'),
function(el) {
    if (el.offsetWidth > docWidth) {
    console.log(el);
    }
}
);