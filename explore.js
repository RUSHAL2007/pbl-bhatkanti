/* ==========================================================================
   BHATKANTI - EXPLORE PUNE ENGINE
   Handles Search, Category Filtering, Sorting, Favourites, Add to Trip & Details Modal
   ========================================================================== */

// 1. Centralized Pune Destinations Dataset
const PUNE_EXPLORE_DATA = [
  {
    id: "shaniwar-wada",
    name: "Shaniwar Wada",
    category: "Heritage",
    categories: ["All", "Heritage", "Art & Culture"],
    rating: 4.5,
    reviews: "2.1K",
    reviewsCount: 2100,
    price: "₹25",
    priceNum: 25,
    hours: "9:00 AM–5:30 PM",
    duration: "1.5 hours",
    description: "Historical fortification from the Maratha Empire, known for its grand architecture.",
    longDescription: "Built in 1732 as the seat of the Peshwa rulers of the Maratha Empire, Shaniwar Wada was a magnificent seven-story palace complex. Today, its grand stone gates, massive bastions, and ornate foundation fountains stand as proud emblems of Pune's imperial heritage.",
    image: "images/shaniwar-wada.jpg",
    location: "Shaniwar Peth, Central Pune",
    bestTime: "Morning or Late Afternoon",
    highlights: ["Grand Dilli Darwaza", "Spike-Studded Gates", "Lotus Fountain Ruins", "Light & Sound Show"]
  },
  {
    id: "aga-khan-palace",
    name: "Aga Khan Palace",
    category: "Historical",
    categories: ["All", "Heritage", "Art & Culture"],
    rating: 4.4,
    reviews: "1.8K",
    reviewsCount: 1800,
    price: "₹25",
    priceNum: 25,
    hours: "9:00 AM–5:30 PM",
    duration: "2 hours",
    description: "A beautiful palace with deep historical significance and peaceful surroundings.",
    longDescription: "Built in 1892 by Sultan Muhammed Shah Aga Khan III, this Italianate-arched palace served as a sanctuary during famine. It later became historic grounds during the Indian Freedom Movement, serving as the internment site for Mahatma Gandhi, Kasturba Gandhi, and Sarojini Naidu.",
    image: "images/aga-khan-palace.jpg",
    location: "Kalyani Nagar, Pune",
    bestTime: "9:30 AM – 1:00 PM",
    highlights: ["Italian Marble Arches", "Gandhi Memorial & Ashes", "Kasturba Gandhi Samadhi", "Sprawling Green Lawns"]
  },
  {
    id: "kelkar-museum",
    name: "Raja Dinkar Kelkar Museum",
    category: "Museum",
    categories: ["All", "Museum", "Art & Culture"],
    rating: 4.6,
    reviews: "3.2K",
    reviewsCount: 3200,
    price: "₹100",
    priceNum: 100,
    hours: "10:00 AM–5:30 PM",
    duration: "2 hours",
    description: "Houses an extraordinary collection of artifacts from across India.",
    longDescription: "A singular treasure trove assembled by Dr. D.G. Kelkar in memory of his son. The museum houses over 20,000 priceless artifacts including ancient musical instruments, intricate Maratha pottery, carved wooden doors, weapons, and a breathtaking replica of the Peshwa Mastani Mahal.",
    image: "images/kelkar-museum.jpg",
    location: "Shukrawar Peth, Pune",
    bestTime: "11:00 AM – 4:00 PM",
    highlights: ["Mastani Mahal Replica", "Vintage Musical Instruments", "Ivory & Brass Artifacts", "Maratha Armory"]
  },
  {
    id: "sinhagad-fort",
    name: "Sinhagad Fort",
    category: "Nature",
    categories: ["All", "Nature", "Adventure", "Nearby Getaways"],
    rating: 4.7,
    reviews: "4.1K",
    reviewsCount: 4100,
    price: "₹20",
    priceNum: 20,
    hours: "6:00 AM–6:00 PM",
    duration: "3–4 hours",
    description: "A popular trekking destination with breathtaking views of Pune.",
    longDescription: "Perched 1,312 meters atop the Sahyadri range, the 'Lion Fort' was strategically pivotal to Chhatrapati Shivaji Maharaj and immortalized by Tanaji Malusare's heroic 1670 battle. It offers exhilarating trails, misty mountain cliffs, and famous rustic culinary delights.",
    image: "images/sinhagad-fort.jpg",
    location: "Thoptewadi, 30 km South of Pune",
    bestTime: "Early Morning (Sunrise) & Monsoons",
    highlights: ["Tanaji Malusare Samadhi", "Kalyan Darwaza Cliff Walk", "Fresh Pithla Bhakri & Kanda Bhajji", "360° Sahyadri Cloud Panoramas"]
  },
  {
    id: "pashan-lake",
    name: "Pashan Lake",
    category: "Nature",
    categories: ["All", "Nature", "Nearby Getaways"],
    rating: 4.3,
    reviews: "1.2K",
    reviewsCount: 1200,
    price: "Free",
    priceNum: 0,
    hours: "6:00 AM–6:00 PM",
    duration: "1–2 hours",
    description: "A peaceful lakeside destination for enjoying nature and birdwatching.",
    longDescription: "Constructed during the British era to supply drinking water, Pashan Lake is today a tranquil urban wetland ecosystem. Hemmed in by bamboo groves and acacia trees, it is a favored bird sanctuary frequented by migratory herons, openbill storks, and ducks.",
    image: "images/pashan-lake.jpg",
    location: "Pashan, West Pune",
    bestTime: "Sunrise 6:00 AM – 8:30 AM",
    highlights: ["Wetland Birdwatching Trail", "Reflective Sunrise Views", "Peaceful Walking Promenade", "Photographic Nature Escapes"]
  },
  {
    id: "parvati-hill",
    name: "Parvati Hill",
    category: "Adventure",
    categories: ["All", "Adventure", "Religious", "Heritage"],
    rating: 4.6,
    reviews: "2.5K",
    reviewsCount: 2500,
    price: "Free",
    priceNum: 0,
    hours: "5:00 AM–8:00 PM",
    duration: "2 hours",
    description: "A hilltop destination known for its panoramic city views and historic temples.",
    longDescription: "Ascending 103 well-laid stone steps leads to the highest natural observation summit in central Pune. Commissioned during the Peshwa era, Parvati Hill hosts five historic temples, the Peshwa Museum, and unparalleled 360-degree vistas across the Pune skyline.",
    image: "images/parvati-hill.jpg",
    location: "Parvati Paytha, Pune",
    bestTime: "5:30 AM – 7:30 AM (Sunrise) or 5:30 PM (Sunset)",
    highlights: ["103 Stone Step Climb", "Peshwa Museum & Monument", "Devdeveshwar Temple", "Panoramic City Skyline View"]
  },
  {
    id: "fc-road",
    name: "FC Road",
    category: "Food",
    categories: ["All", "Food", "Art & Culture"],
    rating: 4.6,
    reviews: "3.8K",
    reviewsCount: 3800,
    price: "Free Entry",
    priceNum: 0,
    hours: "10:00 AM–11:00 PM",
    duration: "2–3 hours",
    description: "A lively Pune street known for cafes, snacks, shopping and student hangouts.",
    longDescription: "Fergusson College Road is the vibrant beating heart of Pune's youthful culture. Running past the historic 1885 campus, this boulevard is renowned for iconic Irani bakeries, sizzling street food stalls, bookshops, chic cafes, and buzzing street fashion markets.",
    image: "images/fc-road.jpg",
    location: "Shivajinagar, Pune",
    bestTime: "4:00 PM – 9:30 PM",
    highlights: ["Cafe Goodluck Bun Maska & Chai", "Vaishali & South Indian Flavors", "Bustling Street Fashion Boutiques", "Vibrant College Town Energy"]
  },
  {
    id: "dagdusheth-ganpati",
    name: "Dagdusheth Halwai Ganpati",
    category: "Religious",
    categories: ["All", "Religious", "Heritage", "Art & Culture"],
    rating: 4.9,
    reviews: "6.4K",
    reviewsCount: 6400,
    price: "Free Entry",
    priceNum: 0,
    hours: "6:00 AM–10:30 PM",
    duration: "1 hour",
    description: "A renowned Pune Ganpati temple known for its devotional atmosphere and architecture.",
    longDescription: "Established in 1893 by sweet merchant Dagdusheth Gadve and his wife Lakshmibai after encouragement from Lokmanya Tilak, this iconic temple enshrines an awe-inspiring 7.5-foot gold-ornamented Ganesha idol. It is a symbol of faith and public community celebration.",
    image: "images/dagdusheth-ganpati.jpg",
    location: "Budhwar Peth, Pune",
    bestTime: "Morning Suvarnasundar Aarti (7:30 AM) or Evening Aarti",
    highlights: ["Glorious 7.5ft Gold-Adorned Idol", "Intricate Marble Sanctum", "Daily Soul-Stirring Aarti", "Ganeshotsav Center of Celebrations"]
  }
];

