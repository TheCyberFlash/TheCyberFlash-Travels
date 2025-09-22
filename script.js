// TheCyberFlash Travels - Main JavaScript
class TravelersApp {
    constructor() {
        this.animals = [];
        this.baseWeekDate = null;
        this.init();
    }

    async init() {
        this.setupThemeToggle();
        await this.loadData();
        this.render();
    }

    // Theme management
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Data loading
    async loadData() {
        try {
            const response = await fetch('./data/animals.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.animals = data.animals;
            this.calculateBaseWeek();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load character data. Please try again later.');
        }
    }

    // Calculate the base week (earliest unlock date becomes Week 1)
    calculateBaseWeek() {
        if (this.animals.length === 0) return;
        
        const dates = this.animals.map(animal => new Date(animal.unlockDate));
        this.baseWeekDate = new Date(Math.min(...dates));
    }

    // Get week number for a given date
    getWeekNumber(date) {
        if (!this.baseWeekDate) return 1;
        
        const diffTime = date - this.baseWeekDate;
        const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
        return diffWeeks + 1;
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    // Check if date is today
    isToday(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    // Sort animals: live ones first, then by unlock date
    getSortedAnimals() {
        return [...this.animals].sort((a, b) => {
            // Live animals first
            if (a.status === 'live' && b.status !== 'live') return -1;
            if (b.status === 'live' && a.status !== 'live') return 1;
            
            // Then sort by unlock date
            return new Date(a.unlockDate) - new Date(b.unlockDate);
        });
    }

    // Render the entire application
    render() {
        if (this.animals.length === 0) {
            this.showLoading();
            return;
        }

        this.renderGallery();
        this.renderTimeline();
    }

    // Show loading state
    showLoading() {
        const gallery = document.getElementById('gallery-grid');
        const timeline = document.getElementById('timeline-list');
        
        gallery.innerHTML = '<div class="loading">Loading characters...</div>';
        timeline.innerHTML = '<div class="loading">Loading timeline...</div>';
    }

    // Show error message
    showError(message) {
        const gallery = document.getElementById('gallery-grid');
        const timeline = document.getElementById('timeline-list');
        
        const errorHtml = `<div class="error" style="text-align: center; color: var(--text-muted); padding: 2rem;">${message}</div>`;
        gallery.innerHTML = errorHtml;
        timeline.innerHTML = errorHtml;
    }

    // Render character gallery
    renderGallery() {
        const gallery = document.getElementById('gallery-grid');
        const sortedAnimals = this.getSortedAnimals();
        
        gallery.innerHTML = sortedAnimals.map(animal => this.createCharacterCard(animal)).join('');
        
        // Add click handlers for live cards
        gallery.querySelectorAll('.character-card.live').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const marketLink = card.dataset.marketLink;
                if (marketLink) {
                    window.open(marketLink, '_blank', 'noopener,noreferrer');
                }
            });
            
            // Make cards keyboard accessible
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    // Create individual character card HTML
    createCharacterCard(animal) {
        const isLive = animal.status === 'live';
        const unlockDate = this.formatDate(animal.unlockDate);
        
        return `
            <article class="character-card ${animal.status}" 
                     data-market-link="${animal.marketLink || ''}"
                     aria-label="${animal.name} - ${isLive ? 'Available now' : 'Coming soon'}">
                
                <img src="${animal.promoImage}" 
                     alt="${animal.name} promotional image" 
                     class="character-image"
                     loading="lazy">
                
                ${!isLive ? this.createLockOverlay(unlockDate) : ''}
                
                <div class="character-info">
                    <div class="character-header">
                        <span class="character-emoji" aria-hidden="true">${animal.emoji}</span>
                        <h3 class="character-name">${animal.name}</h3>
                    </div>
                    
                    <p class="character-bio">${animal.bio}</p>
                    
                    ${isLive && animal.marketLink ? 
                        `<a href="${animal.marketLink}" 
                            class="market-link" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onclick="event.stopPropagation()">
                            View on Magic Eden
                        </a>` : 
                        ''
                    }
                </div>
            </article>
        `;
    }

    // Create lock overlay for locked cards
    createLockOverlay(unlockDate) {
        return `
            <div class="lock-overlay" aria-live="polite">
                <svg class="lock-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10H20C20.5523 10 21 10.4477 21 11V20C21 20.5523 20.4477 21 20 21H4C3.44772 21 3 20.5523 3 20V11C3 10.4477 3.44772 10 4 10H6ZM8 10H16V8C16 6.89543 15.1046 6 14 6H10C8.89543 6 8 6.89543 8 8V10Z"/>
                </svg>
                <div class="coming-soon-text">Coming Soon</div>
                <div class="unlock-date">Unlocks ${unlockDate}</div>
            </div>
        `;
    }

    // Render timeline
    renderTimeline() {
        const timeline = document.getElementById('timeline-list');
        const sortedAnimals = this.getSortedAnimals();
        const today = new Date();
        
        timeline.innerHTML = sortedAnimals.map(animal => {
            const unlockDate = new Date(animal.unlockDate);
            const weekNumber = this.getWeekNumber(unlockDate);
            const isLive = animal.status === 'live';
            const isCurrent = this.isToday(animal.unlockDate) || (unlockDate <= today && !isLive);
            
            let statusText;
            if (isLive) {
                statusText = '<span class="timeline-status live">Live now</span>';
            } else if (unlockDate <= today) {
                statusText = '<span class="timeline-status">Available soon</span>';
            } else {
                statusText = `<span class="timeline-status">Unlocks ${this.formatDate(animal.unlockDate)}</span>`;
            }
            
            const characterName = isLive ? `${animal.name} ${animal.emoji}` : '???';
            
            return `
                <div class="timeline-item ${isCurrent ? 'current' : ''}" 
                     aria-label="Week ${weekNumber}: ${isLive ? animal.name : 'Mystery character'}">
                    <div class="timeline-week">Week ${weekNumber}:</div>
                    <div class="timeline-character">${characterName}</div>
                    <div>${statusText}</div>
                </div>
            `;
        }).join('');
    }
}

// Error handling for failed image loads
document.addEventListener('DOMContentLoaded', () => {
    // Handle image loading errors
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.style.backgroundColor = '#f3f4f6';
            e.target.style.display = 'flex';
            e.target.style.alignItems = 'center';
            e.target.style.justifyContent = 'center';
            e.target.alt = 'Image not available';
        }
    }, true);
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TravelersApp();
});

// Handle service worker registration for PWA features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Only register if we have a service worker file
        fetch('./sw.js', { method: 'HEAD' })
            .then(() => {
                navigator.serviceWorker.register('./sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            })
            .catch(() => {
                // Service worker file doesn't exist, skip registration
            });
    });
}
