// ===================================
// CODEVILLE - MAIN JAVASCRIPT
// Interactive Features for Kids
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏰 Codeville is loading...');
    
    // Initialize all features
    initNavigation();
    initProfileModal();
    initStoryCards();
    initSoundEffects();
    checkExistingProfile();
    
    console.log('✅ Codeville is ready!');
});

// ===== NAVIGATION =====

function initNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            this.classList.toggle('active');
            
            // Play click sound
            playSound('click');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!event.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        }
    });
    
    // Highlight active page
    highlightActivePage();
}

function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== PROFILE MODAL =====

function initProfileModal() {
    const startButton = document.getElementById('startButton');
    const continueButton = document.getElementById('continueButton');
    const profileModal = document.getElementById('profileModal');
    const createProfileButton = document.getElementById('createProfileButton');
    const kidNameInput = document.getElementById('kidName');
    
    // Avatar and color selection
    let selectedAvatar = null;
    let selectedColor = null;
    
    // Start button - show profile modal
    if (startButton) {
        startButton.addEventListener('click', function() {
            profileModal.classList.add('active');
            playSound('click');
        });
    }
    
    // Continue button - go to dashboard
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
            playSound('click');
        });
    }
    
    // Avatar selection
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selection
            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selection to clicked avatar
            this.classList.add('selected');
            selectedAvatar = this.getAttribute('data-avatar');
            
            // Play sound
            playSound('click');
            
            // Check if profile can be created
            checkProfileCompletion();
        });
    });
    
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selection
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selection to clicked color
            this.classList.add('selected');
            selectedColor = this.getAttribute('data-color');
            
            // Play sound
            playSound('click');
            
            // Check if profile can be created
            checkProfileCompletion();
        });
    });
    
    // Name input
    if (kidNameInput) {
        kidNameInput.addEventListener('input', function() {
            checkProfileCompletion();
        });
    }
    
    // Check if all profile fields are filled
    function checkProfileCompletion() {
        const name = kidNameInput ? kidNameInput.value.trim() : '';
        
        if (name && selectedAvatar && selectedColor && createProfileButton) {
            createProfileButton.disabled = false;
        } else if (createProfileButton) {
            createProfileButton.disabled = true;
        }
    }
    
    // Create profile button
    if (createProfileButton) {
        createProfileButton.addEventListener('click', function() {
            const name = kidNameInput.value.trim();
            
            if (name && selectedAvatar && selectedColor) {
                // Create profile object
                const profile = {
                    name: name,
                    avatar: selectedAvatar,
                    color: selectedColor,
                    starsEarned: 0,
                    storiesCompleted: [],
                    badges: [],
                    streak: 0,
                    lastPlayed: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                };
                
                // Save to localStorage
                localStorage.setItem('codevilleProfile', JSON.stringify(profile));
                
                // Play success sound
                playSound('success');
                
                // Show celebration
                showCelebration();
                
                // Redirect to dashboard after celebration
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }
        });
    }
}

// ===== CHECK EXISTING PROFILE =====

function checkExistingProfile() {
    const profile = getProfile();
    const startButton = document.getElementById('startButton');
    const continueButton = document.getElementById('continueButton');
    
    if (profile && startButton && continueButton) {
        // User has a profile, show continue button
        startButton.style.display = 'none';
        continueButton.style.display = 'flex';
        
        // Update welcome text
        const welcomeSubtitle = document.querySelector('.welcome-subtitle');
        if (welcomeSubtitle) {
            welcomeSubtitle.textContent = `Welcome back, ${profile.name}! ${profile.avatar}`;
        }
    }
}

// ===== STORY CARDS =====

function initStoryCards() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('click', function() {
            const storyNumber = this.getAttribute('data-story');
            
            // Check if profile exists
            const profile = getProfile();
            if (!profile) {
                alert('Please create your profile first! 👤');
                return;
            }
            
            // Play click sound
            playSound('click');
            
            // Navigate to story page
            window.location.href = `stories/story${storyNumber}-${getStorySlug(storyNumber)}.html`;
        });
        
        // Add hover animation
        card.addEventListener('mouseenter', function() {
            this.querySelector('.story-icon').classList.add('wiggle-animation');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.story-icon').classList.remove('wiggle-animation');
        });
    });
    
    // Load story progress
    loadStoryProgress();
}

function getStorySlug(storyNumber) {
    const slugs = {
        '0': 'cody-name-tag',
        '00': 'cody-toy-sorter',
        '1': 'magic-table',
        '2': 'dancing-robot',
        '3': 'magic-box',
        '4': 'weather-friend',
        '5': 'recipe-robot'
    };
    return slugs[storyNumber] || 'story';
}

function loadStoryProgress() {
    const profile = getProfile();
    if (!profile) return;
    
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        const storyNumber = parseInt(card.getAttribute('data-story'));
        const storyData = profile.storiesCompleted.find(s => s.storyId === storyNumber);
        
        if (storyData) {
            // Update stars
            const stars = card.querySelectorAll('.star');
            stars.forEach((star, index) => {
                if (index < storyData.stars) {
                    star.textContent = '⭐';
                    star.classList.add('filled');
                }
            });
        }
    });
}

// ===== SOUND EFFECTS =====

let soundsEnabled = true;

function initSoundEffects() {
    // Check if sounds are enabled in settings
    const soundsSetting = localStorage.getItem('soundsEnabled');
    if (soundsSetting !== null) {
        soundsEnabled = soundsSetting === 'true';
    }
}