// 2. Application State
const state = {
  activeCategory: "All",
  searchQuery: "",
  sortBy: "popular", // 'popular', 'rating', 'price-asc', 'price-desc'
  favorites: JSON.parse(localStorage.getItem("bhatkanti_favorites") || "[]"),
  tripList: JSON.parse(localStorage.getItem("bhatkanti_trip_list") || "[]")
};

// 3. Main Init on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  initNavbarCitySync();
  initCategoryFilters();
  initSearch();
  initSorting();
  initModal();
  renderDestinations();
});

// 4. Synchronize Navbar Location Pill with Shared Website State
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
        showToast(`Showing Pune Explore guide. ${chosenCity.charAt(0).toUpperCase() + chosenCity.slice(1)} explore guide is coming soon!`);
      } else {
        showToast("Exploring Pune — Cultural capital of Maharashtra.");
      }
    });

    locationPill.appendChild(selectEl);
  }

  // Header search icon click scrolls and focuses explore search bar
  const headerSearchBtn = document.getElementById("btn-header-search");
  const exploreSearchInput = document.getElementById("explore-search-input");
  if (headerSearchBtn && exploreSearchInput) {
    headerSearchBtn.addEventListener("click", () => {
      exploreSearchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => exploreSearchInput.focus(), 400);
    });
  }
}

