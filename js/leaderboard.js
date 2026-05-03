// ===================================
// CODEVILLE - LEADERBOARD SYSTEM
// Competition and Rankings
// ===================================

const LeaderboardManager = {
    
    // Get all players from localStorage (simulated for demo)
    getAllPlayers: function() {
        // In a real app, this would come from a server
        // For demo, we'll generate sample data and include current player
        
        const currentProfile = ProfileManager.getProfile();
        const players = [];
        
        // Add current player if exists
        if (currentProfile) {
            players.push({
                name: currentProfile.name,
                avatar: currentProfile.avatar,
                starsEarned: currentProfile.starsEarned,
                badges: currentProfile.badges.length,
                storiesCompleted: currentProfile.storiesCompleted.length,
                streak: currentProfile.streak,
                isCurrentPlayer: true
            });
        }
        
        // Add sample players for demo
        const samplePlayers = this.generateSamplePlayers();
        players.push(...samplePlayers);
        
        return players;
    },
    
    // Generate sample players for demo
    generateSamplePlayers: function() {
        const names = [
            'Emma', 'Liam', 'Sophia', 'Noah', 'Olivia', 
            'Ava', 'Ethan', 'Mia', 'Lucas', 'Isabella',
            'Mason', 'Charlotte', 'Logan', 'Amelia', 'Oliver'
        ];
        
        const avatars = ['🐱', '🐶', '🐼', '🦁', '🐸', '🦄', '🤖', '🐙'];
        
        const players = [];
        
        for (let i = 0; i < 15; i++) {
            // Generate random but realistic stats
            const storiesCompleted = Math.floor(Math.random() * 8);
            const starsEarned = storiesCompleted * 2 + Math.floor(Math.random() * storiesCompleted);
            const badges = Math.floor(storiesCompleted / 2);
            const streak = Math.floor(Math.random() * 10);
            
            players.push({
                name: names[i],
                avatar: avatars[Math.floor(Math.random() * avatars.length)],
                starsEarned: starsEarned,
                badges: badges,
                storiesCompleted: storiesCompleted,
                streak: streak,
                isCurrentPlayer: false
            });
        }
        
        return players;
    },
    
    // Get ranked leaderboard
    getRankedLeaderboard: function() {
        const players = this.getAllPlayers();
        
        // Sort by stars (primary), then badges (secondary), then streak (tertiary)
        players.sort((a, b) => {
            if (b.starsEarned !== a.starsEarned) {
                return b.starsEarned - a.starsEarned;
            }
            if (b.badges !== a.badges) {
                return b.badges - a.badges;
            }
            return b.streak - a.streak;
        });
        
        // Add rank to each player
        players.forEach((player, index) => {
            player.rank = index + 1;
        });
        
        return players;
    },
    
    // Get top 10 players
    getTop10: function() {
        const ranked = this.getRankedLeaderboard();
        return ranked.slice(0, 10);
    },
    
    // Get current player's rank
    getCurrentPlayerRank: function() {
        const ranked = this.getRankedLeaderboard();
        const currentPlayer = ranked.find(p => p.isCurrentPlayer);
        return currentPlayer ? currentPlayer.rank : null;
    },
    
    // Get players around current player (for context)
    getPlayersAroundCurrent: function(range = 2) {
        const ranked = this.getRankedLeaderboard();
        const currentIndex = ranked.findIndex(p => p.isCurrentPlayer);
        
        if (currentIndex === -1) return [];
        
        const start = Math.max(0, currentIndex - range);
        const end = Math.min(ranked.length, currentIndex + range + 1);
        
        return ranked.slice(start, end);
    },
    
    // Get weekly stats (simulated)
    getWeeklyStats: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return null;
        
        return {
            starsThisWeek: Math.floor(profile.starsEarned * 0.6), // Simulate weekly progress
            storiesThisWeek: Math.floor(profile.storiesCompleted.length * 0.5),
            rankChange: Math.floor(Math.random() * 5) - 2, // Random rank change
            totalPlayers: this.getAllPlayers().length
        };
    },
    
    // Get achievement milestones
    getAchievementMilestones: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return [];
        
        const milestones = [
            {
                title: 'First Steps',
                description: 'Complete your first story',
                icon: '🎯',
                achieved: profile.storiesCompleted.length >= 1,
                progress: Math.min(profile.storiesCompleted.length, 1),
                target: 1
            },
            {
                title: 'Star Collector',
                description: 'Earn 10 stars',
                icon: '⭐',
                achieved: profile.starsEarned >= 10,
                progress: Math.min(profile.starsEarned, 10),
                target: 10
            },
            {
                title: 'Story Master',
                description: 'Complete 5 stories',
                icon: '📚',
                achieved: profile.storiesCompleted.length >= 5,
                progress: Math.min(profile.storiesCompleted.length, 5),
                target: 5
            },
            {
                title: 'Streak Champion',
                description: 'Maintain a 7-day streak',
                icon: '🔥',
                achieved: profile.streak >= 7,
                progress: Math.min(profile.streak, 7),
                target: 7
            },
            {
                title: 'Badge Hunter',
                description: 'Earn 5 badges',
                icon: '🏆',
                achieved: profile.badges.length >= 5,
                progress: Math.min(profile.badges.length, 5),
                target: 5
            },
            {
                title: 'Perfect Score',
                description: 'Earn all 21 stars',
                icon: '🌟',
                achieved: profile.starsEarned >= 21,
                progress: Math.min(profile.starsEarned, 21),
                target: 21
            }
        ];
        
        return milestones;
    },
    
    // Get rank badge/medal
    getRankBadge: function(rank) {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        if (rank <= 10) return '🏅';
        return '⭐';
    },
    
    // Get rank color
    getRankColor: function(rank) {
        if (rank === 1) return '#FFD700'; // Gold
        if (rank === 2) return '#C0C0C0'; // Silver
        if (rank === 3) return '#CD7F32'; // Bronze
        if (rank <= 10) return '#4A90E2'; // Blue
        return '#95A5A6'; // Gray
    },
    
    // Share score (simulated)
    shareScore: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return;
        
        const rank = this.getCurrentPlayerRank();
        const message = `🏰 I'm rank #${rank} in Codeville! I've earned ${profile.starsEarned} stars and completed ${profile.storiesCompleted.length} stories! Can you beat my score? 🎮`;
        
        // In a real app, this would use Web Share API or social media APIs
        // For now, we'll copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(message).then(() => {
                showNotification('Score copied to clipboard! 📋', 'success');
            });
        } else {
            showNotification('Share feature coming soon! 🚀', 'info');
        }
    },
    
    // Challenge a friend (simulated)
    challengeFriend: function() {
        const profile = ProfileManager.getProfile();
        if (!profile) return;
        
        const message = `🎮 ${profile.name} challenges you to beat their Codeville score!\n⭐ Stars: ${profile.starsEarned}\n📚 Stories: ${profile.storiesCompleted.length}\n\nCan you do better? Join Codeville now!`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(message).then(() => {
                showNotification('Challenge copied! Send it to a friend! 🎯', 'success');
            });
        } else {
            showNotification('Challenge feature coming soon! 🚀', 'info');
        }
    }
};

