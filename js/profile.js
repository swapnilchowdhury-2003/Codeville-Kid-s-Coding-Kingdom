// ===================================
// CODEVILLE - PROFILE MANAGEMENT
// Handle User Profiles and Progress
// ===================================

// Profile management functions
const ProfileManager = {
    
    // Create a new profile
    createProfile: function(name, avatar, color) {
        const profile = {
            name: name,
            avatar: avatar,
            color: color,
            starsEarned: 0,
            storiesCompleted: [],
            badges: [],
            streak: 0,
            lastPlayed: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            settings: {
                soundsEnabled: true,
                musicEnabled: true,
                difficulty: 'normal'
            }
        };
        
        this.saveProfile(profile);
        return profile;
    },
    
    // Get current profile
    getProfile: function() {
        const profileData = localStorage.getItem('codevilleProfile');
        return profileData ? JSON.parse(profileData) : null;
    },
    
    // Save profile
    saveProfile: function(profile) {
        localStorage.setItem('codevilleProfile', JSON.stringify(profile));
    },
    
    // Update profile
    updateProfile: function(updates) {
        const profile = this.getProfile();
        if (!profile) return null;
        
        const updatedProfile = { ...profile, ...updates };
        this.saveProfile(updatedProfile);
        return updatedProfile;
    },
    
    // Delete profile
    deleteProfile: function() {
        if (confirm('Are you sure you want to delete your profile? This cannot be undone!')) {
            localStorage.removeItem('codevilleProfile');
            window.location.href = 'index.html';
        }
    },
    
    // Check if profile exists
    hasProfile: function() {
        return this.getProfile() !== null;
    },
    
    // Get profile stats
    getStats: function() {
        const profile = this.getProfile();
        if (!profile) return null;
        
        return {
            totalStars: profile.starsEarned,
            totalBadges: profile.badges.length,
            storiesCompleted: profile.storiesCompleted.length,
            currentStreak: profile.streak,
            memberSince: profile.createdAt
        };
    },
    
    // Add story completion
    completeStory: function(storyId, stars) {
        const profile = this.getProfile();
        if (!profile) return;
        
        // Check if story already completed
        const existingIndex = profile.storiesCompleted.findIndex(s => s.storyId === storyId);
        
        if (existingIndex !== -1) {
            // Update if new score is better
            const existing = profile.storiesCompleted[existingIndex];
            if (stars > existing.stars) {
                const starDiff = stars - existing.stars;
                profile.starsEarned += starDiff;
                profile.storiesCompleted[existingIndex] = {
                    storyId: storyId,
                    stars: stars,
                    completedAt: new Date().toISOString()
                };
            }
        } else {
            // Add new completion
            profile.storiesCompleted.push({
                storyId: storyId,
                stars: stars,
                completedAt: new Date().toISOString()
            });
            profile.starsEarned += stars;
        }
        
        profile.lastPlayed = new Date().toISOString();
        this.saveProfile(profile);
        
        return profile;
    },
    
    // Add badge
    addBadge: function(badgeId, badgeName, badgeDescription) {
        const profile = this.getProfile();
        if (!profile) return;
        
        // Check if badge already exists
        const exists = profile.badges.find(b => b.id === badgeId);
        if (exists) return false;
        
        // Add badge
        profile.badges.push({
            id: badgeId,
            name: badgeName,
            description: badgeDescription,
            earnedAt: new Date().toISOString()
        });
        
        this.saveProfile(profile);
        return true;
    },
    
    // Update streak
    updateStreak: function() {
        const profile = this.getProfile();
        if (!profile) return;
        
        const today = new Date().toDateString();
        const lastPlayed = new Date(profile.lastPlayed).toDateString();
        
        if (today === lastPlayed) {
            // Same day, no change
            return profile.streak;
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
        this.saveProfile(profile);
        
        return profile.streak;
    },
    
    // Get story progress
    getStoryProgress: function(storyId) {
        const profile = this.getProfile();
        if (!profile) return null;
        
        return profile.storiesCompleted.find(s => s.storyId === storyId) || null;
    },
    
    // Check if story is completed
    isStoryCompleted: function(storyId) {
        return this.getStoryProgress(storyId) !== null;
    },
    
    // Get total stars for a story
    getStoryStars: function(storyId) {
        const progress = this.getStoryProgress(storyId);
        return progress ? progress.stars : 0;
    },
    
    // Update settings
    updateSettings: function(settings) {
        const profile = this.getProfile();
        if (!profile) return;
        
        profile.settings = { ...profile.settings, ...settings };
        this.saveProfile(profile);
    },
    
    // Get settings
    getSettings: function() {
        const profile = this.getProfile();
        return profile ? profile.settings : null;
    },
    
    // Export profile data
    exportProfile: function() {
        const profile = this.getProfile();
        if (!profile) return null;
        
        const dataStr = JSON.stringify(profile, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `codeville-profile-${profile.name}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    },
    
    // Import profile data
    importProfile: function(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const profile = JSON.parse(e.target.result);
                this.saveProfile(profile);
                alert('Profile imported successfully! 🎉');
                window.location.reload();
            } catch (error) {
                alert('Error importing profile. Please check the file.');
            }
        };
        
        reader.readAsText(file);
    }
};

// Badge definitions
const Badges = {
    'first-steps': {
        id: 'first-steps',
        name: 'First Steps',
        description: 'Complete your first story!',
        icon: '👣'
    },
    'star-collector': {
        id: 'star-collector',
        name: 'Star Collector',
        description: 'Earn 10 stars!',
        icon: '⭐'
    },
    'perfect-score': {
        id: 'perfect-score',
        name: 'Perfect Score',
        description: 'Get 3 stars on any story!',
        icon: '🌟'
    },
    'story-master': {
        id: 'story-master',
        name: 'Story Master',
        description: 'Complete all 5 stories!',
        icon: '📚'
    },
    'week-warrior': {
        id: 'week-warrior',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak!',
        icon: '🔥'
    },
    'quick-learner': {
        id: 'quick-learner',
        name: 'Quick Learner',
        description: 'Complete a story in under 5 minutes!',
        icon: '⚡'
    },
    'helper': {
        id: 'helper',
        name: 'Helpful Friend',
        description: 'Share Codeville with a friend!',
        icon: '🤝'
    },
    'explorer': {
        id: 'explorer',
        name: 'Explorer',
        description: 'Visit all pages!',
        icon: '🗺️'
    }
};

// Check and award badges
function checkBadges() {
    const profile = ProfileManager.getProfile();
    if (!profile) return;
    
    // First Steps - Complete first story
    if (profile.storiesCompleted.length >= 1) {
        ProfileManager.addBadge('first-steps', Badges['first-steps'].name, Badges['first-steps'].description);
    }
    
    // Star Collector - Earn 10 stars
    if (profile.starsEarned >= 10) {
        ProfileManager.addBadge('star-collector', Badges['star-collector'].name, Badges['star-collector'].description);
    }
    
    // Perfect Score - Get 3 stars on any story
    const hasPerfectScore = profile.storiesCompleted.some(s => s.stars === 3);
    if (hasPerfectScore) {
        ProfileManager.addBadge('perfect-score', Badges['perfect-score'].name, Badges['perfect-score'].description);
    }
    
    // Story Master - Complete all 5 stories
    if (profile.storiesCompleted.length >= 5) {
        ProfileManager.addBadge('story-master', Badges['story-master'].name, Badges['story-master'].description);
    }
    
    // Week Warrior - 7-day streak
    if (profile.streak >= 7) {
        ProfileManager.addBadge('week-warrior', Badges['week-warrior'].name, Badges['week-warrior'].description);
    }
}

// Initialize profile page if on profile.html
if (window.location.pathname.includes('profile.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadProfilePage();
    });
}

function loadProfilePage() {
    const profile = ProfileManager.getProfile();
    
    if (!profile) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update profile display
    updateProfileDisplay(profile);
    
    // Setup edit buttons
    setupProfileEditing();
}

function updateProfileDisplay(profile) {
    // Update name
    const nameElement = document.getElementById('profileName');
    if (nameElement) {
        nameElement.textContent = profile.name;
    }
    
    // Update avatar
    const avatarElement = document.getElementById('profileAvatar');
    if (avatarElement) {
        avatarElement.textContent = profile.avatar;
    }
    
    // Update stats
    const statsElements = {
        'starsEarned': profile.starsEarned,
        'badgesEarned': profile.badges.length,
        'storiesCompleted': profile.storiesCompleted.length,
        'currentStreak': profile.streak
    };
    
    for (const [id, value] of Object.entries(statsElements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    // Update badges display
    displayBadges(profile.badges);
    
    // Update member since
    const memberSinceElement = document.getElementById('memberSince');
    if (memberSinceElement) {
        const date = new Date(profile.createdAt);
        memberSinceElement.textContent = date.toLocaleDateString();
    }
}

function displayBadges(badges) {
    const badgesContainer = document.getElementById('badgesContainer');
    if (!badgesContainer) return;
    
    badgesContainer.innerHTML = '';
    
    if (badges.length === 0) {
        badgesContainer.innerHTML = '<p class="text-center text-light">No badges yet. Keep learning to earn badges! 🏆</p>';
        return;
    }
    
    badges.forEach(badge => {
        const badgeData = Badges[badge.id];
        if (!badgeData) return;
        
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge-item';
        badgeElement.innerHTML = `
            <div class="badge-icon">${badgeData.icon}</div>
            <div class="badge-name">${badgeData.name}</div>
            <div class="badge-description">${badgeData.description}</div>
        `;
        
        badgesContainer.appendChild(badgeElement);
    });
}

function setupProfileEditing() {
    // Edit name button
    const editNameBtn = document.getElementById('editNameBtn');
    if (editNameBtn) {
        editNameBtn.addEventListener('click', function() {
            const newName = prompt('Enter your new name:');
            if (newName && newName.trim()) {
                ProfileManager.updateProfile({ name: newName.trim() });
                window.location.reload();
            }
        });
    }
    
    // Change avatar button
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function() {
            // Show avatar selection modal
            showAvatarModal();
        });
    }
    
    // Delete profile button
    const deleteProfileBtn = document.getElementById('deleteProfileBtn');
    if (deleteProfileBtn) {
        deleteProfileBtn.addEventListener('click', function() {
            ProfileManager.deleteProfile();
        });
    }
    
    // Export profile button
    const exportProfileBtn = document.getElementById('exportProfileBtn');
    if (exportProfileBtn) {
        exportProfileBtn.addEventListener('click', function() {
            ProfileManager.exportProfile();
        });
    }
}

function showAvatarModal() {
    // Create modal for avatar selection
    const avatars = ['🐱', '🐶', '🐼', '🦁', '🐸', '🦄', '🤖', '🐙'];
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-title">Choose Your Avatar</h2>
            <div class="avatar-grid">
                ${avatars.map(avatar => `
                    <button class="avatar-option" data-avatar="${avatar}">${avatar}</button>
                `).join('')}
            </div>
            <button class="big-button secondary-button" onclick="this.closest('.modal').remove()">
                Cancel
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click handlers
    modal.querySelectorAll('.avatar-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const newAvatar = this.getAttribute('data-avatar');
            ProfileManager.updateProfile({ avatar: newAvatar });
            modal.remove();
            window.location.reload();
        });
    });
}

// Make ProfileManager available globally
window.ProfileManager = ProfileManager;
window.Badges = Badges;
window.checkBadges = checkBadges;

console.log('👤 Profile Manager loaded!');

// Made with Bob
