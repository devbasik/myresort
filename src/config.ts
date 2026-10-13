// ============================================================
// CENTRAL EDITABLE CONFIGURATION
// All venue content, imagery, contact details, and settings
// live here. Edit this file to customise the entire site.
// ============================================================

export const config = {
  // --- RESORT IDENTITY ---
  resortName: 'The Belvedere',
  wordmark: 'THE ART OF FOREVER',
  tagline: 'An extraordinary setting for the beginning of your forever.',

  // --- CONTACT ---
  contact: {
    phone: '+1 (555) 000-0000',
    email: 'enquiries@thebelvedere.example',
    whatsapp: '15550000000', // international format, no +
    instagram: 'https://instagram.com',
    address: {
      line1: '123 Garden Avenue',
      city: 'Lake District',
      region: 'Cumbria',
      country: 'United Kingdom',
      full: '123 Garden Avenue, Lake District, Cumbria, United Kingdom',
    },
    mapsUrl: 'https://maps.google.com',
    nearbyTransport: null as string | null, // e.g. "40 minutes from the nearest international airport"
  },

  // --- NAVIGATION ---
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'The Resort', href: '#introduction' },
    { label: 'Wedding Spaces', href: '#spaces' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Stay', href: '#stay' },
    { label: 'Contact', href: '#enquiry' },
  ],

  // --- HERO STAGE ---
  hero: {
    image: 'https://images.pexels.com/photos/33485963/pexels-photo-33485963.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
    alt: 'Outdoor wedding ceremony in a palace courtyard with floral arrangements',
    overline: 'A Day to Remember',
    wordmark: 'THE ART OF FOREVER',
    supporting: 'An extraordinary setting for the beginning of your forever.',
    straps: [
      'Exceptional Settings',
      'Meaningful Celebrations',
      'Timeless Memories',
    ],
  },

  // --- INTRODUCTION BAND ---
  intro: {
    statement: 'Some places become part of your story.',
    italic: 'Some moments stay with you forever.',
    script: 'Made for your moment.',
    columns: [
      {
        title: 'The Setting',
        body: 'Beautiful spaces designed for unforgettable celebrations.',
      },
      {
        title: 'The Celebration',
        body: 'Room for meaningful ceremonies, joyous gatherings, and memorable receptions.',
      },
      {
        title: 'The Experience',
        body: 'Thoughtful hospitality that brings every detail together.',
      },
    ],
  },

  // --- REVEAL STAGE ---
  revealStage: {
    image: 'https://images.pexels.com/photos/13326534/pexels-photo-13326534.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
    alt: 'Outdoor wedding venue with chandeliers and tables at golden hour',
    headline: 'A Beautiful Beginning.',
    caption: 'Thoughtfully chosen. Beautifully remembered.',
    location: 'Lake District',
  },

  // --- WEDDING SPACES ---
  spaces: {
    label: 'The Spaces',
    headline: 'Every setting has its own magic.',
    items: [
      {
        name: 'The Garden Lawn',
        image: 'https://images.pexels.com/photos/32854448/pexels-photo-32854448.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
        alt: 'Outdoor wedding ceremony with rows of chairs facing a villa',
        description: 'An expansive open-air lawn framed by landscaped gardens, ideal for ceremonies beneath the open sky.',
        type: 'Outdoor',
        capacity: null as number | null,
      },
      {
        name: 'The Ceremony Pavilion',
        image: 'https://images.pexels.com/photos/35629338/pexels-photo-35629338.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
        alt: 'Outdoor wedding venue with stylish seating under a transparent canopy',
        description: 'A sheltered pavilion with transparent canopy, offering an intimate atmosphere for vows.',
        type: 'Outdoor',
        capacity: null as number | null,
      },
      {
        name: 'The Grand Banquet Hall',
        image: 'https://images.pexels.com/photos/17315417/pexels-photo-17315417.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
        alt: 'Indoor wedding venue with aisle, chairs and floral arrangements',
        description: 'An elegant indoor hall with soaring ceilings, designed for grand receptions and celebrations.',
        type: 'Indoor',
        capacity: null as number | null,
      },
      {
        name: 'The Poolside Terrace',
        image: 'https://images.pexels.com/photos/33485971/pexels-photo-33485971.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
        alt: 'Outdoor wedding venue with floral arrangements and poolside setup',
        description: 'A waterside terrace that glows at dusk, perfect for evening receptions and cocktails.',
        type: 'Outdoor',
        capacity: null as number | null,
      },
    ],
  },

  // --- EXPERIENCE STAGE ---
  experienceStage: {
    headline: 'The Details Make the Day.',
    subheading: 'Every element, considered.',
    rows: [
      { index: '01', title: 'The Ceremony', label: 'The Beginning' },
      { index: '02', title: 'The Gathering', label: 'Togetherness' },
      { index: '03', title: 'The Celebration', label: 'Joy' },
      { index: '04', title: 'The Memories', label: 'Forever' },
    ],
    images: [
      'https://images.pexels.com/photos/37828118/pexels-photo-37828118.jpeg?auto=compress&cs=tinysrgb&h=1200&w=960',
      'https://images.pexels.com/photos/17206060/pexels-photo-17206060.jpeg?auto=compress&cs=tinysrgb&h=1200&w=960',
      'https://images.pexels.com/photos/29040997/pexels-photo-29040997.jpeg?auto=compress&cs=tinysrgb&h=1200&w=960',
      'https://images.pexels.com/photos/29477281/pexels-photo-29477281.jpeg?auto=compress&cs=tinysrgb&h=1200&w=960',
    ],
    imageLabel: 'Your Day, Your Story',
  },

  // --- EXPERIENCES BAND ---
  experiences: {
    headline: 'A celebration, in every chapter.',
    columns: [
      {
        title: 'Pre-Wedding',
        body: 'A beautiful setting for the gatherings that lead up to the big day.',
        image: 'https://images.pexels.com/photos/20199360/pexels-photo-20199360.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
      },
      {
        title: 'The Wedding',
        body: 'A meaningful space for ceremonies, rituals, and moments shared with loved ones.',
        image: 'https://images.pexels.com/photos/35985256/pexels-photo-35985256.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
      },
      {
        title: 'The Reception',
        body: 'An elegant atmosphere for bringing everyone together.',
        image: 'https://images.pexels.com/photos/3038119/pexels-photo-3038119.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
      },
    ],
  },

  // --- ACCOMMODATION ---
  accommodation: {
    enabled: true,
    headline: 'Stay a little longer.',
    rooms: [
      {
        name: 'The Garden Suite',
        image: 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
        alt: 'Spacious modern bedroom with chandelier',
        description: 'A serene suite overlooking the gardens, with elegant furnishings and natural light.',
        capacity: null as number | null,
        amenities: null as string[] | null,
      },
      {
        name: 'The Heritage Room',
        image: 'https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
        alt: 'Elegant bedroom interior with plush bed and seating',
        description: 'A warm, refined room with classic detailing and views across the grounds.',
        capacity: null as number | null,
        amenities: null as string[] | null,
      },
      {
        name: 'The Lakeside Retreat',
        image: 'https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
        alt: 'Luxurious modern bedroom with a view',
        description: 'A spacious retreat with panoramic windows and a private terrace.',
        capacity: null as number | null,
        amenities: null as string[] | null,
      },
    ],
  },

  // --- PACKAGES ---
  packages: {
    label: 'Celebration Options',
    headline: 'A setting that suits your plans.',
    items: [
      {
        name: 'Intimate Celebration',
        description: 'For smaller gatherings and close-knit ceremonies.',
        price: null as string | null,
      },
      {
        name: 'Wedding Day',
        description: 'A complete single-day celebration with ceremony and reception.',
        price: null as string | null,
      },
      {
        name: 'Grand Celebration',
        description: 'A large-scale wedding with extended guest experiences.',
        price: null as string | null,
      },
      {
        name: 'Multi-Day Wedding',
        description: 'A full programme of events across several memorable days.',
        price: null as string | null,
      },
    ],
  },

  // --- GALLERY ---
  gallery: {
    images: [
      { src: 'https://images.pexels.com/photos/33485963/pexels-photo-33485963.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200', alt: 'Outdoor wedding in palace courtyard', span: 'lg' },
      { src: 'https://images.pexels.com/photos/29477281/pexels-photo-29477281.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', alt: 'Bridal bouquet with pastel flowers', span: 'tall' },
      { src: 'https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', alt: 'Indoor banquet with floral arrangements', span: 'sm' },
      { src: 'https://images.pexels.com/photos/32854448/pexels-photo-32854448.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', alt: 'Ceremony chairs facing a villa', span: 'sm' },
      { src: 'https://images.pexels.com/photos/3038119/pexels-photo-3038119.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200', alt: 'Outdoor dining with bistro lights', span: 'wide' },
      { src: 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', alt: 'Luxury hotel suite interior', span: 'sm' },
      { src: 'https://images.pexels.com/photos/7974839/pexels-photo-7974839.jpeg?auto=compress&cs=tinysrgb&h=600&w=800', alt: 'Resort pool at night', span: 'sm' },
      { src: 'https://images.pexels.com/photos/13938285/pexels-photo-13938285.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', alt: 'Floral arrangement with roses', span: 'tall' },
    ],
  },

  // --- FAQ ---
  faq: [
    {
      q: 'How do we enquire about our wedding date?',
      a: 'Use the enquiry form on this page or contact us directly. Our team will respond to discuss availability and your requirements.',
    },
    {
      q: 'Can we visit the resort before booking?',
      a: 'We welcome visits by appointment. Please reach out to arrange a viewing at a time that suits you.',
    },
    {
      q: 'What types of celebrations can be hosted?',
      a: 'Our spaces are designed for ceremonies, receptions, pre-wedding gatherings, and multi-day celebrations. Contact us to discuss your plans.',
    },
    {
      q: 'Are accommodation options available?',
      a: 'Accommodation details and room availability can be provided on enquiry. Please contact our team for current options.',
    },
    {
      q: 'How do we get pricing and package details?',
      a: 'Pricing is tailored to your celebration. We will share detailed package information and pricing once we understand your requirements.',
    },
    {
      q: 'Can we discuss our wedding requirements with the team?',
      a: 'Absolutely. We encourage a conversation about your vision. Reach out through the enquiry form or contact details above.',
    },
  ],

  // --- FINAL ENQUIRY ---
  finalEnquiry: {
    headline: 'Let Forever Start Here.',
    supporting: 'Tell us what you are imagining. We will help you explore the setting for your celebration.',
    image: 'https://images.pexels.com/photos/3673464/pexels-photo-3673464.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
    alt: 'Bride and groom embracing during their wedding',
  },
};

export type Config = typeof config;
