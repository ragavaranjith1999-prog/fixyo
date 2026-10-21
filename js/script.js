// TARGET PHONE NUMBER FOR WHATSAPP INTEGRATION
const TARGET_PHONE_NUMBER = "918489492406";

// SERVICE CATALOG DATA ARRAY
const catalogItems = [
    // AC Services
    { id: 'ac-1', name: 'AC Repair Service', category: 'AC', price: 499, image: '/img asste/ac service.png', description: 'Comprehensive diagnostic, electrical fault fixing, and air cooling inspection.' },
    { id: 'ac-2', name: 'AC General Service', category: 'AC', price: 499, image: '/img asste/ac-general-service.png', description: 'Filter cleaning, blower wash, condenser check, and basic performance audit.' },
    { id: 'ac-3', name: 'AC Install Service', category: 'AC', price: 1199, image: '/img asste/ac-install.png', description: 'Safe mounting of indoor and outdoor units, piping setup, and operation test.' },
    { id: 'ac-4', name: 'AC Uninstall Service', category: 'AC', price: 799, image: '/img asste/ac-uninstall.png', description: 'Professional uninstallation with gas lock mechanism to prevent refrigerant leak.' },
    { id: 'ac-5', name: 'AC Foam-Jet Wash Service', category: 'AC', price: 999, image: '/img asste/ac-foam-wash.png', description: 'Deep high-pressure foam cleaning for indoor coils and outdoor units.' },
    { id: 'ac-6', name: 'AC Gas Filling Service', category: 'AC', price: 1799, image: '/img asste/ac-gas-filling.png', description: 'Complete leak testing, sealing, and original eco-refrigerant refilling.' },

    // Fridge Services
    { id: 'fr-1', name: 'Fridge Repair Service', category: 'Fridge', price: 499, image: '/img asste/fridge-repair.png', description: 'Fixing cooling issues, thermostat replacements, relay and noise troubleshooting.' },
    { id: 'fr-2', name: 'Fridge Gas Filling Service', category: 'Fridge', price: 1799, image: '/img asste/fridge-gas-filling.png', description: 'Compressor check, vacuuming, leak repair, and original gas charging.' },

    // Washing Machine Services
    { id: 'wm-1', name: 'Washing Machine Repair Service', category: 'Washing Machine', price: 499, image: '/img asste/washing-machine-repair.png', description: 'Resolving drum spin failure, drainage problems, noise, and PCB repair.' },
    { id: 'wm-2', name: 'Washing Machine Deep Cleaning Service', category: 'Washing Machine', price: 799, image: '/img asste/washing-machine-cleaning.png', description: 'Complete descaling, drum dismantling cleaning, and odor removal.' },

    // Electrical Services
    { id: 'el-1', name: 'Electrical Service', category: 'Electrical', price: 399, image: '/img asste/electrical-service.png', description: 'Switchboard wiring, short circuit fix, MCB installation, and general fixtures.' },

    // Plumbing Services
    { id: 'pl-1', name: 'Plumbing Service', category: 'Plumbing', price: 399, image: '/img asste/plumbing-service.png', description: 'Tap repair, pipe leak sealing, drain unblocking, and sanitary fitting.' }
];

// INITIAL REVIEWS DATA
let reviewsList = [
    { name: 'Suresh Kumar', service: 'AC Foam-Jet Wash Service', rating: 5, date: '2 days ago', message: 'Extremely thorough cleaning by FIXYO team! The foam jet wash cleared out years of dust. Airflow feels like a brand new AC now.' },
    { name: 'Ananya Roy', service: 'Fridge Gas Filling Service', rating: 5, date: '1 week ago', message: 'FIXYO technician reached within 45 minutes of booking on WhatsApp. Coolant reloaded and freezer is working great!' },
    { name: 'Vikram Singh', service: 'Washing Machine Repair Service', rating: 4, date: '2 weeks ago', message: 'Prompt drum noise fix. Honest pricing and polite FIXYO service engineer.' }
];

// IMAGE FALLBACK HANDLER
function handleImageError(imgElement) {
    if (!imgElement) return;
    imgElement.onerror = null;
    const svgPlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%23D3D3D3"><rect width="100%" height="100%" fill="%23000080"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="%2300F3FF">FIXYO Home Services</text></svg>`;
    imgElement.src = svgPlaceholder;
}

