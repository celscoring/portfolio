document.addEventListener('DOMContentLoaded', () => {

  /* ── 0. MOBILE NAVIGATION TOGGLE ── */
  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('nav-open');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('nav-open');
    });
  });

  /* ── 1. AUDIO PLAYER LOGIC ── */
  const tracks = [
    { title: "Alas... Sanctuary", genre: "Action, Fantasy", file: "assets/audio/alas-sanctuary.mp3" },
    { title: "Reminiscing in F", genre: "Orchestra, Family", file: "assets/audio/reminiscing-in-f.mp3" },
    { title: "Stank", genre: "Hip-Hop, Funk", file: "assets/audio/stank.mp3" },
    { title: "Capgras", genre: "Thriller, Horror", file: "assets/audio/capgras.mp3" }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  
  let audio;
  try {
    audio = new Audio(tracks[currentTrackIndex].file);
  } catch(e) {
    console.warn("Audio initialization bypassed.", e);
  }
  
  const playPauseBtn = document.getElementById('play-pause-btn');
  const iconPlay = document.querySelector('.icon-play');
  const iconPause = document.querySelector('.icon-pause');
  const titleEl = document.getElementById('current-track-title');
  const genreEl = document.getElementById('current-track-genre');
  const timeCurrentEl = document.getElementById('time-current');
  const timeTotalEl = document.getElementById('time-total');
  const tracklistEl = document.getElementById('tracklist');
  const volumeSlider = document.getElementById('volume-slider');
  
  const waveWrapper = document.getElementById('waveform-wrapper');
  const canvas = document.getElementById('waveform-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const hoverLine = document.getElementById('waveform-hover-line');
  const hoverTime = document.getElementById('waveform-hover-time');
  
  let waveformPeaks = [];

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const loadWaveform = async (url, title) => {
    waveformPeaks = [];
    if (ctx) renderWaveform(); 
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const arrayBuffer = await response.arrayBuffer();
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const buffer = await audioCtx.decodeAudioData(arrayBuffer);

      const rawData = buffer.getChannelData(0);
      const samples = 120; 
      const blockSize = Math.floor(rawData.length / samples);
      
      for (let i = 0; i < samples; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(rawData[blockSize * i + j]);
        }
        waveformPeaks.push(sum / blockSize);
      }
    } catch (err) {
      console.warn("Using fallback waveform.", err);
      let seed = title.length;
      for (let i = 0; i < 120; i++) {
        seed = (seed * 9301 + 49297) % 233280;
        waveformPeaks.push(0.2 + (seed / 233280) * 0.8);
      }
    }

    const max = Math.max(...waveformPeaks);
    waveformPeaks = waveformPeaks.map(n => n / max);
    if (ctx) renderWaveform();
  };

  const renderWaveform = () => {
    if (!waveformPeaks.length || !ctx || !canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const barWidth = (width / waveformPeaks.length) - 1.5;
    
    ctx.clearRect(0, 0, width, height);

    const progressPercent = audio && audio.duration ? audio.currentTime / audio.duration : 0;
    const progressIndex = progressPercent * waveformPeaks.length;

    waveformPeaks.forEach((peak, index) => {
      const barHeight = Math.max(peak * height, 2); 
      const x = index * (width / waveformPeaks.length);
      const y = (height - barHeight) / 2;

      ctx.fillStyle = index < progressIndex ? '#5ba4e5' : 'rgba(255, 255, 255, 0.2)';

      ctx.beginPath();
      if (ctx.roundRect) {
          ctx.roundRect(x, y, Math.max(barWidth, 1), barHeight, 2);
      } else {
          ctx.rect(x, y, Math.max(barWidth, 1), barHeight);
      }
      ctx.fill();
    });
  };

  const renderTracklist = () => {
    if (!tracklistEl) return;
    tracklistEl.innerHTML = '';
    tracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = `track-item ${index === currentTrackIndex ? 'active' : ''}`;
      item.innerHTML = `
        <div class="track-item-title">${track.title}</div>
        <div class="track-item-genre">${track.genre}</div>
      `;
      item.addEventListener('click', () => loadTrack(index, true));
      tracklistEl.appendChild(item);
    });
  };

  const loadTrack = (index, autoPlay = false) => {
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];
    
    if (audio) audio.src = track.file;
    if (titleEl) titleEl.textContent = track.title;
    if (genreEl) genreEl.textContent = track.genre;
    
    renderTracklist();
    loadWaveform(track.file, track.title);
    
    if (autoPlay && audio) {
      audio.play().catch(e => console.warn("Audio play blocked", e));
      isPlaying = true;
      updatePlayPauseUI();
    }
  };

  const togglePlay = () => {
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play().catch(e => console.warn("Play blocked", e));
    isPlaying = !isPlaying;
    updatePlayPauseUI();
  };

  const updatePlayPauseUI = () => {
    if (iconPlay && iconPause) {
        iconPlay.style.display = isPlaying ? 'none' : 'block';
        iconPause.style.display = isPlaying ? 'block' : 'none';
    }
  };

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
  
  if (audio) {
      audio.addEventListener('timeupdate', () => {
        if (timeCurrentEl) timeCurrentEl.textContent = formatTime(audio.currentTime);
        renderWaveform();
      });

      audio.addEventListener('loadedmetadata', () => {
        if (timeTotalEl) timeTotalEl.textContent = formatTime(audio.duration);
      });

      audio.addEventListener('ended', () => {
        loadTrack((currentTrackIndex + 1) % tracks.length, true);
      });
  }

  if (waveWrapper) {
      waveWrapper.addEventListener('mousemove', (e) => {
        if (!audio || !audio.duration) return;
        const rect = waveWrapper.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percent = x / rect.width;
        
        if (hoverLine) {
            hoverLine.style.display = 'block';
            hoverLine.style.left = `${x}px`;
        }
        if (hoverTime) {
            hoverTime.style.display = 'block';
            hoverTime.style.left = `${x}px`;
            hoverTime.textContent = formatTime(percent * audio.duration);
        }
      });

      waveWrapper.addEventListener('mouseleave', () => {
        if (hoverLine) hoverLine.style.display = 'none';
        if (hoverTime) hoverTime.style.display = 'none';
      });

      waveWrapper.addEventListener('click', (e) => {
        if (!audio || !audio.duration) return;
        const rect = waveWrapper.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
        renderWaveform();
      });
  }

  window.addEventListener('resize', renderWaveform);

  if (volumeSlider && audio) {
      // Dynamic track fill logic via CSS variable updating on input
      volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
        volumeSlider.style.setProperty('--vol-pct', `${e.target.value * 100}%`);
      });
      // Initialize the track fill to the default volume (100%)
      volumeSlider.style.setProperty('--vol-pct', `${volumeSlider.value * 100}%`);
  }

  try {
      loadTrack(currentTrackIndex, false);
  } catch (e) {
      console.warn("Initial track load bypassed", e);
  }

  /* ── 2. VIDEO CAROUSEL (NATIVE PLAYERS ONLY) ── */
  const videos = [
    { 
      id: "Z6DG4o8NN6A", 
      title: "Harmony Rescore", 
      meta: "Rescore · Original film by ESMA",
      type: "youtube"
    },
    { 
      id: "shYIh4Boj-s", 
      title: "Oryctes Rescore", 
      meta: "Rescore · Original film by GLOW Production",
      type: "youtube"
    },
    { 
      id: "QkbwtoR4350", 
      title: "MIT Compass Course", 
      meta: "Original Score · Produced by MIT",
      type: "youtube"
    },
    { 
      id: "1Lti_bDdyG_dERQzBR-FXDtv-Ciqw3XNN", 
      title: "A Second of Sight", 
      meta: "Original Score · Dir. Reuben Fuchs", 
      type: "gdrive"
    }
  ];

  let currentVideoIndex = 0;
  const iframeEl = document.getElementById('video-iframe');
  const videoTitleEl = document.getElementById('video-title');
  const videoMetaEl = document.getElementById('video-meta');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  // Immediately load the correct iframe for the video type
  const loadVideo = (index) => {
    currentVideoIndex = index;
    const vid = videos[currentVideoIndex];
    
    // Clear iframe briefly to force a clean load and pause previous video
    if (iframeEl) {
        iframeEl.src = '';
        if (vid.type === 'gdrive') {
            iframeEl.src = `https://drive.google.com/file/d/${vid.id}/preview`;
        } else {
            iframeEl.src = `https://www.youtube.com/embed/${vid.id}?controls=1&modestbranding=1&rel=0&playsinline=1`;
        }
    }
    
    if (videoTitleEl) videoTitleEl.textContent = vid.title;
    if (videoMetaEl) videoMetaEl.textContent = vid.meta;
    
    // Auto-pause the audio track if the user swaps videos
    if (isPlaying && audio) togglePlay();
  };

  if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let newIndex = currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1;
        loadVideo(newIndex);
      });
  }

  if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let newIndex = (currentVideoIndex + 1) % videos.length;
        loadVideo(newIndex);
      });
  }

  try {
      loadVideo(0);
  } catch (e) {
      console.warn("Initial video load bypassed", e);
  }

  /* ── 3. SCROLL SPY FOR NAVIGATION ── */
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});