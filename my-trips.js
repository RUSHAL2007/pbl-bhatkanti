/**
 * ==========================================================================
 * BHATKANTI — MY TRIPS ENGINE
 * Manages saved itineraries, booking pass synchronization, and trip deletion
 * ==========================================================================
 */

(function () {
  'use strict';

  let activeFilter = 'all';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function loadSavedTrips() {
    const container = document.getElementById('saved-trips-list');
    if (!container) return;

    let trips = [];
    try {
      trips = JSON.parse(localStorage.getItem('bhatkanti_saved_trips') || '[]');
    } catch (e) {
      trips = [];
    }

    // Default sample trip if storage is fresh
    if (trips.length === 0) {
      trips = [
        {
          id: 'BHT-PUN-2026-1042',
          title: 'Pune Heritage Trail',
          city: 'Pune',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          destinations: ['Shaniwar Wada', 'Raja Dinkar Kelkar Museum', 'Dagdusheth Halwai Ganpati'],
          totalCost: 125,
          costPerPerson: 125,
          status: 'Planned',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('bhatkanti_saved_trips', JSON.stringify(trips));
    }

    const filtered = activeFilter === 'all' ? trips : trips.filter(t => t.status === activeFilter);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: #ffffff; border-radius: 16px; border: 2px dashed #d1d5db;">
          <div style="font-size: 36px; margin-bottom: 12px;">🎒</div>
          <h3 style="font-family:'Playfair Display', Georgia, serif; font-size: 22px; color: var(--dark-green); margin-bottom: 8px;">No trips found</h3>
          <p style="font-size: 14px; color: var(--text-muted); max-width: 440px; margin: 0 auto 20px;">
            You have no trips under the "${escapeHtml(activeFilter)}" filter. Build your customized route or browse pre-planned trips.
          </p>
          <a href="plan.html" class="btn-primary" style="display: inline-block; padding: 10px 24px; border-radius: 8px; text-decoration: none;">
            Plan a New Trip
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((trip) => {
      let badgeClass = 'planned';
      if (trip.status === 'Booking Pending') badgeClass = 'pending';
      if (trip.status === 'Confirmed') badgeClass = 'confirmed';
      if (trip.status === 'Cancelled') badgeClass = 'cancelled';

      const stops = trip.destinations || [];
      const isBooking = trip.bookingId || (trip.id && trip.id.includes('BK'));

      return `
        <article class="saved-trip-item-card">
          <div class="trip-main-info">
            <span class="trip-ref-badge">${escapeHtml(trip.id)}</span>
            <h3 class="trip-item-title">${escapeHtml(trip.title)}</h3>
            <div class="trip-item-meta">
              <span>📅 Date: <strong>${escapeHtml(trip.date)}</strong></span>
              <span>📍 City: <strong>${escapeHtml(trip.city || 'Pune')}</strong></span>
              <span>🎟️ Est. Ticket Total: <strong>₹${trip.totalCost || 0}</strong></span>
              ${trip.traveler ? `<span>👤 Traveler: <strong>${escapeHtml(trip.traveler.name)} (${trip.traveler.numVisitors || trip.numTickets || 1} Pax)</strong></span>` : ''}
              ${trip.paymentStatus ? `<span>💳 Payment: <strong>${escapeHtml(trip.paymentStatus)}</strong></span>` : ''}
            </div>

            <!-- Route Sequence -->
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; font-size: 12px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Stops:</span>
              ${stops.map((s, i) => {
                const sName = typeof s === 'string' ? s : s.name;
                return `
                  <span style="background:#f8faf9; border:1px solid #e5e7eb; padding:3px 8px; border-radius:4px; font-weight:600;">${escapeHtml(sName)}</span>
                  ${i < stops.length - 1 ? '<span style="color:var(--orange);">→</span>' : ''}
                `;
              }).join('')}
            </div>
          </div>

          <div class="trip-actions-col">
            <span class="status-badge ${badgeClass}">${escapeHtml(trip.status)}</span>
            ${isBooking ? `
              <a href="bookings.html" class="btn-manage-booking">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Manage Booking
              </a>
            ` : `
              <a href="plan.html" class="btn-view-planner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                View Planner
              </a>
            `}
            <button class="btn-delete-trip" type="button" onclick="deleteTrip('${trip.id}')" title="Delete Saved Trip" aria-label="Delete saved trip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function filterTripsTab(filter) {
    activeFilter = filter;
    document.querySelectorAll('.trip-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    loadSavedTrips();
  }

  function deleteTrip(tripId) {
    if (confirm(`Are you sure you want to delete trip ${tripId}?`)) {
      let trips = [];
      try {
        trips = JSON.parse(localStorage.getItem('bhatkanti_saved_trips') || '[]');
      } catch (e) {
        trips = [];
      }
      trips = trips.filter(t => t.id !== tripId);
      localStorage.setItem('bhatkanti_saved_trips', JSON.stringify(trips));
      loadSavedTrips();
    }
  }

  // Expose global methods for inline HTML onclick attributes
  window.loadSavedTrips = loadSavedTrips;
  window.filterTripsTab = filterTripsTab;
  window.deleteTrip = deleteTrip;

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSavedTrips);
  } else {
    loadSavedTrips();
  }
})();