// MOBILE MENU TOGGLE
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// RENDER CATALOG AND TABS
function initCatalog() {
    const tabsContainer = document.getElementById('category-tabs');
    if (!tabsContainer) return;

    const categories = ['All', ...new Set(catalogItems.map(item => item.category))];
    
    // Check URL search params for category
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category') || 'All';

    // Render Tabs
    tabsContainer.innerHTML = categories.map((cat) => `
        <button onclick="filterCatalog('${cat}')" 
                class="cat-tab px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border border-gray-300 bg-white text-brand-navy hover:bg-brand-navy hover:text-white transition shadow-sm ${cat === categoryParam ? 'active-tab' : ''}"
                data-category="${cat}">
            ${cat === 'All' ? 'All Services' : cat + ' Service'}
        </button>
    `).join('');

    // Render items based on category param
    filterCatalog(categoryParam);
}

function filterCatalog(category) {
    const tabs = document.querySelectorAll('.cat-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-category') === category) {
            tab.classList.add('active-tab');
        } else {
            tab.classList.remove('active-tab');
        }
    });

    if (category === 'All') {
        renderCatalogGrid(catalogItems);
    } else {
        const filtered = catalogItems.filter(item => item.category === category);
        renderCatalogGrid(filtered);
    }
}

function renderCatalogGrid(items) {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500 font-semibold">No services found in this category.</div>`;
        return;
    }

    grid.innerHTML = items.map(item => `
        <div onclick="openServiceModal('${item.id}')" class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col justify-between hover:shadow-xl transition duration-300 cursor-pointer group">
            <div>
                <div class="relative h-48 overflow-hidden bg-gray-100">
                    <img src="${item.image}" 
                         alt="${item.name}" 
                         class="w-full h-full object-cover transition transform group-hover:scale-105 duration-300"
                         onerror="handleImageError(this)">
                    <span class="absolute top-3 right-3 bg-brand-navy/90 text-brand-electricCyan text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        ${item.category}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-extrabold text-brand-navy mb-2 group-hover:text-brand-orange transition">${item.name}</h3>
                    <p class="text-gray-600 text-xs leading-relaxed mb-4">${item.description}</p>
                </div>
            </div>
            <div class="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                    <span class="text-xs text-gray-400 block font-semibold">Fixed Rate</span>
                    <span class="text-2xl font-black text-brand-orange">₹${item.price}</span>
                </div>
                <span class="px-4 py-2.5 rounded-xl font-bold text-white text-xs gradient-btn shadow inline-flex items-center">
                    View Details <i class="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
                </span>
            </div>
        </div>
    `).join('');
}

function filterAndSwitchService(category) {
    window.location.href = `services.html?category=${encodeURIComponent(category)}`;
}

// SERVICE CARD MODAL LOGIC
function openServiceModal(itemId) {
    const item = catalogItems.find(i => i.id === itemId);
    if (!item) return;

    const modalImg = document.getElementById('modal-img');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const modalBookBtn = document.getElementById('modal-book-btn');

    if (modalImg) modalImg.src = item.image;
    if (modalCategory) modalCategory.innerText = item.category + ' Service';
    if (modalTitle) modalTitle.innerText = item.name;
    if (modalPrice) modalPrice.innerText = '₹' + item.price;
    if (modalDesc) modalDesc.innerText = item.description;

    if (modalBookBtn) {
        modalBookBtn.setAttribute('onclick', `closeServiceModal(); quickBookItem('${item.category}', '${item.name}')`);
    }

    const modal = document.getElementById('service-modal');
    const modalBox = document.getElementById('service-modal-box');
    if (modal && modalBox) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalBox.classList.remove('scale-95');
            modalBox.classList.add('scale-100');
        }, 10);
    }
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    const modalBox = document.getElementById('service-modal-box');
    if (modal && modalBox) {
        modal.classList.add('opacity-0');
        modalBox.classList.remove('scale-100');
        modalBox.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// QUICK BOOK BUTTON FROM CATALOG CARD OR MODAL
function quickBookItem(category, serviceName) {
    window.location.href = `booking.html?category=${encodeURIComponent(category)}&service=${encodeURIComponent(serviceName)}`;
}

// DYNAMIC FORM DROPDOWN LOGIC
function updateSubServiceDropdown() {
    const catSelect = document.getElementById('book-category');
    const subServiceSelect = document.getElementById('book-service');
    if (!catSelect || !subServiceSelect) return;

    const selectedCategory = catSelect.value;

    if (!selectedCategory) {
        subServiceSelect.innerHTML = `<option value="">-- Select Category First --</option>`;
        return;
    }

    const matchingItems = catalogItems.filter(item => item.category === selectedCategory);
    subServiceSelect.innerHTML = matchingItems.map(item => `
        <option value="${item.name}">${item.name} — ₹${item.price}</option>
    `).join('');
}

// INDIVIDUAL FIELD VALIDATION FUNCTION
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const errEl = document.getElementById('err-' + fieldId);
    if (!field || !errEl) return true;

    let isValid = true;
    const val = field.value.trim();

    if (fieldId === 'book-name') {
        isValid = val.length >= 2;
    } else if (fieldId === 'book-phone') {
        const phoneRegex = /^[6-9]\d{9}$/;
        isValid = phoneRegex.test(val);
    } else if (fieldId === 'book-category' || fieldId === 'book-service' || fieldId === 'book-date' || fieldId === 'book-time') {
        isValid = val !== '';
    } else if (fieldId === 'book-address') {
        isValid = val.length >= 5;
    }

    if (!isValid) {
        errEl.classList.remove('hidden');
        field.classList.add('border-red-500');
        field.classList.remove('border-gray-300');
    } else {
        errEl.classList.add('hidden');
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-300');
    }

    return isValid;
}

