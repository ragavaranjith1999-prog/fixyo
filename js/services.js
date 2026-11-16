/**
 * FIXYO - Services Data Store & Dynamic Category Filter Controller
 * Single source of truth for all appliance services
 */

const FIXYO_SERVICES = [
  // A. AC Services
  {
    id: "ac-1",
    name: "AC Repair Service",
    category: "AC",
    categorySlug: "ac",
    price: "₹499",
    priceNum: 499,
    image: "assets/images/ac-service.png",
    detailUrl: "ac-service-repair.html",
    description: "Comprehensive diagnostic, electrical fault fixing, airflow blockage resolution, and cooling performance inspection across all top brands.",
    features: [
      "Precision multimeter fault diagnostics",
      "Electrical PCB & wiring check",
      "Airflow & condenser inspection",
      "Doorstep visit within 90 minutes"
    ]
  },
  {
    id: "ac-2",
    name: "AC General Service",
    category: "AC",
    categorySlug: "ac",
    price: "₹499",
    priceNum: 499,
    image: "assets/images/ac-general-service.png",
    detailUrl: "ac-service-repair.html",
    description: "Filter cleaning, blower wash, outdoor condenser dusting, drain line clearing, and basic cooling efficiency audit.",
    features: [
      "High-flow blower cleansing",
      "Dust filter washing & sanitization",
      "Drain tray & pipe clearance",
      "Thermostat calibration test"
    ]
  },
  {
    id: "ac-3",
    name: "AC Foam-Jet Wash Service",
    category: "AC",
    categorySlug: "ac",
    price: "₹999",
    priceNum: 999,
    image: "assets/images/ac-foam-wash.png",
    detailUrl: "ac-service-repair.html",
    description: "Deep high-pressure non-corrosive foam cleaning for internal cooling coils and heavy-duty outdoor unit cleaning.",
    features: [
      "Antibacterial foam application",
      "High-pressure wash jacket protection",
      "Improves cooling speed by up to 2x",
      "Lowers electricity consumption"
    ]
  },
  {
    id: "ac-4",
    name: "AC Gas Filling Service",
    category: "AC",
    categorySlug: "ac",
    price: "₹1799",
    priceNum: 1799,
    image: "assets/images/ac-gas-filling.png",
    detailUrl: "ac-service-repair.html",
    description: "Complete nitrogen leak detection, flare nut brazing/repair, system vacuuming, and genuine eco-refrigerant charging.",
    features: [
      "Accurate nitrogen pressure leak check",
      "Flaring and brazing joint repair",
      "Complete vacuum dehydrating",
      "Genuine R32 / R410A / R22 gas refilling"
    ]
  },
  {
    id: "ac-5",
    name: "AC Installation Service",
    category: "AC",
    categorySlug: "ac",
    price: "₹1199",
    priceNum: 1199,
    image: "assets/images/ac-install.png",
    detailUrl: "ac-service-repair.html",
    description: "Safe mounting of indoor and outdoor brackets, precision copper piping setup, insulation wrapping, and cooling check.",
    features: [
      "Level-guided bracket wall mounting",
      "Vibration-damped outdoor unit placement",
      "Flaring, connecting, and electric wiring",
      "Operational test & cooling verification"
    ]
  },
  {
    id: "ac-6",
    name: "AC Uninstallation Service",
    category: "AC",
    categorySlug: "ac",
    price: "₹799",
    priceNum: 799,
    image: "assets/images/ac-uninstall.png",
    detailUrl: "ac-service-repair.html",
    description: "Safe dismantling with professional refrigerant pump-down lock to prevent gas leakage during relocation.",
    features: [
      "Refrigerant lockdown in outdoor compressor",
      "Careful indoor unit uncoupling",
      "Piping coil preservation",
      "Safe dismantling of all mounting hardware"
    ]
  },

  // B. Refrigerator Services
  {
    id: "fr-1",
    name: "Fridge Repair Service",
    category: "Refrigerator",
    categorySlug: "refrigerator",
    price: "₹499",
    priceNum: 499,
    image: "assets/images/fridge-repair.png",
    detailUrl: "refrigerator-repair.html",
    description: "Specialist diagnosis for single-door, double-door, and inverter fridges. Fixes cooling faults, thermostat failures, relay clicks, and noise.",
    features: [
      "Thermostat & defrost timer testing",
      "Compressor start relay diagnosis",
      "Fan motor and PCB check",
      "Door gasket seal inspection"
    ]
  },
  {
    id: "fr-2",
    name: "Fridge Gas Filling Service",
    category: "Refrigerator",
    categorySlug: "refrigerator",
    price: "₹1799",
    priceNum: 1799,
    image: "assets/images/fridge-gas-filling.png",
    detailUrl: "refrigerator-repair.html",
    description: "Comprehensive compressor inspection, vacuum pump dehydrating, copper line pinhole leak repair, and original refrigerant charging.",
    features: [
      "Nitrogen leak inspection",
      "Filter drier replacement if clogged",
      "Deep vacuum pump evacuation",
      "Original R600a / R134a refrigerant charge"
    ]
  },

  // C. Washing Machine Services
  {
    id: "wm-1",
    name: "Washing Machine Repair Service",
    category: "Washing Machine",
    categorySlug: "washing-machine",
    price: "₹499",
    priceNum: 499,
    image: "assets/images/washing-machine-repair.png",
    detailUrl: "washing-machine-service.html",
    description: "Fast doorstep troubleshooting for drum spinning failure, water drainage blocks, abnormal motor vibration, and PCB error codes.",
    features: [
      "Inlet valve and drain motor check",
      "Belt tension & motor carbon brush test",
      "Shock absorber & suspension check",
      "PCB error code diagnosis"
    ]
  },
  {
    id: "wm-2",
    name: "Washing Machine Deep Cleaning Service",
    category: "Washing Machine",
    categorySlug: "washing-machine",
    price: "₹799",
    priceNum: 799,
    image: "assets/images/washing-machine-cleaning.png",
    detailUrl: "washing-machine-service.html",
    description: "Complete drum dismantling, high-pressure scale wash, lint trap cleansing, chemical sanitization, and bad odor removal.",
    features: [
      "Drum disassembly and descaling",
      "Eliminates fungus, grime, and detergent build-up",
      "Tub sanitization cycle",
      "Restores wash water freshness"
    ]
  },

  // D. Electrical Services
  {
    id: "el-1",
    name: "Residential Electrical Service",
    category: "Electrical",
    categorySlug: "electrical",
    price: "₹399",
    priceNum: 399,
    image: "assets/images/electrical-service.png",
    detailUrl: "electrical-service.html",
    description: "Switchboard wiring, short-circuit diagnostics, MCB tripping resolution, ceiling fan installation, and home light fixtures.",
    features: [
      "Accurate short-circuit tracking",
      "Heavy appliance switchboard upgrade",
      "MCB & distribution panel repairs",
      "Inverter wiring & earthing checks"
    ]
  },

  // E. Plumbing Services
  {
    id: "pl-1",
    name: "Residential Plumbing Service",
    category: "Plumbing",
    categorySlug: "plumbing",
    price: "₹399",
    priceNum: 399,
    image: "assets/images/plumbing-service.png",
    detailUrl: "plumbing-service.html",
    description: "Tap repair, concealed pipeline leak sealing, drain unblocking, flush tank repair, and bathroom sanitary fixtures.",
    features: [
      "Dripping tap & angle valve fixes",
      "Under-sink pipe clog removal",
      "Flush valve and syphon repair",
      "Water pressure balancing"
    ]
  }
];