// Initialize leaderboard if on leaderboard.html
if (window.location.pathname.includes('leaderboard.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadLeaderboard();
    });
}

function loadLeaderboard() {
    const profile = ProfileManager.getProfile();
    
    if (!profile) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display leaderboard sections
    displayCurrentPlayerCard();
    displayTop10();
    displayWeeklyStats();
    displayAchievements();
}

function displayCurrentPlayerCard() {
    const profile = ProfileManager.getProfile();
    const rank = LeaderboardManager.getCurrentPlayerRank();
    const container = document.getElementById('currentPlayerCard');
    
    if (!container || !profile) return;
    
    const rankBadge = LeaderboardManager.getRankBadge(rank);
    const rankColor = LeaderboardManager.getRankColor(rank);
    
    container.innerHTML = `
        <div class="player-avatar-large">${profile.avatar}</div>
        <div class="player-info">
            <h2 class="player-name">${profile.name}</h2>
            <div class="player-rank" style="color: ${rankColor};">
                ${rankBadge} Rank #${rank}
            </div>
        </div>
        <div class="player-stats-grid">
            <div class="stat-item">
                <div class="stat-icon">⭐</div>
                <div class="stat-value">${profile.starsEarned}</div>
                <div class="stat-label">Stars</div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">📚</div>
                <div class="stat-value">${profile.storiesCompleted.length}</div>
                <div class="stat-label">Stories</div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">🏆</div>
                <div class="stat-value">${profile.badges.length}</div>
                <div class="stat-label">Badges</div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">🔥</div>
                <div class="stat-value">${profile.streak}</div>
                <div class="stat-label">Streak</div>
            </div>
        </div>
    `;
}

