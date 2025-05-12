document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
    
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Change cursor style when hovering over clickable elements
    const clickableElements = document.querySelectorAll('a, button, .project-card, input[type="text"], input[type="email"], textarea');
    
    clickableElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'var(--light-teal)';
        });
        
        el.addEventListener('mouseout', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--teal)';
        });
    });
    
    // Replace the existing typing effect code with this:
const typingElement = document.querySelector('.typing');
const fixedName = "Hey, I'm Rajnath Pandey"; // Fixed first line
const rotatingLines = [
    "You're viewing my portfolio",
    "I'm a Web Developer",
    "I love Python & AI/ML",
    "Welcome to my space!",
    "Let's build something great"
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = rotatingLines[lineIndex];
    
    // Always keep the fixed name visible
    typingElement.innerHTML = `${fixedName}<br><span class="rotating-text">${currentText.substring(0, charIndex)}</span>`;
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause at end
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % rotatingLines.length;
        setTimeout(type, 500);
        return;
    }
    
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    setTimeout(type, isDeleting ? 50 : 100);
}

// Start animation after 1 second
setTimeout(() => {
    typingElement.innerHTML = fixedName; // Show name immediately
    setTimeout(type, 1000); // Start rotating lines after
}, 1000);
    
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Set Theory Demo
    const setInput = document.getElementById('set-input');
    const generateBtn = document.getElementById('generate-btn');
    const subsetsOutput = document.getElementById('subsets-output');
    const properSubsetsOutput = document.getElementById('proper-subsets-output');
    
    generateBtn.addEventListener('click', () => {
        const input = setInput.value.trim();
        if (!input) return;
        
        const elements = input.split(',').map(item => item.trim()).filter(item => item);
        const allSubsets = generateSubsets(elements);
        const properSubsets = allSubsets.slice(0, -1); // All subsets except the full set
        
        displaySubsets(subsetsOutput, allSubsets);
        displaySubsets(properSubsetsOutput, properSubsets);
    });
    
    function generateSubsets(elements) {
        const subsets = [];
        const n = elements.length;
        
        // Total subsets = 2^n
        for (let i = 0; i < (1 << n); i++) {
            const subset = [];
            for (let j = 0; j < n; j++) {
                if (i & (1 << j)) {
                    subset.push(elements[j]);
                }
            }
            subsets.push(subset);
        }
        
        return subsets;
    }
    
    function displaySubsets(container, subsets) {
        container.innerHTML = '';
        
        if (subsets.length === 0) {
            container.innerHTML = '<p>No subsets generated</p>';
            return;
        }
        
        const ul = document.createElement('ul');
        subsets.forEach(subset => {
            const li = document.createElement('li');
            li.textContent = subset.length > 0 ? `{${subset.join(', ')}}` : '∅ (empty set)';
            ul.appendChild(li);
        });
        
        container.appendChild(ul);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ripple effect for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});

// Add this at the BOTTOM of your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    const knowMeBtn = document.querySelector('a.btn.secondary[href="./about.html"]');
    
    if (knowMeBtn) {
        knowMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "./about.html";
        });
    }
});


// Start animations after page loads
window.addEventListener('load', animateOnLoad);
// Fix for View My Work button
document.querySelector('a.btn.primary[href="#works"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#works').scrollIntoView({
        behavior: 'smooth'
    });
});
// Entrance animations
function animateElements() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(el => {
        el.classList.add('animated');
    });
}

// Wait for everything to load
window.addEventListener('load', function() {
    setTimeout(animateElements, 300); // Short delay after load
});
// Scroll Animation Trigger
function setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const elementInView = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.7)  && // Triggers earlier &&
            rect.bottom >= (window.innerHeight * 0.2)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        }
    });
    
    window.addEventListener('scroll', () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    });
}

// Initialize after load
window.addEventListener('load', setupScrollAnimations);

// Add to script.js
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 50}ms`;
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});
// Dynamic Background Effect
document.addEventListener('mousemove', (e) => {
    // Update mouse position for radial gradient
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    
    // Create cursor trail
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    document.body.appendChild(trail);
    
    // Remove trail after animation
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'translate(-50%, -50%) scale(2)';
        setTimeout(() => trail.remove(), 300);
    }, 500);
});

// Gentle "breathing" animation for hero section
function animateHero() {
    gsap.to(".hero-content", {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}
animateHero();