function playSound(soundName) {
    if (!soundsEnabled) return;
    
    // Sound file mapping
    const sounds = {
        'click': 'sounds/click.mp3',
        'success': 'sounds/success.mp3',
        'error': 'sounds/error.mp3',
        'star': 'sounds/star.mp3',
        'badge': 'sounds/badge.mp3',
        'whoosh': 'sounds/whoosh.mp3',
        'pop': 'sounds/pop.mp3'
    };
    
    const soundFile = sounds[soundName];
    if (soundFile) {
        const audio = new Audio(soundFile);
        audio.volume = 0.5;
        audio.play().catch(err => {
            // Silently fail if sound can't play
            console.log('Sound play failed:', err);
        });
    }
}

function toggleSounds() {
    soundsEnabled = !soundsEnabled;
    localStorage.setItem('soundsEnabled', soundsEnabled.toString());
    return soundsEnabled;
}

// ===== CELEBRATION EFFECTS =====

function showCelebration() {
    // Create confetti
    createConfetti();
    
    // Play celebration sound
    playSound('success');
    
    // Show success message
    showMessage('🎉 Profile Created! Welcome to Codeville!', 'success');
}

function createConfetti() {
    const colors = ['#FFD93D', '#FF6B9D', '#4A90E2', '#2ECC71', '#9B59B6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function showStarEffect(x, y) {
    const star = document.createElement('div');
    star.className = 'star-effect';
    star.textContent = '⭐';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 1000);
}

// ===== MESSAGES =====

function showMessage(text, type = 'info') {
    const messageBox = document.createElement('div');
    messageBox.className = `message-box message-${type} fade-in`;
    
    const icons = {
        'success': '✅',
        'error': '❌',
        'info': 'ℹ️',
        'warning': '⚠️'
    };
    
    messageBox.innerHTML = `
        <span class="emoji-icon">${icons[type] || icons.info}</span>
        <span>${text}</span>
    `;
    
    // Add to page
    const container = document.querySelector('.home-container') || document.body;
    container.insertBefore(messageBox, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageBox.classList.add('fade-out');
        setTimeout(() => {
            messageBox.remove();
        }, 300);
    }, 5000);
}

// ===== PROFILE MANAGEMENT =====

function getProfile() {
    const profileData = localStorage.getItem('codevilleProfile');
    return profileData ? JSON.parse(profileData) : null;
}

function updateProfile(updates) {
    const profile = getProfile();
    if (!profile) return null;
    
    const updatedProfile = { ...profile, ...updates };
    localStorage.setItem('codevilleProfile', JSON.stringify(updatedProfile));
    return updatedProfile;
}

function addStarToProfile(storyId, stars) {
    const profile = getProfile();
    if (!profile) return;
    
    // Check if story already completed
    const existingStory = profile.storiesCompleted.find(s => s.storyId === storyId);
    
    if (existingStory) {
        // Update stars if new score is higher
        if (stars > existingStory.stars) {
            existingStory.stars = stars;
            profile.starsEarned += (stars - existingStory.stars);
        }
    } else {
        // Add new story completion
        profile.storiesCompleted.push({
            storyId: storyId,
            stars: stars,
            completedAt: new Date().toISOString()
        });
        profile.starsEarned += stars;
    }
    
    // Update last played
    profile.lastPlayed = new Date().toISOString();
    
    // Save profile
    localStorage.setItem('codevilleProfile', JSON.stringify(profile));
    
    // Show celebration
    showStarCelebration(stars);
}

function showStarCelebration(stars) {
    const starText = '⭐'.repeat(stars);
    showMessage(`${starText} You earned ${stars} star${stars > 1 ? 's' : ''}!`, 'success');
    createConfetti();
    playSound('star');
}

function addBadgeToProfile(badgeId, badgeName) {
    const profile = getProfile();
    if (!profile) return;
    
    // Check if badge already earned
    if (profile.badges.includes(badgeId)) return;
    
    // Add badge
    profile.badges.push(badgeId);
    
    // Save profile
    localStorage.setItem('codevilleProfile', JSON.stringify(profile));
    
    // Show celebration
    showMessage(`🏆 New Badge Earned: ${badgeName}!`, 'success');
    createConfetti();
    playSound('badge');
}

// ===== STREAK MANAGEMENT =====

function updateStreak() {
    const profile = getProfile();
    if (!profile) return;
    
    const today = new Date().toDateString();
    const lastPlayed = new Date(profile.lastPlayed).toDateString();
    
    if (today === lastPlayed) {
        // Same day, no change
        return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastPlayed === yesterdayStr) {
        // Consecutive day, increase streak
        profile.streak += 1;
    } else {
        // Streak broken, reset to 1
        profile.streak = 1;
    }
    
    profile.lastPlayed = new Date().toISOString();
    localStorage.setItem('codevilleProfile', JSON.stringify(profile));
    
    // Show streak message if > 1
    if (profile.streak > 1) {
        showMessage(`🔥 ${profile.streak} Day Streak!`, 'success');
    }
}

// ===== UTILITY FUNCTIONS =====

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
}

function getGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetings = {
        'morning': 'Good morning',
        'afternoon': 'Good afternoon',
        'evening': 'Good evening'
    };
    return greetings[timeOfDay] || 'Hello';
}

// ===== PAGE TRANSITIONS =====

function navigateWithTransition(url) {
    // Create transition overlay
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = '<div class="page-transition-content">🏰</div>';
    
    document.body.appendChild(transition);
    
    // Navigate after animation starts
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

// ===== EXPORT FUNCTIONS =====

// Make functions available globally
window.Codeville = {
    getProfile,
    updateProfile,
    addStarToProfile,
    addBadgeToProfile,
    updateStreak,
    playSound,
    toggleSounds,
    showMessage,
    showCelebration,
    createConfetti,
    navigateWithTransition
};

console.log('🎮 Codeville functions loaded!');

// Made with Bob