function displayTop10() {
    const top10 = LeaderboardManager.getTop10();
    const container = document.getElementById('top10Container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    top10.forEach(player => {
        const playerCard = createLeaderboardCard(player);
        container.appendChild(playerCard);
    });
}

function createLeaderboardCard(player) {
    const card = document.createElement('div');
    card.className = 'leaderboard-card' + (player.isCurrentPlayer ? ' current-player' : '');
    
    const rankBadge = LeaderboardManager.getRankBadge(player.rank);
    const rankColor = LeaderboardManager.getRankColor(player.rank);
    
    card.innerHTML = `
        <div class="rank-badge" style="color: ${rankColor};">
            <div class="rank-icon">${rankBadge}</div>
            <div class="rank-number">#${player.rank}</div>
        </div>
        <div class="player-avatar">${player.avatar}</div>
        <div class="player-details">
            <div class="player-name">${player.name}${player.isCurrentPlayer ? ' (You!)' : ''}</div>
            <div class="player-stats">
                <span class="stat">⭐ ${player.starsEarned}</span>
                <span class="stat">🏆 ${player.badges}</span>
                <span class="stat">🔥 ${player.streak}</span>
            </div>
        </div>
    `;
    
    return card;
}

function displayWeeklyStats() {
    const stats = LeaderboardManager.getWeeklyStats();
    const container = document.getElementById('weeklyStats');
    
    if (!container || !stats) return;
    
    const rankChangeIcon = stats.rankChange > 0 ? '📈' : stats.rankChange < 0 ? '📉' : '➡️';
    const rankChangeText = stats.rankChange > 0 ? `+${stats.rankChange}` : stats.rankChange;
    
    container.innerHTML = `
        <div class="weekly-stat">
            <div class="weekly-stat-icon">⭐</div>
            <div class="weekly-stat-value">${stats.starsThisWeek}</div>
            <div class="weekly-stat-label">Stars This Week</div>
        </div>
        <div class="weekly-stat">
            <div class="weekly-stat-icon">📚</div>
            <div class="weekly-stat-value">${stats.storiesThisWeek}</div>
            <div class="weekly-stat-label">Stories This Week</div>
        </div>
        <div class="weekly-stat">
            <div class="weekly-stat-icon">${rankChangeIcon}</div>
            <div class="weekly-stat-value">${rankChangeText}</div>
            <div class="weekly-stat-label">Rank Change</div>
        </div>
        <div class="weekly-stat">
            <div class="weekly-stat-icon">👥</div>
            <div class="weekly-stat-value">${stats.totalPlayers}</div>
            <div class="weekly-stat-label">Total Players</div>
        </div>
    `;
}

function displayAchievements() {
    const milestones = LeaderboardManager.getAchievementMilestones();
    const container = document.getElementById('achievementsContainer');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    milestones.forEach(milestone => {
        const achievementCard = createAchievementCard(milestone);
        container.appendChild(achievementCard);
    });
}

function createAchievementCard(milestone) {
    const card = document.createElement('div');
    card.className = 'achievement-card' + (milestone.achieved ? ' achieved' : '');
    
    const percentage = Math.round((milestone.progress / milestone.target) * 100);
    
    card.innerHTML = `
        <div class="achievement-icon">${milestone.icon}</div>
        <div class="achievement-details">
            <div class="achievement-title">${milestone.title}</div>
            <div class="achievement-description">${milestone.description}</div>
            ${milestone.achieved ? 
                '<div class="achievement-status achieved">✅ Completed!</div>' :
                `<div class="achievement-progress">
                    <div class="progress-bar-mini">
                        <div class="progress-fill-mini" style="width: ${percentage}%"></div>
                    </div>
                    <div class="progress-text">${milestone.progress}/${milestone.target}</div>
                </div>`
            }
        </div>
    `;
    
    return card;
}

// Make LeaderboardManager available globally
window.LeaderboardManager = LeaderboardManager;

console.log('🏆 Leaderboard Manager loaded!');

// Made with Bob