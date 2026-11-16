/**
 * FIXYO - Animations & Micro-Interactions Controller
 * Handles Cursor Spotlight on Desktop, Scroll Reveals with IntersectionObserver,
 * and respects reduced motion.
 */

(function () {
  'use strict';

  // 1. Desktop Cursor Spotlight Effect
  function initCursorSpotlight() {
    // Check if touch device or prefers-reduced-motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    spotlight.setAttribute('aria-hidden', 'true');
    document.body.appendChild(spotlight);
    document.body.classList.add('has-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(updateCursor);
      }
    }, { passive: true });

    function updateCursor() {
      // Smooth interpolation
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      spotlight.style.left = `${currentX}px`;
      spotlight.style.top = `${currentY}px`;

      if (Math.abs(mouseX - currentX) > 0.5 || Math.abs(mouseY - currentY) > 0.5) {
        requestAnimationFrame(updateCursor);
      } else {
        isMoving = false;
      }
    }

    // Hide when mouse leaves viewport
    document.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      spotlight.style.opacity = '1';
    });
  }

  // 2. Scroll Reveal Animations (IntersectionObserver)
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCursorSpotlight();
    initScrollReveals();
  });
})();