// 5. Category Filters Setup
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll(".category-pill-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.category;
      if (state.activeCategory === selected) return;

      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeCategory = selected;
      renderDestinations();
    });
  });
}

// 6. Search Bar Setup
function initSearch() {
  const searchInput = document.getElementById("explore-search-input");
  const searchClearBtn = document.getElementById("explore-search-clear");
  const searchForm = document.getElementById("explore-search-form");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (searchClearBtn) {
        if (state.searchQuery.length > 0) {
          searchClearBtn.classList.add("visible");
        } else {
          searchClearBtn.classList.remove("visible");
        }
      }
      renderDestinations();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        state.searchQuery = "";
        searchClearBtn.classList.remove("visible");
        renderDestinations();
        searchInput.focus();
      }
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const grid = document.getElementById("destinations-grid");
      if (grid) {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}

// 7. Sorting Setup
function initSorting() {
  const sortSelect = document.getElementById("explore-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderDestinations();
    });
  }
}

// 8. Filter and Sort Destinations
function getFilteredAndSortedDestinations() {
  let list = PUNE_EXPLORE_DATA.filter(dest => {
    // A. Category matching
    let matchesCategory = true;
    if (state.activeCategory && state.activeCategory !== "All") {
      matchesCategory = dest.categories.includes(state.activeCategory) || 
                        dest.category.toLowerCase() === state.activeCategory.toLowerCase();
    }

    // B. Search query matching
    let matchesSearch = true;
    if (state.searchQuery) {
      const q = state.searchQuery;
      matchesSearch = dest.name.toLowerCase().includes(q) ||
                      dest.category.toLowerCase().includes(q) ||
                      dest.description.toLowerCase().includes(q) ||
                      dest.location.toLowerCase().includes(q) ||
                      dest.categories.some(c => c.toLowerCase().includes(q));
    }

    return matchesCategory && matchesSearch;
  });

  // C. Sorting
  switch (state.sortBy) {
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "price-asc":
      list.sort((a, b) => a.priceNum - b.priceNum);
      break;
    case "price-desc":
      list.sort((a, b) => b.priceNum - a.priceNum);
      break;
    case "popular":
    default:
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
  }

  return list;
}

