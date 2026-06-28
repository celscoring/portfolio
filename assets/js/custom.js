document.addEventListener('DOMContentLoaded', function() {
    
    // --- VIDEO PLAYER INITIALIZATION ---
    const videoPlayers = Plyr.setup('.custom-video-player', {
        ratio: '16:9'
    });

    // --- AUDIO PLAYER INITIALIZATION WITH HOVER PLUGIN ---
    const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'rgba(255, 255, 255, 0.3)', 
        progressColor: '#5ba4e5',             
        cursorColor: 'transparent',
        barWidth: 2,
        barRadius: 3,
        height: 80,
        normalize: true,
        plugins: [
            WaveSurfer.Hover.create({
                lineColor: '#ffffff',
                lineWidth: 2,
                labelBackground: 'rgba(0, 0, 0, 0.75)',
                labelColor: '#fff',
                labelSize: '12px',
            }),
        ],
    });

    const playBtn = document.getElementById('main-play-btn');
    const playIcon = playBtn.querySelector('.icon');
    const tracks = document.querySelectorAll('#tracklist li.track-item');

    // --- INITIALIZE FIRST TRACK ---
    tracks[0].classList.add('active-track');
    let currentTrackUrl = tracks[0].getAttribute('data-url');
    wavesurfer.load(currentTrackUrl);

    // Play/Pause Button Logic
    playBtn.addEventListener('click', () => {
        wavesurfer.playPause();
    });

    // Swap FontAwesome icons via class toggles
    wavesurfer.on('play', () => {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    });

    wavesurfer.on('pause', () => {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    });

    // --- VOLUME SLIDER LOGIC ---
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.querySelector('.volume-container .icon');
    
    volumeSlider.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        wavesurfer.setVolume(vol);
        
        if (vol === 0) {
            volumeIcon.className = 'icon solid fa-volume-mute';
        } else if (vol < 0.5) {
            volumeIcon.className = 'icon solid fa-volume-down';
        } else {
            volumeIcon.className = 'icon solid fa-volume-up';
        }
    });

    // --- TRACKLIST CLICK LOGIC ---
    tracks.forEach(track => {
        track.addEventListener('click', function() {
            const newUrl = this.getAttribute('data-url');
            
            if (newUrl === currentTrackUrl) {
                wavesurfer.playPause();
                return;
            }

            // Reset all tracks
            tracks.forEach(t => t.classList.remove('active-track'));
            
            // Highlight clicked track
            this.classList.add('active-track');
            
            currentTrackUrl = newUrl;
            wavesurfer.load(newUrl);
            wavesurfer.on('ready', () => {
                wavesurfer.play();
            }, { once: true }); 
        });
    });

    // --- APPLE DOCK HOVER MAGNIFY EFFECT (FLUID 60FPS UPGRADE) ---
    const tracklistContainer = document.getElementById('tracklist');
    let mouseY = 0;
    let isHoveringList = false;
    let rafId = null;

    function updateDock() {
        if (!isHoveringList) return;

        tracks.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterY = rect.top + rect.height / 2;
            const distance = Math.abs(mouseY - itemCenterY);
            
            const maxDistance = 150; 
            
            if (distance < maxDistance) {
                const scale = 1 + (0.08 * (1 - distance / maxDistance));
                item.style.fontSize = `${scale}em`;
                item.style.padding = `${1.25 * scale}em 1.5em`;
            } else {
                item.style.fontSize = '1em';
                item.style.padding = '1.25em 1.5em';
            }
        });

        rafId = requestAnimationFrame(updateDock);
    }

    tracklistContainer.addEventListener('mousemove', (e) => {
        mouseY = e.clientY;
    });

    tracklistContainer.addEventListener('mouseenter', () => {
        isHoveringList = true;
        // Remove CSS transitions while active so JS can run at 60fps without lag
        tracks.forEach(item => item.style.transition = 'background 0.2s ease');
        updateDock();
    });

    tracklistContainer.addEventListener('mouseleave', () => {
        isHoveringList = false;
        cancelAnimationFrame(rafId);
        
        // Re-apply CSS transitions so they shrink back down smoothly
        tracks.forEach(item => {
            item.style.transition = 'background 0.2s ease, font-size 0.3s cubic-bezier(0.25, 1, 0.5, 1), padding 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
            item.style.fontSize = '1em';
            item.style.padding = '1.25em 1.5em';
        });
    });

    // --- VIDEO GALLERY LOGIC ---
    const slides = document.querySelectorAll('.video-slide');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const titleEl = document.getElementById('gallery-title');
    const descEl = document.getElementById('gallery-desc');
    let currentSlide = 0;

    function updateGallery(index) {
        videoPlayers.forEach(player => player.pause());

        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');

        titleEl.innerText = slides[index].getAttribute('data-title');
        descEl.innerText = slides[index].getAttribute('data-desc');

        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        updateGallery(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        updateGallery(currentSlide);
    });

    // --- SCROLLSPY RECALCULATION FIX ---
    wavesurfer.on('ready', () => {
        window.dispatchEvent(new Event('resize'));
    });

    videoPlayers.forEach(player => {
        player.on('ready', () => {
            window.dispatchEvent(new Event('resize'));
        });
    });

    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 1500);

});