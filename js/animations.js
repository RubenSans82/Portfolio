/* ===== ADVANCED ANIMATIONS JAVASCRIPT ===== */

// Animation Controller Class
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupParticleSystem();
        this.setupMagneticEffect();
        this.setupTextRevealAnimation();
        this.setupCounterAnimations();
        this.setupMorphingElements();
    }

    // Intersection Observer for scroll animations
    setupIntersectionObservers() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, options);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(element => {
            observer.observe(element);
        });

        this.observers.set('scroll', observer);
    }

    // Trigger animation based on element type
    triggerAnimation(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;

        setTimeout(() => {
            switch (animationType) {
                case 'fadeInUp':
                    this.fadeInUp(element);
                    break;
                case 'fadeInLeft':
                    this.fadeInLeft(element);
                    break;
                case 'fadeInRight':
                    this.fadeInRight(element);
                    break;
                case 'scaleIn':
                    this.scaleIn(element);
                    break;
                case 'slideInBottom':
                    this.slideInBottom(element);
                    break;
                case 'typewriter':
                    this.typewriterEffect(element);
                    break;
                case 'counter':
                    this.counterAnimation(element);
                    break;
                default:
                    element.classList.add('animate');
            }
        }, delay);
    }

    // Animation methods
    fadeInUp(element) {
        element.style.transform = 'translateY(30px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }

    fadeInLeft(element) {
        element.style.transform = 'translateX(-50px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }

    fadeInRight(element) {
        element.style.transform = 'translateX(50px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }

    scaleIn(element) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    slideInBottom(element) {
        element.style.transform = 'translateY(100px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }

    // Typewriter effect
    typewriterEffect(element) {
        const text = element.textContent;
        const speed = element.getAttribute('data-speed') || 50;
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        element.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }, 1000);
            }
        }, speed);
    }

    // Counter animation
    counterAnimation(element) {
        const target = parseInt(element.getAttribute('data-target')) || 0;
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const suffix = element.getAttribute('data-suffix') || '';
        
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    }

    // Particle system
    setupParticleSystem() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;

        hero.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.3;
            animation: float ${duration}s infinite linear;
        `;

        container.appendChild(particle);

        // Remove and recreate particle after animation
        setTimeout(() => {
            if (container.contains(particle)) {
                container.removeChild(particle);
                this.createParticle(container);
            }
        }, duration * 1000);
    }

    // Magnetic effect for interactive elements
    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = x * force * 0.3;
                    const moveY = y * force * 0.3;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Text reveal animation
    setupTextRevealAnimation() {
        const revealElements = document.querySelectorAll('.reveal-text');
        
        revealElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            const words = text.split(' ');
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.5s ease ${index * 0.1}s`;
                element.appendChild(span);
            });
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Morphing elements
    setupMorphingElements() {
        const morphElements = document.querySelectorAll('.morph');
        
        morphElements.forEach(element => {
            let isHovered = false;
            
            element.addEventListener('mouseenter', () => {
                if (!isHovered) {
                    isHovered = true;
                    this.morphElement(element);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                isHovered = false;
                this.resetMorph(element);
            });
        });
    }

    morphElement(element) {
        const originalBorderRadius = getComputedStyle(element).borderRadius;
        
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
        element.style.borderRadius = '0';
        element.style.transform = 'scale(1.05)';
        
        element.setAttribute('data-original-radius', originalBorderRadius);
    }

    resetMorph(element) {
        const originalRadius = element.getAttribute('data-original-radius');
        
        element.style.borderRadius = originalRadius;
        element.style.transform = 'scale(1)';
    }
}

// Parallax Controller
class ParallaxController {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.setupParallaxElements();
        this.bindEvents();
    }

    setupParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            this.elements.push({ element, speed });
        });
    }

    bindEvents() {
        window.addEventListener('scroll', this.throttle(this.updateParallax.bind(this), 16));
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;
        
        this.elements.forEach(({ element, speed }) => {
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Cursor Follower
class CursorFollower {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }

    init() {
        this.createCursor();
        this.bindEvents();
    }

    createCursor() {
        // Main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;

        // Cursor follower
        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
            opacity: 0.5;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 5 + 'px';
            this.cursor.style.top = e.clientY - 5 + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX - 20 + 'px';
                this.cursorFollower.style.top = e.clientY - 20 + 'px';
            }, 100);
        });

        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.5)';
                this.cursorFollower.style.opacity = '0.3';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
                this.cursorFollower.style.opacity = '0.5';
            });
        });
    }
}

// Smooth Scroll Implementation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Only enable on desktop for performance
        if (window.innerWidth > 1024) {
            this.setupSmoothScroll();
        }
    }

    setupSmoothScroll() {
        let current = 0;
        let target = 0;
        let ease = 0.075;

        const lerp = (start, end, factor) => {
            return start + (end - start) * factor;
        };

        const updateScroll = () => {
            target = window.scrollY;
            current = lerp(current, target, ease);
            
            if (Math.abs(target - current) < 0.1) {
                current = target;
            }

            document.body.style.transform = `translateY(${-current}px)`;
            requestAnimationFrame(updateScroll);
        };

        updateScroll();
    }
}

// Initialize all animation controllers
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on devices that can handle animations well
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency < 4;

    if (!prefersReducedMotion && !isLowEndDevice) {
        new AnimationController();
        new ParallaxController();
        
        // Only enable cursor follower on desktop
        if (window.innerWidth > 1024 && !('ontouchstart' in window)) {
            new CursorFollower();
        }
        
        // Only enable smooth scroll on high-end devices
        if (!isLowEndDevice && window.innerWidth > 1024) {
            new SmoothScroll();
        }
    }
});

// Add CSS for cursor
const cursorStyles = `
    <style>
        .custom-cursor,
        .cursor-follower {
            transition: opacity 0.3s ease;
        }
        
        body.no-cursor .custom-cursor,
        body.no-cursor .cursor-follower {
            opacity: 0;
        }
        
        @media (max-width: 1024px) {
            .custom-cursor,
            .cursor-follower {
                display: none;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', cursorStyles);