// Helper to render a card HTML
function generateServiceCardHTML(item) {
  const featuresHTML = item.features
    .map(f => `<li class="service-feature-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>${f}</span></li>`)
    .join('');

  return `
    <article class="service-card" data-category="${item.categorySlug}" id="${item.id}">
      <div class="service-card-media">
        <img src="${item.image}" alt="${item.name} in Madurai" loading="lazy" width="800" height="500">
        <span class="service-category-tag">${item.category}</span>
        <span class="service-price-tag">${item.price}</span>
      </div>
      <div class="service-card-body">
        <h3 class="service-card-title">${item.name}</h3>
        <p class="service-card-desc">${item.description}</p>
        <ul class="service-features-list">
          ${featuresHTML}
        </ul>
        <div class="service-card-actions">
          <a href="booking.html?service=${encodeURIComponent(item.name)}" class="btn btn-primary">Book Now</a>
          <a href="${item.detailUrl}" class="btn btn-outline">View Details</a>
        </div>
      </div>
    </article>
  `;
}

// Interactive Category Filter for services.html
function initServiceFiltering() {
  const container = document.getElementById('services-grid-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container || filterBtns.length === 0) return;

  function renderCategory(catSlug, updateUrl = true) {
    filterBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-filter') === catSlug;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    const filtered = (catSlug === 'all')
      ? FIXYO_SERVICES
      : FIXYO_SERVICES.filter(s => s.categorySlug === catSlug);

    container.innerHTML = filtered.map(generateServiceCardHTML).join('');

    if (updateUrl) {
      const url = new URL(window.location);
      if (catSlug === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', catSlug);
      }
      window.history.pushState({ category: catSlug }, '', url);
    }
  }

  // Click listeners for filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter');
      renderCategory(cat);
    });
  });

  // Handle URL query or browser back/forward
  const readUrlCategory = () => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') || 'all';
    renderCategory(cat, false);
  };

  window.addEventListener('popstate', readUrlCategory);
  readUrlCategory();
}

document.addEventListener('DOMContentLoaded', initServiceFiltering);
