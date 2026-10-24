import { Product } from '../types';

export const CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    format: (amt: number) => `$${amt.toFixed(0)}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    format: (amt: number) => `€${Math.round(amt * 0.92)}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.79,
    format: (amt: number) => `£${Math.round(amt * 0.79)}`,
  },
  PKR: {
    code: 'PKR',
    symbol: '₨',
    rate: 280,
    format: (amt: number) => `Rs ${Math.round(amt * 280).toLocaleString()}`,
  },
} as const;

// 100% Commercial-Safe, Royalty-Free Unsplash Image Assets
export const CATEGORIES = [
  {
    id: 'handbags' as const,
    name: 'Handbags',
    description: 'Structured elegance and architectural silhouettes for day and evening.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    fallbackImage: '/images/cat_handbag_tile_1792684796807.jpg',
    count: 3,
  },
  {
    id: 'tote-bags' as const,
    name: 'Tote Bags',
    description: 'Generously proportioned luxury totes for daily routines and travel.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85',
    fallbackImage: '/images/cat_tote_tile_1792684797482.jpg',
    count: 2,
  },
  {
    id: 'wallets' as const,
    name: 'Wallets & Cardholders',
    description: 'Slim folded leather wallets, coin pouches, and precise card accessories.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=85',
    fallbackImage: '/images/cat_wallet_tile_1792684797932.jpg',
    count: 2,
  },
  {
    id: 'backpacks' as const,
    name: 'Backpacks',
    description: 'Minimalist city backpacks blending ergonomic comfort with refined leathercraft.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85',
    fallbackImage: '/images/cat_backpack_tile_1792684797894.jpg',
    count: 2,
  },
  {
    id: 'shoulder-bags' as const,
    name: 'Shoulder Bags',
    description: 'Effortless underarm and chain shoulder bags with fluid silhouettes.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=85',
    fallbackImage: '/images/cat_shoulder_tile_1792684798479.jpg',
    count: 2,
  },
  {
    id: 'crossbody-bags' as const,
    name: 'Crossbody Bags',
    description: 'Hands-free versatility with balanced proportions and adjustable straps.',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=85',
    fallbackImage: '/images/cat_crossbody_tile_1792684799138.jpg',
    count: 3,
  },
];