// 9. Render Destination Cards
function renderDestinations() {
  const container = document.getElementById("destinations-grid");
  const countBadge = document.getElementById("explore-count-badge");
  if (!container) return;

  const destinations = getFilteredAndSortedDestinations();

  if (countBadge) {
    countBadge.textContent = `${destinations.length} Place${destinations.length === 1 ? "" : "s"}`;
  }

  // Handle Empty State
  if (destinations.length === 0) {
    container.innerHTML = `
      <div class="explore-empty-state">
        <div class="empty-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 class="empty-title">No destinations found</h3>
        <p class="empty-subtitle">We couldn't find any places matching your current search or category filter. Try clearing your search keywords or switching back to All categories.</p>
        <button class="btn-reset-filters" type="button" onclick="resetExploreFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Render cards
  container.innerHTML = destinations.map(dest => {
    const isFav = state.favorites.includes(dest.id);
    return `
      <article class="dest-card" data-id="${dest.id}">
        <div class="dest-img-wrap">
          <img src="${dest.image}" alt="${dest.name}" class="dest-img" loading="lazy">
          <span class="dest-badge">${dest.category}</span>
          <button 
            class="dest-fav-btn ${isFav ? "is-active" : ""}" 
            type="button" 
            aria-label="Save ${dest.name} to favourites"
            onclick="toggleFavorite('${dest.id}', event)">
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div class="dest-card-content">
          <div class="dest-header-row">
            <h3 class="dest-title">${dest.name}</h3>
            ${dest.rating ? `
              <div class="dest-rating">
                <span style="color: #f59e0b;">★</span>
                <span>${dest.rating}</span>
                <span class="reviews-count">(${dest.reviews})</span>
              </div>
            ` : ""}
          </div>
          <p class="dest-description">${dest.description}</p>

          <div class="dest-info-grid">
            <div class="dest-info-row">
              <span class="dest-info-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="6" y1="8" x2="6.01" y2="8"></line><line x1="10" y1="12" x2="18" y2="12"></line></svg>
                Ticket Price
              </span>
              <span class="dest-info-val price">${dest.price}</span>
            </div>
            <div class="dest-info-row">
              <span class="dest-info-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Hours
              </span>
              <span class="dest-info-val">${dest.hours}</span>
            </div>
            <div class="dest-info-row">
              <span class="dest-info-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 10"></polyline></svg>
                Duration
              </span>
              <span class="dest-info-val">${dest.duration}</span>
            </div>
          </div>

          <div class="dest-card-actions">
            <button class="btn-secondary" type="button" onclick="openDetailsModal('${dest.id}')">View Details</button>
            <button class="btn-primary" type="button" onclick="addToTrip('${dest.id}', event)">Add to Trip</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// 10. Global Function to Reset Filters
window.resetExploreFilters = function() {
  state.activeCategory = "All";
  state.searchQuery = "";
  state.sortBy = "popular";

  const searchInput = document.getElementById("explore-search-input");
  const searchClearBtn = document.getElementById("explore-search-clear");
  const sortSelect = document.getElementById("explore-sort-select");
  const categoryPills = document.querySelectorAll(".category-pill-btn");

  if (searchInput) searchInput.value = "";
  if (searchClearBtn) searchClearBtn.classList.remove("visible");
  if (sortSelect) sortSelect.value = "popular";
  categoryPills.forEach(b => {
    b.classList.toggle("active", b.dataset.category === "All");
  });

  renderDestinations();
  showToast("Filters reset to default.");
};

// 11. Toggle Favourite Selection
window.toggleFavorite = function(destId, event) {
  if (event) event.stopPropagation();

  const index = state.favorites.indexOf(destId);
  const dest = PUNE_EXPLORE_DATA.find(d => d.id === destId);
  const placeName = dest ? dest.name : "Destination";

  if (index > -1) {
    state.favorites.splice(index, 1);
    showToast(`Removed ${placeName} from favourites.`);
  } else {
    state.favorites.push(destId);
    showToast(`Saved ${placeName} to favourites! ❤️`);
  }

  localStorage.setItem("bhatkanti_favorites", JSON.stringify(state.favorites));
  renderDestinations();
};

// 12. Add to Trip Selection
window.addToTrip = function(destId, event) {
  if (event) event.stopPropagation();

  const dest = PUNE_EXPLORE_DATA.find(d => d.id === destId);
  if (!dest) return;

  const exists = state.tripList.some(item => item.id === destId);
  if (!exists) {
    state.tripList.push({
      id: dest.id,
      name: dest.name,
      price: dest.price,
      duration: dest.duration,
      category: dest.category,
      addedAt: new Date().toISOString()
    });
    localStorage.setItem("bhatkanti_trip_list", JSON.stringify(state.tripList));
    showToast(`Added ${dest.name} to your trip list! 🎒`);
  } else {
    showToast(`${dest.name} is already in your trip list!`);
  }
};

// 13. Reusable View Details Modal
function initModal() {
  const backdrop = document.getElementById("explore-modal-backdrop");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && backdrop) {
    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("open")) {
        closeModal();
      }
    });
  }
}

