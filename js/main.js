/**
 * FIXYO - Main Application Controller
 * Handles Website Loader, Sticky Header, Scroll-to-Top, Dynamic Year, and Global Listeners
 */

(function () {
  'use strict';

  // 1. Website Animated Loader
  function initLoader() {
    const loader = document.getElementById('website-loader');
    if (!loader) return;

    // Check if reduced-motion preferred or previously viewed in session
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasLoadedBefore = sessionStorage.getItem('fixyo_loaded');

    if (prefersReducedMotion || hasLoadedBefore) {
      loader.classList.add('loader-hidden');
      setTimeout(() => loader.remove(), 400);
      return;
    }

    // Smooth reveal transition after brief progress animation
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loader-hidden');
        sessionStorage.setItem('fixyo_loaded', 'true');
        setTimeout(() => loader.remove(), 400);
      }, 700);
    });

    // Fallback safety timeout so website is never blocked
    setTimeout(() => {
      if (!loader.classList.contains('loader-hidden')) {
        loader.classList.add('loader-hidden');
        setTimeout(() => loader.remove(), 400);
      }
    }, 2000);
  }

  // 2. Sticky Header with Scroll Detection
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Back-to-Top Button
  function initBackToTop() {
    const topBtn = document.getElementById('back-to-top');
    if (!topBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        topBtn.classList.add('visible');
      } else {
        topBtn.classList.remove('visible');
      }
    }, { passive: true });

    topBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Dynamic Copyright Year
  function initDynamicYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach((el) => {
      el.textContent = currentYear;
    });
  }

  // 5. Accessible Accordion for FAQs
  function initFaqAccordion() {
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const panel = item.querySelector('.faq-panel');
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Close other items in the same accordion group
        const parentAccordion = item.closest('.faq-accordion');
        if (parentAccordion) {
          parentAccordion.querySelectorAll('.faq-item').forEach((sibling) => {
            if (sibling !== item) {
              sibling.classList.remove('active');
              const sibTrigger = sibling.querySelector('.faq-trigger');
              const sibPanel = sibling.querySelector('.faq-panel');
              if (sibTrigger) sibTrigger.setAttribute('aria-expanded', 'false');
              if (sibPanel) sibPanel.style.maxHeight = null;
            }
          });
        }

        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          item.classList.remove('active');
          panel.style.maxHeight = null;
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initStickyHeader();
    initBackToTop();
    initDynamicYear();
    initFaqAccordion();
  });
})();
