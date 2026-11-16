/**
 * FIXYO - Navigation & Header Interaction Controller
 * Handles mobile drawer, accessible dropdown menus, keyboard traps, and active link states
 */

(function () {
  'use strict';

  function initNavigation() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    // 1. Mobile Menu Drawer Toggle
    if (toggleBtn && navMenu) {
      const toggleMenu = () => {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
          navMenu.classList.remove('open');
          toggleBtn.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        } else {
          navMenu.classList.add('open');
          toggleBtn.classList.add('open');
          toggleBtn.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
      };

      toggleBtn.addEventListener('click', toggleMenu);

      // Close on clicking links in mobile drawer
      navMenu.querySelectorAll('.nav-link:not(.dropdown-trigger), .dropdown-link').forEach((link) => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navMenu.classList.remove('open');
            toggleBtn.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        });
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
          toggleMenu();
          toggleBtn.focus();
        }
      });
    }

    // 2. Dropdown Interaction for Mobile & Keyboard
    dropdownItems.forEach((dropdown) => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const isOpen = dropdown.classList.contains('open');
          dropdown.classList.toggle('open', !isOpen);
          trigger.setAttribute('aria-expanded', String(!isOpen));
        }
      });
    });

    // 3. Highlight Current Page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-link, .dropdown-link, .footer-nav-list a');

    allLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const targetPage = href.split('/').pop().split('#')[0].split('?')[0];

      if (targetPage === currentPath || (currentPath === '' && targetPage === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        
        // Also highlight parent dropdown if child is active
        const parentDropdown = link.closest('.nav-item.dropdown');
        if (parentDropdown) {
          const parentTrigger = parentDropdown.querySelector('.dropdown-trigger');
          if (parentTrigger) parentTrigger.classList.add('active');
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initNavigation);
})();
