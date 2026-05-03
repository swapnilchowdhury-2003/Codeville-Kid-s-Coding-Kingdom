// ===================================
// ENHANCED SOUND MANAGER
// Volume controls & better sound handling
// ===================================

class SoundManager {
    constructor() {
        this.sounds = {};
        this.volume = 0.5; // Default 50%
        this.muted = false;
        this.soundsEnabled = true;
        
        // Sound file mappings with fallbacks
        this.soundFiles = {
            'click': 'sounds/click.mp3',
            'success': 'sounds/success.mp3',
            'error': 'sounds/error.mp3',
            'pop': 'sounds/pop.mp3',
            'whoosh': 'sounds/whoosh.mp3',
            'star': 'sounds/success.mp3',      // Fallback to success
            'badge': 'sounds/success.mp3',     // Fallback to success
            'celebration': 'sounds/success.mp3' // Fallback to success
        };
        
        this.init();
    }
    
    init() {
        console.log('🔊 Sound Manager initialized!');
        
        // Load saved settings
        this.loadSettings();
        
        // Preload sounds
        this.preloadSounds();
        
        // Create volume control UI
        this.createVolumeControl();
        
        // Update UI
        this.updateVolumeUI();
    }
    
    loadSettings() {
        // Load volume
        const savedVolume = localStorage.getItem('codevilleVolume');
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
        }
        
        // Load mute state
        const savedMuted = localStorage.getItem('codevilleMuted');
        if (savedMuted !== null) {
            this.muted = savedMuted === 'true';
        }
        
        // Load sounds enabled state
        const savedSoundsEnabled = localStorage.getItem('soundsEnabled');
        if (savedSoundsEnabled !== null) {
            this.soundsEnabled = savedSoundsEnabled === 'true';
        }
    }
    
    saveSettings() {
        localStorage.setItem('codevilleVolume', this.volume.toString());
        localStorage.setItem('codevilleMuted', this.muted.toString());
        localStorage.setItem('soundsEnabled', this.soundsEnabled.toString());
    }
    
    preloadSounds() {
        // Determine path prefix based on current location
        const isInSubfolder = window.location.pathname.includes('/stories/');
        const pathPrefix = isInSubfolder ? '../' : '';
        
        // Preload all sounds
        Object.keys(this.soundFiles).forEach(soundName => {
            const audio = new Audio(pathPrefix + this.soundFiles[soundName]);
            audio.preload = 'auto';
            this.sounds[soundName] = audio;
        });
        
        console.log('✅ Sounds preloaded:', Object.keys(this.sounds).length);
    }
    
    play(soundName) {
        if (!this.soundsEnabled || this.muted) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            // Clone the audio to allow overlapping sounds
            const audioClone = sound.cloneNode();
            audioClone.volume = this.volume;
            
            audioClone.play().catch(err => {
                console.log('Sound play failed:', soundName, err.message);
            });
        } else {
            console.warn('Sound not found:', soundName);
        }
    }
    
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        this.saveSettings();
        this.updateVolumeUI();
        
        // Play test sound
        this.play('click');
    }
    
    toggleMute() {
        this.muted = !this.muted;
        this.saveSettings();
        this.updateVolumeUI();
        
        // Show message
        const message = this.muted ? '🔇 Sounds muted' : '🔊 Sounds unmuted';
        if (window.Codeville && window.Codeville.showMessage) {
            window.Codeville.showMessage(message, 'info');
        }
        
        return this.muted;
    }
    
    toggleSounds() {
        this.soundsEnabled = !this.soundsEnabled;
        this.saveSettings();
        
        const message = this.soundsEnabled ? '🔊 Sounds enabled' : '🔇 Sounds disabled';
        if (window.Codeville && window.Codeville.showMessage) {
            window.Codeville.showMessage(message, 'info');
        }
        
        return this.soundsEnabled;
    }
    
    createVolumeControl() {
        // Check if control already exists
        if (document.getElementById('soundControls')) return;
        
        const controlsHTML = `
            <div id="soundControls" class="sound-controls">
                <button id="muteToggle" class="sound-button" title="Mute/Unmute">
                    <span class="sound-icon">🔊</span>
                </button>
                <div class="volume-slider-container">
                    <input type="range" id="volumeSlider" class="volume-slider" 
                           min="0" max="100" value="${this.volume * 100}" 
                           title="Volume">
                    <div class="volume-label">${Math.round(this.volume * 100)}%</div>
                </div>
            </div>
        `;
        
        // Add to page after DOM is loaded
        if (document.body) {
            document.body.insertAdjacentHTML('beforeend', controlsHTML);
            this.attachEventListeners();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.insertAdjacentHTML('beforeend', controlsHTML);
                this.attachEventListeners();
            });
        }
    }
    
    attachEventListeners() {
        const muteToggle = document.getElementById('muteToggle');
        const volumeSlider = document.getElementById('volumeSlider');
        
        if (muteToggle) {
            muteToggle.addEventListener('click', () => {
                this.toggleMute();
            });
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
    }
    
    updateVolumeUI() {
        const muteToggle = document.getElementById('muteToggle');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeLabel = document.querySelector('.volume-label');
        const soundIcon = document.querySelector('.sound-icon');
        
        if (muteToggle) {
            muteToggle.classList.toggle('muted', this.muted);
        }
        
        if (soundIcon) {
            soundIcon.textContent = this.muted ? '🔇' : '🔊';
        }
        
        if (volumeSlider) {
            volumeSlider.value = this.volume * 100;
        }
        
        if (volumeLabel) {
            volumeLabel.textContent = `${Math.round(this.volume * 100)}%`;
        }
    }
    
    // Play multiple sounds in sequence
    playSequence(soundNames, delay = 300) {
        soundNames.forEach((soundName, index) => {
            setTimeout(() => {
                this.play(soundName);
            }, index * delay);
        });
    }
    
    // Play celebration sound effect
    playCelebration() {
        this.playSequence(['success', 'pop', 'whoosh'], 200);
    }
}

// Initialize when DOM is ready
let soundManager = null;

document.addEventListener('DOMContentLoaded', () => {
    soundManager = new SoundManager();
});

// Export for global access
window.SoundManager = SoundManager;
window.soundManager = soundManager;

// Also update the global Codeville object if it exists
if (window.Codeville) {
    window.Codeville.soundManager = soundManager;
}

// Made with Bob
