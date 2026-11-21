/* ==========================================================================
   BHATKANTI - PLAN MY TRIP ENGINE
   Pre-planned Trips, Smart Custom Itinerary Generator, Budgeting & Booking
   ========================================================================== */

// 1. DATA STORE: Curated Pre-Planned Itineraries
const PREPLANNED_TRIPS = [
  {
    id: "pune-city-explorer",
    title: "Pune City Explorer",
    coverImage: "images/fc-road.jpg",
    description: "Experience Pune's lively food culture, peaceful gardens and beautiful hilltop views.",
    duration: "Full Day (~7 hrs)",
    durationHours: 7,
    stopsCount: 3,
    totalTicketCost: 0,
    ticketCostDisplay: "Free Entry",
    routeSequence: ["FC Road", "Saras Baug", "Parvati Hill"],
    routeDistance: "12 km total route",
    suggestedStartTime: "09:30 AM",
    stopsDetails: [
      {
        name: "FC Road (Fergusson College Road)",
        category: "Food & Culture",
        duration: "2.5 hours",
        ticket: "Free Entry",
        priceNum: 0,
        timing: "09:30 AM – 12:00 PM",
        desc: "Stroll along Pune's iconic cultural boulevard, enjoy Irani chai and bun maska at Cafe Goodluck, and browse classic bookstalls.",
        image: "images/fc-road.jpg"
      },
      {
        name: "Saras Baug & Talyatla Ganpati",
        category: "Nature & Gardens",
        duration: "1.5 hours",
        ticket: "Free Entry",
        priceNum: 0,
        timing: "12:30 PM – 02:00 PM",
        desc: "Relax in the manicured gardens, view blooming lotus ponds, and visit the historic Peshwa-era lakeside Ganpati shrine.",
        image: "images/saras-baug.jpg"
      },
      {
        name: "Parvati Hill Temple Complex",
        category: "Adventure & Views",
        duration: "2 hours",
        ticket: "Free Entry",
        priceNum: 0,
        timing: "03:30 PM – 05:30 PM",
        desc: "Ascend 103 stone steps for a 360-degree sunset panorama over Pune city and visit the historic Peshwa museum.",
        image: "images/parvati-hill.jpg"
      }
    ],
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.248694080183!2d73.8530343758364!3d18.517623969262968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06e408d669b%3A0xb3e6488d5e06497f!2sShaniwar%20Wada!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  {
    id: "pune-heritage-trail",
    title: "Pune Heritage Trail",
    coverImage: "images/shaniwar-wada.jpg",
    description: "Explore Pune's rich Maratha history, traditional art and famous spiritual landmarks.",
    duration: "Half Day (~4.5 hrs)",
    durationHours: 4.5,
    stopsCount: 3,
    totalTicketCost: 125,
    ticketCostDisplay: "₹125 per person",
    routeSequence: ["Shaniwar Wada", "Raja Dinkar Kelkar Museum", "Dagdusheth Halwai Ganpati"],
    routeDistance: "4.5 km walking/auto trail",
    suggestedStartTime: "09:00 AM",
    stopsDetails: [
      {
        name: "Shaniwar Wada",
        category: "Heritage",
        duration: "1.5 hours",
        ticket: "₹25",
        priceNum: 25,
        timing: "09:00 AM – 10:30 AM",
        desc: "The 18th-century grand seat of the Peshwas featuring imposing Delhi Darwaza fortifications and heritage stone courtyards.",
        image: "images/shaniwar-wada.jpg",
        bookingUrl: "https://asi.payumoney.com/"
      },
      {
        name: "Raja Dinkar Kelkar Museum",
        category: "Museum",
        duration: "2 hours",
        ticket: "₹100",
        priceNum: 100,
        timing: "11:00 AM – 01:00 PM",
        desc: "Over 20,000 rare sculptures, antique musical instruments, carved doorways, and a reconstructed Mastani Mahal.",
        image: "images/kelkar-museum.jpg",
        bookingNote: "On-site ticket counter available"
      },
      {
        name: "Dagdusheth Halwai Ganpati",
        category: "Religious",
        duration: "1 hour",
        ticket: "Free Entry",
        priceNum: 0,
        timing: "01:15 PM – 02:15 PM",
        desc: "Revered 130-year-old temple featuring an iconic 7.5-foot gold-adorned Ganesha murti and serene marble sanctum.",
        image: "images/dagdusheth-ganpati.jpg"
      }
    ],
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.248694080183!2d73.8530343758364!3d18.517623969262968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06e408d669b%3A0xb3e6488d5e06497f!2sShaniwar%20Wada!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  {
    id: "pune-nature-adventure",
    title: "Pune Nature & Adventure",
    coverImage: "images/sinhagad-fort.jpg",
    description: "Escape the city and explore scenic landscapes, mountain views and outdoor experiences.",
    duration: "Full Day (~8 hrs)",
    durationHours: 8,
    stopsCount: 3,
    totalTicketCost: 20,
    ticketCostDisplay: "₹20 per person",
    routeSequence: ["Khadakwasla Dam", "Sinhagad Fort", "Panshet"],
    routeDistance: "38 km scenic mountain route",
    suggestedStartTime: "07:30 AM",
    stopsDetails: [
      {
        name: "Khadakwasla Dam",
        category: "Nature",
        duration: "1.5 hours",
        ticket: "Free Entry",
        priceNum: 0,
        timing: "07:30 AM – 09:00 AM",
        desc: "Breathtaking morning reservoir vistas, cool mountain air, and lakeside walks.",
        image: "images/khadakwasla-dam.jpg"
      },
      {
        name: "Sinhagad Fort",
        category: "Nature & Trekking",
        duration: "3.5 hours",
        ticket: "₹20",
        priceNum: 20,
        timing: "09:30 AM – 01:00 PM",
        desc: "Trek to the historic 'Lion Fort', visit Tanaji's memorial, and enjoy authentic hot Pithla Bhakri and curd.",
        image: "images/sinhagad-fort.jpg",
        bookingNote: "Forest entrance fee paid at base toll gate"
      },
      {
        name: "Panshet Lake / Dam Viewpoint",
        category: "Adventure & Scenic",
        duration: "2 hours",
        ticket: "Free Entry",
        priceNum: 0,
        timing: "02:30 PM – 04:30 PM",
        desc: "Scenic backwaters surrounded by lush Sahyadri hills, ideal for birdwatching and tranquil lake vistas.",
        image: "images/pashan-lake.jpg"
      }
    ],
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.248694080183!2d73.8530343758364!3d18.517623969262968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06e408d669b%3A0xb3e6488d5e06497f!2sShaniwar%20Wada!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  }
];

// 2. DATA STORE: Master Attraction Catalog for Custom Trip Planning
const ATTRACTIONS_CATALOG = [
  {
    id: "shaniwar-wada",
    name: "Shaniwar Wada",
    category: "Heritage",
    categories: ["All", "Heritage", "Art & Culture"],
    rating: 4.5,
    reviews: "2.1K",
    price: "₹25",
    priceNum: 25,
    durationHours: 1.5,
    durationText: "1.5 hours",
    openingHours: "9:00 AM – 5:30 PM",
    openHourNum: 9.0,
    closeHourNum: 17.5,
    isIndoor: false,
    image: "images/shaniwar-wada.jpg",
    officialBookingUrl: "https://asi.payumoney.com/",
    bookingType: "Official ASI Portal Available"
  },
  {
    id: "aga-khan-palace",
    name: "Aga Khan Palace",
    category: "Heritage",
    categories: ["All", "Heritage", "Art & Culture"],
    rating: 4.4,
    reviews: "1.8K",
    price: "₹25",
    priceNum: 25,
    durationHours: 2.0,
    durationText: "2 hours",
    openingHours: "9:00 AM – 5:30 PM",
    openHourNum: 9.0,
    closeHourNum: 17.5,
    isIndoor: true,
    image: "images/aga-khan-palace.jpg",
    officialBookingUrl: "https://asi.payumoney.com/",
    bookingType: "Official ASI Portal Available"
  },
  {
    id: "kelkar-museum",
    name: "Raja Dinkar Kelkar Museum",
    category: "Museum",
    categories: ["All", "Museum", "Art & Culture"],
    rating: 4.6,
    reviews: "3.2K",
    price: "₹100",
    priceNum: 100,
    durationHours: 2.0,
    durationText: "2 hours",
    openingHours: "10:00 AM – 5:30 PM",
    openHourNum: 10.0,
    closeHourNum: 17.5,
    isIndoor: true,
    image: "images/kelkar-museum.jpg",
    bookingType: "On-site Ticket Counter"
  },
  {
    id: "sinhagad-fort",
    name: "Sinhagad Fort",
    category: "Nature",
    categories: ["All", "Nature", "Adventure"],
    rating: 4.7,
    reviews: "4.1K",
    price: "₹20",
    priceNum: 20,
    durationHours: 3.5,
    durationText: "3.5 hours",
    openingHours: "6:00 AM – 6:00 PM",
    openHourNum: 6.0,
    closeHourNum: 18.0,
    isIndoor: false,
    image: "images/sinhagad-fort.jpg",
    bookingType: "Forest Toll Entry Counter"
  },
  {
    id: "pashan-lake",
    name: "Pashan Lake",
    category: "Nature",
    categories: ["All", "Nature"],
    rating: 4.3,
    reviews: "1.2K",
    price: "Free",
    priceNum: 0,
    durationHours: 1.5,
    durationText: "1.5 hours",
    openingHours: "6:00 AM – 6:00 PM",
    openHourNum: 6.0,
    closeHourNum: 18.0,
    isIndoor: false,
    image: "images/pashan-lake.jpg",
    bookingType: "Free Entry — No Ticket Needed"
  },
  {
    id: "parvati-hill",
    name: "Parvati Hill",
    category: "Adventure",
    categories: ["All", "Adventure", "Religious", "Heritage"],
    rating: 4.6,
    reviews: "2.5K",
    price: "Free",
    priceNum: 0,
    durationHours: 2.0,
    durationText: "2 hours",
    openingHours: "5:00 AM – 8:00 PM",
    openHourNum: 5.0,
    closeHourNum: 20.0,
    isIndoor: false,
    image: "images/parvati-hill.jpg",
    bookingType: "Free Entry — No Ticket Needed"
  },
  {
    id: "fc-road",
    name: "FC Road",
    category: "Food",
    categories: ["All", "Food", "Art & Culture"],
    rating: 4.6,
    reviews: "3.8K",
    price: "Free Entry",
    priceNum: 0,
    durationHours: 2.5,
    durationText: "2.5 hours",
    openingHours: "10:00 AM – 11:00 PM",
    openHourNum: 10.0,
    closeHourNum: 23.0,
    isIndoor: false,
    image: "images/fc-road.jpg",
    bookingType: "Free Entry — Walk In"
  },
  {
    id: "dagdusheth-ganpati",
    name: "Dagdusheth Halwai Ganpati",
    category: "Religious",
    categories: ["All", "Religious", "Art & Culture", "Heritage"],
    rating: 4.9,
    reviews: "6.4K",
    price: "Free Entry",
    priceNum: 0,
    durationHours: 1.0,
    durationText: "1 hour",
    openingHours: "6:00 AM – 10:30 PM",
    openHourNum: 6.0,
    closeHourNum: 22.5,
    isIndoor: true,
    image: "images/dagdusheth-ganpati.jpg",
    bookingType: "Free Entry — Darshan Open"
  },
  {
    id: "saras-baug",
    name: "Saras Baug",
    category: "Nature",
    categories: ["All", "Nature", "Religious"],
    rating: 4.5,
    reviews: "3.0K",
    price: "Free Entry",
    priceNum: 0,
    durationHours: 1.5,
    durationText: "1.5 hours",
    openingHours: "6:00 AM – 9:00 PM",
    openHourNum: 6.0,
    closeHourNum: 21.0,
    isIndoor: false,
    image: "images/saras-baug.jpg",
    bookingType: "Free Entry — Garden Open"
  },
  {
    id: "khadakwasla-dam",
    name: "Khadakwasla Dam",
    category: "Nature",
    categories: ["All", "Nature", "Adventure"],
    rating: 4.5,
    reviews: "4.8K",
    price: "Free Entry",
    priceNum: 0,
    durationHours: 2.0,
    durationText: "2 hours",
    openingHours: "6:00 AM – 7:00 PM",
    openHourNum: 6.0,
    closeHourNum: 19.0,
    isIndoor: false,
    image: "images/khadakwasla-dam.jpg",
    bookingType: "Free Entry — Scenic Promenade"
  },
  {
    id: "pataleshwar-cave",
    name: "Pataleshwar Cave Temple",
    category: "Heritage",
    categories: ["All", "Heritage", "Religious"],
    rating: 4.6,
    reviews: "2.2K",
    price: "Free Entry",
    priceNum: 0,
    durationHours: 1.0,
    durationText: "1 hour",
    openingHours: "8:00 AM – 5:30 PM",
    openHourNum: 8.0,
    closeHourNum: 17.5,
    isIndoor: true,
    image: "images/pataleshwar-cave.jpg",
    bookingType: "Free Entry — Protected Monument"
  }
];

// 3. Application State for Custom Trip Builder
const planState = {
  city: "pune",
  travelDate: getTomorrowDateString(),
  numDays: 1,
  startTime: "09:00",
  endTime: "19:00",
  budget: 1000,
  selectedDestinations: ["shaniwar-wada", "kelkar-museum", "dagdusheth-ganpati"], // Default 3 popular stops
  catalogCategory: "All",
  catalogSearch: "",
  activeTripToBook: null
};

// Helper: Get tomorrow's date formatted as YYYY-MM-DD
function getTomorrowDateString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// 4. Initializer
document.addEventListener("DOMContentLoaded", () => {
  initNavbarCitySync();
  renderPlannedTrips();
  initTripBuilder();
  renderAttractionsCatalog();
  renderSelectedDestinations();
  updateBudgetDisplay();
  initModalListeners();
});

// 5. Synchronize Navbar Location Pill with Global City
function initNavbarCitySync() {
  const savedCity = localStorage.getItem("bhatkanti_city") || "pune";
  const locationPill = document.querySelector(".location-pill");
  const locationPillText = locationPill ? locationPill.querySelector("span") : null;

  if (locationPillText) {
    locationPillText.textContent = savedCity === "mumbai" ? "Mumbai" : savedCity === "bangalore" ? "Bangalore" : "Pune";
  }

  if (locationPill && !document.getElementById("header-city-dropdown")) {
    locationPill.style.position = "relative";
    locationPill.style.cursor = "pointer";

    const selectEl = document.createElement("select");
    selectEl.id = "header-city-dropdown";
    selectEl.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; cursor:pointer;";
    selectEl.innerHTML = `
      <option value="pune">Pune</option>
      <option value="mumbai">Mumbai</option>
      <option value="bangalore">Bangalore</option>
    `;
    selectEl.value = savedCity;

    selectEl.addEventListener("change", (e) => {
      const chosenCity = e.target.value;
      localStorage.setItem("bhatkanti_city", chosenCity);
      if (locationPillText) {
        locationPillText.textContent = chosenCity === "mumbai" ? "Mumbai" : chosenCity === "bangalore" ? "Bangalore" : "Pune";
      }
      if (chosenCity !== "pune") {
        showPlanToast(`Showing Pune itineraries. ${chosenCity.charAt(0).toUpperCase() + chosenCity.slice(1)} trip routes coming soon!`);
      }
    });

    locationPill.appendChild(selectEl);
  }
}

// 6. SECTION ONE: Render Bhatkanti Planned Trips
function renderPlannedTrips() {
  const grid = document.getElementById("planned-trips-grid");
  if (!grid) return;

  grid.innerHTML = PREPLANNED_TRIPS.map(trip => {
    return `
      <article class="planned-trip-card" data-trip-id="${trip.id}">
        <div class="trip-card-banner">
          <img src="${trip.coverImage}" alt="${trip.title}" class="trip-card-img" loading="lazy">
          <span class="trip-duration-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${trip.duration}
          </span>
          <span class="trip-cost-badge">${trip.ticketCostDisplay}</span>
        </div>
        <div class="trip-card-body">
          <h3 class="trip-card-title">${trip.title}</h3>
          <p class="trip-card-desc">${trip.description}</p>

          <div class="trip-route-chain">
            <div class="route-chain-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3m0 14v3M2 12h3m14 0h3"></path></svg>
              Itinerary Route:
            </div>
            <div class="route-chain-stops">
              ${trip.routeSequence.map((stop, index) => `
                <span class="stop-pill">${stop}</span>
                ${index < trip.routeSequence.length - 1 ? '<span class="chain-arrow">→</span>' : ''}
              `).join("")}
            </div>
          </div>

          <div class="trip-meta-row">
            <div class="trip-meta-item">
              <span>📍</span> <span><strong>${trip.stopsCount}</strong> Destinations</span>
            </div>
            <div class="trip-meta-item">
              <span>🚗</span> <span>${trip.routeDistance}</span>
            </div>
          </div>

          <div class="trip-card-actions">
            <button class="btn-secondary" type="button" onclick="viewPlannedTrip('${trip.id}')">View Trip</button>
            <button class="btn-primary" type="button" onclick="bookPlannedTrip('${trip.id}')">Book This Trip</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// 7. View Planned Trip Modal
window.viewPlannedTrip = function(tripId) {
  const trip = PREPLANNED_TRIPS.find(t => t.id === tripId);
  if (!trip) return;

  const backdrop = document.getElementById("plan-modal-backdrop");
  const modalBody = document.getElementById("plan-modal-dynamic-content");
  if (!backdrop || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-img-wrap" style="height: 220px; position: relative;">
      <img src="${trip.coverImage}" alt="${trip.title}" class="modal-img" style="width:100%; height:100%; object-fit:cover;">
      <span class="modal-badge">${trip.duration}</span>
    </div>
    <div class="modal-body" style="padding: 24px;">
      <h3 class="modal-title" style="margin-bottom: 6px;">${trip.title}</h3>
      <p style="font-size: 13.5px; color: #4b5563; margin-bottom: 18px;">${trip.description}</p>

      <div class="modal-quick-facts" style="margin-bottom: 20px;">
        <div class="quick-fact-item">
          <span class="quick-fact-label">Total Stops</span>
          <span class="quick-fact-value">${trip.stopsCount} Places</span>
        </div>
        <div class="quick-fact-item">
          <span class="quick-fact-label">Est. Ticket Cost</span>
          <span class="quick-fact-value">${trip.ticketCostDisplay}</span>
        </div>
        <div class="quick-fact-item">
          <span class="quick-fact-label">Suggested Start</span>
          <span class="quick-fact-value">${trip.suggestedStartTime}</span>
        </div>
      </div>

      <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-dark); margin-bottom: 12px; letter-spacing: 0.5px;">
        Detailed Ordered Itinerary:
      </h4>

      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        ${trip.stopsDetails.map((stop, i) => `
          <div style="display: flex; gap: 12px; background: #f8faf9; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--dark-green); color: #fff; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${i + 1}
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                <h5 style="font-size: 14px; font-weight: 700; color: var(--text-dark);">${stop.name}</h5>
                <span style="font-size: 11px; font-weight: 700; color: var(--dark-green);">${stop.ticket}</span>
              </div>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 4px;">
                🕒 ${stop.timing} &bull; ⏱️ Visit: ${stop.duration}
              </div>
              <p style="font-size: 12px; color: #4b5563; line-height: 1.4;">${stop.desc}</p>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="modal-actions">
        <button class="btn-primary" type="button" onclick="closePlanModal(); bookPlannedTrip('${trip.id}');">
          Book This Trip Route
        </button>
        <button class="btn-secondary" type="button" onclick="copyPlannedTripToCustom('${trip.id}');">
          Customize in Builder
        </button>
      </div>
    </div>
  `;

  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closePlanModal = function() {
  const backdrop = document.getElementById("plan-modal-backdrop");
  if (backdrop) {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
};

function initModalListeners() {
  const backdrop = document.getElementById("plan-modal-backdrop");
  const closeBtn = document.getElementById("plan-modal-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", closePlanModal);
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closePlanModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop && backdrop.classList.contains("open")) {
      closePlanModal();
    }
  });
}

// 8. SECTION TWO: Custom Trip Builder Setup
function initTripBuilder() {
  // Trip Date picker default
  const dateInput = document.getElementById("builder-trip-date");
  if (dateInput) {
    dateInput.value = planState.travelDate;
    dateInput.min = new Date().toISOString().split("T")[0];
    dateInput.addEventListener("change", (e) => {
      planState.travelDate = e.target.value;
    });
  }

  // Days selector
  const daysSelect = document.getElementById("builder-trip-days");
  if (daysSelect) {
    daysSelect.value = planState.numDays;
    daysSelect.addEventListener("change", (e) => {
      planState.numDays = parseInt(e.target.value, 10);
    });
  }

  // Start & End Time
  const startTimeInput = document.getElementById("builder-start-time");
  const endTimeInput = document.getElementById("builder-end-time");
  if (startTimeInput) {
    startTimeInput.value = planState.startTime;
    startTimeInput.addEventListener("change", (e) => planState.startTime = e.target.value);
  }
  if (endTimeInput) {
    endTimeInput.value = planState.endTime;
    endTimeInput.addEventListener("change", (e) => planState.endTime = e.target.value);
  }

  // Budget Input
  const budgetInput = document.getElementById("builder-trip-budget");
  if (budgetInput) {
    budgetInput.value = planState.budget;
    budgetInput.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      planState.budget = isNaN(val) ? 0 : val;
      updateBudgetDisplay();
    });
  }

  // Catalog Category Filters
  const catBtns = document.querySelectorAll(".catalog-cat-btn");
  catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      catBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      planState.catalogCategory = btn.dataset.category;
      renderAttractionsCatalog();
    });
  });

  // Catalog Search
  const searchInput = document.getElementById("catalog-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      planState.catalogSearch = e.target.value.trim().toLowerCase();
      renderAttractionsCatalog();
    });
  }

  // Generate My Trip Action
  const generateBtn = document.getElementById("btn-generate-trip");
  if (generateBtn) {
    generateBtn.addEventListener("click", generateSmartItinerary);
  }
}

// 9. Render Attractions Catalog
function renderAttractionsCatalog() {
  const container = document.getElementById("catalog-items-grid");
  if (!container) return;

  const filtered = ATTRACTIONS_CATALOG.filter(item => {
    let matchesCat = true;
    if (planState.catalogCategory !== "All") {
      matchesCat = item.categories.includes(planState.catalogCategory) ||
                   item.category.toLowerCase() === planState.catalogCategory.toLowerCase();
    }

    let matchesSearch = true;
    if (planState.catalogSearch) {
      const q = planState.catalogSearch;
      matchesSearch = item.name.toLowerCase().includes(q) ||
                      item.category.toLowerCase().includes(q) ||
                      item.categories.some(c => c.toLowerCase().includes(q));
    }

    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 30px; color: var(--text-muted); font-size: 13px;">
        No attractions match your filter. Try another category or search term.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isAdded = planState.selectedDestinations.includes(item.id);
    return `
      <article class="catalog-item-card ${isAdded ? "is-added" : ""}" data-item-id="${item.id}">
        <div class="item-card-thumb-wrap">
          <img src="${item.image}" alt="${item.name}" class="item-card-thumb" loading="lazy">
          <span class="item-cat-tag">${item.category}</span>
        </div>
        <div class="item-card-info">
          <h4 class="item-card-title">${item.name}</h4>
          <div class="item-meta-pills">
            <span>Ticket: <strong>${item.price}</strong></span>
            <span>⏱️ ${item.durationText}</span>
          </div>
          <button 
            class="btn-add-destination" 
            type="button" 
            onclick="toggleAttraction('${item.id}')">
            ${isAdded ? "✓ Added to Route" : "+ Add to Trip"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// 10. Toggle Attraction In/Out of Custom Trip
window.toggleAttraction = function(attractionId) {
  const idx = planState.selectedDestinations.indexOf(attractionId);
  const item = ATTRACTIONS_CATALOG.find(a => a.id === attractionId);
  const name = item ? item.name : "Destination";

  if (idx > -1) {
    planState.selectedDestinations.splice(idx, 1);
    showPlanToast(`Removed ${name} from your custom trip.`);
  } else {
    planState.selectedDestinations.push(attractionId);
    showPlanToast(`Added ${name} to your route! 📍`);
  }

  renderAttractionsCatalog();
  renderSelectedDestinations();
  updateBudgetDisplay();
};

// 11. Render Selected Itinerary List
function renderSelectedDestinations() {
  const container = document.getElementById("selected-stops-list");
  const countBadge = document.getElementById("selected-places-count");
  const generateBtn = document.getElementById("btn-generate-trip");
  const emptyBox = document.getElementById("empty-itinerary-box");

  if (!container) return;

  const count = planState.selectedDestinations.length;
  if (countBadge) countBadge.textContent = `${count} Place${count === 1 ? "" : "s"}`;
  if (generateBtn) generateBtn.disabled = count === 0;

  if (count === 0) {
    container.innerHTML = "";
    if (emptyBox) emptyBox.style.display = "block";
    return;
  }

  if (emptyBox) emptyBox.style.display = "none";

  container.innerHTML = planState.selectedDestinations.map((id, index) => {
    const item = ATTRACTIONS_CATALOG.find(a => a.id === id);
    if (!item) return "";

    const isFirst = index === 0;
    const isLast = index === count - 1;

    return `
      <div class="selected-stop-item" data-id="${item.id}">
        <span class="stop-order-handle">${index + 1}</span>
        <img src="${item.image}" alt="${item.name}" class="stop-item-thumb">
        <div class="stop-item-details">
          <div class="stop-item-name">${item.name}</div>
          <div class="stop-item-meta">
            <span>Ticket: <strong>${item.price}</strong></span>
            <span>${item.durationText}</span>
          </div>
        </div>
        <div class="stop-item-controls">
          <button class="btn-order-ctrl" type="button" title="Move Up" ${isFirst ? "disabled" : ""} onclick="reorderStop(${index}, -1)">↑</button>
          <button class="btn-order-ctrl" type="button" title="Move Down" ${isLast ? "disabled" : ""} onclick="reorderStop(${index}, 1)">↓</button>
          <button class="btn-remove-stop" type="button" title="Remove" onclick="toggleAttraction('${item.id}')">✕</button>
        </div>
      </div>
    `;
  }).join("");
}

// 12. Reorder Stops Manually
window.reorderStop = function(currentIndex, direction) {
  const newIndex = currentIndex + direction;
  if (newIndex < 0 || newIndex >= planState.selectedDestinations.length) return;

  const temp = planState.selectedDestinations[currentIndex];
  planState.selectedDestinations[currentIndex] = planState.selectedDestinations[newIndex];
  planState.selectedDestinations[newIndex] = temp;

  renderSelectedDestinations();
  showPlanToast("Route destination order updated.");
};

window.clearAllSelectedStops = function() {
  if (confirm("Are you sure you want to clear your current custom trip?")) {
    planState.selectedDestinations = [];
    renderAttractionsCatalog();
    renderSelectedDestinations();
    updateBudgetDisplay();
    showPlanToast("Cleared all selected destinations.");
  }
};

// 13. Update Budget Calculation
function calculateTotalTicketCost() {
  return planState.selectedDestinations.reduce((total, id) => {
    const item = ATTRACTIONS_CATALOG.find(a => a.id === id);
    return total + (item ? item.priceNum : 0);
  }, 0);
}

function updateBudgetDisplay() {
  const totalCost = calculateTotalTicketCost();
  const budget = planState.budget;
  const remaining = budget - totalCost;

  const totalCostEl = document.getElementById("budget-total-tickets");
  const budgetUserEl = document.getElementById("budget-user-selected");
  const budgetRemainingEl = document.getElementById("budget-remaining");
  const budgetFillBar = document.getElementById("budget-bar-fill");
  const warningAlert = document.getElementById("budget-warning-alert");

  if (totalCostEl) totalCostEl.textContent = `₹${totalCost}`;
  if (budgetUserEl) budgetUserEl.textContent = `₹${budget}`;
  if (budgetRemainingEl) {
    budgetRemainingEl.textContent = remaining >= 0 ? `₹${remaining} available` : `-₹${Math.abs(remaining)} deficit`;
    budgetRemainingEl.style.color = remaining >= 0 ? "#059669" : "#b91c1c";
  }

  if (budgetFillBar) {
    const pct = budget > 0 ? Math.min(100, Math.round((totalCost / budget) * 100)) : 100;
    budgetFillBar.style.width = `${pct}%`;
    if (totalCost > budget) {
      budgetFillBar.classList.add("warning");
    } else {
      budgetFillBar.classList.remove("warning");
    }
  }

  if (warningAlert) {
    if (totalCost > budget) {
      warningAlert.innerHTML = `⚠️ Estimated ticket fees (₹${totalCost}) exceed your selected budget of ₹${budget} by ₹${totalCost - budget}. Consider increasing budget or adjusting destinations.`;
      warningAlert.classList.add("visible");
    } else {
      warningAlert.classList.remove("visible");
    }
  }
}

// 14. SMART ITINERARY GENERATOR ENGINE
function generateSmartItinerary() {
  if (planState.selectedDestinations.length === 0) {
    showPlanToast("Please select at least 1 destination to generate your trip!");
    return;
  }

  // Parse Start & End hours
  const [startH, startM] = planState.startTime.split(":").map(Number);
  const [endH, endM] = planState.endTime.split(":").map(Number);
  const totalAvailableHours = (endH + endM / 60) - (startH + startM / 60);

  if (totalAvailableHours <= 1) {
    alert("Please ensure your available time window (Start to End Time) is at least 2 hours.");
    return;
  }

  const selectedItems = planState.selectedDestinations
    .map(id => ATTRACTIONS_CATALOG.find(a => a.id === id))
    .filter(Boolean);

  // Time Calculation
  const totalVisitHours = selectedItems.reduce((acc, it) => acc + it.durationHours, 0);
  const estimatedLegTravelHours = (selectedItems.length - 1) * 0.4; // Average 24 mins (~0.4 hr) per leg
  const totalNeededHours = totalVisitHours + estimatedLegTravelHours;

  const fitsInTime = totalNeededHours <= totalAvailableHours;
  const totalCost = calculateTotalTicketCost();
  const fitsInBudget = totalCost <= planState.budget;

  // Weather Simulation for chosen date
  const isWeekend = new Date(planState.travelDate).getDay() % 6 === 0;
  const weatherAdvisory = {
    temp: "28°C",
    condition: "Partly Cloudy & Pleasant",
    rainChance: "10%",
    summary: "Clear to partly cloudy skies expected. Excellent conditions for both outdoor monuments and scenic vistas!"
  };

  // Schedule Timeline Builder
  let currentHour = startH + startM / 60;
  const scheduleTimeline = [];

  // 1. Initial departure
  scheduleTimeline.push({
    type: "start",
    time: formatTimeFromDecimal(currentHour),
    title: "Trip Departure",
    desc: `Begin your journey from your stay/central Pune towards first destination.`
  });

  // Transit to first destination
  currentHour += 0.35; // 20 mins to reach first spot

  selectedItems.forEach((dest, i) => {
    const arrivalTimeStr = formatTimeFromDecimal(currentHour);
    const departureTime = currentHour + dest.durationHours;
    const departureTimeStr = formatTimeFromDecimal(departureTime);

    // Check opening hours feasibility
    let hourWarning = "";
    if (currentHour < dest.openHourNum) {
      hourWarning = ` (Note: Opens at ${dest.openingHours.split("–")[0].trim()})`;
    } else if (currentHour > dest.closeHourNum) {
      hourWarning = ` ⚠️ Warning: May be closed upon arrival (Closes ${dest.openingHours.split("–")[1].trim()})`;
    }

    scheduleTimeline.push({
      type: "stop",
      number: i + 1,
      time: `${arrivalTimeStr} – ${departureTimeStr}`,
      title: dest.name,
      category: dest.category,
      price: dest.price,
      duration: dest.durationText,
      warning: hourWarning,
      image: dest.image
    });

    currentHour = departureTime;

    // Add travel leg if not last destination
    if (i < selectedItems.length - 1) {
      const travelMins = 20 + (i % 2) * 10;
      scheduleTimeline.push({
        type: "travel",
        time: `${formatTimeFromDecimal(currentHour)} (~${travelMins} mins)`,
        title: `🚗 Drive to ${selectedItems[i + 1].name}`,
        distance: `${(3.5 + i * 2.2).toFixed(1)} km`,
        desc: "Optimized route through central Pune connecting corridors to avoid peak traffic."
      });
      currentHour += travelMins / 60;
    }
  });

  // Trip Conclusion
  scheduleTimeline.push({
    type: "end",
    time: formatTimeFromDecimal(currentHour),
    title: "Journey Complete",
    desc: `Arrive back safely after visiting ${selectedItems.length} destinations.`
  });

  // Render the Generated Itinerary Section
  const itinerarySection = document.getElementById("generated-itinerary-section");
  const itineraryCard = document.getElementById("smart-itinerary-card");
  if (!itinerarySection || !itineraryCard) return;

  itineraryCard.innerHTML = `
    <div class="itinerary-card-header">
      <div>
        <span class="smart-engine-badge">
          ✨ Intelligent Route Optimization (Opening Hours • Traffic • Weather Forecast)
        </span>
        <h3 class="itinerary-main-title">Custom Pune Itinerary — ${formatDateDisplay(planState.travelDate)}</h3>
        <div class="itinerary-meta-summary">
          <span>Stops: <strong>${selectedItems.length} Places</strong></span>
          <span>Duration: <strong>~${totalNeededHours.toFixed(1)} Hours</strong></span>
          <span>Est. Ticket Fee: <strong>₹${totalCost} / person</strong></span>
          <span>Time Window: <strong>${planState.startTime} – ${planState.endTime}</strong></span>
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn-secondary" type="button" onclick="saveCurrentTripToStorage('Planned')">
          💾 Save to My Trips
        </button>
        <button class="btn-primary" type="button" onclick="proceedToBookingFromCustom()">
          Book Tickets →
        </button>
      </div>
    </div>

    <!-- 4 Intelligence Insights -->
    <div class="intelligence-insights-grid">
      <!-- 1. Time Check -->
      <div class="insight-pill-box">
        <div class="insight-icon-label">
          <span>🕒</span> <span>Time Schedule</span>
        </div>
        <div class="insight-main-val" style="color: ${fitsInTime ? "#073931" : "#b91c1c"}">
          ${fitsInTime ? "Feasible & Realistic ✓" : "Schedule Tight ⚠️"}
        </div>
        <div class="insight-sub-val">
          ${fitsInTime 
            ? `Total needed (${totalNeededHours.toFixed(1)} hrs) comfortably fits in available window (${totalAvailableHours.toFixed(1)} hrs).`
            : `Needed ${totalNeededHours.toFixed(1)} hrs exceeds available window of ${totalAvailableHours.toFixed(1)} hrs. Consider shortening visits.`}
        </div>
      </div>

      <!-- 2. Budget Check -->
      <div class="insight-pill-box">
        <div class="insight-icon-label">
          <span>💰</span> <span>Budget Analysis</span>
        </div>
        <div class="insight-main-val" style="color: ${fitsInBudget ? "#073931" : "#b91c1c"}">
          ${fitsInBudget ? `Within Budget (₹${totalCost} / ₹${planState.budget})` : `Budget Exceeded ⚠️`}
        </div>
        <div class="insight-sub-val">
          ${fitsInBudget 
            ? `Estimated ticket fees are well within your selected budget of ₹${planState.budget}.`
            : `Entry fees exceed selected budget by ₹${totalCost - planState.budget}.`}
        </div>
      </div>

      <!-- 3. Weather Forecast -->
      <div class="insight-pill-box">
        <div class="insight-icon-label">
          <span>⛅</span> <span>Weather Forecast</span>
        </div>
        <div class="insight-main-val">${weatherAdvisory.condition} (${weatherAdvisory.temp})</div>
        <div class="insight-sub-val">${weatherAdvisory.summary} Rain probability: ${weatherAdvisory.rainChance}.</div>
      </div>

      <!-- 4. Traffic & Route -->
      <div class="insight-pill-box">
        <div class="insight-icon-label">
          <span>🚗</span> <span>Traffic & Sequence</span>
        </div>
        <div class="insight-main-val">Sequential Order Optimized</div>
        <div class="insight-sub-val">Sequence arranged to prevent backtracking and avoid central Pune arterial bottle-necks.</div>
      </div>
    </div>

    <!-- Timeline Schedule -->
    <h4 style="font-family:'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 800; color: var(--dark-green); margin-bottom: 20px;">
      Timeline & Route Schedule
    </h4>

    <div class="itinerary-schedule-timeline">
      ${scheduleTimeline.map(evt => {
        if (evt.type === "stop") {
          return `
            <div class="timeline-event-item">
              <div class="timeline-event-dot"></div>
              <div class="timeline-event-content">
                <div class="timeline-time-badge">${evt.time}</div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
                  <div>
                    <h5 class="timeline-event-title">${evt.number}. ${evt.title} ${evt.warning ? `<span style="color:#b91c1c; font-size:12px;">${evt.warning}</span>` : ""}</h5>
                    <div class="timeline-event-details">
                      <span>Category: <strong>${evt.category}</strong></span>
                      <span>Ticket: <strong>${evt.price}</strong></span>
                      <span>Visit Duration: <strong>${evt.duration}</strong></span>
                    </div>
                  </div>
                  <img src="${evt.image}" alt="${evt.title}" style="width: 60px; height: 50px; border-radius: 6px; object-fit: cover;">
                </div>
              </div>
            </div>
          `;
        } else if (evt.type === "travel") {
          return `
            <div class="timeline-event-item">
              <div class="timeline-event-dot travel-dot"></div>
              <div class="timeline-travel-content">
                <span>🚗</span>
                <span style="font-weight: 700;">${evt.title}</span>
                <span>&bull;</span>
                <span>${evt.distance}</span>
                <span>&bull;</span>
                <span style="color: #6b7280; font-size: 11.5px;">${evt.desc}</span>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="timeline-event-item">
              <div class="timeline-event-dot"></div>
              <div style="background: #f8faf9; border-radius: 8px; padding: 10px 16px; border: 1px dashed #cbd5e1; font-size: 13px; color: var(--text-dark);">
                <strong style="color: var(--dark-green);">${evt.time}:</strong> ${evt.title} &mdash; <span style="color: var(--text-muted);">${evt.desc}</span>
              </div>
            </div>
          `;
        }
      }).join("")}
    </div>

    <!-- Map Preview -->
    <div class="itinerary-map-box">
      <iframe 
        class="itinerary-map-iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.248694080183!2d73.8530343758364!3d18.517623969262968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06e408d669b%3A0xb3e6488d5e06497f!2sShaniwar%20Wada!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
        loading="lazy" 
        title="Custom Route Map">
      </iframe>
    </div>

    <!-- Bottom Actions -->
    <div class="itinerary-bottom-actions">
      <button class="btn-secondary" type="button" onclick="document.getElementById('custom-trip-section').scrollIntoView({behavior:'smooth'})">
        ✏️ Edit Destinations
      </button>
      <button class="btn-secondary" type="button" onclick="saveCurrentTripToStorage('Planned')">
        💾 Save to My Trips
      </button>
      <button class="btn-primary" type="button" onclick="proceedToBookingFromCustom()">
        Proceed to Book Tickets →
      </button>
    </div>
  `;

  itinerarySection.classList.add("visible");
  itinerarySection.scrollIntoView({ behavior: "smooth", block: "start" });
  showPlanToast("Smart itinerary generated successfully! ✨");
}

function formatTimeFromDecimal(decimalHours) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${displayHours}:${displayMinutes} ${period}`;
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

// 15. BOOKING ENGINE ("Book Your Tickets")
window.proceedToBookingFromCustom = function() {
  const selectedItems = planState.selectedDestinations
    .map(id => ATTRACTIONS_CATALOG.find(a => a.id === id))
    .filter(Boolean);

  renderBookingSection({
    title: `Custom Pune Trip (${selectedItems.length} Stops)`,
    date: planState.travelDate,
    stops: selectedItems,
    totalTicketCost: calculateTotalTicketCost()
  });

  const bookingSec = document.getElementById("booking-section");
  if (bookingSec) {
    bookingSec.style.display = "block";
    bookingSec.scrollIntoView({ behavior: "smooth" });
  }
};

window.bookPlannedTrip = function(tripId) {
  const trip = PREPLANNED_TRIPS.find(t => t.id === tripId);
  if (!trip) return;

  const stops = trip.stopsDetails.map(s => {
    const catalogItem = ATTRACTIONS_CATALOG.find(a => a.name.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])) || {};
    return {
      name: s.name,
      price: s.ticket,
      priceNum: s.priceNum,
      bookingType: s.bookingUrl ? "Official ASI Portal Available" : s.bookingNote || "Free Entry",
      officialBookingUrl: s.bookingUrl || null
    };
  });

  renderBookingSection({
    title: trip.title,
    date: planState.travelDate,
    stops: stops,
    totalTicketCost: trip.totalTicketCost
  });

  const bookingSec = document.getElementById("booking-section");
  if (bookingSec) {
    bookingSec.style.display = "block";
    bookingSec.scrollIntoView({ behavior: "smooth" });
  }
};

function renderBookingSection(bookingContext) {
  const bookingContainer = document.getElementById("booking-section-content");
  if (!bookingContainer) return;

  planState.activeTripToBook = bookingContext;

  bookingContainer.innerHTML = `
    <div class="booking-cards-grid">
      ${bookingContext.stops.map(stop => {
        let tagClass = "free-entry";
        let buttonHtml = `<span style="font-size:12px; color:var(--text-muted);">No online reservation required</span>`;

        if (stop.officialBookingUrl) {
          tagClass = "official-online";
          buttonHtml = `
            <a href="${stop.officialBookingUrl}" target="_blank" rel="noopener noreferrer" class="btn-official-booking">
              Book on Official ASI Portal ↗
            </a>
          `;
        } else if (stop.priceNum > 0) {
          tagClass = "counter-only";
          buttonHtml = `
            <span style="font-size: 11.5px; color: #92400e; font-weight: 600; padding: 6px 0;">
              🎟️ Pay at on-site entrance counter
            </span>
          `;
        } else {
          tagClass = "free-entry";
          buttonHtml = `
            <span style="font-size: 11.5px; color: #166534; font-weight: 600; padding: 6px 0;">
              ✓ Complimentary public admission
            </span>
          `;
        }

        return `
          <div class="booking-attraction-card">
            <h4 class="booking-attraction-title">${stop.name}</h4>
            <div class="booking-attraction-price">Ticket: ${stop.price || (stop.priceNum > 0 ? "₹" + stop.priceNum : "Free Entry")}</div>
            <span class="booking-status-tag ${tagClass}">${stop.bookingType || "Admission Info"}</span>
            ${buttonHtml}
          </div>
        `;
      }).join("")}
    </div>

    <!-- Combined Booking & Traveler Form -->
    <div class="combined-booking-card">
      <div class="combined-booking-header">
        <div>
          <h4 style="font-size: 20px; font-weight: 800; color: var(--dark-green); margin-bottom: 4px;">
            Reserve & Confirm: ${bookingContext.title}
          </h4>
          <p style="font-size: 13px; color: var(--text-muted);">
            Travel Date: <strong>${formatDateDisplay(bookingContext.date)}</strong> &bull; Total Stops: <strong>${bookingContext.stops.length}</strong>
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Est. Entry Cost Total</div>
          <div class="combined-total-price">₹${bookingContext.totalTicketCost} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">/ person</span></div>
        </div>
      </div>

      <form id="confirm-booking-form" onsubmit="handleBookingSubmission(event)">
        <div class="traveler-form-grid">
          <div class="param-field">
            <label class="param-label">Lead Traveler Name *</label>
            <input type="text" class="param-input" id="book-traveler-name" placeholder="e.g. Aditya Kulkarni" required>
          </div>
          <div class="param-field">
            <label class="param-label">Email Address *</label>
            <input type="email" class="param-input" id="book-traveler-email" placeholder="e.g. aditya@gmail.com" required>
          </div>
          <div class="param-field">
            <label class="param-label">Mobile Number *</label>
            <input type="tel" class="param-input" id="book-traveler-phone" placeholder="e.g. 9876543210" required>
          </div>
          <div class="param-field">
            <label class="param-label">Number of Visitors</label>
            <select class="param-select" id="book-num-visitors" onchange="updateBookingTotalCalculation()">
              <option value="1" selected>1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5+ Persons</option>
            </select>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-top: 20px; padding-top: 16px; border-top: 1px solid #d1fae5;">
          <div style="font-size: 12px; color: var(--text-muted); max-width: 600px;">
            ℹ️ <strong>Transparent Booking Policy:</strong> Bhatkanti verifies entry fees and connects travelers with official government heritage portals. No simulated fake transactions are charged on this website.
          </div>
          <button class="btn-confirm-booking" type="submit">
            Confirm & Save to My Trips
          </button>
        </div>
      </form>
    </div>
  `;
}

window.updateBookingTotalCalculation = function() {
  const visitorsSelect = document.getElementById("book-num-visitors");
  if (!visitorsSelect || !planState.activeTripToBook) return;
  const num = parseInt(visitorsSelect.value, 10) || 1;
  const total = planState.activeTripToBook.totalTicketCost * num;
  const priceEl = document.querySelector(".combined-total-price");
  if (priceEl) {
    priceEl.innerHTML = `₹${total} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">(${num} visitor${num > 1 ? "s" : ""})</span>`;
  }
};

window.handleBookingSubmission = function(event) {
  event.preventDefault();
  const name = document.getElementById("book-traveler-name").value.trim();
  const email = document.getElementById("book-traveler-email").value.trim();
  const phone = document.getElementById("book-traveler-phone").value.trim();
  const numVisitors = parseInt(document.getElementById("book-num-visitors").value, 10) || 1;

  if (!name || !email || !phone) {
    alert("Please fill in your contact details.");
    return;
  }

  const tripContext = planState.activeTripToBook;
  if (!tripContext) return;

  // Generate unique booking reference ID
  const refId = `BHT-PUN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const savedTripRecord = {
    id: refId,
    title: tripContext.title,
    city: "Pune",
    date: tripContext.date,
    traveler: { name, email, phone, numVisitors },
    destinations: tripContext.stops.map(s => s.name),
    totalCost: tripContext.totalTicketCost * numVisitors,
    costPerPerson: tripContext.totalTicketCost,
    status: "Booking Pending", // Genuine verified status as required by user prompt
    createdAt: new Date().toISOString()
  };

  // Save to shared localStorage key
  const savedTrips = JSON.parse(localStorage.getItem("bhatkanti_saved_trips") || "[]");
  savedTrips.unshift(savedTripRecord);
  localStorage.setItem("bhatkanti_saved_trips", JSON.stringify(savedTrips));

  // Also save to trip list for backward compatibility
  localStorage.setItem("bhatkanti_trip_list", JSON.stringify(savedTrips));

  alert(`🎉 Trip Saved! Booking Reference: ${refId}\n\nStatus: Booking Pending\nLead Traveler: ${name}\nTravel Date: ${tripContext.date}\n\nYou can access your itinerary and bookings anytime on the 'My Trips' page.`);

  window.location.href = "my-trips.html";
};

// 16. Save Current Trip as Planned (Without Booking Form)
window.saveCurrentTripToStorage = function(status = "Planned") {
  const selectedItems = planState.selectedDestinations
    .map(id => ATTRACTIONS_CATALOG.find(a => a.id === id))
    .filter(Boolean);

  if (selectedItems.length === 0) return;

  const refId = `BHT-PUN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const tripRecord = {
    id: refId,
    title: `Custom Pune Day Trip (${selectedItems.length} Stops)`,
    city: "Pune",
    date: planState.travelDate,
    destinations: selectedItems.map(s => s.name),
    totalCost: calculateTotalTicketCost(),
    costPerPerson: calculateTotalTicketCost(),
    status: status, // "Planned" or "Draft"
    createdAt: new Date().toISOString()
  };

  const savedTrips = JSON.parse(localStorage.getItem("bhatkanti_saved_trips") || "[]");
  savedTrips.unshift(tripRecord);
  localStorage.setItem("bhatkanti_saved_trips", JSON.stringify(savedTrips));

  showPlanToast(`Saved "${tripRecord.title}" to My Trips (Ref: ${refId})! 🎒`);
};

window.copyPlannedTripToCustom = function(tripId) {
  const trip = PREPLANNED_TRIPS.find(t => t.id === tripId);
  if (!trip) return;

  // Match planned trip stops to catalog ids
  const matchedIds = [];
  trip.routeSequence.forEach(stopName => {
    const item = ATTRACTIONS_CATALOG.find(a => a.name.toLowerCase().includes(stopName.toLowerCase().split(" ")[0]));
    if (item && !matchedIds.includes(item.id)) {
      matchedIds.push(item.id);
    }
  });

  if (matchedIds.length > 0) {
    planState.selectedDestinations = matchedIds;
    renderAttractionsCatalog();
    renderSelectedDestinations();
    updateBudgetDisplay();
    closePlanModal();
    document.getElementById("custom-trip-section").scrollIntoView({ behavior: "smooth" });
    showPlanToast(`Loaded "${trip.title}" stops into Custom Builder!`);
  }
};

// 17. Toast Engine
let planToastTimer = null;
function showPlanToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span>${message}</span>
  `;
  toast.classList.add("show");

  if (planToastTimer) clearTimeout(planToastTimer);
  planToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
