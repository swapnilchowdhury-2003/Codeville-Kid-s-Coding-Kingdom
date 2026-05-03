// ===================================
// CODEVILLE - PROGRESS TRACKING
// Track Learning Progress and Stats
// ===================================

const ProgressTracker = {
    
    // Get overall progress
    getOverallProgress: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        const totalStories = 8;
        const completedStories = profile.storiesCompleted.length;
        const totalPossibleStars = totalStories * 3;
        const earnedStars = profile.starsEarned;
        
        return {
            storiesCompleted: completedStories,
            totalStories: totalStories,
            storyProgress: Math.round((completedStories / totalStories) * 100),
            starsEarned: earnedStars,
            totalPossibleStars: totalPossibleStars,
            starProgress: Math.round((earnedStars / totalPossibleStars) * 100),
            badges: profile.badges.length,
            streak: profile.streak
        };
    },
    
    // Get story-specific progress
    getStoryProgress: function(storyId) {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        const story = profile.storiesCompleted.find(s => s.storyId === storyId);
        
        return {
            completed: story !== undefined,
            stars: story ? story.stars : 0,
            completedAt: story ? story.completedAt : null
        };
    },
    
    // Get all stories progress
    getAllStoriesProgress: function() {
        const stories = [
            { id: 0, name: "Cody's Name Tag", icon: '🏷️' },
            { id: '00', name: "Cody's Toy Sorter", icon: '🎯' },
            { id: 1, name: 'Magic Food Table', icon: '🍕' },
            { id: 2, name: 'Dancing Robot', icon: '🤖' },
            { id: 3, name: 'Weather Wardrobe', icon: '🌦️' },
            { id: 4, name: 'Magic Treasure Box', icon: '📦' },
            { id: 5, name: 'Recipe Robot', icon: '🍳' },
            { id: 6, name: 'Magic Door Keeper', icon: '🚪' }
        ];
        
        return stories.map(story => ({
            ...story,
            progress: this.getStoryProgress(story.id)
        }));
    },
    
    // Calculate time spent (estimated)
    getTimeSpent: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return 0;
        
        // Estimate 10 minutes per story completion
        const estimatedMinutes = profile.storiesCompleted.length * 10;
        return estimatedMinutes;
    },
    
    // Get learning streak info
    getStreakInfo: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        const streak = profile.streak;
        const lastPlayed = new Date(profile.lastPlayed);
        const today = new Date();
        const daysSinceLastPlayed = Math.floor((today - lastPlayed) / (1000 * 60 * 60 * 24));
        
        return {
            currentStreak: streak,
            lastPlayed: lastPlayed,
            daysSinceLastPlayed: daysSinceLastPlayed,
            isActive: daysSinceLastPlayed <= 1
        };
    },
    
    // Get achievements summary
    getAchievements: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        return {
            totalBadges: profile.badges.length,
            badges: profile.badges,
            recentBadges: profile.badges.slice(-3).reverse()
        };
    },
    
    // Get learning stats for parent dashboard
    getParentStats: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        const progress = this.getOverallProgress();
        const timeSpent = this.getTimeSpent();
        const streak = this.getStreakInfo();
        
        return {
            childName: profile.name,
            memberSince: profile.createdAt,
            storiesCompleted: progress.storiesCompleted,
            totalStories: progress.totalStories,
            starsEarned: progress.starsEarned,
            badgesEarned: profile.badges.length,
            currentStreak: streak.currentStreak,
            estimatedTimeSpent: timeSpent,
            lastActive: profile.lastPlayed
        };
    },
    
    // Get next milestone
    getNextMilestone: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        const milestones = [
            { stars: 5, message: 'Earn 5 stars!', icon: '⭐' },
            { stars: 10, message: 'Earn 10 stars!', icon: '🌟' },
            { stars: 15, message: 'Earn 15 stars!', icon: '✨' },
            { stars: 21, message: 'Earn all 21 stars!', icon: '🌠' },
            { stories: 1, message: 'Complete your first story!', icon: '📖' },
            { stories: 3, message: 'Complete 3 stories!', icon: '📚' },
            { stories: 5, message: 'Complete 5 stories!', icon: '📖' },
            { stories: 7, message: 'Complete all stories!', icon: '🎓' },
            { streak: 3, message: 'Maintain a 3-day streak!', icon: '🔥' },
            { streak: 7, message: 'Maintain a 7-day streak!', icon: '🔥🔥' }
        ];
        
        // Find next uncompleted milestone
        for (const milestone of milestones) {
            if (milestone.stars && profile.starsEarned < milestone.stars) {
                return {
                    ...milestone,
                    progress: profile.starsEarned,
                    target: milestone.stars,
                    type: 'stars'
                };
            }
            if (milestone.stories && profile.storiesCompleted.length < milestone.stories) {
                return {
                    ...milestone,
                    progress: profile.storiesCompleted.length,
                    target: milestone.stories,
                    type: 'stories'
                };
            }
            if (milestone.streak && profile.streak < milestone.streak) {
                return {
                    ...milestone,
                    progress: profile.streak,
                    target: milestone.streak,
                    type: 'streak'
                };
            }
        }
        
        return {
            message: 'You completed all milestones! 🎉',
            icon: '🏆',
            completed: true
        };
    },
    
    // Get recommended next story
    getRecommendedStory: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return 1;
        
        const completedIds = profile.storiesCompleted.map(s => s.storyId);
        
        // Find first uncompleted story (start with 0, 00, then 1-6)
        const storyOrder = [0, '00', 1, 2, 3, 4, 5, 6];
        for (const id of storyOrder) {
            if (!completedIds.includes(id)) {
                return id;
            }
        }
        
        // All completed, recommend story with lowest stars
        let lowestStars = 3;
        let recommendedId = 1;
        
        profile.storiesCompleted.forEach(story => {
            if (story.stars < lowestStars) {
                lowestStars = story.stars;
                recommendedId = story.storyId;
            }
        });
        
        return recommendedId;
    },
    
    // Get daily goal progress
    getDailyGoal: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        const today = new Date().toDateString();
        const lastPlayed = new Date(profile.lastPlayed).toDateString();
        
        const completedToday = today === lastPlayed;
        
        return {
            completed: completedToday,
            message: completedToday ? 
                'Great job! You learned today! 🎉' : 
                'Start learning to complete your daily goal! 📚'
        };
    },
    
    // Export progress report
    exportProgressReport: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return;
        
        const progress = this.getOverallProgress();
        const stats = this.getParentStats();
        const stories = this.getAllStoriesProgress();
        
        const report = {
            generatedAt: new Date().toISOString(),
            profile: {
                name: profile.name,
                memberSince: profile.createdAt
            },
            progress: progress,
            stories: stories,
            badges: profile.badges,
            stats: stats
        };
        
        const reportText = this.formatProgressReport(report);
        
        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `codeville-progress-${profile.name}-${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
        
        URL.revokeObjectURL(url);
    },
    
    // Format progress report as text
    formatProgressReport: function(report) {
        const lines = [];
        
        lines.push('═══════════════════════════════════════');
        lines.push('   CODEVILLE PROGRESS REPORT');
        lines.push('═══════════════════════════════════════');
        lines.push('');
        lines.push(`Student: ${report.profile.name}`);
        lines.push(`Member Since: ${new Date(report.profile.memberSince).toLocaleDateString()}`);
        lines.push(`Report Generated: ${new Date(report.generatedAt).toLocaleString()}`);
        lines.push('');
        lines.push('───────────────────────────────────────');
        lines.push('OVERALL PROGRESS');
        lines.push('───────────────────────────────────────');
        lines.push(`Stories Completed: ${report.progress.storiesCompleted}/${report.progress.totalStories} (${report.progress.storyProgress}%)`);
        lines.push(`Stars Earned: ${report.progress.starsEarned}/${report.progress.totalPossibleStars} (${report.progress.starProgress}%)`);
        lines.push(`Badges Earned: ${report.progress.badges}`);
        lines.push(`Current Streak: ${report.progress.streak} days`);
        lines.push(`Estimated Time Spent: ${report.stats.estimatedTimeSpent} minutes`);
        lines.push('');
        lines.push('───────────────────────────────────────');
        lines.push('STORY PROGRESS');
        lines.push('───────────────────────────────────────');
        
        report.stories.forEach(story => {
            const status = story.progress.completed ? '✓' : '○';
            const stars = '⭐'.repeat(story.progress.stars);
            lines.push(`${status} ${story.icon} ${story.name}: ${stars || 'Not started'}`);
        });
        
        lines.push('');
        lines.push('───────────────────────────────────────');
        lines.push('BADGES EARNED');
        lines.push('───────────────────────────────────────');
        
        if (report.badges.length > 0) {
            report.badges.forEach(badge => {
                const badgeData = Badges[badge.id];
                if (badgeData) {
                    lines.push(`${badgeData.icon} ${badgeData.name}`);
                    lines.push(`   ${badgeData.description}`);
                    lines.push(`   Earned: ${new Date(badge.earnedAt).toLocaleDateString()}`);
                    lines.push('');
                }
            });
        } else {
            lines.push('No badges earned yet.');
        }
        
        lines.push('───────────────────────────────────────');
        lines.push('SKILLS DEVELOPED');
        lines.push('───────────────────────────────────────');
        lines.push('✓ Logical thinking and problem solving');
        lines.push('✓ Pattern recognition');
        lines.push('✓ Sequential thinking');
        lines.push('✓ Decision making');
        lines.push('✓ Creative thinking');
        lines.push('');
        lines.push('═══════════════════════════════════════');
        lines.push('   Keep up the great work!');
        lines.push('═══════════════════════════════════════');
        
        return lines.join('\n');
    }
};

// Initialize dashboard if on dashboard.html
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadDashboard();
    });
}

function loadDashboard() {
    const profile = ProfileManager.getProfile();
    
    if (!profile) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update streak
    ProfileManager.updateStreak();
    
    // Check for new badges
    checkBadges();
    
    // Display progress
    displayDashboardProgress();
    
    // Display stories
    displayStoriesProgress();
    
    // Display badges
    displayDashboardBadges();
    
    // Display next milestone
    displayNextMilestone();
}

function displayDashboardProgress() {
    const progress = ProgressTracker.getOverallProgress();
    if (!progress) return;
    
    // Update progress bars
    updateProgressBar('storyProgressBar', progress.storyProgress);
    updateProgressBar('starProgressBar', progress.starProgress);
    
    // Update stats
    updateStat('totalStars', progress.starsEarned);
    updateStat('totalBadges', progress.badges);
    updateStat('currentStreak', progress.streak);
    updateStat('storiesCompleted', `${progress.storiesCompleted}/${progress.totalStories}`);
}

function updateProgressBar(id, percentage) {
    const bar = document.getElementById(id);
    if (bar) {
        bar.style.width = percentage + '%';
        bar.textContent = percentage + '%';
    }
}

function updateStat(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function displayStoriesProgress() {
    const stories = ProgressTracker.getAllStoriesProgress();
    const container = document.getElementById('storiesProgressContainer');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    stories.forEach(story => {
        const storyCard = createStoryProgressCard(story);
        container.appendChild(storyCard);
    });
}

function createStoryProgressCard(story) {
    const card = document.createElement('div');
    card.className = 'story-progress-card';
    
    const stars = '⭐'.repeat(story.progress.stars) + '☆'.repeat(3 - story.progress.stars);
    const status = story.progress.completed ? 'Completed' : 'Not Started';
    const statusClass = story.progress.completed ? 'completed' : 'locked';
    
    card.innerHTML = `
        <div class="story-icon">${story.icon}</div>
        <h3 class="story-name">${story.name}</h3>
        <div class="story-stars">${stars}</div>
        <div class="story-status ${statusClass}">${status}</div>
        <button class="play-button" onclick="playStory(${story.id})">
            ${story.progress.completed ? 'Play Again' : 'Start Story'}
        </button>
    `;
    
    return card;
}

function displayDashboardBadges() {
    const achievements = ProgressTracker.getAchievements();
    if (!achievements) return;
    
    const container = document.getElementById('badgesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (achievements.badges.length === 0) {
        container.innerHTML = '<p class="text-center">Complete stories to earn badges! 🏆</p>';
        return;
    }
    
    achievements.recentBadges.forEach(badge => {
        const badgeData = Badges[badge.id];
        if (!badgeData) return;
        
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge-display';
        badgeElement.innerHTML = `
            <div class="badge-icon-large">${badgeData.icon}</div>
            <div class="badge-name">${badgeData.name}</div>
        `;
        
        container.appendChild(badgeElement);
    });
}

function displayNextMilestone() {
    const milestone = ProgressTracker.getNextMilestone();
    if (!milestone) return;
    
    const container = document.getElementById('nextMilestone');
    if (!container) return;
    
    if (milestone.completed) {
        container.innerHTML = `
            <div class="milestone-completed">
                <div class="milestone-icon">${milestone.icon}</div>
                <div class="milestone-message">${milestone.message}</div>
            </div>
        `;
    } else {
        const percentage = Math.round((milestone.progress / milestone.target) * 100);
        container.innerHTML = `
            <div class="milestone-active">
                <div class="milestone-icon">${milestone.icon}</div>
                <div class="milestone-message">${milestone.message}</div>
                <div class="milestone-progress">
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${percentage}%">
                            ${milestone.progress}/${milestone.target}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function playStory(storyId) {
    const storySlug = getStorySlug(storyId);
    window.location.href = `stories/story${storyId}-${storySlug}.html`;
}

function getStorySlug(storyId) {
    const slugs = {
        '0': 'cody-name-tag',
        '00': 'cody-toy-sorter',
        '1': 'magic-table',
        '2': 'dancing-robot',
        '3': 'weather-wardrobe',
        '4': 'magic-box',
        '5': 'recipe-robot',
        '6': 'magic-door-keeper'
    };
    // Convert storyId to string for consistent lookup
    return slugs[String(storyId)] || 'story';
}

// Make ProgressTracker available globally
window.ProgressTracker = ProgressTracker;

console.log('📊 Progress Tracker loaded!');

// Made with Bob
