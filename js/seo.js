/**
 * ============================================================================
 * FIXYO - CENTRAL TRACKING & SEO CONFIGURATION
 * ============================================================================
 * Edit your tracking keys below. Replace the placeholder values with your
 * active Google Analytics, Google Tag Manager, and Google Ads credentials.
 * Scripts will ONLY load when valid non-placeholder IDs are provided.
 */

window.FIXYO_CONFIG = {
  // 1. Google Analytics 4 Measurement ID (e.g., "G-1234567890")
  GA4_MEASUREMENT_ID: "G-XXXXXXXXXX",

  // 2. Google Tag Manager Container ID (e.g., "GTM-ABC1234")
  GTM_CONTAINER_ID: "GTM-XXXXXXX",

  // 3. Google Ads Conversion ID & Label (e.g., "AW-123456789")
  GOOGLE_ADS_ID: "AW-XXXXXXXXXX",
  GOOGLE_ADS_LABEL: "XXXXXXXXXXXX",

  // 4. Google Search Console Verification Meta Tag Value
  GOOGLE_SEARCH_CONSOLE_CODE: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",

  // 5. Google Business Profile & Reviews Link
  GOOGLE_REVIEWS_URL: "https://g.page/r/CQqPJRdtw3aMEBM/review",

  // 6. Direct WhatsApp Number
  WHATSAPP_PHONE: "+918489492406",

  // 7. Require Cookie/Tracking Consent Before Loading Analytics
  REQUIRE_CONSENT: true
};

(function () {
  'use strict';

  const cfg = window.FIXYO_CONFIG;

  function isConfigured(val, placeholderPrefix) {
    return val && typeof val === 'string' && !val.includes('XXXXX') && val.startsWith(placeholderPrefix);
  }

  // Load Google Analytics 4
  function loadGA4() {
    if (!isConfigured(cfg.GA4_MEASUREMENT_ID, 'G-')) return;
    if (window._ga4_loaded) return;
    window._ga4_loaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cfg.GA4_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', cfg.GA4_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true
    });
    console.log('[Fixyo SEO] GA4 initialized.');
  }

  // Load Google Tag Manager
  function loadGTM() {
    if (!isConfigured(cfg.GTM_CONTAINER_ID, 'GTM-')) return;
    if (window._gtm_loaded) return;
    window._gtm_loaded = true;

    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', cfg.GTM_CONTAINER_ID);
    console.log('[Fixyo SEO] GTM container loaded.');
  }

  // Consent Management
  function initConsent() {
    const consentBanner = document.getElementById('cookie-consent-banner');
    if (!consentBanner) {
      if (!cfg.REQUIRE_CONSENT) {
        loadGA4();
        loadGTM();
      }
      return;
    }

    const consentGiven = localStorage.getItem('fixyo_analytics_consent');

    if (consentGiven === 'granted') {
      consentBanner.style.display = 'none';
      loadGA4();
      loadGTM();
    } else if (consentGiven === 'denied') {
      consentBanner.style.display = 'none';
    } else {
      // Show consent banner
      consentBanner.style.display = 'block';

      const acceptBtn = document.getElementById('consent-accept-btn');
      const declineBtn = document.getElementById('consent-decline-btn');

      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          localStorage.setItem('fixyo_analytics_consent', 'granted');
          consentBanner.style.display = 'none';
          loadGA4();
          loadGTM();
        });
      }

      if (declineBtn) {
        declineBtn.addEventListener('click', () => {
          localStorage.setItem('fixyo_analytics_consent', 'denied');
          consentBanner.style.display = 'none';
        });
      }
    }
  }

  // Conversion Event Dispatcher
  window.FixyoSEO = {
    trackBookingSubmit: function (serviceName) {
      console.log('[Fixyo SEO] Booking initiated for:', serviceName);
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Service Booking',
          event_label: serviceName
        });

        if (isConfigured(cfg.GOOGLE_ADS_ID, 'AW-') && cfg.GOOGLE_ADS_LABEL && !cfg.GOOGLE_ADS_LABEL.includes('XXXXX')) {
          window.gtag('event', 'conversion', {
            'send_to': `${cfg.GOOGLE_ADS_ID}/${cfg.GOOGLE_ADS_LABEL}`
          });
        }
      }
    },
    trackWhatsAppClick: function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contact', {
          event_category: 'Engagement',
          event_label: 'WhatsApp Click'
        });
      }
    },
    trackCallClick: function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contact', {
          event_category: 'Engagement',
          event_label: 'Phone Call Click'
        });
      }
    }
  };

  document.addEventListener('DOMContentLoaded', initConsent);
})();
