/* ==========================================================================
   BHATKANTI - CENTRALIZED CITY DATA STORE (Pune, Mumbai, Bangalore)
   ========================================================================== */

const CITY_DATA = {
  pune: {
    key: "pune",
    name: "Pune",
    taglineScript: "Pune<br>Firat Nahi,<br>Jagtay!",
    hero: {
      title: "Discover<br>Pune Differently",
      subtitle: "Historic streets, vibrant culture, serene getaways —<br>all in one place.",
      image: "images/pune/hero.jpg",
      bottomBadgeText: "Shaniwar Wada Pune"
    },
    searchPlaceholder: "Search for places, museums, forts, gardens...",
    chips: ["Shaniwar Wada", "Museums", "Gardens", "Temples", "One Day Trip"],
    categories: [
      { name: "Forts", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#073931" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M4 21V10l3-2 3 2v11"/><path d="M14 21V10l3-2 3 2v11"/><path d="M9 21v-5a2 2 0 0 1 4 0v5"/><path d="M7 10h10"/><path d="M9 6V3h6v3"/></svg>` },
      { name: "Museums", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8b4513" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16"/><path d="M2 10h20"/><path d="M12 2L2 7h20L12 2z"/><path d="M4 10v9"/><path d="M8 10v9"/><path d="M12 10v9"/><path d="M16 10v9"/><path d="M20 10v9"/></svg>` },
      { name: "Gardens", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#073931" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19v3"/><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>` },
      { name: "Historical Places", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2c5e53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 11h6"/><path d="M9 15h6"/><path d="M10 21v-3a2 2 0 0 1 4 0v3"/></svg>` },
      { name: "Temples", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#a0522d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l-6 6h12l-6-6z"/><path d="M4 10h16v12H4z"/><path d="M9 22v-6a3 3 0 0 1 6 0v6"/><path d="M12 2v6"/></svg>` },
      { name: "Art & Culture", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#073931" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 0 5-2 8 8 0 0 0 5 2 5 5 0 0 0 5-5V7H2v5z"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/><path d="M9 14s1 1 3 1 3-1 3-1"/></svg>` },
      { name: "Lakes & Dams", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0e5347" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1"/><path d="M2 16c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1"/><path d="M4 12l5-7 4 4 4-6 5 9H4z"/></svg>` },
      { name: "Food & Markets", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#c05621" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z"/><path d="M8 12c1.5 2 4.5 2 6 0"/><path d="M12 3v4"/></svg>` }
    ],
    popularSectionTitle: "Popular Places in Pune",
    popularPlaces: [
      {
        name: "Shaniwar Wada",
        location: "Pune",
        rating: "4.6",
        reviews: "2.1k",
        time: "9:00 AM – 5:30 PM",
        price: "₹25",
        image: "images/pune/shaniwar-wada.jpg"
      },
      {
        name: "Aga Khan Palace",
        location: "Pune",
        rating: "4.4",
        reviews: "1.8k",
        time: "9:00 AM – 5:30 PM",
        price: "₹25",
        image: "images/pune/aga-khan-palace.jpg"
      },
      {
        name: "Raja Dinkar Kelkar Museum",
        location: "Pune",
        rating: "4.7",
        reviews: "3.2k",
        time: "10:00 AM – 6:00 PM",
        price: "₹100",
        image: "images/pune/kelkar-museum.jpg"
      },
      {
        name: "Sinhagad Fort",
        location: "Pune",
        rating: "4.8",
        reviews: "5.1k",
        time: "6:00 AM – 6:00 PM",
        price: "₹20",
        image: "images/pune/sinhagad-fort.jpg"
      }
    ],
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.248694080183!2d73.8530343758364!3d18.517623969262968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06e408d669b%3A0xb3e6488d5e06497f!2sShaniwar%20Wada!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapPins: [
      { name: "Shaniwar Wada", dist: "1.2 km", thumb: "images/pune/thumb-shaniwar.jpg", style: "top: 38px; left: 140px;" },
      { name: "Aga Khan Palace", dist: "4.8 km", thumb: "images/pune/thumb-aga-khan.jpg", style: "top: 25px; right: 20px;" },
      { name: "Lal Mahal", dist: "0.8 km", style: "top: 130px; left: 24px;" },
      { name: "Raja Dinkar Kelkar Museum", dist: "2.1 km", style: "top: 175px; left: 160px;" },
      { name: "Saras Baug", dist: "2.4 km", style: "bottom: 40px; left: 110px;" },
      { name: "Pataleshwar Cave Temple", dist: "3.0 km", thumb: "images/pune/thumb-pataleshwar.jpg", style: "bottom: 25px; right: 30px;" }
    ],
    reviews: [
      {
        name: "Aditya Kulkarni",
        avatar: "images/avatar-aditya.jpg",
        rating: "★★★★★",
        text: `"Bhatkanti made it so easy to plan my Pune trip. Loved the itinerary and ticket booking feature!"`
      },
      {
        name: "Sneha Deshmukh",
        avatar: "images/avatar-sneha.jpg",
        rating: "★★★★★",
        text: `"Clean interface, useful information and helped me discover places I never knew existed."`
      },
      {
        name: "Rohan Patil",
        avatar: "images/avatar-rohan.jpg",
        rating: "★★★★★",
        text: `"Perfect for anyone who wants to actually explore the city, not just visit."`
      }
    ]
  },

  mumbai: {
    key: "mumbai",
    name: "Mumbai",
    taglineScript: "Mumbai<br>Firat Nahi,<br>Jagtay!",
    hero: {
      title: "Discover<br>Mumbai Differently",
      subtitle: "Historic landmarks, coastal views, vibrant streets —<br>all in one city.",
      image: "images/mumbai/hero.jpg",
      bottomBadgeText: "Gateway of India Mumbai"
    },
    searchPlaceholder: "Search for places, museums, beaches, landmarks...",
    chips: ["Gateway of India", "Beaches", "Museums", "Markets", "Marine Drive"],
    categories: [
      { name: "Beaches", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0e5347" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1"/><path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 14v6"/></svg>` },
      { name: "Heritage", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2c5e53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 11h6"/><path d="M10 21v-3a2 2 0 0 1 4 0v3"/></svg>` },
      { name: "Museums", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8b4513" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16"/><path d="M2 10h20"/><path d="M12 2L2 7h20L12 2z"/><path d="M4 10v9"/><path d="M12 10v9"/><path d="M20 10v9"/></svg>` },
      { name: "Markets", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#c05621" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z"/><path d="M8 12c1.5 2 4.5 2 6 0"/></svg>` },
      { name: "Temples", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#a0522d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l-6 6h12l-6-6z"/><path d="M4 10h16v12H4z"/><path d="M9 22v-6a3 3 0 0 1 6 0v6"/></svg>` },
      { name: "Art & Culture", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#073931" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 0 5-2 8 8 0 0 0 5 2 5 5 0 0 0 5-5V7H2v5z"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/></svg>` },
      { name: "Gardens", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#073931" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19v3"/><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/></svg>` },
      { name: "Forts", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#073931" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M4 21V10l3-2 3 2v11"/><path d="M14 21V10l3-2 3 2v11"/></svg>` }
    ],
    popularSectionTitle: "Popular Places in Mumbai",
    popularPlaces: [
      {
        name: "Gateway of India",
        location: "Mumbai",
        rating: "4.7",
        reviews: "5.2k",
        time: "24 Hours",
        price: "Free",
        image: "images/mumbai/gateway-of-india.jpg"
      },
      {
        name: "Chhatrapati Shivaji Maharaj Terminus",
        location: "Mumbai",
        rating: "4.6",
        reviews: "4.1k",
        time: "24 Hours",
        price: "Free",
        image: "images/mumbai/csmt.jpg"
      },
      {
        name: "Marine Drive",
        location: "Mumbai",
        rating: "4.7",
        reviews: "8.5k",
        time: "Open 24 Hours",
        price: "Free",
        image: "images/mumbai/marine-drive.jpg"
      },
      {
        name: "Elephanta Caves",
        location: "Mumbai",
        rating: "4.5",
        reviews: "3.6k",
        time: "9:30 AM – 5:30 PM",
        price: "₹40",
        image: "images/mumbai/elephanta-caves.jpg"
      }
    ],
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60352.54845579979!2d72.8080641154564!3d18.922002360265243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c06fc2ddb9%3A0x8b12384a86d268d8!2sGateway%20Of%20India%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapPins: [
      { name: "Gateway of India", dist: "0.5 km", thumb: "images/mumbai/thumb-gateway.jpg", style: "top: 38px; left: 140px;" },
      { name: "Marine Drive", dist: "2.4 km", style: "top: 25px; right: 20px;" },
      { name: "CSMT Station", dist: "1.8 km", thumb: "images/mumbai/thumb-csmt.jpg", style: "top: 130px; left: 24px;" },
      { name: "Colaba Causeway", dist: "0.9 km", style: "top: 175px; left: 160px;" },
      { name: "Hanging Gardens", dist: "4.2 km", style: "bottom: 40px; left: 110px;" },
      { name: "Elephanta Caves", dist: "10.0 km", thumb: "images/mumbai/thumb-elephanta.jpg", style: "bottom: 25px; right: 30px;" }
    ],
    reviews: [
      {
        name: "Vikram Mehta",
        avatar: "images/avatar-aditya.jpg",
        rating: "★★★★★",
        text: `"Bhatkanti helped me explore Mumbai beyond the usual spots. Marine Drive sunset guide was spot on!"`
      },
      {
        name: "Priya Sharma",
        avatar: "images/avatar-sneha.jpg",
        rating: "★★★★★",
        text: `"Super smooth UI. Discovered heritage walks near CSMT that I never knew about."`
      },
      {
        name: "Karan Merchant",
        avatar: "images/avatar-rohan.jpg",
        rating: "★★★★★",
        text: `"The itinerary recommendations for a day trip to Elephanta Caves saved us so much hassle."`
      }
    ]
  },

  bangalore: {
    key: "bangalore",
    name: "Bangalore",
    taglineScript: "Namma<br>Bengaluru,<br>Jagtay!",
    hero: {
      title: "Discover<br>Bangalore Differently",
      subtitle: "Royal heritage, green spaces, vibrant culture —<br>all in one city.",
      image: "images/bangalore/hero.jpg",
      bottomBadgeText: "Bangalore Palace Bengaluru"
    },
    searchPlaceholder: "Search for places, gardens, palaces, landmarks...",
    chips: ["Bangalore Palace", "Lalbagh", "Parks", "Palaces", "Museums"],
    categories: [
      { name: "Gardens", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#073931" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19v3"/><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/></svg>` },
      { name: "Palaces", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8b4513" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16"/><path d="M2 10h20"/><path d="M12 2L2 7h20L12 2z"/><path d="M4 10v9"/></svg>` },
      { name: "Temples", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#a0522d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l-6 6h12l-6-6z"/><path d="M4 10h16v12H4z"/></svg>` },
      { name: "Museums", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8b4513" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16"/><path d="M12 10v9"/></svg>` },
      { name: "Parks", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0e5347" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19v3"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>` },
      { name: "Food & Markets", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#c05621" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z"/></svg>` },
      { name: "Art & Culture", bg: "bg-mint", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#073931" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 0 5-2 8 8 0 0 0 5 2 5 5 0 0 0 5-5V7H2v5z"/></svg>` },
      { name: "Historical Places", bg: "bg-tan", icon: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2c5e53" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/></svg>` }
    ],
    popularSectionTitle: "Popular Places in Bangalore",
    popularPlaces: [
      {
        name: "Bangalore Palace",
        location: "Bangalore",
        rating: "4.4",
        reviews: "5.2k",
        time: "10:00 AM – 5:30 PM",
        price: "₹300",
        image: "images/bangalore/bangalore-palace.jpg"
      },
      {
        name: "Lalbagh Botanical Garden",
        location: "Bangalore",
        rating: "4.4",
        reviews: "8.1k",
        time: "6:00 AM – 7:00 PM",
        price: "₹25",
        image: "images/bangalore/lalbagh.jpg"
      },
      {
        name: "Vidhana Soudha",
        location: "Bangalore",
        rating: "4.7",
        reviews: "4.3k",
        time: "9:00 AM – 5:00 PM",
        price: "Free",
        image: "images/bangalore/vidhana-soudha.jpg"
      },
      {
        name: "Cubbon Park",
        location: "Bangalore",
        rating: "4.6",
        reviews: "7.4k",
        time: "6:00 AM – 6:00 PM",
        price: "Free",
        image: "images/bangalore/cubbon-park.jpg"
      }
    ],
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4975510619723!2d77.59207867571216!3d12.997576514156687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8380f7f840c1963!2sBengaluru%20Palace!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapPins: [
      { name: "Bangalore Palace", dist: "1.0 km", thumb: "images/bangalore/thumb-palace.jpg", style: "top: 38px; left: 140px;" },
      { name: "Vidhana Soudha", dist: "2.5 km", style: "top: 25px; right: 20px;" },
      { name: "Cubbon Park", dist: "3.1 km", thumb: "images/bangalore/thumb-cubbon.jpg", style: "top: 130px; left: 24px;" },
      { name: "Commercial Street", dist: "3.8 km", style: "top: 175px; left: 160px;" },
      { name: "Bull Temple", dist: "5.0 km", style: "bottom: 40px; left: 110px;" },
      { name: "Lalbagh Botanical Garden", dist: "6.2 km", thumb: "images/bangalore/thumb-lalbagh.jpg", style: "bottom: 25px; right: 30px;" }
    ],
    reviews: [
      {
        name: "Anish Rao",
        avatar: "images/avatar-aditya.jpg",
        rating: "★★★★★",
        text: `"Exploring Bangalore Palace with Bhatkanti was brilliant. Loved the historical details!"`
      },
      {
        name: "Deepa Nair",
        avatar: "images/avatar-sneha.jpg",
        rating: "★★★★★",
        text: `"Lalbagh and Cubbon Park recommendations made our weekend trip super peaceful."`
      },
      {
        name: "Suresh Kumar",
        avatar: "images/avatar-rohan.jpg",
        rating: "★★★★★",
        text: `"Great app for discovering heritage spots in Namma Bengaluru!"`
      }
    ]
  }
};