export const PRODUCTS: Product[] = [
  // 1. Solenne Structured Bag (Featured 1)
  {
    id: 'solenne-structured-bag',
    name: 'The Solenne Structured Bag',
    subtitle: 'Classic trapezoid top-handle with key clochette and brushed gold clasp.',
    price: 385,
    originalPrice: 420,
    category: 'handbags',
    categoryLabel: 'Handbag',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: '/images/prod_solenne_bag_1792684793139.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      '/images/prod_solenne_bag_1792684793139.jpg',
    ],
    badge: 'Bestseller',
    description:
      'The definitive statement of quiet luxury. Hand-assembled from full-grain Italian calfskin with an architectural trapezoid silhouette and polished protective brass feet.',
    longDescription:
      'The Solenne is the crown jewel of our permanent collection. Crafted by master artisans from supple vegetable-tanned grain calfskin, it features a structured top flap, discreet turn-lock closure, and an accordion gusset interior lined in soft microsuede. The detachable shoulder strap allows for effortless transitions from executive meetings to relaxed gallery afternoons.',
    materials: '100% Full-grain European calfskin leather, bonded microsuede interior lining.',
    dimensions: '28 cm (W) × 22 cm (H) × 12 cm (D) · Handle drop: 10 cm · Strap: 95–115 cm',
    hardware: 'Custom brushed pale gold hardware with hand-beveled edges.',
    colors: [
      { name: 'Muted Sage', hex: '#748B83', inStock: true },
      { name: 'Warm Taupe', hex: '#A89F91', inStock: true },
      { name: 'Charcoal Noir', hex: '#272B29', inStock: true },
    ],
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 14,
    isFeatured: true,
  },

  // 2. The Elara Everyday Wallet (Featured 2)
  {
    id: 'elara-everyday-wallet',
    name: 'The Elara Everyday Wallet',
    subtitle: 'Ultra-slim bi-fold leather wallet with 8 card slots and bill compartment.',
    price: 115,
    category: 'wallets',
    categoryLabel: 'Wallet',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: '/images/prod_elara_wallet_1792684793885.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85',
      '/images/prod_elara_wallet_1792684793885.jpg',
    ],
    badge: 'Atelier Edition',
    description:
      'Engineered for refined simplicity. A tactile bi-fold crafted from smooth semi-aniline calfskin with heat-creased card edges and discreet gold foil monogramming.',
    longDescription:
      'Designed to slide seamlessly into tailored pockets or compact clutch bags. The Elara features eight hand-turned card sleeves, two receipt slip pockets, and a full-length currency divider. Each edge is carefully hand-painted with four coats of matte edge paint for durability that ages gracefully.',
    materials: 'Smooth French box calfskin with tonal cotton-linen faille lining.',
    dimensions: '11.5 cm (W) × 9 cm (H) × 1.2 cm (D)',
    hardware: 'Discreet hot-stamped gold foil logo, no external metal hardware.',
    colors: [
      { name: 'Sage Green', hex: '#748B83', inStock: true },
      { name: 'Stone Grey', hex: '#C2C4BE', inStock: true },
      { name: 'Espresso', hex: '#3E342B', inStock: true },
    ],
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    stockCount: 22,
    isFeatured: true,
  },

  // 3. The Saffira Chain Shoulder Bag (Featured 3)
  {
    id: 'saffira-chain-shoulder-bag',
    name: 'The Saffira Chain Shoulder Bag',
    subtitle: 'Flap shoulder bag in textured pebble leather with articulated gold chain.',
    price: 320,
    category: 'shoulder-bags',
    categoryLabel: 'Shoulder Bag',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: '/images/prod_saffira_chain_1792684794710.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      '/images/prod_saffira_chain_1792684794710.jpg',
    ],
    badge: 'Bestseller',
    description:
      'A versatile icon crafted for effortless shoulder or crossbody wear. Features an envelope flap, sculpted geometric clasp, and multi-compartment interior.',
    longDescription:
      'The Saffira embodies modern feminine poise. Crafted in resilient pebble-grain leather that naturally resists scratches and daily wear, it balances structural definition with a gentle tactile touch. The sliding chain allows you to shorten the strap for dinner or double it over the shoulder for casual city days.',
    materials: 'Pebble-grain Italian cowhide with split leather reinforcement and cotton twill lining.',
    dimensions: '25 cm (W) × 17 cm (H) × 8.5 cm (D) · Chain drop: 28–52 cm',
    hardware: 'Articulated curb chain and custom engraved clasp in warm 14k gold finish.',
    colors: [
      { name: 'Desert Sage', hex: '#748B83', inStock: true },
      { name: 'Ivory Cream', hex: '#EBE7DF', inStock: true },
      { name: 'Midnight Onyx', hex: '#1C1E1D', inStock: true },
    ],
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 9,
    isFeatured: true,
  },

  // 4. The Nomad Utility Backpack (Featured 4)
  {
    id: 'nomad-utility-backpack',
    name: 'The Nomad Utility Backpack',
    subtitle: 'Modern architectural backpack with 14” laptop sleeve and quick-access side zip.',
    price: 345,
    originalPrice: 380,
    category: 'backpacks',
    categoryLabel: 'Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: '/images/prod_nomad_pack_1792684794962.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      '/images/prod_nomad_pack_1792684794962.jpg',
    ],
    badge: 'Limited Run',
    description:
      'Tailored ergonomics meet minimalist design. Built for commuter versatility with a padded tech cradle, weather-guarded top flap, and cushioned leather straps.',
    longDescription:
      'Crafted for the modern professional who refuses to sacrifice elegance for function. The Nomad offers a dedicated padded compartment for laptops up to 14 inches, a secure hidden passport pocket along the back panel, and an effortless push-buckle closure that operates with a single finger touch.',
    materials: 'Supple matte tumbled cowhide with water-resistant technical backing.',
    dimensions: '30 cm (W) × 39 cm (H) × 13 cm (D) · Fits 14” MacBook Pro',
    hardware: 'Matte titanium-coated zinc buckle and smooth Japanese YKK Excella zippers.',
    colors: [
      { name: 'Olive Sage', hex: '#63786F', inStock: true },
      { name: 'Graphite', hex: '#373A36', inStock: true },
      { name: 'Cognac', hex: '#7A4D30', inStock: false },
    ],
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    stockCount: 7,
    isFeatured: true,
  },

  // 5. The Astrid Pleated Clutch (New Arrival 1)
  {
    id: 'astrid-pleated-clutch',
    name: 'The Astrid Pleated Clutch',
    subtitle: 'Sculptural pouch clutch with organic leather pleats and concealed magnet frame.',
    price: 240,
    category: 'handbags',
    categoryLabel: 'Clutch',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: '/images/prod_astrid_clutch_1792684799410.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      '/images/prod_astrid_clutch_1792684799410.jpg',
    ],
    badge: 'New Arrival',
    description:
      'A sculptural cloud silhouette hand-gathered from glove-soft nappa leather. Features an invisible magnetic closure and a detachable wristlet strap.',
    longDescription:
      'Inspired by modernist drapery and soft architectural forms. The Astrid is hand-pleated in our atelier from ultra-soft Spanish nappa leather. Its voluminous interior expands comfortably to hold your smartphone, card case, compact, and keys without losing its refined shape.',
    materials: 'Buttery Spanish lamb nappa with silk-cotton blend lining.',
    dimensions: '29 cm (W) × 16 cm (H) × 11 cm (D)',
    hardware: 'Concealed magnetic bar frame; tonal sage enameled top clasp.',
    colors: [
      { name: 'Almond Sage', hex: '#7E9188', inStock: true },
      { name: 'Porcelain White', hex: '#F3F2EE', inStock: true },
      { name: 'Burnt Ochre', hex: '#9E6847', inStock: true },
    ],
    rating: 5.0,
    reviewCount: 11,
    inStock: true,
    stockCount: 12,
    isNewArrival: true,
  },

  // 6. The Maren Slouchy Hobo (New Arrival 2)
  {
    id: 'maren-slouchy-hobo',
    name: 'The Maren Slouchy Hobo',
    subtitle: 'Relaxed crescent shoulder bag with wide ergonomic strap and magnetic crest.',
    price: 360,
    category: 'shoulder-bags',
    categoryLabel: 'Shoulder Bag',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: '/images/prod_maren_hobo_1792684800228.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85',
      '/images/prod_maren_hobo_1792684800228.jpg',
    ],
    badge: 'New Arrival',
    description:
      'The epitome of relaxed nonchalance. Drapes naturally against the hip with a generous interior and an adjustable wide leather shoulder pad.',
    longDescription:
      'The Maren celebrates the beauty of natural unforced draping. Cut from unlined tumbled pebble leather, it molds softly to your body as you move through your day. Includes an internal zippered leather pouch connected by a strap for valuables.',
    materials: 'Unlined tumbled pebble calfskin with raw suede interior backing.',
    dimensions: '36 cm (W) × 28 cm (H) × 14 cm (D) · Strap drop: 32 cm',
    hardware: 'Solid brass buckle pin and engraved interior snap.',
    colors: [
      { name: 'Muted Forest Sage', hex: '#5E746C', inStock: true },
      { name: 'Warm Biscuit', hex: '#CDBCA8', inStock: true },
      { name: 'Pitch Black', hex: '#1F2221', inStock: true },
    ],
    rating: 4.8,
    reviewCount: 16,
    inStock: true,
    stockCount: 15,
    isNewArrival: true,
  },

  // 7. The Lyra Saddle Crossbody (New Arrival 3)
  {
    id: 'lyra-saddle-crossbody',
    name: 'The Lyra Saddle Crossbody',
    subtitle: 'Curved equestrian saddle bag with vintage brass stirrup buckle.',
    price: 290,
    category: 'crossbody-bags',
    categoryLabel: 'Crossbody',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: '/images/prod_lyra_saddle_1792684800365.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      '/images/prod_lyra_saddle_1792684800365.jpg',
    ],
    badge: 'New Arrival',
    description:
      'Equestrian heritage reimagined through a modern minimalist lens. Features a gentle half-moon profile, rear slip pocket, and adjustable crossbody strap.',
    longDescription:
      'With smooth curves and deliberate proportion, The Lyra is a reliable daily companion. The front flap secures with a magnetic lock cleverly hidden behind a decorative brass buckle, allowing instant access while preserving the timeless stirrup aesthetic.',
    materials: 'Smooth box calf leather with reinforced edge coat and twill interior.',
    dimensions: '22 cm (W) × 18 cm (H) × 7.5 cm (D) · Strap drop: 48–58 cm',
    hardware: 'Antiqued solid brass stirrup buckle and strap anchors.',
    colors: [
      { name: 'Botanical Sage', hex: '#688077', inStock: true },
      { name: 'Saddle Tan', hex: '#8E5A36', inStock: true },
      { name: 'Bordeaux', hex: '#58242A', inStock: true },
    ],
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    stockCount: 11,
    isNewArrival: true,
  },

  // 8. The Cecile Canvas & Leather Tote (New Arrival 4 - Trademark Cleared)
  {
    id: 'cecile-canvas-leather-tote',
    name: 'The Cecile Canvas & Leather Tote',
    subtitle: 'Structured utility tote in heavy organic ecru canvas with rich sage leather trim.',
    price: 330,
    category: 'tote-bags',
    categoryLabel: 'Tote Bag',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: '/images/prod_celine_tote_1792684801589.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85',
      '/images/prod_celine_tote_1792684801589.jpg',
    ],
    badge: 'New Arrival',
    description:
      'Architectural duality: structured heavyweight ecru canvas reinforced by vegetable-tanned sage leather strapping, brass lock detail, and protective bottom leather base.',
    longDescription:
      'The ultimate carry-all for work, weekends, and seasonal getaways. The Cecile marries the organic warmth of heavy 24oz organic cotton canvas with the durability of rich saddle-stitched leather. Features an interior zip pocket, two open organizers, and an integrated key leash.',
    materials: '24oz Heavy organic cotton canvas, vegetable-tanned calfskin trim, solid brass feet.',
    dimensions: '35 cm (W) × 29 cm (H) × 15 cm (D) · Handle drop: 18 cm',
    hardware: 'Polished solid brass padlock accent and double-pin buckles.',
    colors: [
      { name: 'Ecru & Sage', hex: '#748B83', inStock: true },
      { name: 'Ecru & Tan', hex: '#9E6847', inStock: true },
      { name: 'Ecru & Black', hex: '#272B29', inStock: true },
    ],
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    stockCount: 18,
    isNewArrival: true,
  },
];
