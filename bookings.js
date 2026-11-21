/* ==========================================================================
   BHATKANTI — TRAVEL LEDGER ENGINE
   Vertical Chronological Booking Timeline & Digital Ticket Management
   Preserves full lifecycle, Razorpay sandbox, seller confirmation,
   My Trips synchronization, and Python API readiness.
   ========================================================================== */

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEY_BOOKINGS = 'bhatkanti_bookings';
  const STORAGE_KEY_SAVED_TRIPS = 'bhatkanti_saved_trips';
  const CURRENT_USER_ID = 'USR-PUN-001';

  // State Management
  const state = {
    bookings: [],
    activeFilter: 'all', // 'all' | 'CONFIRMED' | 'PENDING' | 'CANCELLED'
    searchQuery: '',
    sortBy: 'newest', // 'newest' | 'oldest' | 'travelDate'
    selectedBookingId: null
  };

  // Curated Trip Options for New Booking Modal
  const CURATED_BOOKING_TEMPLATES = [
    {
      templateId: 'tpl-heritage',
      title: 'Pune Heritage Trail',
      city: 'Pune',
      destinations: [
        { name: 'Shaniwar Wada', price: 25, priceNum: 25, type: 'Official ASI Monument' },
        { name: 'Raja Dinkar Kelkar Museum', price: 100, priceNum: 100, type: 'Museum Entry Ticket' },
        { name: 'Dagdusheth Halwai Ganpati', price: 0, priceNum: 0, type: 'Complimentary Public Entry' }
      ]
    },
    {
      templateId: 'tpl-sinhagad',
      title: 'Green Pune & Sinhagad Valley',
      city: 'Pune',
      destinations: [
        { name: 'Sinhagad Fort', price: 50, priceNum: 50, type: 'Forest Toll Entry Counter' },
        { name: 'Khadakwasla Dam', price: 0, priceNum: 0, type: 'Free Entry Promenade' }
      ]
    },
    {
      templateId: 'tpl-palace',
      title: 'Aga Khan Palace & Memorials',
      city: 'Pune',
      destinations: [
        { name: 'Aga Khan Palace', price: 25, priceNum: 25, type: 'Official ASI Monument' },
        { name: 'Pataleshwar Cave Temple', price: 0, priceNum: 0, type: 'Complimentary Protected Monument' }
      ]
    },
    {
      templateId: 'tpl-cultural',
      title: 'Old Pune Cultural Walk',
      city: 'Pune',
      destinations: [
        { name: 'Shaniwar Wada', price: 25, priceNum: 25, type: 'Official ASI Monument' },
        { name: 'FC Road Cultural Boulevard', price: 0, priceNum: 0, type: 'Free Walk-in Promenade' }
      ]
    }
  ];

  /* --------------------------------------------------------------------------
     1. INITIAL DEMO DATA SEEDING & SYNCHRONIZATION
     -------------------------------------------------------------------------- */
  function getInitialDemoBookings() {
    return [
      {
        bookingId: 'BHT-BK-2026-8491',
        tripId: 'TRIP-PUN-1042',
        userId: CURRENT_USER_ID,
        tripName: 'Pune Heritage Trail',
        destinations: [
          { name: 'Shaniwar Wada', price: 25, priceNum: 25, type: 'Official ASI Monument' },
          { name: 'Raja Dinkar Kelkar Museum', price: 100, priceNum: 100, type: 'Museum Entry Ticket' },
          { name: 'Dagdusheth Halwai Ganpati', price: 0, priceNum: 0, type: 'Complimentary Public Entry' }
        ],
        travelDate: '2026-11-06',
        numTickets: 2,
        totalCost: 250,
        paymentStatus: 'Paid',
        paymentMethod: 'Razorpay UPI (Google Pay)',
        transactionId: 'pay_rzp_live_9921408',
        bookingStatus: 'CONFIRMED',
        sellerConfirmationDetails: 'Archaeological Survey of India confirmed voucher #ASI-MH-881294. Verified by Maharashtra Tourism seller desk.',
        hasTicketDocument: true,
        createdAt: '2026-11-02T14:30:00.000Z',
        traveler: {
          name: 'Aditya Kulkarni',
          email: 'aditya.k@gmail.com',
          phone: '+91 98220 14890'
        }
      },
      {
        bookingId: 'BHT-BK-2026-7215',
        tripId: 'TRIP-PUN-2033',
        userId: CURRENT_USER_ID,
        tripName: 'Green Pune & Sinhagad Valley',
        destinations: [
          { name: 'Sinhagad Fort', price: 50, priceNum: 50, type: 'Forest Toll Entry Counter' },
          { name: 'Khadakwasla Dam', price: 0, priceNum: 0, type: 'Free Entry Promenade' }
        ],
        travelDate: '2026-11-08',
        numTickets: 3,
        totalCost: 150,
        paymentStatus: 'Paid',
        paymentMethod: 'Razorpay NetBanking (HDFC Bank)',
        transactionId: 'pay_rzp_demo_7741029',
        bookingStatus: 'PENDING',
        sellerConfirmationDetails: 'Payment verified successfully. Awaiting ticket slot issuance from Sinhagad Forest Department seller counter.',
        hasTicketDocument: false,
        createdAt: '2026-11-03T08:15:00.000Z',
        traveler: {
          name: 'Sneha Deshmukh',
          email: 'sneha.d@outlook.com',
          phone: '+91 94220 33912'
        }
      },
      {
        bookingId: 'BHT-BK-2026-5902',
        tripId: 'TRIP-PUN-3105',
        userId: CURRENT_USER_ID,
        tripName: 'Aga Khan Palace & Memorials',
        destinations: [
          { name: 'Aga Khan Palace', price: 25, priceNum: 25, type: 'Official ASI Monument' },
          { name: 'Pataleshwar Cave Temple', price: 0, priceNum: 0, type: 'Complimentary Heritage Monument' }
        ],
        travelDate: '2026-11-10',
        numTickets: 1,
        totalCost: 25,
        paymentStatus: 'Failed',
        paymentMethod: 'UPI Checkout Expired',
        transactionId: null,
        bookingStatus: 'CANCELLED',
        sellerConfirmationDetails: 'Booking automatically cancelled due to incomplete payment session expiration.',
        cancellationDetails: {
          cancelledAt: '2026-11-03T10:15:00.000Z',
          reason: 'Payment gateway session timed out',
          refundStatus: 'No amount debited',
          refundAmount: 0,
          refundTransactionId: null
        },
        hasTicketDocument: false,
        createdAt: '2026-11-03T09:40:00.000Z',
        traveler: {
          name: 'Rohan Joshi',
          email: 'rohan.j@yahoo.com',
          phone: '+91 98811 76543'
        }
      },
      {
        bookingId: 'BHT-BK-2026-3841',
        tripId: 'TRIP-PUN-1049',
        userId: CURRENT_USER_ID,
        tripName: 'Old Pune Cultural Walk',
        destinations: [
          { name: 'Shaniwar Wada', price: 25, priceNum: 25, type: 'Official ASI Monument' },
          { name: 'FC Road Cultural Boulevard', price: 0, priceNum: 0, type: 'Free Walk-in Promenade' }
        ],
        travelDate: '2026-10-28',
        numTickets: 2,
        totalCost: 50,
        paymentStatus: 'Refunded',
        paymentMethod: 'Razorpay UPI',
        transactionId: 'pay_rzp_live_6619082',
        bookingStatus: 'CANCELLED',
        sellerConfirmationDetails: 'Booking was previously confirmed and subsequently cancelled by traveler.',
        cancellationDetails: {
          cancelledAt: '2026-10-26T11:20:00.000Z',
          reason: 'Traveler personal schedule conflict',
          refundStatus: 'Refund Processed Successfully',
          refundAmount: 50,
          refundTransactionId: 'rfnd_rzp_demo_88201'
        },
        hasTicketDocument: false,
        createdAt: '2026-10-24T10:00:00.000Z',
        traveler: {
          name: 'Aditya Kulkarni',
          email: 'aditya.k@gmail.com',
          phone: '+91 98220 14890'
        }
      },
      {
        bookingId: 'BHT-BK-2026-2180',
        tripId: 'TRIP-PUN-4091',
        userId: CURRENT_USER_ID,
        tripName: 'Kelkar Museum Special Art Tour',
        destinations: [
          { name: 'Raja Dinkar Kelkar Museum', price: 100, priceNum: 100, type: 'Museum Entry Ticket' }
        ],
        travelDate: '2026-10-20',
        numTickets: 4,
        totalCost: 400,
        paymentStatus: 'Failed',
        paymentMethod: 'Debit Card (Declined by Bank)',
        transactionId: 'pay_failed_rzp_11093',
        bookingStatus: 'CANCELLED',
        sellerConfirmationDetails: 'Booking cancelled automatically due to payment gateway transaction failure.',
        cancellationDetails: {
          cancelledAt: '2026-10-18T16:45:00.000Z',
          reason: 'Payment gateway timeout / bank authorization declined',
          refundStatus: 'No amount debited',
          refundAmount: 0,
          refundTransactionId: null
        },
        hasTicketDocument: false,
        createdAt: '2026-10-18T16:40:00.000Z',
        traveler: {
          name: 'Aditya Kulkarni',
          email: 'aditya.k@gmail.com',
          phone: '+91 98220 14890'
        }
      }
    ];
  }

  function loadBookingsFromStorage() {
    let saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (!saved) {
      const initial = getInitialDemoBookings();
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(initial));
      state.bookings = initial;
      syncBookingsToMyTrips(initial);
    } else {
      try {
        state.bookings = JSON.parse(saved);
        // Normalize demo dataset if BHT-BK-2026-5902 was stored as PENDING
        const b5902 = state.bookings.find(b => b.bookingId === 'BHT-BK-2026-5902');
        if (b5902 && b5902.bookingStatus === 'PENDING') {
          b5902.bookingStatus = 'CANCELLED';
          b5902.paymentStatus = 'Failed';
          b5902.sellerConfirmationDetails = 'Booking automatically cancelled due to incomplete payment session expiration.';
          b5902.cancellationDetails = {
            cancelledAt: '2026-11-03T10:15:00.000Z',
            reason: 'Payment gateway session timed out',
            refundStatus: 'No amount debited',
            refundAmount: 0,
            refundTransactionId: null
          };
          localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(state.bookings));
          syncBookingsToMyTrips(state.bookings);
        }
      } catch (e) {
        console.error('Failed to parse bookings from storage:', e);
        state.bookings = getInitialDemoBookings();
      }
    }
  }

  function saveBookingsToStorage() {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(state.bookings));
    syncBookingsToMyTrips(state.bookings);
  }

  // Synchronize bookings with My Trips storage (bhatkanti_saved_trips)
  function syncBookingsToMyTrips(bookingsList) {
    let savedTrips = [];
    try {
      savedTrips = JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_TRIPS) || '[]');
    } catch (e) {
      savedTrips = [];
    }

    bookingsList.forEach(booking => {
      const destNames = (booking.destinations || []).map(d => typeof d === 'string' ? d : d.name);

      let tripStatus = 'Planned';
      if (booking.bookingStatus === 'CONFIRMED') {
        tripStatus = 'Confirmed';
      } else if (booking.bookingStatus === 'PENDING') {
        tripStatus = 'Booking Pending';
      } else if (booking.bookingStatus === 'CANCELLED') {
        tripStatus = 'Cancelled';
      }

      const existingIndex = savedTrips.findIndex(t => t.id === booking.bookingId || t.bookingId === booking.bookingId || t.tripId === booking.tripId);

      const tripRecord = {
        id: booking.bookingId,
        bookingId: booking.bookingId,
        tripId: booking.tripId,
        userId: booking.userId || CURRENT_USER_ID,
        title: booking.tripName,
        city: 'Pune',
        date: booking.travelDate,
        destinations: destNames,
        totalCost: booking.totalCost,
        costPerPerson: booking.destinations.reduce((acc, d) => acc + (d.priceNum || 0), 0),
        status: tripStatus,
        bookingStatus: booking.bookingStatus,
        paymentStatus: booking.paymentStatus,
        traveler: booking.traveler,
        createdAt: booking.createdAt
      };

      if (existingIndex >= 0) {
        savedTrips[existingIndex] = Object.assign({}, savedTrips[existingIndex], tripRecord);
      } else {
        savedTrips.unshift(tripRecord);
      }
    });

    localStorage.setItem(STORAGE_KEY_SAVED_TRIPS, JSON.stringify(savedTrips));
  }

  /* --------------------------------------------------------------------------
     2. DYNAMIC SUMMARY COUNTS (Calculated from Data & Integrated into Panel)
     -------------------------------------------------------------------------- */
  function updateSummaryCounts() {
    const total = state.bookings.length;
    const confirmed = state.bookings.filter(b => b.bookingStatus === 'CONFIRMED').length;
    const pending = state.bookings.filter(b => b.bookingStatus === 'PENDING').length;
    const cancelled = state.bookings.filter(b => b.bookingStatus === 'CANCELLED').length;

    // Update filter tab counters
    const tabTotal = document.getElementById('tab-count-all');
    const tabConfirmed = document.getElementById('tab-count-confirmed');
    const tabPending = document.getElementById('tab-count-pending');
    const tabCancelled = document.getElementById('tab-count-cancelled');

    if (tabTotal) tabTotal.textContent = total;
    if (tabConfirmed) tabConfirmed.textContent = confirmed;
    if (tabPending) tabPending.textContent = pending;
    if (tabCancelled) tabCancelled.textContent = cancelled;
  }

  /* --------------------------------------------------------------------------
     3. FILTERING, SEARCH & SORTING LOGIC
     -------------------------------------------------------------------------- */
  function getFilteredAndSortedBookings() {
    let result = [...state.bookings];

    // Status Filter
    if (state.activeFilter !== 'all') {
      result = result.filter(b => b.bookingStatus === state.activeFilter);
    }

    // Search Query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase().trim();
      result = result.filter(b => {
        const idMatch = (b.bookingId || '').toLowerCase().includes(q);
        const nameMatch = (b.tripName || '').toLowerCase().includes(q);
        const destMatch = (b.destinations || []).some(d => {
          const destName = typeof d === 'string' ? d : (d.name || '');
          return destName.toLowerCase().includes(q);
        });
        const travelerMatch = b.traveler && (
          (b.traveler.name || '').toLowerCase().includes(q) ||
          (b.traveler.email || '').toLowerCase().includes(q)
        );
        return idMatch || nameMatch || destMatch || travelerMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (state.sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (state.sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (state.sortBy === 'travelDate') {
        return new Date(a.travelDate) - new Date(b.travelDate);
      }
      return 0;
    });

    return result;
  }

  /* --------------------------------------------------------------------------
     4. BADGE GENERATION (Strictly Distinct Payment vs Booking Status)
     -------------------------------------------------------------------------- */
  function renderBookingStatusBadge(status) {
    if (status === 'CONFIRMED') {
      return `<span class="status-pill badge-booking-confirmed"><span class="status-dot"></span>CONFIRMED</span>`;
    } else if (status === 'PENDING') {
      return `<span class="status-pill badge-booking-pending"><span class="status-dot"></span>PENDING SELLER CONFIRMATION</span>`;
    } else if (status === 'CANCELLED') {
      return `<span class="status-pill badge-booking-cancelled"><span class="status-dot"></span>CANCELLED</span>`;
    }
    return `<span class="status-pill">${status}</span>`;
  }

  function renderPaymentStatusBadge(status) {
    if (status === 'Paid') {
      return `<span class="status-pill badge-payment-paid"><span class="status-dot"></span>PAID</span>`;
    } else if (status === 'Payment Pending') {
      return `<span class="status-pill badge-payment-pending"><span class="status-dot"></span>PAYMENT PENDING</span>`;
    } else if (status === 'Failed') {
      return `<span class="status-pill badge-payment-failed"><span class="status-dot"></span>PAYMENT FAILED</span>`;
    } else if (status === 'Refunded') {
      return `<span class="status-pill badge-payment-refunded"><span class="status-dot"></span>REFUNDED</span>`;
    }
    return `<span class="status-pill">${status}</span>`;
  }

  function parseDateParts(dateStr) {
    if (!dateStr) return { day: '--', month: '---', year: '----', weekday: '---' };
    try {
      const d = new Date(dateStr);
      const day = d.toLocaleDateString('en-IN', { day: '2-digit' });
      const month = d.toLocaleDateString('en-IN', { month: 'short' });
      const year = d.getFullYear();
      const weekday = d.toLocaleDateString('en-IN', { weekday: 'short' });
      return { day, month, year, weekday };
    } catch (e) {
      return { day: '01', month: 'Jan', year: '2026', weekday: 'Mon' };
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }

  /* --------------------------------------------------------------------------
     5. RENDER TRAVEL LEDGER TIMELINE (Chronological Ticket Panels)
     -------------------------------------------------------------------------- */
  function renderBookingsList() {
    const timelineContainer = document.getElementById('ledger-timeline-container');
    const emptyState = document.getElementById('bookings-empty-state');

    if (!timelineContainer) return;

    const items = getFilteredAndSortedBookings();

    if (items.length === 0) {
      timelineContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    timelineContainer.innerHTML = items.map(booking => {
      const stops = booking.destinations || [];
      const dateParts = parseDateParts(booking.travelDate);

      // Determine node status class
      let nodeClass = 'node-pending';
      if (booking.bookingStatus === 'CONFIRMED') {
        nodeClass = 'node-confirmed';
      } else if (booking.bookingStatus === 'CANCELLED') {
        nodeClass = 'node-cancelled';
      }

      // Check if ticket document exists
      const isConfirmedTicket = booking.hasTicketDocument && booking.bookingStatus === 'CONFIRMED';

      return `
        <article class="ledger-timeline-item" data-booking-id="${booking.bookingId}">
          <!-- Timeline status node on spine -->
          <div class="ledger-timeline-node ${nodeClass}" title="Status: ${booking.bookingStatus}">
            <div class="node-dot"></div>
          </div>

          <!-- Ticket-Inspired Panel -->
          <div class="ledger-ticket-card">
            <!-- Left Ticket Stub -->
            <div class="ticket-stub">
              <div class="stub-city-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Pune</span>
              </div>

              <div class="stub-date-display">
                <div class="stub-day-number">${dateParts.day}</div>
                <div class="stub-month-year">${dateParts.month} ${dateParts.year}</div>
                <div class="stub-weekday">${dateParts.weekday}</div>
              </div>

              <div class="stub-ref-tag" title="Booking Ref">${booking.bookingId}</div>
            </div>

            <!-- Right Main Ticket Body -->
            <div class="ticket-body">
              <!-- Top Row: Reference ID & Status Badges -->
              <div class="ticket-header-row">
                <div class="ticket-id-group">
                  <span class="ticket-id-pill" title="Click to view digital ticket" onclick="window.BhatkantiBookings.openBookingDetails('${booking.bookingId}')">
                    ${booking.bookingId}
                  </span>
                </div>

                <div class="ticket-status-badges">
                  ${renderPaymentStatusBadge(booking.paymentStatus)}
                  ${renderBookingStatusBadge(booking.bookingStatus)}
                </div>
              </div>

              <!-- Middle: Trip Title & Stops Sequence -->
              <div class="ticket-title-area">
                <h3 class="ticket-main-title">${escapeHtml(booking.tripName)}</h3>
                <div class="ticket-stops-sequence">
                  <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Stops:</span>
                  ${stops.map((s, idx) => {
        const sName = typeof s === 'string' ? s : s.name;
        return `
                      <span class="ticket-stop-tag">${escapeHtml(sName)}</span>
                      ${idx < stops.length - 1 ? '<span class="ticket-arrow">&rarr;</span>' : ''}
                    `;
      }).join('')}
                </div>
              </div>

              <!-- Metadata Row -->
              <div class="ticket-meta-row">
                <span class="ticket-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span>Traveler: <strong>${escapeHtml(booking.traveler ? booking.traveler.name : 'Explorer')}</strong></span>
                </span>
                <span class="ticket-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>Passes: <strong>${booking.numTickets || 1} Ticket${(booking.numTickets || 1) > 1 ? 's' : ''}</strong></span>
                </span>
                <span class="ticket-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  <span>Method: <strong>${escapeHtml(booking.paymentMethod || 'Gateway')}</strong></span>
                </span>
              </div>

              <!-- Bottom Footer Row: Fare & Action Buttons -->
              <div class="ticket-footer-row">
                <div class="ticket-fare-wrap">
                  <span class="ticket-fare-amount">₹${booking.totalCost}</span>
                  <span class="ticket-fare-caption">Total Ticket Fare</span>
                </div>

                <div class="ticket-action-btns">
                  ${isConfirmedTicket ? `
                    <button class="btn-ticket-pass" type="button" onclick="window.BhatkantiBookings.openTicketPassModal('${booking.bookingId}')" title="View confirmed printable e-ticket pass">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      E-Ticket Pass
                    </button>
                  ` : ''}

                  <button class="btn-ticket-view" type="button" onclick="window.BhatkantiBookings.openBookingDetails('${booking.bookingId}')">
                    <span>View Details</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* --------------------------------------------------------------------------
     6. DIGITAL TICKET DETAILS MODAL
     -------------------------------------------------------------------------- */
  function openBookingDetails(bookingId) {
    const booking = state.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return;

    state.selectedBookingId = bookingId;

    const modalBackdrop = document.getElementById('details-modal-backdrop');
    const modalContent = document.getElementById('details-modal-content');
    if (!modalBackdrop || !modalContent) return;

    let bannerClass = 'pending';
    let bannerTitle = 'Pending Seller Confirmation';
    let bannerDesc = 'Your payment may be successful, but official attraction pass confirmation is still awaited from the ticket vendor / seller counter.';

    if (booking.bookingStatus === 'CONFIRMED') {
      bannerClass = 'confirmed';
      bannerTitle = 'Confirmed Reservation';
      bannerDesc = 'The ticket seller and heritage authority have confirmed this reservation. Official entry passes are active.';
    } else if (booking.bookingStatus === 'CANCELLED') {
      bannerClass = 'cancelled';
      bannerTitle = 'Booking Cancelled';
      bannerDesc = booking.cancellationDetails
        ? `Cancelled on ${formatDate(booking.cancellationDetails.cancelledAt)}. Reason: ${booking.cancellationDetails.reason}`
        : 'This booking has been cancelled and cannot be redeemed for entry.';
    }

    const destItems = booking.destinations || [];
    const travelerPax = booking.numTickets || 1;

    const tableRows = destItems.map(d => {
      const name = typeof d === 'string' ? d : d.name;
      const unitPrice = typeof d === 'object' && d.priceNum !== undefined ? d.priceNum : 0;
      const itemTotal = unitPrice * travelerPax;
      const typeNote = (typeof d === 'object' && d.type) ? d.type : (unitPrice === 0 ? 'Free Entry' : 'Entry Ticket');

      return `
        <tr>
          <td>
            <strong>${escapeHtml(name)}</strong>
            <div style="font-size: 11px; color: var(--text-muted);">${typeNote}</div>
          </td>
          <td>₹${unitPrice}</td>
          <td>${travelerPax}</td>
          <td style="text-align: right; font-weight: 600;">₹${itemTotal}</td>
        </tr>
      `;
    }).join('');

    let actionButtons = `
      <button class="btn-dashboard-secondary" type="button" onclick="window.BhatkantiBookings.downloadBookingSummary('${booking.bookingId}')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download Summary
      </button>
    `;

    // Only display actual tickets when confirmed by seller
    if (booking.hasTicketDocument && booking.bookingStatus === 'CONFIRMED') {
      actionButtons += `
        <button class="btn-ticket-view" type="button" onclick="window.BhatkantiBookings.openTicketPassModal('${booking.bookingId}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Download Confirmed E-Ticket
        </button>
      `;
    }

    if (booking.paymentStatus === 'Payment Pending') {
      actionButtons += `
        <button class="btn-ledger-new" type="button" onclick="window.BhatkantiBookings.openPaymentSandbox('${booking.bookingId}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          Pay Now (Razorpay Sandbox)
        </button>
      `;
    }

    if (booking.paymentStatus === 'Paid' && booking.bookingStatus === 'PENDING') {
      actionButtons += `
        <button class="btn-ticket-view" type="button" onclick="window.BhatkantiBookings.simulateSellerConfirmation('${booking.bookingId}')" title="Simulate seller approving ticket reservation">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Simulate Seller Approval
        </button>
      `;
    }

    if (booking.bookingStatus !== 'CANCELLED') {
      actionButtons += `
        <button class="btn-dashboard-secondary" type="button" style="color: #b91c1c; border-color: #fecaca;" onclick="window.BhatkantiBookings.promptCancelBooking('${booking.bookingId}')">
          Cancel Booking
        </button>
      `;
    }

    modalContent.innerHTML = `
      <!-- Status Callout -->
      <div class="modal-status-banner ${bannerClass}">
        <div>
          <strong style="display: block; font-size: 14px; margin-bottom: 2px;">${bannerTitle}</strong>
          <span class="status-banner-text">${bannerDesc}</span>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${renderPaymentStatusBadge(booking.paymentStatus)}
          ${renderBookingStatusBadge(booking.bookingStatus)}
        </div>
      </div>

      <!-- Overview Grid -->
      <div class="detail-section-block">
        <h4 class="detail-section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Reservation Overview
        </h4>
        <div class="detail-kv-grid">
          <div class="detail-kv-item">
            <span class="detail-kv-label">Booking Reference ID</span>
            <span class="detail-kv-value" style="font-family: monospace; color: var(--secondary-green);">${booking.bookingId}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Trip / Itinerary Name</span>
            <span class="detail-kv-value">${escapeHtml(booking.tripName)}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Scheduled Travel Date</span>
            <span class="detail-kv-value">${formatDate(booking.travelDate)}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Booking Created On</span>
            <span class="detail-kv-value">${formatDate(booking.createdAt)}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Number of Visitors / Passes</span>
            <span class="detail-kv-value">${booking.numTickets || 1} Ticket${(booking.numTickets || 1) > 1 ? 's' : ''}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Lead Traveler</span>
            <span class="detail-kv-value">${escapeHtml(booking.traveler ? booking.traveler.name : 'Explorer')} (${escapeHtml(booking.traveler ? booking.traveler.phone : '')})</span>
          </div>
        </div>
      </div>

      <!-- Itemized Price Breakdown -->
      <div class="detail-section-block">
        <h4 class="detail-section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          Attraction Ticket Pricing & Fare Breakdown
        </h4>
        <table class="breakdown-table">
          <thead>
            <tr>
              <th>Attraction</th>
              <th>Unit Ticket</th>
              <th>Qty</th>
              <th style="text-align: right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
            <tr class="breakdown-total-row">
              <td colspan="3">Final Payable Total</td>
              <td style="text-align: right;">₹${booking.totalCost}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Payment & Transaction Information -->
      <div class="detail-section-block">
        <h4 class="detail-section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          Payment Information
        </h4>
        <div class="detail-kv-grid">
          <div class="detail-kv-item">
            <span class="detail-kv-label">Payment Gateway Method</span>
            <span class="detail-kv-value">${escapeHtml(booking.paymentMethod || 'Awaiting Payment')}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Gateway Transaction ID</span>
            <span class="detail-kv-value" style="font-family: monospace;">${booking.transactionId ? escapeHtml(booking.transactionId) : 'N/A (Pending)'}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Payment Status</span>
            <div>${renderPaymentStatusBadge(booking.paymentStatus)}</div>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Amount Paid</span>
            <span class="detail-kv-value" style="color: var(--dark-green); font-weight: 800;">₹${booking.paymentStatus === 'Paid' || booking.paymentStatus === 'Refunded' ? booking.totalCost : 0}</span>
          </div>
        </div>
      </div>

      <!-- Seller Confirmation Details -->
      <div class="seller-info-callout">
        <strong style="display: block; font-size: 13px; color: var(--dark-green); margin-bottom: 4px;">
          🏛️ Seller & Provider Confirmation Desk:
        </strong>
        <span>${escapeHtml(booking.sellerConfirmationDetails || 'Confirmation pending from monument authority.')}</span>
      </div>

      <!-- Cancellation / Refund Details if applicable -->
      ${booking.cancellationDetails ? `
        <div class="cancellation-callout">
          <strong style="display: block; font-size: 13px; margin-bottom: 4px;">
            ⚠️ Cancellation & Refund Summary:
          </strong>
          <div>Cancelled Date: <strong>${formatDate(booking.cancellationDetails.cancelledAt)}</strong></div>
          <div>Cancellation Reason: <em>${escapeHtml(booking.cancellationDetails.reason)}</em></div>
          <div>Refund Status: <strong>${escapeHtml(booking.cancellationDetails.refundStatus)}</strong></div>
          <div>Refund Amount: <strong>₹${booking.cancellationDetails.refundAmount}</strong> ${booking.cancellationDetails.refundTransactionId ? `(Ref: <code>${booking.cancellationDetails.refundTransactionId}</code>)` : ''}</div>
        </div>
      ` : ''}
    `;

    const footerEl = document.getElementById('details-modal-footer');
    if (footerEl) {
      footerEl.innerHTML = actionButtons;
    }

    modalBackdrop.classList.add('open');
  }

  function closeBookingDetails() {
    const modalBackdrop = document.getElementById('details-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('open');
    state.selectedBookingId = null;
  }

  /* --------------------------------------------------------------------------
     7. TICKET PASS MODAL (Only when Confirmed)
     -------------------------------------------------------------------------- */
  function openTicketPassModal(bookingId) {
    const booking = state.bookings.find(b => b.bookingId === bookingId);
    if (!booking || booking.bookingStatus !== 'CONFIRMED' || !booking.hasTicketDocument) {
      alert('Official confirmed e-ticket is not available for unconfirmed bookings.');
      return;
    }

    const modalBackdrop = document.getElementById('ticket-modal-backdrop');
    const container = document.getElementById('ticket-modal-content');
    if (!modalBackdrop || !container) return;

    const stops = booking.destinations || [];

    container.innerHTML = `
      <div class="e-ticket-container" id="printable-e-ticket">
        <div class="ticket-watermark">BHATKANTI OFFICIAL PASS</div>

        <div class="ticket-top-row">
          <div>
            <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--secondary-green); letter-spacing: 1px;">
              OFFICIAL VERIFIED TRAVEL PASS
            </span>
            <h2 style="font-family:'Playfair Display', Georgia, serif; font-size: 24px; color: var(--dark-green); margin: 4px 0;">
              ${escapeHtml(booking.tripName)}
            </h2>
            <div style="font-size: 12.5px; color: var(--text-muted);">
              Pass Ref: <strong style="font-family: monospace; color: var(--text-dark);">${booking.bookingId}</strong>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="background: #dcfce7; color: #15803d; border: 1px solid #86efac; padding: 6px 12px; border-radius: 8px; font-weight: 700; font-size: 12px;">
              ✓ ADMITTED & CONFIRMED
            </div>
            <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 4px;">
              Travel Date: <strong>${formatDate(booking.travelDate)}</strong>
            </div>
          </div>
        </div>

        <div class="detail-kv-grid" style="margin-bottom: 16px;">
          <div class="detail-kv-item">
            <span class="detail-kv-label">Lead Passenger</span>
            <span class="detail-kv-value">${escapeHtml(booking.traveler ? booking.traveler.name : 'Explorer')}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Total Pax Allowed</span>
            <span class="detail-kv-value">${booking.numTickets || 1} Person${(booking.numTickets || 1) > 1 ? 's' : ''}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Transaction Ref</span>
            <span class="detail-kv-value" style="font-family: monospace;">${escapeHtml(booking.transactionId || 'pay_demo_verified')}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Seller Validation</span>
            <span class="detail-kv-value" style="font-size: 11.5px; color: #15803d;">ASI Pune Heritage Desk</span>
          </div>
        </div>

        <div style="background: #f8faf9; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <span style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 6px;">
            Included Monument Admissions:
          </span>
          <ul style="padding-left: 18px; font-size: 12.5px; color: var(--text-dark); margin: 0;">
            ${stops.map(s => {
      const name = typeof s === 'string' ? s : s.name;
      const type = typeof s === 'object' && s.type ? s.type : 'Monuments Pass';
      return `<li><strong>${escapeHtml(name)}</strong> — ${escapeHtml(type)}</li>`;
    }).join('')}
          </ul>
        </div>

        <div class="ticket-barcode-wrap">
          <svg width="220" height="48" viewBox="0 0 220 48" fill="none" style="margin: 0 auto; display: block;">
            <rect x="0" width="3" height="48" fill="#111827"/>
            <rect x="6" width="2" height="48" fill="#111827"/>
            <rect x="11" width="4" height="48" fill="#111827"/>
            <rect x="18" width="1" height="48" fill="#111827"/>
            <rect x="22" width="5" height="48" fill="#111827"/>
            <rect x="30" width="2" height="48" fill="#111827"/>
            <rect x="35" width="3" height="48" fill="#111827"/>
            <rect x="42" width="6" height="48" fill="#111827"/>
            <rect x="52" width="2" height="48" fill="#111827"/>
            <rect x="57" width="4" height="48" fill="#111827"/>
            <rect x="64" width="2" height="48" fill="#111827"/>
            <rect x="70" width="5" height="48" fill="#111827"/>
            <rect x="78" width="1" height="48" fill="#111827"/>
            <rect x="82" width="3" height="48" fill="#111827"/>
            <rect x="88" width="6" height="48" fill="#111827"/>
            <rect x="97" width="2" height="48" fill="#111827"/>
            <rect x="102" width="4" height="48" fill="#111827"/>
            <rect x="110" width="2" height="48" fill="#111827"/>
            <rect x="115" width="5" height="48" fill="#111827"/>
            <rect x="123" width="1" height="48" fill="#111827"/>
            <rect x="127" width="4" height="48" fill="#111827"/>
            <rect x="134" width="2" height="48" fill="#111827"/>
            <rect x="139" width="6" height="48" fill="#111827"/>
            <rect x="148" width="3" height="48" fill="#111827"/>
            <rect x="154" width="2" height="48" fill="#111827"/>
            <rect x="159" width="5" height="48" fill="#111827"/>
            <rect x="167" width="2" height="48" fill="#111827"/>
            <rect x="172" width="4" height="48" fill="#111827"/>
            <rect x="179" width="1" height="48" fill="#111827"/>
            <rect x="183" width="5" height="48" fill="#111827"/>
            <rect x="191" width="3" height="48" fill="#111827"/>
            <rect x="197" width="2" height="48" fill="#111827"/>
            <rect x="202" width="4" height="48" fill="#111827"/>
            <rect x="209" width="2" height="48" fill="#111827"/>
            <rect x="214" width="4" height="48" fill="#111827"/>
          </svg>
          <div style="font-family: monospace; font-size: 11px; color: var(--text-muted); margin-top: 6px;">
            SECURE CODE: *${booking.bookingId}* &bull; PRESENT AT ENTRANCE GATE
          </div>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
  }

  function closeTicketPassModal() {
    const modalBackdrop = document.getElementById('ticket-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('open');
  }

  /* --------------------------------------------------------------------------
     8. DOWNLOAD BOOKING SUMMARY RECEIPT (Printable)
     -------------------------------------------------------------------------- */
  function downloadBookingSummary(bookingId) {
    const booking = state.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return;

    const printWindow = window.open('', '_blank', 'width=800,height=700');
    if (!printWindow) {
      alert('Popup blocker prevented opening the booking summary. Please allow popups.');
      return;
    }

    const stops = booking.destinations || [];
    const travelerPax = booking.numTickets || 1;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Travel Ledger Summary – ${booking.bookingId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111827; }
          .header { border-bottom: 2px solid #073931; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
          .brand { font-size: 24px; font-weight: 800; color: #073931; letter-spacing: -0.5px; }
          .brand span { color: #f15a24; }
          .title { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; font-size: 13px; }
          .grid div { background: #f8faf9; padding: 12px; border-radius: 6px; }
          .label { font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: 600; }
          .val { font-size: 14px; font-weight: 700; color: #111827; margin-top: 2px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
          th { background: #f1f5f9; padding: 10px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
          .total { font-weight: 800; font-size: 15px; color: #073931; }
          .footer { font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px; border-top: 1px dashed #cbd5e1; padding-top: 16px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">BHATKANTI<span>.</span> TRAVEL LEDGER</div>
            <div style="font-size: 12px; color: #6b7280;">Explore &bull; Plan &bull; Experience &bull; Pune</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; font-weight: 700; color: #073931;">DIGITAL RESERVATION VOUCHER</div>
            <div style="font-family: monospace; font-size: 14px;">${booking.bookingId}</div>
          </div>
        </div>

        <div class="title">${booking.tripName}</div>
        <p style="font-size: 13px; color: #6b7280; margin-top: 0;">Ledger recorded on ${new Date().toLocaleDateString('en-IN')}</p>

        <div class="grid">
          <div><div class="label">Scheduled Travel Date</div><div class="val">${booking.travelDate}</div></div>
          <div><div class="label">Lead Passenger</div><div class="val">${booking.traveler ? booking.traveler.name : 'Explorer'}</div></div>
          <div><div class="label">Payment Status</div><div class="val">${booking.paymentStatus} (${booking.paymentMethod})</div></div>
          <div><div class="label">Booking Confirmation Status</div><div class="val">${booking.bookingStatus}</div></div>
        </div>

        <table>
          <thead>
            <tr><th>Attraction</th><th>Unit Ticket</th><th>Visitors</th><th style="text-align:right;">Subtotal</th></tr>
          </thead>
          <tbody>
            ${stops.map(s => {
      const name = typeof s === 'string' ? s : s.name;
      const unit = typeof s === 'object' && s.priceNum !== undefined ? s.priceNum : 0;
      return `<tr><td>${name}</td><td>₹${unit}</td><td>${travelerPax}</td><td style="text-align:right;">₹${unit * travelerPax}</td></tr>`;
    }).join('')}
            <tr style="background: #f8faf9;">
              <td colspan="3" class="total">Total Payable Amount</td>
              <td style="text-align:right;" class="total">₹${booking.totalCost}</td>
            </tr>
          </tbody>
        </table>

        <div style="background: #e8f3ee; border: 1px solid #a7f3d0; padding: 12px; border-radius: 6px; font-size: 12.5px; color: #073931;">
          <strong>Provider Note:</strong> ${booking.sellerConfirmationDetails || 'Booking registered with Maharashtra Tourism desk.'}
        </div>

        <div class="footer">
          Bhatkanti Tourism Platform &bull; www.bhatkanti.in &bull; Places change. You should too.
          <br><br>
          <button class="btn-print" style="padding: 8px 16px; background:#073931; color:#fff; border:none; border-radius:4px; cursor:pointer;" onclick="window.print()">Print / Save PDF</button>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  /* --------------------------------------------------------------------------
     9. PAYMENT SANDBOX MODAL (Razorpay Standard Flow Demo Simulation)
     -------------------------------------------------------------------------- */
  function openPaymentSandbox(bookingId) {
    const booking = state.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return;

    state.selectedBookingId = bookingId;

    const modalBackdrop = document.getElementById('payment-modal-backdrop');
    const container = document.getElementById('payment-modal-content');
    if (!modalBackdrop || !container) return;

    container.innerHTML = `
      <div class="payment-demo-card">
        <div class="payment-demo-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          Razorpay Standard Flow Sandbox Simulation
        </div>
        <p class="payment-demo-desc">
          <strong>Notice:</strong> This is a clearly labelled client-side payment flow simulator. No real money, payment credentials or bank accounts are accessed.
        </p>
      </div>

      <div class="detail-section-block">
        <div class="detail-kv-grid">
          <div class="detail-kv-item">
            <span class="detail-kv-label">Order Ref ID</span>
            <span class="detail-kv-value" style="font-family: monospace;">order_rzp_${booking.bookingId.replace(/[^0-9]/g, '')}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Payable Amount</span>
            <span class="detail-kv-value" style="color: var(--dark-green); font-size: 18px; font-weight: 800;">₹${booking.totalCost}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Trip</span>
            <span class="detail-kv-value">${escapeHtml(booking.tripName)}</span>
          </div>
          <div class="detail-kv-item">
            <span class="detail-kv-label">Simulated Method</span>
            <span class="detail-kv-value">Razorpay Test NetBanking / UPI</span>
          </div>
        </div>
      </div>

      <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 14px;">
        Test the booking status lifecycle response:
      </div>

      <div class="gateway-sim-buttons">
        <button class="btn-sim-success" type="button" onclick="window.BhatkantiBookings.processPaymentResponse('${booking.bookingId}', true)">
          ✓ Simulate Payment Success (HTTP 200)
        </button>
        <button class="btn-sim-fail" type="button" onclick="window.BhatkantiBookings.processPaymentResponse('${booking.bookingId}', false)">
          ✕ Simulate Payment Failure (HTTP 402)
        </button>
      </div>
    `;

    modalBackdrop.classList.add('open');
  }

  function closePaymentSandbox() {
    const modalBackdrop = document.getElementById('payment-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('open');
  }

  function processPaymentResponse(bookingId, isSuccess) {
    const booking = state.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return;

    if (isSuccess) {
      const generatedTxId = `pay_rzp_demo_${Date.now().toString().slice(-7)}`;
      booking.paymentStatus = 'Paid';
      booking.transactionId = generatedTxId;
      booking.paymentMethod = 'Razorpay Sandbox (Simulated Success)';
      booking.bookingStatus = 'PENDING';
      booking.sellerConfirmationDetails = 'Payment captured via Razorpay Sandbox. Ticket confirmation is awaited from the seller counter.';

      saveBookingsToStorage();
      closePaymentSandbox();
      updateSummaryCounts();
      renderBookingsList();

      alert(`🎉 Payment Successful!\nTransaction ID: ${generatedTxId}\n\nPayment Status: PAID\nBooking Status: PENDING SELLER CONFIRMATION\n\nAs per Bhatkanti policy, payment success does not automatically confirm entry tickets until the monument seller verifies the reservation.`);
      openBookingDetails(bookingId);
    } else {
      booking.paymentStatus = 'Failed';
      booking.transactionId = `pay_failed_rzp_${Date.now().toString().slice(-6)}`;
      booking.paymentMethod = 'Razorpay Sandbox (Simulated Decline)';
      booking.bookingStatus = 'CANCELLED';
      booking.cancellationDetails = {
        cancelledAt: new Date().toISOString(),
        reason: 'Payment gateway simulation declined by user/bank timeout',
        refundStatus: 'No amount charged',
        refundAmount: 0,
        refundTransactionId: null
      };

      saveBookingsToStorage();
      closePaymentSandbox();
      updateSummaryCounts();
      renderBookingsList();

      alert(`⚠️ Payment Failed!\nPayment Status: FAILED\nBooking Status: CANCELLED\n\nThe booking could not be completed because the payment was declined.`);
      openBookingDetails(bookingId);
    }
  }

  /* --------------------------------------------------------------------------
     10. SELLER CONFIRMATION SIMULATION
     -------------------------------------------------------------------------- */
  function simulateSellerConfirmation(bookingId) {
    const booking = state.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return;

    if (booking.paymentStatus !== 'Paid') {
      alert('Cannot confirm ticket reservation before payment is marked as Paid.');
      return;
    }

    const sellerVoucher = `ASI-PUN-${Math.floor(100000 + Math.random() * 900000)}`;
    booking.bookingStatus = 'CONFIRMED';
    booking.hasTicketDocument = true;
    booking.sellerConfirmationDetails = `Verified by Archaeological Survey of India (Pune Heritage Desk). Official Pass Voucher #${sellerVoucher}. E-Ticket document generated.`;

    saveBookingsToStorage();
    updateSummaryCounts();
    renderBookingsList();

    alert(`✅ Seller Confirmation Received!\nPass Voucher: ${sellerVoucher}\n\nBooking Status: CONFIRMED\nOfficial e-ticket is now ready to view and download!`);
    openBookingDetails(bookingId);
  }

  /* --------------------------------------------------------------------------
     11. USER CANCELLATION & REFUND WORKFLOW
     -------------------------------------------------------------------------- */
  function promptCancelBooking(bookingId) {
    const booking = state.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return;

    if (booking.bookingStatus === 'CANCELLED') {
      alert('This booking is already cancelled.');
      return;
    }

    const reason = prompt('Please enter a cancellation reason (e.g. Schedule conflict, Change of travel plan):', 'Traveler schedule change');
    if (reason === null) return;

    const isPaid = booking.paymentStatus === 'Paid';
    const refundTx = isPaid ? `rfnd_rzp_${Date.now().toString().slice(-7)}` : null;

    booking.bookingStatus = 'CANCELLED';
    booking.hasTicketDocument = false;
    booking.paymentStatus = isPaid ? 'Refunded' : (booking.paymentStatus === 'Payment Pending' ? 'Failed' : booking.paymentStatus);
    booking.cancellationDetails = {
      cancelledAt: new Date().toISOString(),
      reason: reason || 'Traveler requested cancellation',
      refundStatus: isPaid ? 'Refund Processed to Source Payment Method (2-4 business days)' : 'No refund required (unpaid)',
      refundAmount: isPaid ? booking.totalCost : 0,
      refundTransactionId: refundTx
    };
    booking.sellerConfirmationDetails = `Booking cancelled by user. Seller reservation released.`;

    saveBookingsToStorage();
    updateSummaryCounts();
    renderBookingsList();

    alert(`Booking ${bookingId} has been cancelled.${isPaid ? `\n\nRefund of ₹${booking.totalCost} has been initiated to your original payment method (Ref: ${refundTx}).` : ''}`);
    openBookingDetails(bookingId);
  }

  /* --------------------------------------------------------------------------
     12. NEW BOOKING CREATION MODAL & FLOW
     -------------------------------------------------------------------------- */
  function openNewBookingModal() {
    const modalBackdrop = document.getElementById('new-booking-modal-backdrop');
    if (!modalBackdrop) return;

    const dateInput = document.getElementById('nb-travel-date');
    if (dateInput) {
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      dateInput.value = tomorrow;
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    updateNewBookingFareCalculation();
    modalBackdrop.classList.add('open');
  }

  function closeNewBookingModal() {
    const modalBackdrop = document.getElementById('new-booking-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('open');
  }

  function updateNewBookingFareCalculation() {
    const templateSelect = document.getElementById('nb-trip-select');
    const paxSelect = document.getElementById('nb-travelers-count');
    const summaryContainer = document.getElementById('nb-cost-breakdown');
    if (!templateSelect || !paxSelect || !summaryContainer) return;

    const tplId = templateSelect.value;
    const pax = parseInt(paxSelect.value, 10) || 1;
    const tpl = CURATED_BOOKING_TEMPLATES.find(t => t.templateId === tplId) || CURATED_BOOKING_TEMPLATES[0];

    const stops = tpl.destinations;
    let unitTotal = 0;

    const itemRows = stops.map(s => {
      unitTotal += (s.priceNum || 0);
      const sub = (s.priceNum || 0) * pax;
      return `
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; padding: 4px 0; border-bottom: 1px dashed #e2e8f0;">
          <span>${escapeHtml(s.name)} (₹${s.priceNum} &times; ${pax})</span>
          <strong>₹${sub}</strong>
        </div>
      `;
    }).join('');

    const grandTotal = unitTotal * pax;

    summaryContainer.innerHTML = `
      <div style="background: #f8faf9; border: 1px solid var(--border-light); border-radius: 8px; padding: 12px; margin-top: 8px;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 6px;">
          Ticket Price Estimation (${pax} Passenger${pax > 1 ? 's' : ''}):
        </span>
        ${itemRows}
        <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: var(--dark-green); padding-top: 8px; margin-top: 6px; border-top: 1px solid #cbd5e1;">
          <span>Final Payable Amount:</span>
          <span>₹${grandTotal}</span>
        </div>
      </div>
    `;
  }

  function handleCreateBookingSubmit(event) {
    event.preventDefault();

    const templateSelect = document.getElementById('nb-trip-select');
    const paxSelect = document.getElementById('nb-travelers-count');
    const dateInput = document.getElementById('nb-travel-date');
    const nameInput = document.getElementById('nb-lead-name');
    const emailInput = document.getElementById('nb-lead-email');
    const phoneInput = document.getElementById('nb-lead-phone');

    if (!templateSelect || !paxSelect || !dateInput || !nameInput || !emailInput || !phoneInput) return;

    const tplId = templateSelect.value;
    const pax = parseInt(paxSelect.value, 10) || 1;
    const travelDate = dateInput.value;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !email || !phone || !travelDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const tpl = CURATED_BOOKING_TEMPLATES.find(t => t.templateId === tplId) || CURATED_BOOKING_TEMPLATES[0];
    const unitTotal = tpl.destinations.reduce((acc, d) => acc + (d.priceNum || 0), 0);
    const grandTotal = unitTotal * pax;

    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBookingId = `BHT-BK-${year}-${randomSuffix}`;
    const newTripId = `TRIP-PUN-${randomSuffix}`;

    const newBookingRecord = {
      bookingId: newBookingId,
      tripId: newTripId,
      userId: CURRENT_USER_ID,
      tripName: tpl.title,
      destinations: tpl.destinations,
      travelDate: travelDate,
      numTickets: pax,
      totalCost: grandTotal,
      paymentStatus: 'Payment Pending',
      paymentMethod: 'Razorpay Checkout (Pending)',
      transactionId: null,
      bookingStatus: 'PENDING',
      sellerConfirmationDetails: 'Booking initiated. Please complete gateway payment to request seller confirmation.',
      hasTicketDocument: false,
      createdAt: new Date().toISOString(),
      traveler: { name, email, phone }
    };

    state.bookings.unshift(newBookingRecord);
    saveBookingsToStorage();
    closeNewBookingModal();
    updateSummaryCounts();
    renderBookingsList();

    openPaymentSandbox(newBookingId);
  }

  /* --------------------------------------------------------------------------
     13. FUTURE PYTHON BACKEND INTEGRATION API LAYER
     -------------------------------------------------------------------------- */
  const BhatkantiBookingAPI = {
    baseUrl: (window.BHATKANTI_API_BASE || '/api'),

    async getBookingsByUserId(userId) {
      try {
        const res = await fetch(`${this.baseUrl}/bookings/${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn('[BhatkantiBookingAPI] Python backend offline. Serving client-side localStorage demo data.', err);
        return state.bookings.filter(b => b.userId === userId);
      }
    },

    async getBookingById(bookingId) {
      try {
        const res = await fetch(`${this.baseUrl}/bookings/${encodeURIComponent(bookingId)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn('[BhatkantiBookingAPI] Python backend offline. Serving client-side localStorage record.', err);
        return state.bookings.find(b => b.bookingId === bookingId) || null;
      }
    },

    async createBooking(bookingPayload) {
      try {
        const res = await fetch(`${this.baseUrl}/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn('[BhatkantiBookingAPI] Python backend offline. Emulating client-side booking creation.', err);
        return { success: true, booking: bookingPayload, mode: 'localStorage-fallback' };
      }
    },

    async createPaymentOrder(bookingId, amount) {
      try {
        const res = await fetch(`${this.baseUrl}/payments/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ booking_id: bookingId, amount: amount, currency: 'INR' })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn('[BhatkantiBookingAPI] Python backend offline. Generating demo order reference.', err);
        return {
          order_id: `order_demo_${Date.now()}`,
          amount: amount,
          currency: 'INR',
          key_id: 'rzp_test_placeholder_key'
        };
      }
    },

    async verifyPayment(paymentPayload) {
      try {
        const res = await fetch(`${this.baseUrl}/payments/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentPayload)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn('[BhatkantiBookingAPI] Python backend offline. Client-side verified demo payment.', err);
        return { verified: true, payment_id: paymentPayload.razorpay_payment_id };
      }
    },

    async cancelBooking(bookingId, reason) {
      try {
        const res = await fetch(`${this.baseUrl}/bookings/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ booking_id: bookingId, reason: reason })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn('[BhatkantiBookingAPI] Python backend offline. Emulating client-side cancellation.', err);
        return { success: true, booking_id: bookingId, cancelled: true };
      }
    },

    async getBookingStatus(bookingId) {
      try {
        const res = await fetch(`${this.baseUrl}/bookings/${encodeURIComponent(bookingId)}/status`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        const b = state.bookings.find(item => item.bookingId === bookingId);
        return {
          booking_id: bookingId,
          payment_status: b ? b.paymentStatus : 'Unknown',
          booking_status: b ? b.bookingStatus : 'Unknown'
        };
      }
    }
  };

  /* --------------------------------------------------------------------------
     14. EVENT HANDLERS & INITIALIZATION
     -------------------------------------------------------------------------- */
  function setupEventListeners() {
    // Filter Pills
    document.querySelectorAll('.ledger-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';
        setFilter(filter);
      });
    });

    // Search Input
    const searchInput = document.getElementById('bookings-search-input');
    const searchClear = document.getElementById('bookings-search-clear');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (searchClear) searchClear.style.display = state.searchQuery ? 'block' : 'none';
        renderBookingsList();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          state.searchQuery = '';
          searchClear.style.display = 'none';
          searchInput.focus();
          renderBookingsList();
        }
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('bookings-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderBookingsList();
      });
    }

    // New Booking Form Change Listener
    const tplSelect = document.getElementById('nb-trip-select');
    const paxSelect = document.getElementById('nb-travelers-count');
    if (tplSelect) tplSelect.addEventListener('change', updateNewBookingFareCalculation);
    if (paxSelect) paxSelect.addEventListener('change', updateNewBookingFareCalculation);

    // New Booking Form Submit
    const nbForm = document.getElementById('new-booking-form');
    if (nbForm) nbForm.addEventListener('submit', handleCreateBookingSubmit);

    // Escape Key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeBookingDetails();
        closeTicketPassModal();
        closePaymentSandbox();
        closeNewBookingModal();
      }
    });
  }

  function setFilter(filter) {
    state.activeFilter = filter;

    // Update filter pill active classes
    document.querySelectorAll('.ledger-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    renderBookingsList();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Public Interface
  window.BhatkantiBookings = {
    init: function () {
      loadBookingsFromStorage();
      updateSummaryCounts();
      renderBookingsList();
      setupEventListeners();
    },
    openBookingDetails: openBookingDetails,
    closeBookingDetails: closeBookingDetails,
    openTicketPassModal: openTicketPassModal,
    closeTicketPassModal: closeTicketPassModal,
    downloadBookingSummary: downloadBookingSummary,
    openPaymentSandbox: openPaymentSandbox,
    closePaymentSandbox: closePaymentSandbox,
    processPaymentResponse: processPaymentResponse,
    simulateSellerConfirmation: simulateSellerConfirmation,
    promptCancelBooking: promptCancelBooking,
    openNewBookingModal: openNewBookingModal,
    closeNewBookingModal: closeNewBookingModal,
    setFilter: setFilter,
    api: BhatkantiBookingAPI
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.BhatkantiBookings.init);
  } else {
    window.BhatkantiBookings.init();
  }
})();
