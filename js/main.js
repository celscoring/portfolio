/* claylewismusic.com — audio player, video facades, scroll-spy, reveals.
   No dependencies. Everything degrades: without JS the page is fully
   readable, facades simply don't swap and audio doesn't play. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fmt(s) {
    var m = Math.floor(s / 60);
    var ss = Math.floor(s % 60);
    return m + ':' + String(ss).padStart(2, '0');
  }

  /* ── Audio player ─────────────────────────────────────────────
     One <audio> per track, created on first interaction (nothing
     downloads on page load). Only one track plays at a time. */

  var tracks = [];

  document.querySelectorAll('.track').forEach(function (el) {
    var t = {
      el: el,
      btn: el.querySelector('.track-btn'),
      seek: el.querySelector('.track-seek'),
      fill: el.querySelector('.seek-fill'),
      handle: el.querySelector('.seek-handle'),
      time: el.querySelector('.track-time'),
      title: el.querySelector('.track-title').textContent,
      dur: parseFloat(el.dataset.duration) || 0,
      audio: null
    };

    function ensureAudio() {
      if (t.audio) return t.audio;
      t.audio = new Audio(el.dataset.src);
      t.audio.preload = 'none';
      t.audio.addEventListener('loadedmetadata', function () {
        t.dur = t.audio.duration;
        t.seek.setAttribute('aria-valuemax', Math.round(t.dur));
      });
      t.audio.addEventListener('playing', function () {
        el.classList.remove('loading');
      });
      t.audio.addEventListener('timeupdate', function () {
        render(t.audio.currentTime, true);
      });
      t.audio.addEventListener('ended', function () {
        el.classList.remove('playing');
        t.btn.setAttribute('aria-label', 'Play ' + t.title);
        render(0, false);
      });
      return t.audio;
    }

    function render(cur, active) {
      var pct = t.dur ? Math.min(100, (cur / t.dur) * 100) : 0;
      t.fill.style.width = pct + '%';
      t.handle.style.left = pct + '%';
      t.time.textContent = (active || cur > 0) ? fmt(cur) + ' / ' + fmt(t.dur) : fmt(t.dur);
      t.seek.setAttribute('aria-valuenow', Math.round(cur));
      t.seek.setAttribute('aria-valuetext', fmt(cur) + ' of ' + fmt(t.dur));
    }

    function pause() {
      if (t.audio) t.audio.pause();
      el.classList.remove('playing', 'loading');
      t.btn.setAttribute('aria-label', 'Play ' + t.title);
    }

    function play() {
      tracks.forEach(function (o) { if (o !== t) o.pause(); });
      var a = ensureAudio();
      if (a.readyState < 3) el.classList.add('loading');
      a.play();
      el.classList.add('playing');
      t.btn.setAttribute('aria-label', 'Pause ' + t.title);
    }

    function seekTo(sec) {
      sec = Math.max(0, Math.min(t.dur, sec));
      ensureAudio().currentTime = sec;
      render(sec, el.classList.contains('playing'));
    }

    t.pause = pause;

    t.btn.addEventListener('click', function () {
      el.classList.contains('playing') ? pause() : play();
    });

    t.seek.addEventListener('click', function (e) {
      var r = t.seek.getBoundingClientRect();
      seekTo(((e.clientX - r.left) / r.width) * t.dur);
    });

    t.seek.addEventListener('keydown', function (e) {
      var cur = t.audio ? t.audio.currentTime : 0;
      if (e.key === 'ArrowRight') seekTo(cur + 5);
      else if (e.key === 'ArrowLeft') seekTo(cur - 5);
      else if (e.key === 'Home') seekTo(0);
      else if (e.key === 'End') seekTo(t.dur - 1);
      else if (e.key === ' ' || e.key === 'Enter') el.classList.contains('playing') ? pause() : play();
      else return;
      e.preventDefault();
    });

    tracks.push(t);
  });

  function pauseAllAudio() {
    tracks.forEach(function (t) { t.pause(); });
  }

  /* ── Video facades ────────────────────────────────────────────
     Vimeo's iframe (and its JS payload) loads only when the
     visitor asks for the video. */

  document.querySelectorAll('.facade').forEach(function (btn) {
    btn.addEventListener('click', function () {
      pauseAllAudio();
      var frame = document.createElement('iframe');
      frame.src = 'https://player.vimeo.com/video/' + btn.dataset.vimeoId +
        '?badge=0&autopause=0&player_id=0&app_id=0&color=c8a96e&title=0&byline=0&portrait=0&autoplay=1';
      frame.title = btn.dataset.title;
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.setAttribute('allowfullscreen', '');
      var wrap = document.createElement('div');
      wrap.className = 'video-frame';
      wrap.appendChild(frame);
      btn.replaceWith(wrap);
    });
  });

  /* ── Sidebar: name reveal + scroll-spy ────────────────────────── */

  var sidebarName = document.querySelector('.sidebar-name');
  var navLinks = document.querySelectorAll('.sidebar-nav a');
  var heroName = document.getElementById('heroName');
  var sectionIds = ['work', 'compositions', 'about', 'contact'];

  function onScroll() {
    var threshold = heroName
      ? heroName.getBoundingClientRect().bottom + window.scrollY
      : 480;
    sidebarName.classList.toggle('visible', window.scrollY > threshold);

    var active = null;
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) active = id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + active);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Scroll-driven reveals ────────────────────────────────────
     Initial hidden state is applied here, not in CSS, so content
     is fully visible without JS. Staggered 80ms per sibling. */

  if (!reduceMotion && 'IntersectionObserver' in window) {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    var groups = new Map();
    els.forEach(function (el) {
      var p = el.parentElement;
      var idx = groups.get(p) || 0;
      groups.set(p, idx + 1);
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transitionDelay = (idx * 80) + 'ms';
      }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }
})();