// FORM SUBMIT -> VALIDATE ALL FIELDS & REDIRECT TO CONFIRMATION PAGE
function handleBookingSubmit(event) {
    event.preventDefault();

    const fieldsToValidate = ['book-name', 'book-phone', 'book-category', 'book-service', 'book-date', 'book-time', 'book-address'];
    let isFormValid = true;

    fieldsToValidate.forEach(fieldId => {
        const valid = validateField(fieldId);
        if (!valid) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
            firstError.focus();
        }
        return;
    }

    const name = document.getElementById('book-name')?.value || '';
    const phone = document.getElementById('book-phone')?.value || '';
    const category = document.getElementById('book-category')?.value || '';
    const service = document.getElementById('book-service')?.value || '';
    const date = document.getElementById('book-date')?.value || '';
    const time = document.getElementById('book-time')?.value || '';
    const address = document.getElementById('book-address')?.value || '';
    const notes = document.getElementById('book-notes')?.value || '';

    // Generate reference ID
    const refId = 'FIX-' + Math.floor(100000 + Math.random() * 900000);

    // Save to localStorage
    const bookingDetails = { refId, name, phone, category, service, date, time, address, notes };
    localStorage.setItem('fixyo_last_booking', JSON.stringify(bookingDetails));

    // Open WhatsApp in new tab
    let message = `*NEW SERVICE BOOKING REQUEST - FIXYO HOME SERVICES*%0A%0A`;
    message += `🔖 *Booking Ref:* ${refId}%0A`;
    message += `👤 *Customer Name:* ${encodeURIComponent(name)}%0A`;
    message += `📞 *Phone Number:* ${encodeURIComponent(phone)}%0A`;
    message += `🛠️ *Category:* ${encodeURIComponent(category)}%0A`;
    message += `🔧 *Required Service:* ${encodeURIComponent(service)}%0A`;
    message += `📅 *Preferred Date:* ${encodeURIComponent(date)}%0A`;
    message += `⏰ *Time Slot:* ${encodeURIComponent(time)}%0A`;
    message += `🏠 *Address:* ${encodeURIComponent(address)}%0A`;
    if (notes) {
        message += `📝 *Notes/Issues:* ${encodeURIComponent(notes)}%0A`;
    }

    const whatsappUrl = `https://wa.me/${TARGET_PHONE_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Redirect current tab to confirmation page
    window.location.href = `booking-confirmation.html`;
}

// INITIALIZE CONFIRMATION PAGE DETAILS
function initConfirmationPage() {
    const confId = document.getElementById('conf-id');
    if (!confId) return;

    const savedData = localStorage.getItem('fixyo_last_booking');
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);
        if (document.getElementById('conf-id')) document.getElementById('conf-id').innerText = '#' + (data.refId || 'FIX-000000');
        if (document.getElementById('conf-name')) document.getElementById('conf-name').innerText = data.name || '--';
        if (document.getElementById('conf-phone')) document.getElementById('conf-phone').innerText = data.phone || '--';
        if (document.getElementById('conf-service')) document.getElementById('conf-service').innerText = data.service || '--';
        if (document.getElementById('conf-category')) document.getElementById('conf-category').innerText = data.category || '--';
        if (document.getElementById('conf-date')) document.getElementById('conf-date').innerText = data.date || '--';
        if (document.getElementById('conf-time')) document.getElementById('conf-time').innerText = data.time || '--';
        if (document.getElementById('conf-address')) document.getElementById('conf-address').innerText = data.address || '--';

        const whatsappBtn = document.getElementById('conf-whatsapp-btn');
        if (whatsappBtn) {
            let message = `*NEW SERVICE BOOKING REQUEST - FIXYO HOME SERVICES*%0A%0A`;
            message += `🔖 *Booking Ref:* ${data.refId}%0A`;
            message += `👤 *Customer Name:* ${encodeURIComponent(data.name)}%0A`;
            message += `📞 *Phone Number:* ${encodeURIComponent(data.phone)}%0A`;
            message += `🛠️ *Category:* ${encodeURIComponent(data.category)}%0A`;
            message += `🔧 *Required Service:* ${encodeURIComponent(data.service)}%0A`;
            message += `📅 *Preferred Date:* ${encodeURIComponent(data.date)}%0A`;
            message += `⏰ *Time Slot:* ${encodeURIComponent(data.time)}%0A`;
            message += `🏠 *Address:* ${encodeURIComponent(data.address)}%0A`;
            if (data.notes) {
                message += `📝 *Notes/Issues:* ${encodeURIComponent(data.notes)}%0A`;
            }
            whatsappBtn.href = `https://wa.me/${TARGET_PHONE_NUMBER}?text=${message}`;
        }
    } catch(e) {
        console.error("Error loading booking details:", e);
    }
}

