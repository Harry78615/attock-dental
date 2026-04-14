/* =====================================================
   ATTOCK DENTAL CLINIC — CONTENT CONTROL FILE
   =====================================================
   This is the ONLY file you need to edit to update
   your website. No coding needed — just change the
   text between the quotes "like this".

   AFTER EDITING:
   Save → push to GitHub → live in 60 seconds.
   ===================================================== */


/* =====================================================
   1. ANNOUNCEMENT BAR
   Shows a coloured strip at the top of EVERY page.
   Use for: holiday closures, special offers, urgent news.

   COLORS: "gold" | "navy" | "green" | "red"
   To HIDE: set active to false
   ===================================================== */
window.ANNOUNCEMENT = {
  active: true,
  color: "gold",
  emoji: "🎉",
  text: "Eid Special — 20% off Teeth Whitening this week only!",
  linkText: "Book Now",
  linkUrl: "book.html"
};


/* =====================================================
   2. CURRENT OFFERS
   Up to 3 offer cards shown on the homepage.
   To hide any offer: set active: false
   ===================================================== */
window.OFFERS = [
  {
    active: true,
    emoji: "✨",
    badge: "EID SPECIAL",
    badgeColor: "gold",
    title: "Teeth Whitening",
    originalPrice: "Rs. 3,000",
    offerPrice: "Rs. 2,400",
    saving: "Save Rs. 600",
    description: "Professional in-clinic whitening. Brighter smile in a single appointment.",
    expiry: "Valid until 30 April 2025",
    cta: "Book This Offer"
  },
  {
    active: true,
    emoji: "🦷",
    badge: "FAMILY DEAL",
    badgeColor: "navy",
    title: "Family Check-up Package",
    originalPrice: "Rs. 2,000",
    offerPrice: "Rs. 1,400",
    saving: "Save Rs. 600",
    description: "Bring any 2 family members for a routine check-up and cleaning — both treated together.",
    expiry: "Ongoing — book anytime",
    cta: "Book for Family"
  },
  {
    active: true,
    emoji: "🧒",
    badge: "KIDS FREE",
    badgeColor: "green",
    title: "Children's First Visit",
    originalPrice: "Rs. 800",
    offerPrice: "FREE",
    saving: "100% Free",
    description: "First dental check-up for children under 10 is completely free. Help them start right.",
    expiry: "Always available",
    cta: "Book for My Child"
  }
];


/* =====================================================
   3. CLINIC NEWS & UPDATES (scrolling ticker)
   Short one-line updates. Most recent FIRST.
   To hide one: set active: false
   ===================================================== */
window.UPDATES = [
  {
    active: true,
    emoji: "📅",
    type: "Holiday",
    text: "Clinic closed on Eid holidays. Appointments resume after Eid — book your slot now."
  },
  {
    active: true,
    emoji: "🆕",
    type: "New",
    text: "New digital X-ray machine now available — faster, safer, more accurate diagnosis."
  },
  {
    active: true,
    emoji: "⏰",
    type: "Hours",
    text: "Saturday hours: 10am–1:30pm and 5–7:30pm. Book early — weekend slots fill fast."
  },
  {
    active: true,
    emoji: "💬",
    type: "Reminder",
    text: "WhatsApp bookings available — message us on +92 310 9273166 to reserve your slot."
  }
];
