/**
 * FIXYO - Booking Validation & WhatsApp Dispatcher
 * Validates customer input, displays a pre-dispatch confirmation summary,
 * and formats the official WhatsApp booking dispatch.
 */

(function () {
  'use strict';

  const TARGET_WHATSAPP_NUMBER = "918489492406";

  function initBookingForm() {
    const form = document.getElementById('fixyo-booking-form');
    if (!form) return;

    const nameInput = document.getElementById('customer-name');
    const phoneInput = document.getElementById('customer-phone');
    const addressInput = document.getElementById('service-address');
    const serviceSelect = document.getElementById('service-select');
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('booking-time');
    const notesInput = document.getElementById('customer-notes');

    // Pre-populate service from URL query if available
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedService = urlParams.get('service');
    if (preselectedService && serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.toLowerCase().includes(preselectedService.toLowerCase()) ||
            serviceSelect.options[i].value.toLowerCase().includes(preselectedService.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    // Set minimum date to today (prevent past dates)
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    // Modal elements
    const modal = document.getElementById('booking-summary-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');

    let currentBookingData = null;

    // Field Validation Helper
    function validateField(input, condition, errorMsg) {
      const errorEl = input.nextElementSibling;
      if (!condition) {
        input.classList.add('is-invalid');
        if (errorEl && errorEl.classList.contains('form-error')) {
          errorEl.textContent = errorMsg;
        }
        return false;
      } else {
        input.classList.remove('is-invalid');
        return true;
      }
    }

    // Live validation resets on input
    [nameInput, phoneInput, addressInput, serviceSelect, dateInput, timeSelect].forEach(field => {
      if (!field) return;
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
      });
      field.addEventListener('change', () => {
        field.classList.remove('is-invalid');
      });
    });

    // Form submission validation
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // 1. Name validation
      if (!validateField(nameInput, nameInput.value.trim().length >= 2, "Please enter your full name (minimum 2 characters)")) {
        isValid = false;
      }

      // 2. Indian Phone number validation (10 digits starting with 6-9)
      const cleanPhone = phoneInput.value.replace(/[\s\-\+]/g, '');
      const phoneDigits = cleanPhone.startsWith('91') && cleanPhone.length === 12 ? cleanPhone.slice(2) : cleanPhone;
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!validateField(phoneInput, phoneRegex.test(phoneDigits), "Please enter a valid 10-digit Indian mobile number (e.g., 9876543210)")) {
        isValid = false;
      }

      // 3. Address validation
      if (!validateField(addressInput, addressInput.value.trim().length >= 5, "Please enter your service address in Madurai")) {
        isValid = false;
      }

      // 4. Service Selection
      if (!validateField(serviceSelect, serviceSelect.value !== "", "Please select a service")) {
        isValid = false;
      }

      // 5. Booking Date validation
      const selectedDate = dateInput.value;
      const today = new Date().toISOString().split('T')[0];
      if (!validateField(dateInput, selectedDate && selectedDate >= today, "Please select today or a future date")) {
        isValid = false;
      }

      // 6. Booking Time validation
      if (!validateField(timeSelect, timeSelect.value !== "", "Please select a preferred time slot")) {
        isValid = false;
      }

      if (!isValid) {
        const firstError = form.querySelector('.is-invalid');
        if (firstError) firstError.focus();
        return;
      }

      // Prepare Booking Data
      currentBookingData = {
        name: nameInput.value.trim(),
        phone: phoneDigits,
        address: addressInput.value.trim(),
        service: serviceSelect.options[serviceSelect.selectedIndex].text,
        date: dateInput.value,
        time: timeSelect.value,
        notes: notesInput.value.trim() || "None"
      };

      // Populate Modal Summary
      document.getElementById('summary-name').textContent = currentBookingData.name;
      document.getElementById('summary-phone').textContent = "+91 " + currentBookingData.phone;
      document.getElementById('summary-service').textContent = currentBookingData.service;
      document.getElementById('summary-address').textContent = currentBookingData.address;
      document.getElementById('summary-datetime').textContent = `${currentBookingData.date} at ${currentBookingData.time}`;
      document.getElementById('summary-notes').textContent = currentBookingData.notes;

      // Open Modal
      openModal();
    });

    function openModal() {
      if (!modal) return;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      modalConfirmBtn.focus();
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Confirm & Dispatch to WhatsApp
    if (modalConfirmBtn) {
      modalConfirmBtn.addEventListener('click', () => {
        if (!currentBookingData) return;

        // Structured message as specified in requirement:
        const rawMessage = 
`NEW SERVICE BOOKING – FIXYO

Customer Name: ${currentBookingData.name}

Mobile Number: ${currentBookingData.phone}

Service Address: ${currentBookingData.address}

Selected Service: ${currentBookingData.service}

Booking Date: ${currentBookingData.date}

Booking Time: ${currentBookingData.time}

Additional Requirements: ${currentBookingData.notes}

Please contact the customer to confirm the booking.`;

        const encodedMessage = encodeURIComponent(rawMessage);
        const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodedMessage}`;

        closeModal();

        // Show direct feedback banner on page
        const successNotice = document.getElementById('booking-success-message');
        if (successNotice) {
          successNotice.style.display = 'block';
          successNotice.scrollIntoView({ behavior: 'smooth' });
        }

        // Trigger Google Tag conversion event if configured
        if (window.FixyoSEO && typeof window.FixyoSEO.trackBookingSubmit === 'function') {
          window.FixyoSEO.trackBookingSubmit(currentBookingData.service);
        }

        // Open WhatsApp in new tab / window
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initBookingForm);
})();
