/**
 * ==========================================================================
 * BHATKANTI — USER ACCOUNT DROPDOWN & ACCOUNT HUB ENGINE
 * Modular, shared implementation for all website pages:
 * - Home (index.html)
 * - Explore (explore.html)
 * - Plan My Trip (plan.html)
 * - Bookings (bookings.html)
 * - My Trips (my-trips.html)
 * ==========================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DEFAULT DATA & STORAGE HELPERS
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    PROFILE: 'bhatkanti_user_profile',
    PAYMENT_METHODS: 'bhatkanti_payment_methods',
    TRANSACTIONS: 'bhatkanti_payment_transactions',
    SETTINGS: 'bhatkanti_user_settings',
    SUPPORT_TICKETS: 'bhatkanti_support_tickets'
  };

  const DEFAULT_PROFILE = {
    fullName: 'Aarav Sharma',
    email: 'explorer@bhatkanti.com',
    phone: '+91 98765 43210',
    gender: 'male',
    dob: '1996-05-18',
    city: 'Pune, Maharashtra',
    avatarType: 'emoji', // 'emoji', 'image', or 'svg'
    avatarValue: '🎒'
  };

  const DEFAULT_METHODS = [
    {
      id: 'pm-1',
      type: 'card',
      brand: 'visa',
      brandName: 'Visa Debit',
      cardholder: 'Aarav Sharma',
      numberMasked: '•••• •••• •••• 4291',
      last4: '4291',
      expiry: '08/28',
      bankName: 'HDFC Bank',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'card',
      brand: 'mastercard',
      brandName: 'Mastercard',
      cardholder: 'Aarav Sharma',
      numberMasked: '•••• •••• •••• 8834',
      last4: '8834',
      expiry: '11/27',
      bankName: 'ICICI Bank',
      isDefault: false
    },
    {
      id: 'pm-3',
      type: 'upi',
      brand: 'upi',
      brandName: 'Google Pay UPI',
      vpa: 'explorer@okhdfcbank',
      bankName: 'HDFC Bank VPA',
      isDefault: false
    }
  ];

  const DEFAULT_TRANSACTIONS = [
    {
      id: 'TXN-2026-9041',
      date: '12 Feb 2026, 14:32',
      item: 'Shaniwar Wada & Heritage Pass (Booking #BK-PUN-001)',
      amount: 1550,
      method: 'HDFC Visa •••• 4291',
      status: 'Successful',
      baseFare: 1313,
      gst: 237,
      authCode: 'AUTH-94821',
      gatewayRef: 'razor_pay_ref_84920'
    },
    {
      id: 'TXN-2026-8812',
      date: '28 Jan 2026, 10:15',
      item: 'Sinhagad Fort Guided Trek & Transport',
      amount: 2800,
      method: 'UPI explorer@okhdfcbank',
      status: 'Successful',
      baseFare: 2372,
      gst: 428,
      authCode: 'AUTH-77312',
      gatewayRef: 'upi_npci_ref_10293'
    },
    {
      id: 'TXN-2026-7450',
      date: '15 Jan 2026, 16:45',
      item: 'Raja Dinkar Kelkar Museum Entry (Cancelled)',
      amount: 950,
      method: 'ICICI MC •••• 8834',
      status: 'Refunded',
      baseFare: 805,
      gst: 145,
      authCode: 'AUTH-31049',
      gatewayRef: 'rfnd_ref_99210'
    },
    {
      id: 'TXN-2026-6120',
      date: '05 Jan 2026, 11:20',
      item: 'Aga Khan Palace Cultural Walk',
      amount: 1200,
      method: 'Net Banking (SBI)',
      status: 'Pending',
      baseFare: 1016,
      gst: 184,
      authCode: 'AUTH-84910',
      gatewayRef: 'sbi_nb_txn_5501'
    },
    {
      id: 'TXN-2026-5301',
      date: '20 Dec 2025, 09:10',
      item: 'Parvati Hill Sunrise Trail',
      amount: 450,
      method: 'Axis Card •••• 1044',
      status: 'Failed',
      baseFare: 381,
      gst: 69,
      authCode: 'FAIL-ERR-302',
      gatewayRef: 'err_gateway_declined'
    }
  ];

  const DEFAULT_SETTINGS = {
    theme: 'light',
    language: 'en',
    notifyEmail: true,
    notifyBookingUpdates: true,
    notifyPromotions: false,
    notifySmsWhatsApp: true,
    privacyProfilePublic: false,
    privacyHistoryTracking: true
  };

  function getStored(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 2. INITIALIZE STORE
  // --------------------------------------------------------------------------
  function initDataStore() {
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
      setStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS)) {
      setStored(STORAGE_KEYS.PAYMENT_METHODS, DEFAULT_METHODS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
      setStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      setStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUPPORT_TICKETS)) {
      setStored(STORAGE_KEYS.SUPPORT_TICKETS, []);
    }
  }

  // --------------------------------------------------------------------------
  // 3. RENDER AVATAR HELPER
  // --------------------------------------------------------------------------
  function renderAvatarHtml(profile, sizeClass) {
    if (!profile) profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);

    if (profile.avatarType === 'image' && profile.avatarValue) {
      return `<img src="${escapeHtml(profile.avatarValue)}" alt="${escapeHtml(profile.fullName)}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
    } else if (profile.avatarType === 'emoji' && profile.avatarValue) {
      return `<span style="font-size: 1.2em; line-height: 1;">${profile.avatarValue}</span>`;
    }

    // Default SVG
    return `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
  }

  // --------------------------------------------------------------------------
  // 4. SYNC NAVBAR AND PREVIEWS
  // --------------------------------------------------------------------------
  function updateProfileDisplay() {
    const profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    const firstName = profile.fullName ? profile.fullName.trim().split(' ')[0] : 'Explorer';

    // Update navbar greeting and name
    const userNameEl = document.querySelector('.user-profile .user-name');
    if (userNameEl) {
      userNameEl.textContent = firstName || 'Explorer';
    }

    const avatarCircle = document.querySelector('.user-profile .avatar-circle');
    if (avatarCircle) {
      avatarCircle.innerHTML = renderAvatarHtml(profile);
    }

    // Update Dropdown header
    const dropName = document.getElementById('dropdown-user-name');
    const dropEmail = document.getElementById('dropdown-user-email');
    const dropAvatar = document.getElementById('dropdown-header-avatar-inner');
    if (dropName) dropName.textContent = profile.fullName || 'Explorer';
    if (dropEmail) dropEmail.textContent = profile.email || 'explorer@bhatkanti.com';
    if (dropAvatar) dropAvatar.innerHTML = renderAvatarHtml(profile);

    // Update Modal sidebar
    const sideName = document.getElementById('sidebar-user-fullname');
    const sideRole = document.getElementById('sidebar-user-role');
    const sideAvatar = document.getElementById('sidebar-avatar-preview');
    if (sideName) sideName.textContent = profile.fullName || 'Explorer';
    if (sideRole) sideRole.textContent = `${profile.city || 'Pune'} • Explorer`;
    if (sideAvatar) sideAvatar.innerHTML = renderAvatarHtml(profile);
  }

  // --------------------------------------------------------------------------
  // 5. INJECT DROPDOWN MARKUP
  // --------------------------------------------------------------------------
  function injectDropdownMarkup() {
    const userProfileEl = document.getElementById('user-profile-menu');
    if (!userProfileEl) return;

    // Set accessibility
    userProfileEl.setAttribute('tabindex', '0');
    userProfileEl.setAttribute('role', 'button');
    userProfileEl.setAttribute('aria-haspopup', 'true');
    userProfileEl.setAttribute('aria-expanded', 'false');
    userProfileEl.setAttribute('aria-label', 'User Account Menu');

    // Add chevron class to svg arrow inside profile
    const svgArrow = userProfileEl.querySelector('svg:not(.avatar-circle svg)');
    if (svgArrow) {
      svgArrow.classList.add('dropdown-chevron');
    }

    // If dropdown doesn't exist yet, append it
    let dropdown = document.getElementById('bhatkanti-account-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'bhatkanti-account-dropdown';
      dropdown.id = 'bhatkanti-account-dropdown';
      dropdown.setAttribute('role', 'menu');

      const profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);

      dropdown.innerHTML = `
        <!-- Dropdown Header Card -->
        <div class="dropdown-header-card">
          <div class="dropdown-header-avatar" id="dropdown-header-avatar-inner">
            ${renderAvatarHtml(profile)}
          </div>
          <div class="dropdown-header-info">
            <div class="dropdown-user-name" id="dropdown-user-name">${escapeHtml(profile.fullName)}</div>
            <div class="dropdown-user-email" id="dropdown-user-email">${escapeHtml(profile.email)}</div>
            <div class="dropdown-user-badge">
              <span class="badge-dot"></span> Bhatkanti Member
            </div>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <!-- Four Main Account Options -->
        <div class="dropdown-items-list">
          <button class="dropdown-item-btn" data-target-tab="profile" role="menuitem">
            <div class="dropdown-item-icon icon-profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="dropdown-item-content">
              <span class="item-title">Edit Profile</span>
              <span class="item-desc">Personal details, contact & avatar</span>
            </div>
            <svg class="item-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button class="dropdown-item-btn" data-target-tab="payments" role="menuitem">
            <div class="dropdown-item-icon icon-payments">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <div class="dropdown-item-content">
              <span class="item-title">Payments</span>
              <span class="item-desc">Saved methods, cards & history</span>
            </div>
            <svg class="item-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button class="dropdown-item-btn" data-target-tab="settings" role="menuitem">
            <div class="dropdown-item-icon icon-settings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <div class="dropdown-item-content">
              <span class="item-title">Settings</span>
              <span class="item-desc">Preferences, alerts & password</span>
            </div>
            <svg class="item-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button class="dropdown-item-btn" data-target-tab="support" role="menuitem">
            <div class="dropdown-item-icon icon-support">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div class="dropdown-item-content">
              <span class="item-title">Help & Support</span>
              <span class="item-desc">FAQs, guide & message support</span>
            </div>
            <svg class="item-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <div class="dropdown-divider"></div>

        <!-- Dropdown Footer -->
        <div class="dropdown-footer-row">
          <button class="dropdown-quick-link" id="btn-quick-trips" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            My Saved Trips
          </button>
          <button class="dropdown-signout-btn" id="btn-demo-signout" type="button" title="Reset Demo Data">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Reset Session
          </button>
        </div>
      `;

      userProfileEl.appendChild(dropdown);
    }
  }

  // --------------------------------------------------------------------------
  // 6. INJECT ACCOUNT HUB MODAL MARKUP
  // --------------------------------------------------------------------------
  function injectAccountModalMarkup() {
    if (document.getElementById('account-modal-backdrop')) return;

    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'account-modal-backdrop';
    modalBackdrop.id = 'account-modal-backdrop';
    modalBackdrop.setAttribute('aria-hidden', 'true');

    const profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);

    modalBackdrop.innerHTML = `
      <div class="account-modal-container" role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
        
        <!-- Modal Header -->
        <div class="account-modal-header">
          <div class="account-modal-title-group">
            <div class="account-brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h2 class="account-modal-title" id="account-modal-title">Bhatkanti Account Center</h2>
              <p class="account-modal-subtitle">Manage your profile, payment methods, preferences and support</p>
            </div>
          </div>
          
          <button class="account-modal-close-btn" id="account-modal-close-btn" type="button" aria-label="Return to Page (Esc)" title="Return to Page (Esc)">
            <span>Return to Page</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Modal Body (Sidebar + Content Area) -->
        <div class="account-modal-body">
          
          <!-- Left Sidebar Navigation -->
          <aside class="account-modal-sidebar">
            <div class="account-sidebar-user">
              <div class="sidebar-avatar-wrapper" id="sidebar-avatar-preview">
                ${renderAvatarHtml(profile)}
              </div>
              <div class="sidebar-user-text">
                <strong id="sidebar-user-fullname">${escapeHtml(profile.fullName)}</strong>
                <span id="sidebar-user-role">${escapeHtml(profile.city || 'Pune')} • Explorer</span>
              </div>
            </div>

            <nav class="account-sidebar-nav" aria-label="Account Tabs">
              <button class="account-nav-tab active" data-tab="profile" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Edit Profile</span>
              </button>
              <button class="account-nav-tab" data-tab="payments" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                <span>Payments</span>
              </button>
              <button class="account-nav-tab" data-tab="settings" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span>Settings</span>
              </button>
              <button class="account-nav-tab" data-tab="support" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <span>Help & Support</span>
              </button>
            </nav>
          </aside>

          <!-- Right Tab Content Area -->
          <main class="account-tab-content-area" id="account-tab-content-area">
            <div id="account-toast-banner" class="account-toast-banner" style="display: none;"></div>

            <!-- -------------------------------------------------------- -->
            <!-- TAB 1: EDIT PROFILE                                      -->
            <!-- -------------------------------------------------------- -->
            <section id="tab-content-profile" class="account-tab-pane active">
              <div class="pane-heading-group">
                <h3 class="pane-title">Edit Profile</h3>
                <p class="pane-subtitle">Manage your personal details, profile avatar and contact information</p>
              </div>

              <!-- Avatar Selection Card -->
              <div class="profile-avatar-row">
                <div class="profile-avatar-large" id="profile-avatar-large-preview">
                  ${renderAvatarHtml(profile)}
                </div>
                <div class="profile-avatar-actions">
                  <strong>Choose Avatar Style</strong>
                  <p>Pick a travel persona badge or upload your own photo</p>
                  
                  <div class="avatar-preset-pills">
                    <button class="avatar-preset-btn ${profile.avatarValue === '🎒' ? 'active' : ''}" type="button" data-avatar-type="emoji" data-avatar-val="🎒" title="Backpacker">🎒</button>
                    <button class="avatar-preset-btn ${profile.avatarValue === '🌲' ? 'active' : ''}" type="button" data-avatar-type="emoji" data-avatar-val="🌲" title="Forest Trail">🌲</button>
                    <button class="avatar-preset-btn ${profile.avatarValue === '🏛️' ? 'active' : ''}" type="button" data-avatar-type="emoji" data-avatar-val="🏛️" title="Heritage Historian">🏛️</button>
                    <button class="avatar-preset-btn ${profile.avatarValue === '🧭' ? 'active' : ''}" type="button" data-avatar-type="emoji" data-avatar-val="🧭" title="Explorer Compass">🧭</button>
                    <button class="avatar-preset-btn ${profile.avatarValue === '⛰️' ? 'active' : ''}" type="button" data-avatar-type="emoji" data-avatar-val="⛰️" title="Sahyadri Trekker">⛰️</button>
                    <button class="avatar-preset-btn ${profile.avatarValue === '📸' ? 'active' : ''}" type="button" data-avatar-type="emoji" data-avatar-val="📸" title="Travel Photographer">📸</button>
                    
                    <label class="btn-account-secondary" style="padding: 6px 12px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      Upload Photo
                      <input type="file" id="acc-file-avatar-upload" accept="image/*" style="display: none;">
                    </label>
                  </div>
                </div>
              </div>

              <!-- Profile Form -->
              <form id="acc-profile-form">
                <div class="account-form-grid">
                  <div class="account-form-group">
                    <label class="account-form-label" for="acc-input-fullname">Full Name *</label>
                    <input class="account-form-input" type="text" id="acc-input-fullname" value="${escapeHtml(profile.fullName)}" required>
                  </div>

                  <div class="account-form-group">
                    <label class="account-form-label" for="acc-input-email">Email Address *</label>
                    <input class="account-form-input" type="email" id="acc-input-email" value="${escapeHtml(profile.email)}" required>
                  </div>

                  <div class="account-form-group">
                    <label class="account-form-label" for="acc-input-phone">Mobile Number *</label>
                    <input class="account-form-input" type="tel" id="acc-input-phone" value="${escapeHtml(profile.phone || '')}" placeholder="+91 98765 43210" required>
                  </div>

                  <div class="account-form-group">
                    <label class="account-form-label" for="acc-input-gender">Gender (Optional)</label>
                    <select class="account-form-select" id="acc-input-gender">
                      <option value="">Select Gender</option>
                      <option value="male" ${profile.gender === 'male' ? 'selected' : ''}>Male</option>
                      <option value="female" ${profile.gender === 'female' ? 'selected' : ''}>Female</option>
                      <option value="nonbinary" ${profile.gender === 'nonbinary' ? 'selected' : ''}>Non-Binary</option>
                      <option value="unspecified" ${profile.gender === 'unspecified' ? 'selected' : ''}>Prefer not to say</option>
                    </select>
                  </div>

                  <div class="account-form-group">
                    <label class="account-form-label" for="acc-input-dob">Date of Birth (Optional)</label>
                    <input class="account-form-input" type="date" id="acc-input-dob" value="${escapeHtml(profile.dob || '')}">
                  </div>

                  <div class="account-form-group">
                    <label class="account-form-label" for="acc-input-city">Home City & State</label>
                    <input class="account-form-input" type="text" id="acc-input-city" value="${escapeHtml(profile.city || 'Pune, Maharashtra')}">
                  </div>
                </div>

                <div class="account-form-actions">
                  <button type="submit" class="btn-account-primary" id="btn-save-profile">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Save Changes
                  </button>
                  <button type="button" class="btn-account-secondary" id="btn-cancel-profile">
                    Cancel
                  </button>
                </div>
              </form>
            </section>

            <!-- -------------------------------------------------------- -->
            <!-- TAB 2: PAYMENTS                                          -->
            <!-- -------------------------------------------------------- -->
            <section id="tab-content-payments" class="account-tab-pane">
              <div class="pane-heading-group">
                <h3 class="pane-title">Payments & Billing</h3>
                <p class="pane-subtitle">Manage saved payment methods, view transaction receipts and past settlements</p>
              </div>

              <!-- Saved Methods Block -->
              <div class="payments-methods-block">
                <div class="payments-block-header">
                  <span class="payments-block-title">Saved Payment Methods</span>
                  <button class="btn-add-payment-toggle" id="btn-toggle-add-payment" type="button">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Payment Method
                  </button>
                </div>

                <!-- Add Payment Drawer Form -->
                <div class="add-payment-drawer" id="add-payment-drawer">
                  <strong style="display:block; font-size:13.5px; margin-bottom:10px; color:var(--dark-green);">Add New Method</strong>
                  <form id="acc-add-payment-form">
                    <div class="account-form-grid" style="margin-bottom: 12px;">
                      <div class="account-form-group">
                        <label class="account-form-label" for="new-pm-type">Payment Type</label>
                        <select class="account-form-select" id="new-pm-type">
                          <option value="card">Credit / Debit Card</option>
                          <option value="upi">UPI ID (VPA)</option>
                        </select>
                      </div>
                      <div class="account-form-group" id="group-pm-holder">
                        <label class="account-form-label" for="new-pm-holder">Name on Card</label>
                        <input class="account-form-input" type="text" id="new-pm-holder" placeholder="e.g. Aarav Sharma">
                      </div>
                      <div class="account-form-group" id="group-pm-number">
                        <label class="account-form-label" for="new-pm-number">Card Number</label>
                        <input class="account-form-input" type="text" id="new-pm-number" maxlength="19" placeholder="4291 •••• •••• ••••">
                      </div>
                      <div class="account-form-group" id="group-pm-expiry">
                        <label class="account-form-label" for="new-pm-expiry">Expiry (MM/YY)</label>
                        <input class="account-form-input" type="text" id="new-pm-expiry" maxlength="5" placeholder="MM/YY">
                      </div>
                      <div class="account-form-group" id="group-pm-upi" style="display:none; grid-column: 1 / -1;">
                        <label class="account-form-label" for="new-pm-vpa">UPI ID / VPA</label>
                        <input class="account-form-input" type="text" id="new-pm-vpa" placeholder="yourname@okhdfcbank">
                      </div>
                    </div>

                    <div class="security-token-notice">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      <span><strong>Safe Tokenization:</strong> Bhatkanti never stores sensitive card credentials, CVVs or UPI PINs. Demonstrates tokenized payment storage ready for payment gateway integration.</span>
                    </div>

                    <div class="account-form-actions" style="margin-top: 12px; padding-top: 10px;">
                      <button type="submit" class="btn-account-primary" style="padding: 8px 16px; font-size: 13px;">Save Method</button>
                      <button type="button" class="btn-account-secondary" id="btn-cancel-add-pm" style="padding: 8px 14px; font-size: 13px;">Cancel</button>
                    </div>
                  </form>
                </div>

                <!-- Methods List -->
                <div class="saved-methods-grid" id="saved-methods-container">
                  <!-- Rendered dynamically -->
                </div>
              </div>

              <!-- Payment History / Transactions -->
              <div class="payments-history-block">
                <span class="payments-block-title" style="display:block; margin-bottom:12px;">Payment & Transaction History</span>
                <div class="transaction-table-wrapper">
                  <table class="transaction-table" aria-label="Transaction History">
                    <thead>
                      <tr>
                        <th>Txn ID</th>
                        <th>Date & Time</th>
                        <th>Trip / Purpose</th>
                        <th>Method</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody id="transaction-rows-container">
                      <!-- Rendered dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Transaction Detail Modal / Drawer -->
              <div id="txn-detail-modal" style="display:none; margin-top:20px; background:#f8faf9; border:1px solid #e5e7eb; border-radius:12px; padding:18px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <strong style="color:var(--dark-green); font-size:15px;">Transaction Receipt Breakdown</strong>
                  <button type="button" id="btn-close-txn-detail" class="btn-account-secondary" style="padding:4px 10px; font-size:12px;">Close Receipt</button>
                </div>
                <div id="txn-detail-body" style="font-size:13px; line-height:1.6;"></div>
              </div>
            </section>

            <!-- -------------------------------------------------------- -->
            <!-- TAB 3: SETTINGS                                          -->
            <!-- -------------------------------------------------------- -->
            <section id="tab-content-settings" class="account-tab-pane">
              <div class="pane-heading-group">
                <h3 class="pane-title">Account Settings</h3>
                <p class="pane-subtitle">Configure your preferences, notification triggers, language and security</p>
              </div>

              <!-- Preferences Form -->
              <form id="acc-settings-form">
                <!-- Theme & Language Card -->
                <div class="settings-section-card">
                  <h4 class="settings-card-title">Localization & Appearance</h4>
                  <p class="settings-card-desc">Choose language and interface theme preference</p>

                  <div class="account-form-grid">
                    <div class="account-form-group">
                      <label class="account-form-label" for="setting-language">Language</label>
                      <select class="account-form-select" id="setting-language">
                        <option value="en" selected>English (Default)</option>
                        <option value="mr">मराठी (Marathi)</option>
                        <option value="hi">हिंदी (Hindi)</option>
                      </select>
                    </div>

                    <div class="account-form-group">
                      <label class="account-form-label" for="setting-theme">Color Theme</label>
                      <select class="account-form-select" id="setting-theme">
                        <option value="light" selected>Cream & Forest Green (Bhatkanti Classic)</option>
                        <option value="dark">Slate Dark (Preview)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Notifications Card -->
                <div class="settings-section-card">
                  <h4 class="settings-card-title">Notification Preferences</h4>
                  <p class="settings-card-desc">Control which updates and alerts you receive</p>

                  <div class="settings-toggle-row">
                    <div class="toggle-label-wrap">
                      <strong>Email Notifications</strong>
                      <span>Receive booking confirmations, itinerary changes and invoices</span>
                    </div>
                    <label class="account-switch">
                      <input type="checkbox" id="setting-notify-email" checked>
                      <span class="account-slider"></span>
                    </label>
                  </div>

                  <div class="settings-toggle-row">
                    <div class="toggle-label-wrap">
                      <strong>Booking & Route Alerts</strong>
                      <span>Get real-time entry slot reminders, gate passes and weather alerts</span>
                    </div>
                    <label class="account-switch">
                      <input type="checkbox" id="setting-notify-bookings" checked>
                      <span class="account-slider"></span>
                    </label>
                  </div>

                  <div class="settings-toggle-row">
                    <div class="toggle-label-wrap">
                      <strong>Curated Heritage Trails & Promotions</strong>
                      <span>Receive occasional weekend getaways, cultural events and discount passes</span>
                    </div>
                    <label class="account-switch">
                      <input type="checkbox" id="setting-notify-promotions">
                      <span class="account-slider"></span>
                    </label>
                  </div>

                  <div class="settings-toggle-row">
                    <div class="toggle-label-wrap">
                      <strong>SMS & WhatsApp Updates</strong>
                      <span>Receive immediate entry ticket passes and emergency trail updates</span>
                    </div>
                    <label class="account-switch">
                      <input type="checkbox" id="setting-notify-sms" checked>
                      <span class="account-slider"></span>
                    </label>
                  </div>
                </div>

                <!-- Privacy Card -->
                <div class="settings-section-card">
                  <h4 class="settings-card-title">Privacy & Activity</h4>
                  <p class="settings-card-desc">Manage privacy visibility and historical search personalization</p>

                  <div class="settings-toggle-row">
                    <div class="toggle-label-wrap">
                      <strong>Public Traveler Profile</strong>
                      <span>Allow co-travelers on shared heritage tours to see your traveler badge</span>
                    </div>
                    <label class="account-switch">
                      <input type="checkbox" id="setting-privacy-profile">
                      <span class="account-slider"></span>
                    </label>
                  </div>

                  <div class="settings-toggle-row">
                    <div class="toggle-label-wrap">
                      <strong>Personalized Itinerary Memory</strong>
                      <span>Save previously explored attractions to tailor recommendations</span>
                    </div>
                    <label class="account-switch">
                      <input type="checkbox" id="setting-privacy-history" checked>
                      <span class="account-slider"></span>
                    </label>
                  </div>
                </div>

                <div class="account-form-actions" style="margin-bottom: 24px;">
                  <button type="submit" class="btn-account-primary">
                    Save Preferences
                  </button>
                </div>
              </form>

              <!-- Change Password Card (Separated for clarity) -->
              <div class="settings-section-card">
                <h4 class="settings-card-title">Change Account Password</h4>
                <p class="settings-card-desc">Update your login security credentials</p>

                <form id="acc-password-form">
                  <div class="account-form-grid">
                    <div class="account-form-group full-width">
                      <label class="account-form-label" for="acc-pass-curr">Current Password</label>
                      <input class="account-form-input" type="password" id="acc-pass-curr" placeholder="Enter current password" required>
                    </div>

                    <div class="account-form-group">
                      <label class="account-form-label" for="acc-pass-new">New Password</label>
                      <input class="account-form-input" type="password" id="acc-pass-new" placeholder="At least 8 characters" minlength="8" required>
                    </div>

                    <div class="account-form-group">
                      <label class="account-form-label" for="acc-pass-conf">Confirm New Password</label>
                      <input class="account-form-input" type="password" id="acc-pass-conf" placeholder="Re-enter new password" minlength="8" required>
                    </div>
                  </div>

                  <div style="font-size:12px; color:var(--text-muted); margin-top:8px;">
                    ℹ️ Frontend demonstration interface ready for secure Python backend & hashing integration.
                  </div>

                  <div class="account-form-actions">
                    <button type="submit" class="btn-account-secondary" style="border-color:var(--dark-green); color:var(--dark-green);">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </section>

            <!-- -------------------------------------------------------- -->
            <!-- TAB 4: HELP & SUPPORT                                    -->
            <!-- -------------------------------------------------------- -->
            <section id="tab-content-support" class="account-tab-pane">
              <div class="pane-heading-group">
                <h3 class="pane-title">Help & Support</h3>
                <p class="pane-subtitle">Find quick answers to common questions or reach out to our tourism concierge</p>
              </div>

              <!-- FAQ Accordion -->
              <div class="faq-accordion-group">
                <h4 style="font-size:15px; color:var(--dark-green); margin-bottom:12px; font-weight:700;">Frequently Asked Questions</h4>

                <div class="faq-item">
                  <button class="faq-question-btn" type="button">
                    <span>How do I download or print my confirmed e-ticket pass?</span>
                    <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    Navigate to <strong>Bookings</strong> from the top navbar. Locate your confirmed itinerary in the Travel Ledger and click the <strong>"Ticket Pass"</strong> button. This opens a print-ready digital boarding pass equipped with verified QR entry codes.
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question-btn" type="button">
                    <span>Can I reschedule my heritage monument visit?</span>
                    <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    Yes! Date adjustments are permitted up to 24 hours prior to your scheduled entry time without penalty. Open your booking details in the Bookings section and select "Reschedule Slot" or message our support concierge below.
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question-btn" type="button">
                    <span>Which payment methods and UPI handles are supported?</span>
                    <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    We accept UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit/Debit cards (Visa, Mastercard, RuPay), and direct Net Banking across top Indian banks. All transactions adhere strictly to RBI and PCI-DSS compliance.
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question-btn" type="button">
                    <span>What is Bhatkanti's cancellation and refund policy?</span>
                    <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    Full refund is provided for cancellations submitted 48+ hours before the scheduled time. A 50% partial refund applies between 24 and 48 hours. Cancellations within 24 hours are non-refundable as monument gate slot quotas are locked. Approved refunds reflect within 3-5 business days.
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question-btn" type="button">
                    <span>Do I need to carry original government photo identification?</span>
                    <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    Yes. ASI (Archaeological Survey of India) and local monument authorities require primary travelers to display a valid photo ID (Aadhaar, Passport, Driving License or Voter ID) matching the ticket name at the gate.
                  </div>
                </div>
              </div>

              <!-- Contact Support Form Card -->
              <div class="support-form-card">
                <h4 class="support-form-title">Contact Bhatkanti Support</h4>
                <p class="support-form-desc">Have a specific request or encountering an issue? Send our concierge team a direct message.</p>

                <!-- Success Confirmation Card -->
                <div class="support-success-card" id="support-success-card">
                  <div class="support-success-icon">✓</div>
                  <strong style="display:block; font-size:16px; color:#065f46; margin-bottom:4px;">Support Request Submitted!</strong>
                  <p id="support-success-msg" style="font-size:13px; color:#047857; margin-bottom:14px;"></p>
                  <button type="button" class="btn-account-secondary" id="btn-reset-support-form" style="font-size:12px; padding:6px 14px;">
                    Submit Another Query
                  </button>
                </div>

                <!-- Form -->
                <form id="acc-support-form">
                  <div class="account-form-grid" style="margin-bottom: 14px;">
                    <div class="account-form-group">
                      <label class="account-form-label" for="support-subject">Query Category *</label>
                      <select class="account-form-select" id="support-subject" required>
                        <option value="">Select Category</option>
                        <option value="Booking & Rescheduling">Booking & Rescheduling</option>
                        <option value="Payment & Billing">Payment & Billing</option>
                        <option value="Cancellation & Refund">Cancellation & Refund</option>
                        <option value="Monument Gate Access">Monument Gate Access</option>
                        <option value="Feedback & Suggestion">Feedback & Suggestion</option>
                        <option value="Technical Issue">Technical Issue</option>
                      </select>
                    </div>

                    <div class="account-form-group">
                      <label class="account-form-label" for="support-booking-ref">Related Booking Ref (Optional)</label>
                      <input class="account-form-input" type="text" id="support-booking-ref" placeholder="e.g. BK-PUN-001">
                    </div>

                    <div class="account-form-group full-width">
                      <label class="account-form-label" for="support-message">Message Details *</label>
                      <textarea class="account-form-textarea" id="support-message" rows="4" placeholder="Please describe your question or issue in detail..." required></textarea>
                    </div>
                  </div>

                  <button type="submit" class="btn-account-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Submit Support Request
                  </button>
                </form>
              </div>
            </section>

          </main>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);
  }

  // --------------------------------------------------------------------------
  // 7. TOAST FEEDBACK
  // --------------------------------------------------------------------------
  function showAccountToast(msg, type = 'success') {
    const banner = document.getElementById('account-toast-banner');
    if (!banner) return;

    banner.className = `account-toast-banner ${type}`;
    banner.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
      </svg>
      <span>${escapeHtml(msg)}</span>
    `;
    banner.style.display = 'flex';

    setTimeout(() => {
      banner.style.display = 'none';
    }, 4500);
  }

  // --------------------------------------------------------------------------
  // 8. RENDER PAYMENTS METHODS & TRANSACTIONS
  // --------------------------------------------------------------------------
  function renderPaymentMethods() {
    const container = document.getElementById('saved-methods-container');
    if (!container) return;

    const methods = getStored(STORAGE_KEYS.PAYMENT_METHODS, DEFAULT_METHODS);

    if (methods.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 24px; text-align: center; background: #ffffff; border: 1px dashed #d1d5db; border-radius: 12px; color: var(--text-muted); font-size: 13px;">
          No payment methods currently saved. Add a card or UPI ID for seamless single-click bookings.
        </div>
      `;
      return;
    }

    container.innerHTML = methods.map(pm => {
      const isCard = pm.type === 'card';
      const badgeClass = pm.brand || (isCard ? 'visa' : 'upi');

      return `
        <div class="payment-method-card ${pm.isDefault ? 'default-method' : ''}">
          <div class="method-card-top">
            <span class="method-brand-badge ${badgeClass}">${escapeHtml(pm.brandName || pm.brand)}</span>
            ${pm.isDefault ? '<span style="font-size: 10px; font-weight:700; color:var(--dark-green); background:var(--light-mint); padding:2px 6px; border-radius:4px;">DEFAULT</span>' : ''}
          </div>

          <div class="method-card-number">
            ${isCard ? escapeHtml(pm.numberMasked) : escapeHtml(pm.vpa)}
          </div>

          <div class="method-card-meta">
            <span>${isCard ? `Expires: ${escapeHtml(pm.expiry)}` : escapeHtml(pm.bankName)}</span>
            <button class="btn-remove-method" type="button" data-remove-id="${pm.id}">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    // Attach remove handlers
    container.querySelectorAll('.btn-remove-method').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idToRemove = btn.getAttribute('data-remove-id');
        removePaymentMethod(idToRemove);
      });
    });
  }

  function removePaymentMethod(id) {
    if (confirm('Are you sure you want to remove this payment method?')) {
      let methods = getStored(STORAGE_KEYS.PAYMENT_METHODS, DEFAULT_METHODS);
      methods = methods.filter(m => m.id !== id);
      setStored(STORAGE_KEYS.PAYMENT_METHODS, methods);
      renderPaymentMethods();
      showAccountToast('Payment method removed successfully.');
    }
  }

  function renderTransactions() {
    const tbody = document.getElementById('transaction-rows-container');
    if (!tbody) return;

    const txns = getStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);

    tbody.innerHTML = txns.map(t => {
      let badgeClass = 'successful';
      if (t.status === 'Pending') badgeClass = 'pending';
      if (t.status === 'Refunded') badgeClass = 'refunded';
      if (t.status === 'Failed') badgeClass = 'failed';

      return `
        <tr>
          <td><span class="txn-id">${escapeHtml(t.id)}</span></td>
          <td style="white-space:nowrap; font-size:12px; color:var(--text-muted);">${escapeHtml(t.date)}</td>
          <td><strong>${escapeHtml(t.item)}</strong></td>
          <td style="font-size:12px; color:var(--text-medium);">${escapeHtml(t.method)}</td>
          <td style="font-weight:700; color:var(--dark-green);">₹${t.amount.toLocaleString()}</td>
          <td><span class="txn-badge ${badgeClass}">${escapeHtml(t.status)}</span></td>
          <td>
            <button class="btn-txn-view" type="button" data-txn-id="${t.id}">View Details</button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach detail handlers
    tbody.querySelectorAll('.btn-txn-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const txnId = btn.getAttribute('data-txn-id');
        showTransactionDetails(txnId);
      });
    });
  }

  function showTransactionDetails(txnId) {
    const txns = getStored(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
    const txn = txns.find(t => t.id === txnId);
    if (!txn) return;

    const detailCard = document.getElementById('txn-detail-modal');
    const detailBody = document.getElementById('txn-detail-body');
    if (!detailCard || !detailBody) return;

    detailBody.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:14px;">
        <div><span style="color:var(--text-muted); font-size:11.5px; display:block;">Transaction ID</span><strong>${escapeHtml(txn.id)}</strong></div>
        <div><span style="color:var(--text-muted); font-size:11.5px; display:block;">Gateway Reference</span><code style="background:#e5e7eb; padding:2px 6px; border-radius:4px; font-size:11.5px;">${escapeHtml(txn.gatewayRef)}</code></div>
        <div><span style="color:var(--text-muted); font-size:11.5px; display:block;">Bank Auth Code</span><strong>${escapeHtml(txn.authCode)}</strong></div>
        <div><span style="color:var(--text-muted); font-size:11.5px; display:block;">Date & Timestamp</span><span>${escapeHtml(txn.date)}</span></div>
      </div>
      
      <div style="border-top:1px solid #e5e7eb; padding-top:10px; margin-top:10px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span>${escapeHtml(txn.item)}</span>
          <span>₹${(txn.baseFare || txn.amount).toLocaleString()}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:var(--text-muted); font-size:12px;">
          <span>Goods & Services Tax (GST 18%)</span>
          <span>₹${(txn.gst || 0).toLocaleString()}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:15px; font-weight:700; color:var(--dark-green); border-top:1px dashed #d1d5db; padding-top:6px; margin-top:6px;">
          <span>Total Settled Amount</span>
          <span>₹${txn.amount.toLocaleString()}</span>
        </div>
      </div>

      <div style="margin-top:14px; display:flex; gap:10px; align-items:center;">
        <button type="button" class="btn-account-primary" style="font-size:12px; padding:6px 14px;" onclick="window.print();">
          Print Receipt
        </button>
        <span style="font-size:11.5px; color:var(--text-muted);">Status: <strong>${escapeHtml(txn.status)}</strong> via ${escapeHtml(txn.method)}</span>
      </div>
    `;

    detailCard.style.display = 'block';
    detailCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // --------------------------------------------------------------------------
  // 9. OPEN / CLOSE HANDLERS
  // --------------------------------------------------------------------------
  function toggleDropdown(forceState) {
    const userProfileEl = document.getElementById('user-profile-menu');
    const dropdown = document.getElementById('bhatkanti-account-dropdown');
    if (!userProfileEl || !dropdown) return;

    const isOpen = typeof forceState === 'boolean' ? forceState : !dropdown.classList.contains('show');

    if (isOpen) {
      dropdown.classList.add('show');
      userProfileEl.classList.add('active');
      userProfileEl.setAttribute('aria-expanded', 'true');
    } else {
      dropdown.classList.remove('show');
      userProfileEl.classList.remove('active');
      userProfileEl.setAttribute('aria-expanded', 'false');
    }
  }

  function openAccountModal(targetTab) {
    toggleDropdown(false);

    const backdrop = document.getElementById('account-modal-backdrop');
    if (!backdrop) return;

    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Switch tab
    if (targetTab) {
      switchModalTab(targetTab);
    }
  }

  function closeAccountModal() {
    const backdrop = document.getElementById('account-modal-backdrop');
    if (!backdrop) return;

    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function switchModalTab(tabId) {
    // Nav tabs
    document.querySelectorAll('.account-nav-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    // Content panes
    document.querySelectorAll('.account-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-content-${tabId}`);
    });

    // Re-render sub components if needed
    if (tabId === 'payments') {
      renderPaymentMethods();
      renderTransactions();
    }
  }

  // --------------------------------------------------------------------------
  // 10. SETUP EVENT LISTENERS
  // --------------------------------------------------------------------------
  function attachEventListeners() {
    const userProfileEl = document.getElementById('user-profile-menu');
    if (!userProfileEl) return;

    // Toggle dropdown on profile click
    userProfileEl.addEventListener('click', (e) => {
      // Don't toggle if clicking inside the open dropdown panel itself
      const dropdown = document.getElementById('bhatkanti-account-dropdown');
      if (dropdown && dropdown.contains(e.target)) {
        return;
      }
      toggleDropdown();
    });

    // Keyboard support for profile trigger
    userProfileEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      } else if (e.key === 'Escape') {
        toggleDropdown(false);
      }
    });

    // Global click outside to close dropdown
    document.addEventListener('click', (e) => {
      if (!userProfileEl.contains(e.target)) {
        toggleDropdown(false);
      }
    });

    // Global Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleDropdown(false);
        closeAccountModal();
      }
    });

    // Dropdown items click
    const dropdown = document.getElementById('bhatkanti-account-dropdown');
    if (dropdown) {
      dropdown.querySelectorAll('.dropdown-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetTab = btn.getAttribute('data-target-tab');
          openAccountModal(targetTab);
        });
      });

      // Quick trips
      const quickTripsBtn = document.getElementById('btn-quick-trips');
      if (quickTripsBtn) {
        quickTripsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.location.href = 'my-trips.html';
        });
      }

      // Demo signout / reset
      const signoutBtn = document.getElementById('btn-demo-signout');
      if (signoutBtn) {
        signoutBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm('Reset demo session to default explorer profile?')) {
            setStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
            setStored(STORAGE_KEYS.PAYMENT_METHODS, DEFAULT_METHODS);
            setStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
            updateProfileDisplay();
            toggleDropdown(false);
            alert('Demo session reset to default Explorer profile.');
          }
        });
      }
    }

    // Modal close button
    const closeBtn = document.getElementById('account-modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeAccountModal);
    }

    // Modal backdrop click outside
    const backdrop = document.getElementById('account-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeAccountModal();
        }
      });
    }

    // Sidebar tab buttons
    document.querySelectorAll('.account-nav-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const tab = tabBtn.getAttribute('data-tab');
        switchModalTab(tab);
      });
    });

    // ---------------- PROFILE TAB LOGIC ----------------
    // Avatar preset buttons
    document.querySelectorAll('.avatar-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.avatar-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const val = btn.getAttribute('data-avatar-val');
        const profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
        profile.avatarType = 'emoji';
        profile.avatarValue = val;
        setStored(STORAGE_KEYS.PROFILE, profile);

        const previewLarge = document.getElementById('profile-avatar-large-preview');
        if (previewLarge) previewLarge.innerHTML = renderAvatarHtml(profile);
      });
    });

    // Avatar image upload
    const avatarUploadInput = document.getElementById('acc-file-avatar-upload');
    if (avatarUploadInput) {
      avatarUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
          alert('Image size must be under 2MB.');
          return;
        }

        const reader = new FileReader();
        reader.onload = function (evt) {
          const profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
          profile.avatarType = 'image';
          profile.avatarValue = evt.target.result;
          setStored(STORAGE_KEYS.PROFILE, profile);

          const previewLarge = document.getElementById('profile-avatar-large-preview');
          if (previewLarge) previewLarge.innerHTML = renderAvatarHtml(profile);
          document.querySelectorAll('.avatar-preset-btn').forEach(b => b.classList.remove('active'));
        };
        reader.readAsDataURL(file);
      });
    }

    // Save profile form
    const profileForm = document.getElementById('acc-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
        profile.fullName = document.getElementById('acc-input-fullname').value.trim() || 'Explorer';
        profile.email = document.getElementById('acc-input-email').value.trim() || 'explorer@bhatkanti.com';
        profile.phone = document.getElementById('acc-input-phone').value.trim();
        profile.gender = document.getElementById('acc-input-gender').value;
        profile.dob = document.getElementById('acc-input-dob').value;
        profile.city = document.getElementById('acc-input-city').value.trim();

        setStored(STORAGE_KEYS.PROFILE, profile);
        updateProfileDisplay();
        showAccountToast('✓ Profile updated successfully! Changes saved.');
      });

      // Cancel button
      const cancelProfileBtn = document.getElementById('btn-cancel-profile');
      if (cancelProfileBtn) {
        cancelProfileBtn.addEventListener('click', () => {
          const profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
          document.getElementById('acc-input-fullname').value = profile.fullName;
          document.getElementById('acc-input-email').value = profile.email;
          document.getElementById('acc-input-phone').value = profile.phone || '';
          document.getElementById('acc-input-gender').value = profile.gender || '';
          document.getElementById('acc-input-dob').value = profile.dob || '';
          document.getElementById('acc-input-city').value = profile.city || '';
          showAccountToast('Edits cancelled. Reverted to previous details.', 'error');
        });
      }
    }

    // ---------------- PAYMENTS TAB LOGIC ----------------
    const toggleAddPmBtn = document.getElementById('btn-toggle-add-payment');
    const addPmDrawer = document.getElementById('add-payment-drawer');
    const cancelAddPmBtn = document.getElementById('btn-cancel-add-pm');
    const pmTypeSelect = document.getElementById('new-pm-type');

    if (toggleAddPmBtn && addPmDrawer) {
      toggleAddPmBtn.addEventListener('click', () => {
        addPmDrawer.classList.toggle('open');
      });
    }

    if (cancelAddPmBtn && addPmDrawer) {
      cancelAddPmBtn.addEventListener('click', () => {
        addPmDrawer.classList.remove('open');
      });
    }

    if (pmTypeSelect) {
      pmTypeSelect.addEventListener('change', () => {
        const isCard = pmTypeSelect.value === 'card';
        document.getElementById('group-pm-holder').style.display = isCard ? 'flex' : 'none';
        document.getElementById('group-pm-number').style.display = isCard ? 'flex' : 'none';
        document.getElementById('group-pm-expiry').style.display = isCard ? 'flex' : 'none';
        document.getElementById('group-pm-upi').style.display = isCard ? 'none' : 'flex';
      });
    }

    // Add payment form submit
    const addPmForm = document.getElementById('acc-add-payment-form');
    if (addPmForm) {
      addPmForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = pmTypeSelect.value;
        const methods = getStored(STORAGE_KEYS.PAYMENT_METHODS, DEFAULT_METHODS);

        if (type === 'card') {
          const holder = document.getElementById('new-pm-holder').value.trim() || 'Explorer';
          let num = document.getElementById('new-pm-number').value.replace(/\s+/g, '');
          if (num.length < 4) num = '4291';
          const last4 = num.slice(-4);
          const expiry = document.getElementById('new-pm-expiry').value.trim() || '12/28';

          const newPm = {
            id: 'pm-' + Date.now(),
            type: 'card',
            brand: num.startsWith('4') ? 'visa' : 'mastercard',
            brandName: num.startsWith('4') ? 'Visa Card' : 'Mastercard',
            cardholder: holder,
            numberMasked: `•••• •••• •••• ${last4}`,
            last4: last4,
            expiry: expiry,
            bankName: 'Verified Bank',
            isDefault: methods.length === 0
          };
          methods.push(newPm);
        } else {
          const vpa = document.getElementById('new-pm-vpa').value.trim();
          if (!vpa || !vpa.includes('@')) {
            alert('Please enter a valid UPI VPA (e.g. user@bank)');
            return;
          }

          const newPm = {
            id: 'pm-' + Date.now(),
            type: 'upi',
            brand: 'upi',
            brandName: 'UPI Handle',
            vpa: vpa,
            bankName: 'Instant UPI',
            isDefault: methods.length === 0
          };
          methods.push(newPm);
        }

        setStored(STORAGE_KEYS.PAYMENT_METHODS, methods);
        renderPaymentMethods();
        addPmDrawer.classList.remove('open');
        addPmForm.reset();
        showAccountToast('✓ New payment method saved securely.');
      });
    }

    // Close txn detail
    const closeTxnDetailBtn = document.getElementById('btn-close-txn-detail');
    if (closeTxnDetailBtn) {
      closeTxnDetailBtn.addEventListener('click', () => {
        document.getElementById('txn-detail-modal').style.display = 'none';
      });
    }

    // ---------------- SETTINGS TAB LOGIC ----------------
    // Load saved settings into form
    const settings = getStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    const langSelect = document.getElementById('setting-language');
    const themeSelect = document.getElementById('setting-theme');
    const emailToggle = document.getElementById('setting-notify-email');
    const bookToggle = document.getElementById('setting-notify-bookings');
    const promoToggle = document.getElementById('setting-notify-promotions');
    const smsToggle = document.getElementById('setting-notify-sms');
    const privProfileToggle = document.getElementById('setting-privacy-profile');
    const privHistoryToggle = document.getElementById('setting-privacy-history');

    if (langSelect) langSelect.value = settings.language || 'en';
    if (themeSelect) themeSelect.value = settings.theme || 'light';
    if (emailToggle) emailToggle.checked = !!settings.notifyEmail;
    if (bookToggle) bookToggle.checked = !!settings.notifyBookingUpdates;
    if (promoToggle) promoToggle.checked = !!settings.notifyPromotions;
    if (smsToggle) smsToggle.checked = !!settings.notifySmsWhatsApp;
    if (privProfileToggle) privProfileToggle.checked = !!settings.privacyProfilePublic;
    if (privHistoryToggle) privHistoryToggle.checked = !!settings.privacyHistoryTracking;

    const settingsForm = document.getElementById('acc-settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          language: langSelect.value,
          theme: themeSelect.value,
          notifyEmail: emailToggle.checked,
          notifyBookingUpdates: bookToggle.checked,
          notifyPromotions: promoToggle.checked,
          notifySmsWhatsApp: smsToggle.checked,
          privacyProfilePublic: privProfileToggle.checked,
          privacyHistoryTracking: privHistoryToggle.checked
        };
        setStored(STORAGE_KEYS.SETTINGS, updated);
        showAccountToast('✓ Settings and preferences saved successfully.');
      });
    }

    // Password change form
    const passwordForm = document.getElementById('acc-password-form');
    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const curr = document.getElementById('acc-pass-curr').value;
        const newPass = document.getElementById('acc-pass-new').value;
        const confPass = document.getElementById('acc-pass-conf').value;

        if (newPass.length < 8) {
          alert('New password must be at least 8 characters long.');
          return;
        }
        if (newPass !== confPass) {
          alert('New passwords do not match. Please verify.');
          return;
        }

        passwordForm.reset();
        showAccountToast('✓ Password updated successfully! (Frontend demonstration)');
      });
    }

    // ---------------- HELP & SUPPORT TAB LOGIC ----------------
    // FAQ Accordion
    document.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        item.classList.toggle('open');
      });
    });

    // Support Form submit
    const supportForm = document.getElementById('acc-support-form');
    const supportSuccessCard = document.getElementById('support-success-card');
    const supportSuccessMsg = document.getElementById('support-success-msg');
    const resetSupportFormBtn = document.getElementById('btn-reset-support-form');

    if (supportForm) {
      supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const category = document.getElementById('support-subject').value;
        const bookingRef = document.getElementById('support-booking-ref').value.trim();
        const msg = document.getElementById('support-message').value.trim();

        if (!category || !msg) {
          alert('Please select a category and provide your query details.');
          return;
        }

        const ticketNum = 'BHT-SUP-2026-' + Math.floor(1000 + Math.random() * 9000);
        const tickets = getStored(STORAGE_KEYS.SUPPORT_TICKETS, []);
        tickets.push({
          ticketId: ticketNum,
          category,
          bookingRef,
          message: msg,
          createdAt: new Date().toISOString(),
          status: 'Open'
        });
        setStored(STORAGE_KEYS.SUPPORT_TICKETS, tickets);

        supportForm.style.display = 'none';
        if (supportSuccessCard && supportSuccessMsg) {
          const profile = getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
          supportSuccessMsg.innerHTML = `Your support inquiry reference is <strong>#${ticketNum}</strong>. A confirmation has been logged for <strong>${escapeHtml(profile.email)}</strong>. Our tourism concierge team typically replies within 2 hours.`;
          supportSuccessCard.classList.add('show');
        }
      });
    }

    if (resetSupportFormBtn) {
      resetSupportFormBtn.addEventListener('click', () => {
        if (supportSuccessCard) supportSuccessCard.classList.remove('show');
        if (supportForm) {
          supportForm.reset();
          supportForm.style.display = 'block';
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 11. HTML ESCAPING UTILITY
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // 12. INITIALIZATION LIFECYCLE
  // --------------------------------------------------------------------------
  function initAccountModule() {
    initDataStore();
    injectDropdownMarkup();
    injectAccountModalMarkup();
    updateProfileDisplay();
    attachEventListeners();

    // Listen for storage events across browser tabs/windows
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEYS.PROFILE) {
        updateProfileDisplay();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccountModule);
  } else {
    initAccountModule();
  }

})();

