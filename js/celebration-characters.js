// ===================================
// CELEBRATION CHARACTERS SYSTEM
// Monkey & Cute Girl celebrations!
// ===================================

class CelebrationCharacters {
    constructor() {
        this.messages = [
            "🎉 Awesome job!",
            "⭐ You're a star!",
            "🚀 Amazing work!",
            "💪 Super cool!",
            "🎊 Fantastic!",
            "🌟 You did it!",
            "👏 Well done!",
            "🎈 Great job!",
            "✨ Brilliant!",
            "🏆 You rock!",
            "🎯 Perfect!",
            "💯 Incredible!",
            "🌈 Wonderful!",
            "🎪 Spectacular!",
            "🦄 Magical!"
        ];
        
        this.init();
    }
    
    init() {
        console.log('🎉 Celebration Characters initialized!');
    }
    
    // Show random celebration character
    showCelebration(type = 'random') {
        const characterType = type === 'random' 
            ? (Math.random() > 0.5 ? 'monkey' : 'girl')
            : type;
        
        if (characterType === 'monkey') {
            this.showMonkey();
        } else {
            this.showGirl();
        }
        
        // Play celebration sound
        if (window.Codeville && window.Codeville.playSound) {
            window.Codeville.playSound('success');
        }
        
        // Spawn confetti
        if (window.Codeville && window.Codeville.createConfetti) {
            window.Codeville.createConfetti();
        }
        
        // Spawn extra floating stars
        if (window.floatingAnimations) {
            window.floatingAnimations.spawnStars(8);
        }
    }
    
    // Show monkey character
    showMonkey() {
        const message = this.getRandomMessage();
        const monkey = this.createCharacter('monkey', '🐵', message);
        this.animateCharacter(monkey);
    }
    
    // Show girl character
    showGirl() {
        const message = this.getRandomMessage();
        const girl = this.createCharacter('girl', '👧', message);
        this.animateCharacter(girl);
    }
    
    // Create character element
    createCharacter(type, emoji, message) {
        const character = document.createElement('div');
        character.className = `celebration-character celebration-${type}`;
        
        character.innerHTML = `
            <div class="character-emoji">${emoji}</div>
            <div class="character-message">${message}</div>
            <div class="character-sparkles">
                <span class="sparkle">✨</span>
                <span class="sparkle">✨</span>
                <span class="sparkle">✨</span>
            </div>
        `;
        
        document.body.appendChild(character);
        return character;
    }
    
    // Animate character appearance
    animateCharacter(character) {
        // Trigger animation
        setTimeout(() => {
            character.classList.add('active');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            character.classList.remove('active');
            setTimeout(() => {
                character.remove();
            }, 500);
        }, 3000);
    }
    
    // Get random celebration message
    getRandomMessage() {
        return this.messages[Math.floor(Math.random() * this.messages.length)];
    }
    
    // Show celebration for specific achievement
    showAchievement(achievementName, stars = 3) {
        const character = Math.random() > 0.5 ? 'monkey' : 'girl';
        const emoji = character === 'monkey' ? '🐵' : '👧';
        const starText = '⭐'.repeat(stars);
        const message = `${starText} ${achievementName}!`;
        
        const celebrationChar = this.createCharacter(character, emoji, message);
        this.animateCharacter(celebrationChar);
        
        // Extra effects
        if (window.Codeville && window.Codeville.playSound) {
            window.Codeville.playSound('success');
        }
        
        if (window.Codeville && window.Codeville.createConfetti) {
            window.Codeville.createConfetti();
        }
        
        if (window.floatingAnimations) {
            window.floatingAnimations.spawnStars(stars * 3);
            window.floatingAnimations.spawnMoney(5);
        }
    }
    
    // Show celebration for badge earned
    showBadgeCelebration(badgeName) {
        const character = Math.random() > 0.5 ? 'monkey' : 'girl';
        const emoji = character === 'monkey' ? '🐵' : '👧';
        const message = `🏆 ${badgeName} Badge!`;
        
        const celebrationChar = this.createCharacter(character, emoji, message);
        this.animateCharacter(celebrationChar);
        
        // Extra special effects for badges
        if (window.Codeville && window.Codeville.playSound) {
            window.Codeville.playSound('success');
            setTimeout(() => window.Codeville.playSound('success'), 300);
        }
        
        if (window.Codeville && window.Codeville.createConfetti) {
            window.Codeville.createConfetti();
            setTimeout(() => window.Codeville.createConfetti(), 500);
        }
        
        if (window.floatingAnimations) {
            window.floatingAnimations.spawnStars(15);
            window.floatingAnimations.spawnMoney(10);
            window.floatingAnimations.spawnMonkey();
        }
    }
    
    // Show celebration for streak
    showStreakCelebration(days) {
        const character = Math.random() > 0.5 ? 'monkey' : 'girl';
        const emoji = character === 'monkey' ? '🐵' : '👧';
        const message = `🔥 ${days} Day Streak!`;
        
        const celebrationChar = this.createCharacter(character, emoji, message);
        this.animateCharacter(celebrationChar);
        
        if (window.Codeville && window.Codeville.playSound) {
            window.Codeville.playSound('success');
        }
        
        if (window.floatingAnimations) {
            window.floatingAnimations.spawnStars(days);
        }
    }
}

// Initialize when DOM is ready
let celebrationCharacters = null;

document.addEventListener('DOMContentLoaded', () => {
    celebrationCharacters = new CelebrationCharacters();
});

// Export for global access
window.CelebrationCharacters = CelebrationCharacters;
window.celebrationCharacters = celebrationCharacters;

// Made with Bob
