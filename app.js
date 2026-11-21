/* ==========================================================================
   BHATKANTI - MULTI-CITY DYNAMIC SWITCHER & APP ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Get initial city state from localStorage or default to 'pune'
  const savedCity = localStorage.getItem("bhatkanti_city") || "pune";
  let currentCityKey = CITY_DATA[savedCity] ? savedCity : "pune";

  // Cache DOM elements
  const locationPill = document.querySelector(".location-pill");
  const locationPillText = locationPill ? locationPill.querySelector("span") : null;
  
  // Create or select dynamic city dropdown menu
  let citySelectDropdown = document.getElementById("header-city-dropdown");

  // 2. Render Main Function
  function renderCity(cityKey) {
    const data = CITY_DATA[cityKey];
    if (!data) return;

    currentCityKey = cityKey;
    localStorage.setItem("bhatkanti_city", cityKey);

    // A. Update Navbar Location Display
    if (locationPillText) {
      locationPillText.textContent = data.name;
    }
    if (citySelectDropdown) {
      citySelectDropdown.value = cityKey;
    }

    // B. Update Hero Section
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroBannerImg = document.querySelector(".hero-banner-img");
    const heroScriptText = document.querySelector(".hero-script-right .script-text");
    const heroBadgeSpan = document.querySelector(".hero-bottom-badge span:nth-child(2)");

    if (heroTitle) heroTitle.innerHTML = data.hero.title;
    if (heroSubtitle) heroSubtitle.innerHTML = data.hero.subtitle;
    if (heroBannerImg) heroBannerImg.src = data.hero.image;
    if (heroScriptText) heroScriptText.innerHTML = data.taglineScript;
    if (heroBadgeSpan) heroBadgeSpan.textContent = data.hero.bottomBadgeText;

    // C. Update Search Bar & Chips
    const searchInput = document.querySelector(".search-input-field");
    const searchLocationSpan = document.querySelector(".search-location-select span");
    const categoryChipsContainer = document.querySelector(".category-chips-row");

    if (searchInput) searchInput.placeholder = data.searchPlaceholder;
    if (searchLocationSpan) searchLocationSpan.textContent = data.name;
    if (categoryChipsContainer) {
      categoryChipsContainer.innerHTML = data.chips
        .map(chip => `<a href="#" class="chip">${chip}</a>`)
        .join("");
    }

    // D. Update Categories Grid
    const categoriesGrid = document.querySelector(".categories-grid");
    if (categoriesGrid) {
      categoriesGrid.innerHTML = data.categories
        .map(cat => `
          <a href="#" class="category-card ${cat.bg}">
            <div class="category-icon-wrapper">
              ${cat.icon}
            </div>
            <span class="category-name">${cat.name}</span>
          </a>
        `).join("");
    }

    // E. Update Popular Places
    const popularTitle = document.querySelector(".popular-section .section-title");
    const placesGrid = document.querySelector(".places-grid");

    if (popularTitle) popularTitle.textContent = data.popularSectionTitle;
    if (placesGrid) {
      placesGrid.innerHTML = data.popularPlaces
        .map(place => `
          <article class="place-card">
            <div class="card-img-wrapper">
              <img src="${place.image}" alt="${place.name}" class="card-img">
              <button class="favorite-btn" aria-label="Add to favorites" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <div class="card-content">
              <h3 class="place-title">${place.name}</h3>
              <div class="place-location">
                <svg width="10" height="12" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0C4.238 0 2 2.238 2 5C2 8.75 7 16 7 16C7 16 12 8.75 12 5C12 2.238 9.762 0 7 0Z" fill="#6B7280"/>
                </svg>
                <span>${place.location}</span>
              </div>
              <div class="place-meta-row">
                <div class="rating-badge">
                  <span>★</span> <span>${place.rating}</span> <span class="reviews">(${place.reviews})</span>
                </div>
                <div class="time-badge">
                  <span>🕒</span> <span>${place.time}</span>
                </div>
                <div class="price-tag">${place.price}</div>
              </div>
              <div class="card-actions">
                <button class="btn-secondary" type="button">View Details</button>
                <button class="btn-primary" type="button">Add to Trip</button>
              </div>
            </div>
          </article>
        `).join("");
    }

    // F. Update Plan Your Trip Select
    const prefCitySelect = document.querySelector(".pref-select");
    if (prefCitySelect) {
      prefCitySelect.value = data.name;
    }

    // G. Update Map & Overlay Pins
    const mapIframe = document.querySelector(".map-iframe");
    const mapCardWrapper = document.querySelector(".map-card-wrapper");

    if (mapIframe) mapIframe.src = data.mapIframe;

    // Clear existing overlay pins except map-zoom-controls
    if (mapCardWrapper) {
      const oldPins = mapCardWrapper.querySelectorAll(".map-pin");
      oldPins.forEach(pin => pin.remove());

      // Insert new pins
      data.mapPins.forEach(pin => {
        const pinDiv = document.createElement("div");
        pinDiv.className = "map-pin";
        pinDiv.style.cssText = pin.style;
        pinDiv.innerHTML = `
          ${pin.thumb ? `<img src="${pin.thumb}" alt="${pin.name}" class="map-pin-thumb">` : `<span class="map-pin-icon">📍</span>`}
          <span>${pin.name} <span class="map-pin-dist">${pin.dist}</span></span>
        `;
        mapCardWrapper.appendChild(pinDiv);
      });
    }

    // H. Update Reviews
    const reviewsGrid = document.querySelector(".reviews-grid");
    if (reviewsGrid) {
      reviewsGrid.innerHTML = data.reviews
        .map(rev => `
          <article class="review-card">
            <div class="reviewer-header">
              <img src="${rev.avatar}" alt="${rev.name}" class="reviewer-avatar">
              <div>
                <h3 class="reviewer-name">${rev.name}</h3>
                <div class="star-rating">${rev.rating}</div>
              </div>
            </div>
            <p class="review-text">${rev.text}</p>
          </article>
        `).join("");
    }
  }

  // 3. Setup Header City Selector Dropdown
  if (locationPill) {
    // Convert location-pill to interactive dropdown
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
    selectEl.value = currentCityKey;

    selectEl.addEventListener("change", (e) => {
      renderCity(e.target.value);
    });

    locationPill.appendChild(selectEl);
  }

  // 4. Setup Plan Your Trip City Selector Event Listener
  const prefCitySelect = document.querySelector(".pref-select");
  if (prefCitySelect) {
    prefCitySelect.addEventListener("change", (e) => {
      const val = e.target.value.toLowerCase();
      if (CITY_DATA[val]) {
        renderCity(val);
      }
    });
  }

  // Initial render
  renderCity(currentCityKey);
});