// FAQ ACCORDION TOGGLE
function toggleFaq(btnElement) {
    if (!btnElement) return;
    const answerDiv = btnElement.nextElementSibling;
    const icon = btnElement.querySelector('i');
    
    if (answerDiv) answerDiv.classList.toggle('hidden');
    if (icon) icon.classList.toggle('rotate-180');
}

// REVIEWS RENDER & SUBMIT HANDLER
function renderReviews() {
    const listContainer = document.getElementById('reviews-list');
    if (!listContainer) return;

    listContainer.innerHTML = reviewsList.map(rev => `
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-brand-navy text-brand-electricCyan font-bold flex items-center justify-center">
                        ${rev.name.charAt(0)}
                    </div>
                    <div>
                        <h4 class="font-bold text-brand-navy text-sm sm:text-base">${rev.name}</h4>
                        <p class="text-xs text-brand-orange font-semibold">${rev.service}</p>
                    </div>
                </div>
                <span class="text-xs text-gray-400 font-medium">${rev.date}</span>
            </div>
            <div class="text-amber-400 text-sm mb-2">
                ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
            </div>
            <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">${rev.message}</p>
        </div>
    `).join('');
}

function handleReviewSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('rev-name')?.value || '';
    const service = document.getElementById('rev-service')?.value || '';
    const rating = parseInt(document.getElementById('rev-rating')?.value || '5');
    const message = document.getElementById('rev-message')?.value || '';

    // Prepend new review
    reviewsList.unshift({
        name: name,
        service: service,
        rating: rating,
        date: 'Just now',
        message: message
    });

    renderReviews();
    const form = document.getElementById('review-form');
    if (form) form.reset();
    alert('Thank you! Your review has been published successfully on FIXYO.');
}

// INITIALIZATION ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    renderReviews();
    initConfirmationPage();
    
    // Datepicker min date setting
    const bookDate = document.getElementById('book-date');
    if (bookDate) {
        const today = new Date().toISOString().split('T')[0];
        bookDate.setAttribute('min', today);
    }

    // Auto-populate booking page if URL parameters present
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const serviceParam = urlParams.get('service');

    if (categoryParam) {
        const catSelect = document.getElementById('book-category');
        if (catSelect) {
            catSelect.value = categoryParam;
            updateSubServiceDropdown();
            if (serviceParam) {
                const srvSelect = document.getElementById('book-service');
                if (srvSelect) {
                    srvSelect.value = serviceParam;
                }
            }
        }
    }
});