window.openDetailsModal = function(destId) {
  const dest = PUNE_EXPLORE_DATA.find(d => d.id === destId);
  if (!dest) return;

  const backdrop = document.getElementById("explore-modal-backdrop");
  const modalContent = document.getElementById("modal-dynamic-content");

  if (!backdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-img-wrap">
      <img src="${dest.image}" alt="${dest.name}" class="modal-img">
      <span class="modal-badge">${dest.category}</span>
    </div>
    <div class="modal-body">
      <h3 class="modal-title">${dest.name}</h3>
      <div class="modal-meta-top">
        <span class="modal-location">
          <svg width="14" height="14" viewBox="0 0 14 16" fill="none"><path d="M7 0C4.238 0 2 2.238 2 5C2 8.75 7 16 7 16C7 16 12 8.75 12 5C12 2.238 9.762 0 7 0Z" fill="#073931"/></svg>
          ${dest.location}
        </span>
        ${dest.rating ? `
          <div class="dest-rating">
            <span style="color: #f59e0b;">★</span>
            <span>${dest.rating}</span>
            <span class="reviews-count">(${dest.reviews} reviews)</span>
          </div>
        ` : ""}
      </div>

      <p class="modal-desc">${dest.longDescription || dest.description}</p>

      <div class="modal-quick-facts">
        <div class="quick-fact-item">
          <span class="quick-fact-label">Ticket Price</span>
          <span class="quick-fact-value">${dest.price}</span>
        </div>
        <div class="quick-fact-item">
          <span class="quick-fact-label">Visiting Hours</span>
          <span class="quick-fact-value">${dest.hours}</span>
        </div>
        <div class="quick-fact-item">
          <span class="quick-fact-label">Ideal Duration</span>
          <span class="quick-fact-value">${dest.duration}</span>
        </div>
      </div>

      ${dest.highlights ? `
        <div class="modal-highlights">
          <h4 class="highlights-title">Key Highlights</h4>
          <div class="highlights-pills">
            ${dest.highlights.map(h => `<span class="highlight-pill">${h}</span>`).join("")}
          </div>
        </div>
      ` : ""}

      <div class="modal-actions">
        <button class="btn-primary" type="button" onclick="addToTrip('${dest.id}'); closeModal();">
          Add to Trip Plan
        </button>
        <button class="btn-secondary" type="button" onclick="toggleFavorite('${dest.id}');">
          ${state.favorites.includes(dest.id) ? "Favourited ❤️" : "Save Favourite"}
        </button>
      </div>
    </div>
  `;

  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeModal = function() {
  const backdrop = document.getElementById("explore-modal-backdrop");
  if (backdrop) {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
};

// 14. Toast Notification Engine
let toastTimeout = null;
function showToast(message) {
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

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
