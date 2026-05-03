// ===================================
// FLOATING ANIMATIONS SYSTEM
// Random floating elements for fun!
// ===================================

class FloatingAnimations {
    constructor() {
        this.isActive = true;
        this.spawnInterval = null;
        
        // Define all floating elements with their properties
        this.elements = [
            { emoji: '🐵', name: 'monkey', duration: 5000, size: 64, probability: 0.15 },
            { emoji: '🐦', name: 'bird', duration: 6000, size: 40, probability: 0.25 },
            { emoji: '💰', name: 'money', duration: 4000, size: 48, probability: 0.20 },
            { emoji: '⭐', name: 'star', duration: 3500, size: 42, probability: 0.25 },
            { emoji: '🎈', name: 'balloon', duration: 5500, size: 50, probability: 0.20 },
            { emoji: '🦋', name: 'butterfly', duration: 4500, size: 38, probability: 0.20 },
            { emoji: '✨', name: 'sparkle', duration: 2500, size: 36, probability: 0.30 },
            { emoji: '🌟', name: 'glowstar', duration: 3000, size: 44, probability: 0.25 }
        ];
        
        this.init();
    }
    
    init() {
        console.log('🎨 Floating Animations initialized!');
        this.startSpawning();
        
        // Listen for visibility changes to pause/resume
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }
    
    startSpawning() {
        // Spawn elements at random intervals
        this.spawnInterval = setInterval(() => {
            if (this.isActive && Math.random() > 0.5) {
                this.spawnRandomElement();
            }
        }, 3000); // Check every 3 seconds
        
        // Also spawn one immediately
        setTimeout(() => this.spawnRandomElement(), 1000);
    }
    
    spawnRandomElement() {
        // Select random element based on probability
        const randomValue = Math.random();
        let cumulativeProbability = 0;
        
        for (const element of this.elements) {
            cumulativeProbability += element.probability;
            if (randomValue <= cumulativeProbability) {
                this.createFloatingElement(element);
                break;
            }
        }
    }
    
    createFloatingElement(elementData) {
        const floater = document.createElement('div');
        floater.className = `floating-element floating-${elementData.name}`;
        floater.textContent = elementData.emoji;
        floater.style.fontSize = `${elementData.size}px`;
        
        // Random starting position
        const startX = Math.random() * (window.innerWidth - elementData.size);
        const startY = Math.random() * (window.innerHeight - elementData.size);
        
        floater.style.left = `${startX}px`;
        floater.style.top = `${startY}px`;
        
        // Random animation duration variation
        const durationVariation = elementData.duration + (Math.random() * 1000 - 500);
        floater.style.animationDuration = `${durationVariation}ms`;
        
        // Add to page
        document.body.appendChild(floater);
        
        // Remove after animation completes
        setTimeout(() => {
            floater.remove();
        }, durationVariation);
    }
    
    // Spawn specific element (for special occasions)
    spawnMonkey() {
        const monkey = this.elements.find(e => e.name === 'monkey');
        if (monkey) {
            this.createFloatingElement(monkey);
        }
    }
    
    spawnBirds(count = 3) {
        const bird = this.elements.find(e => e.name === 'bird');
        if (bird) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    this.createFloatingElement(bird);
                }, i * 200); // Stagger the birds
            }
        }
    }
    
    spawnMoney(count = 5) {
        const money = this.elements.find(e => e.name === 'money');
        if (money) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    this.createFloatingElement(money);
                }, i * 150);
            }
        }
    }
    
    spawnStars(count = 10) {
        const star = this.elements.find(e => e.name === 'star');
        if (star) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    this.createFloatingElement(star);
                }, i * 100);
            }
        }
    }
    
    pause() {
        this.isActive = false;
        console.log('⏸️ Floating animations paused');
    }
    
    resume() {
        this.isActive = true;
        console.log('▶️ Floating animations resumed');
    }
    
    stop() {
        this.isActive = false;
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        
        // Remove all existing floating elements
        document.querySelectorAll('.floating-element').forEach(el => el.remove());
        console.log('⏹️ Floating animations stopped');
    }
}

// Initialize when DOM is ready
let floatingAnimations = null;

document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        floatingAnimations = new FloatingAnimations();
    } else {
        console.log('⚠️ Floating animations disabled (reduced motion preference)');
    }
});

// Export for global access
window.FloatingAnimations = FloatingAnimations;
window.floatingAnimations = floatingAnimations;

// Made with Bob
