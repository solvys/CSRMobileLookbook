import { Product, Category } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat_shutters',
    title: 'Shutters',
    image: 'https://framerusercontent.com/images/vhbI2C5yg7zTMpdZHfZqRw6Zjw.png?width=1024&height=939',
    description: 'Timeless elegance & custom shapes.'
  },
  {
    id: 'cat_blinds',
    title: 'Blinds',
    image: 'https://framerusercontent.com/images/xVfvMdxxYNyRniu7ourkZhh2A.png?width=1024&height=943',
    description: 'Faux wood & vertical solutions.'
  },
  {
    id: 'cat_shades',
    title: 'Shades',
    image: 'https://framerusercontent.com/images/BE5Qk2QMqtw9gRXaDjFMkAZnLA.png?width=1024&height=945',
    description: 'Cellular, roller, and woven styles.'
  }
];

export const DEFAULT_PRODUCTS: Product[] = [
  // --- SHUTTERS ---
  {
    id: 'synthetic-poly',
    categoryId: 'cat_shutters',
    name: 'Synthetic Poly Shutters',
    collection: 'Caribbean Collection',
    imageUrl: 'https://framerusercontent.com/images/N0ew03Y7rvyw5FFYNpyEY0T79I.png?width=1024&height=976',
    shortDescription: 'Timeless luxury meets moisture-resistant durability for high-humidity spaces',
    longDescription: 'Our best-selling window treatment. These shutters add timeless luxury to any interior space while not sacrificing durability. Crafted using Synthetic Poly, these shutters combine the timeless beauty of natural wood with advanced moisture-resistant engineering, making them perfect for high humidity/moisture environments.',
    features: ['Moisture-Resistant', 'Durable Poly', 'Timeless Look'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['woodland-white', 'woodland-mahogany', 'specialty-shapes']
  },
  {
    id: 'woodland-white',
    categoryId: 'cat_shutters',
    name: 'White Painted Basswood',
    collection: 'Woodland Collection',
    imageUrl: 'https://framerusercontent.com/images/vhbI2C5yg7zTMpdZHfZqRw6Zjw.png?width=1024&height=939',
    shortDescription: 'Rich, organic warmth that brings traditional sophistication to any room',
    longDescription: 'White Painted Basswood Shutters represent the pinnacle of traditional window treatment artistry. Hand-selected premium basswood is expertly crafted and finished in crisp white paint, bringing an element of contemporary elegance to any home.',
    features: ['Premium Basswood', 'Crisp White', 'Light-Enhancing'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['woodland-mahogany', 'synthetic-poly', 'specialty-shapes']
  },
  {
    id: 'woodland-mahogany',
    categoryId: 'cat_shutters',
    name: 'Stained Basswood',
    collection: 'Woodland Collection',
    imageUrl: 'https://framerusercontent.com/images/7gsrqZNdWp4gvAVkioWuSOP02Q.png?width=1024&height=940',
    shortDescription: 'Crisp elegance and natural warmth for contemporary coastal interiors',
    longDescription: 'Woodland Basswood Shutters represent the pinnacle of traditional window treatment artistry. Hand-selected premium basswood is expertly crafted and finished in the shading or stain of your choice.',
    features: ['Natural Warmth', 'Custom Stain', 'Organic Depth'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['woodland-white', 'synthetic-poly', 'specialty-shapes']
  },
  {
    id: 'specialty-shapes',
    categoryId: 'cat_shutters',
    name: 'Specialty / Custom Shapes',
    collection: 'Woodland / Caribbean',
    imageUrl: 'https://framerusercontent.com/images/riVgSD2pRW9cyHabejC2lChOWQU.png?width=885&height=996',
    shortDescription: 'Precision-crafted elegance for arches, angles, and architectural masterpieces',
    longDescription: 'Vera Luxe Custom Shutters are individually crafted any shape of any window, anywhere in the world. Our boutique has been designing, producing, and installing these treatments for more than 30 years.',
    features: ['Bespoke Fit', 'Any Shape', 'Refined Craft'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['woodland-white', 'synthetic-poly', 'woodland-mahogany']
  },

  // --- BLINDS ---
  {
    id: 'faux-wood-blinds',
    categoryId: 'cat_blinds',
    name: 'Faux Wood Blinds',
    collection: 'Vera Luxe Collection',
    imageUrl: 'https://framerusercontent.com/images/xVfvMdxxYNyRniu7ourkZhh2A.png?width=1024&height=943',
    shortDescription: 'Poly durability meets genuine wood accents for the best of both worlds',
    longDescription: 'Vera Luxe Hybrid Shutters deliver the best of both worlds. Their durable poly base resists wear and moisture, while genuine wood accents provide warmth and prestige.',
    features: ['Hybrid Material', 'Wood Accents', 'Wear Resistant'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['synthetic-poly', 'cellular-shades', 'vertical-blinds']
  },
  {
    id: 'vertical-blinds',
    categoryId: 'cat_blinds',
    name: 'Vertical Blinds',
    collection: 'Vera Luxe Collection',
    imageUrl: 'https://framerusercontent.com/images/Rrq6J42dwNzTJYZoXnDI1Mh3OA.png?width=1024&height=943',
    shortDescription: 'Modern drama and refined light control for expansive glass walls',
    longDescription: 'Vera Luxe Sliding Panel Shades redefine modern luxury for open spaces. Their expansive panels move fluidly on a discreet track, transforming light control into a statement of design.',
    features: ['Expansive Coverage', 'Fluid Motion', 'Light Control'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['faux-wood-blinds', 'roller-shades', 'natural-woven-shades']
  },

  // --- SHADES ---
  {
    id: 'sliding-panel-shades',
    categoryId: 'cat_shades',
    name: 'Sliding Panel Shades',
    collection: 'Vera Luxe Collection',
    imageUrl: 'https://framerusercontent.com/images/msunIDlH8xTvEmZxiX5sRy67vHk.png?width=1024&height=940',
    shortDescription: 'Sleek sophistication for patio doors and large glass expanses',
    longDescription: 'A seamless statement of elegance. These sliding panel shades drift effortlessly across expansive windows, diffusing warm light with refined precision.',
    features: ['Sleek Design', 'Patio Ready', 'Soft Diffusion'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['pleated-shades', 'cellular-shades', 'roller-shades']
  },
  {
    id: 'cellular-shades',
    categoryId: 'cat_shades',
    name: 'Cellular Shades',
    collection: 'Vera Luxe Collection',
    imageUrl: 'https://framerusercontent.com/images/kqBkNzsDNPaAczdafL0BYLAI.png?width=1024&height=942',
    shortDescription: 'Energy-efficient comfort wrapped in timeless, insulating elegance',
    longDescription: 'Vera Luxe Cellular Shades combine advanced design with timeless beauty. The honeycomb construction traps air to insulate interiors, reducing energy costs.',
    features: ['Energy Efficient', 'Insulating', 'Honeycomb'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['roller-shades', 'natural-woven-shades', 'vertical-blinds']
  },
  {
    id: 'pleated-shades',
    categoryId: 'cat_shades',
    name: 'Pleated Shades',
    collection: 'Vera Luxe Collection',
    imageUrl: 'https://framerusercontent.com/images/lMa2zlgp6JZikfS53S9JhkhefY.png?width=1024&height=940',
    shortDescription: 'Tailored charm and soft diffusion in a curated designer palette',
    longDescription: 'Vera Luxe Pleated Shades bring quiet elegance to any setting. Their finely tailored folds provide visual interest and refined charm.',
    features: ['Tailored Folds', 'Designer Palette', 'Refined Charm'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['vertical-blinds', 'cellular-shades', 'roller-shades']
  },
  {
    id: 'layered-zebra-shades',
    categoryId: 'cat_shades',
    name: 'Layered (Zebra) Shades',
    collection: 'Vera Luxe Collection',
    imageUrl: 'https://framerusercontent.com/images/0gOtsP1GpybXcnx9hIZC58zB6U.png?width=1024&height=944',
    shortDescription: 'Innovative light control with striking visual impact for modern spaces',
    longDescription: 'Vera Luxe Layered Shades pair innovation with luxury design. Alternating sheer and opaque fabrics glide into alignment, offering a striking visual effect.',
    features: ['Sheer & Opaque', 'Striking Visual', 'Modern'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['roller-shades', 'sliding-panel-shades']
  },
  {
    id: 'natural-woven-shades',
    categoryId: 'cat_shades',
    name: 'Natural Woven Shades',
    collection: 'Vera Luxe Collection',
    imageUrl: 'https://framerusercontent.com/images/BE5Qk2QMqtw9gRXaDjFMkAZnLA.png?width=1024&height=945',
    shortDescription: 'Sustainable craftsmanship that brings earthy warmth and organic texture',
    longDescription: 'Vera Luxe Natural Woven Shades celebrate premier craftsmanship. Made from sustainable bamboo and natural reeds, these shades introduce texture, warmth, and an earthy sophistication.',
    features: ['Sustainable', 'Bamboo/Reed', 'Organic Texture'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['woodland-mahogany']
  },
  {
    id: 'roller-shades',
    categoryId: 'cat_shades',
    name: 'Roller Shades',
    collection: 'Vera Luxe Collection',
    imageUrl: 'https://framerusercontent.com/images/JcMtvpGIhZMw2QD8GEUndCKqbDw.png?width=1024&height=940',
    shortDescription: 'Understated luxury with seamless privacy from sheer to blackout',
    longDescription: 'Vera Luxe Roller Shades embody understated luxury. Offered in designer fabrics ranging from sheer to blackout, they glide seamlessly to deliver privacy and ambiance on demand.',
    features: ['Seamless Glide', 'Sheer to Blackout', 'Understated'],
    primaryCtaLabel: 'Book Consultation',
    secondaryCtaLabel: 'Details',
    relatedProductIds: ['pleated-shades', 'cellular-shades', 'layered-zebra-shades']
  }
];

/**
 * ZENDESK CONFIGURATION (Sunshine Conversations)
 * 
 * Store these securely. Do not expose the SECRET_KEY in client-side code
 * without a proxy or secure backend handling in production.
 */
export const ZENDESK_CONFIG = {
  APP_ID: '691b51d9ba7d38536db02a09',
  KEY_ID: 'app_6920c2dfb0a188364360955c',
  SECRET_KEY: 'd3yvqSHKr3pQxjkGr9Adqbbxm_Opo88hUqlZRuXwySisNUZMr17wo_m39bv1gzfPZzX1tZ6nbVKHlBMxJ3l8HQ'
};