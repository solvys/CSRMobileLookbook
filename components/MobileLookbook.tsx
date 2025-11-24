import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

// ------------------------------------------------------------------
// 1. TYPES & INTERFACES
// ------------------------------------------------------------------

export interface Category {
  id: string;
  title: string;
  image: string;
  description?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  shortDescription: string;
  longDescription?: string;
  collection?: string;
  features: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  priceRange?: string;
  relatedProductIds?: string[];
}

export interface MobileLookbookProps {
  categories?: Category[];
  products?: Product[];
  landingTitle?: string;
  landingSubtitle?: string;
  onPrimaryCtaClick?: (product: Product, index: number) => void;
  onSecondaryCtaClick?: (product: Product, index: number) => void;
  onCardChange?: (product: Product, index: number) => void;
}

// ------------------------------------------------------------------
// 2. CONSTANTS & DATA
// ------------------------------------------------------------------

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

// ------------------------------------------------------------------
// 3. HELPER COMPONENTS
// ------------------------------------------------------------------

const ANIMATION_DURATION = 0.4;
type ViewState = 'CATEGORY_SELECT' | 'PRODUCT_SWIPE';

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 4.5V4.5z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DoubleTapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 4.5a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V6.31l-4.72 4.72a.75.75 0 11-1.06-1.06l4.72-4.72H10.5a.75.75 0 01-.75-.75z" />
    <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
    <path fillRule="evenodd" d="M1.5 9.75a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0zm8.25-6.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5z" clipRule="evenodd" />
  </svg>
);

// --- Image Component with Luxury Lazy Loading ---
const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#FCEAAC]/20 ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover ${!isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

// --- Details Modal Component ---
const DetailsModal = ({ 
  product, 
  onClose, 
  onBook 
}: { 
  product: Product; 
  onClose: () => void; 
  onBook: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-end justify-center bg-[#4A0404]/60 backdrop-blur-sm p-0 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-[#FCEAAC] w-full md:max-w-2xl md:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col max-h-[85dvh] md:max-h-[90dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#4A0404]/10 flex justify-between items-start bg-[#FCEAAC]">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#4A0404]/60 uppercase mb-1 font-sans">{product.collection}</p>
            <h2 className="text-2xl md:text-3xl font-playfair italic font-semibold text-[#4A0404]">{product.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-[#FCEAAC] rounded-full shadow-sm border border-[#4A0404]/20 hover:bg-[#F3E5A0]">
            <CloseIcon className="w-5 h-5 text-[#4A0404]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <p className="text-xl md:text-2xl font-cormorant italic font-semibold text-[#4A0404] leading-relaxed mb-6">
            {product.longDescription || product.shortDescription}
          </p>
          
          <h3 className="text-sm font-bold font-sans uppercase tracking-wider text-[#4A0404] mb-3">Key Features</h3>
          <ul className="space-y-2 mb-8">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-[#4A0404]/90 font-sans text-sm md:text-base">
                <span className="w-1.5 h-1.5 bg-[#4A0404] rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-[#4A0404]/10 bg-[#FCEAAC] pb-10">
           <button 
             onClick={onBook}
             className="w-full bg-[#4A0404] text-[#FCEAAC] font-bold py-4 rounded-full shadow-lg uppercase tracking-widest text-sm hover:bg-[#360303] transition-colors font-sans"
           >
             Book Consultation
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ------------------------------------------------------------------
// 4. MAIN COMPONENT
// ------------------------------------------------------------------

export const MobileLookbook: React.FC<MobileLookbookProps> = ({
  categories = DEFAULT_CATEGORIES,
  products = DEFAULT_PRODUCTS,
  landingTitle = "Design Your View",
  landingSubtitle = "Select a style to get started.",
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  onCardChange,
}) => {
  // State
  const [viewState, setViewState] = useState<ViewState>('CATEGORY_SELECT');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [lastTap, setLastTap] = useState<number>(0);

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    return selectedCategoryId 
      ? products.filter(p => p.categoryId === selectedCategoryId)
      : [];
  }, [selectedCategoryId, products]);

  // Actions
  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setActiveIndex(0);
    setViewState('PRODUCT_SWIPE');
    setShowTutorial(true);
  };

  const handleBackToCategories = () => {
    setViewState('CATEGORY_SELECT');
    setSelectedCategoryId(null);
  };

  const changeIndex = (newIndex: number) => {
    if (!filteredProducts.length) return;
    let target = newIndex;
    if (target < 0) target = filteredProducts.length - 1;
    if (target >= filteredProducts.length) target = 0;
    
    setActiveIndex(target);
    onCardChange?.(filteredProducts[target], target);
  };

  // Swipe Logic
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      changeIndex(activeIndex + 1);
    } else if (info.offset.x > threshold) {
      changeIndex(activeIndex - 1);
    }
  };

  // Double Tap Logic
  const handleCardTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      if (filteredProducts[activeIndex]) {
        onPrimaryCtaClick?.(filteredProducts[activeIndex], activeIndex);
      }
    }
    setLastTap(now);
  };

  const currentProduct = filteredProducts[activeIndex];
  const nextProduct = filteredProducts[(activeIndex + 1) % filteredProducts.length];

  return (
    <div className="relative w-full h-[100dvh] bg-[#FCEAAC] overflow-hidden shadow-2xl flex flex-col">
      
      {/* --- CATEGORY SELECTION VIEW --- */}
      <AnimatePresence mode="wait">
        {viewState === 'CATEGORY_SELECT' && (
          <motion.div 
            key="categories"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: ANIMATION_DURATION }}
            className="flex-1 flex flex-col p-6 md:p-12 bg-[#FCEAAC] overflow-y-auto"
          >
            <header className="mt-8 mb-8 md:mb-16 text-center">
              <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#4A0404]/60 uppercase mb-2 font-sans">WELCOME TO OUR MOBILE LOOK BOOK!</p>
              <h1 className="text-4xl md:text-6xl font-playfair italic font-semibold text-[#4A0404]">{landingTitle}</h1>
              <p className="text-[#4A0404]/80 mt-3 font-cormorant italic font-semibold text-2xl md:text-3xl">{landingSubtitle}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className="group relative h-40 md:h-96 w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow text-left"
                  whileTap={{ scale: 0.98 }}
                >
                  <LazyImage src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A0404]/80 via-[#4A0404]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-8">
                    <h2 className="text-[#FCEAAC] text-3xl md:text-4xl font-playfair italic font-semibold">{cat.title}</h2>
                    {cat.description && <p className="text-[#FCEAAC]/90 text-xl md:text-2xl mt-1 font-cormorant italic font-semibold">{cat.description}</p>}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* --- FOOTER LOGO LINK --- */}
            <footer className="mt-12 pb-8 flex justify-center w-full">
                <a href="https://www.californiashutters.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                    <img 
                        src="https://framerusercontent.com/images/ZPV33DOx8vGwYSUrjTMF6nwKaxg.png?scale-down-to=512&width=1536&height=1024" 
                        alt="California Shutters" 
                        className="h-64 w-auto object-contain" 
                    />
                </a>
            </footer>

          </motion.div>
        )}

        {/* --- PRODUCT SWIPE VIEW --- */}
        {viewState === 'PRODUCT_SWIPE' && currentProduct && (
          <motion.div
            key="products"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: ANIMATION_DURATION }}
            className="flex-1 flex flex-col relative bg-[#FCEAAC] h-full"
          >
             {/* Header Navigation */}
             <div className="absolute top-0 left-0 w-full z-20 p-4 md:p-8 flex items-center justify-between bg-gradient-to-b from-[#4A0404]/40 to-transparent pointer-events-none">
                <div className="pointer-events-auto">
                    <button 
                    onClick={handleBackToCategories}
                    className="text-[#FCEAAC] flex items-center gap-1 text-sm md:text-base font-medium backdrop-blur-md bg-[#4A0404]/20 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full hover:bg-[#4A0404]/40 transition-colors font-sans"
                    >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    Back
                    </button>
                </div>
                
                {/* Pagination Dots */}
                <div className="flex gap-1 md:gap-2">
                  {filteredProducts.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 md:w-6 bg-[#FCEAAC]' : 'w-1 md:w-2 bg-[#FCEAAC]/50'}`} 
                    />
                  ))}
                </div>
             </div>

             {/* Top Banner Text Box */}
             <div className="absolute top-16 md:top-24 left-0 w-full z-20 px-6 pointer-events-none flex justify-center">
                <div className="bg-[#FCEAAC]/10 backdrop-blur-md border border-[#FCEAAC]/10 rounded-xl p-3 md:p-4 text-center shadow-lg pointer-events-auto max-w-lg">
                  <p className="text-[#FCEAAC] text-xs md:text-sm font-sans font-bold tracking-wide leading-relaxed mb-1">
                    We bring the showroom to you.<br/>Pick the products you like & we'll see you soon!
                  </p>
                  <a href="tel:3058279333" className="text-[#FCEAAC] text-xs md:text-sm font-sans font-bold tracking-wide border-b border-[#FCEAAC]/50 hover:border-[#FCEAAC] transition-colors pb-0.5">
                    Questions? Call (305) 827-9333
                  </a>
                </div>
             </div>

            {/* Draggable Card Area */}
            <div className="flex-1 relative overflow-hidden">
              <motion.div
                key={currentProduct.id}
                className="h-full w-full relative cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                onTap={handleCardTap}
              >
                {/* Product Image */}
                <div className="h-full w-full relative">
                    <LazyImage src={currentProduct.imageUrl} alt={currentProduct.name} className="h-full w-full object-cover" />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#4A0404]/90 via-[#4A0404]/40 to-transparent pointer-events-none" />
                </div>

                {/* Content Overlay (Tinder Style) */}
                <div className="absolute bottom-0 left-0 w-full p-6 pb-24 md:p-12 md:pb-32 pointer-events-none">
                   <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-[#FCEAAC] max-w-[90%] md:max-w-4xl"
                   >
                      <div className="flex items-center justify-between mb-2">
                        {currentProduct.collection && (
                           <span className="text-xs md:text-sm text-[#FCEAAC]/80 font-sans uppercase tracking-widest mb-1 block">
                              {currentProduct.collection}
                           </span>
                        )}
                      </div>
                      <h2 className="text-5xl md:text-7xl font-playfair italic font-semibold leading-tight mb-2 shadow-[#4A0404] drop-shadow-lg">
                        {currentProduct.name}
                      </h2>
                      <p className="text-[#FCEAAC]/90 text-2xl md:text-4xl font-cormorant italic font-semibold leading-tight max-w-[90%] mb-4">
                        {currentProduct.shortDescription}
                      </p>
                      
                      {/* Features Pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentProduct.features.slice(0,3).map((feat, i) => (
                          <span key={i} className="text-xs md:text-sm bg-[#4A0404]/40 backdrop-blur-md text-[#FCEAAC] px-2.5 py-1 rounded-md border border-[#FCEAAC]/10 font-sans tracking-wide">
                            {feat}
                          </span>
                        ))}
                      </div>
                   </motion.div>
                </div>

                {/* Hidden Next Image Preloader */}
                {nextProduct && (
                  <img src={nextProduct.imageUrl} alt="preload" className="hidden" />
                )}
              </motion.div>
              
              {/* DESKTOP/TABLET NAVIGATION ARROWS */}
              {/* Previous Button - Hidden on mobile, visible on medium+ screens */}
              <button 
                onClick={(e) => { e.stopPropagation(); changeIndex(activeIndex - 1); }}
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-[#4A0404]/20 backdrop-blur-md border border-[#FCEAAC]/20 text-[#FCEAAC] items-center justify-center hover:bg-[#4A0404]/40 transition-all shadow-lg active:scale-95"
                aria-label="Previous Product"
              >
                 <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Next Button - Hidden on mobile, visible on medium+ screens */}
              <button 
                onClick={(e) => { e.stopPropagation(); changeIndex(activeIndex + 1); }}
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-[#4A0404]/20 backdrop-blur-md border border-[#FCEAAC]/20 text-[#FCEAAC] items-center justify-center hover:bg-[#4A0404]/40 transition-all shadow-lg active:scale-95"
                aria-label="Next Product"
              >
                 <ChevronRight className="w-8 h-8" />
              </button>

            </div>
            
            {/* Bottom Actions */}
            <div className="absolute bottom-0 w-full p-6 md:p-10 bg-gradient-to-t from-[#4A0404] to-transparent z-30 pt-12 flex justify-center md:justify-start">
                 <div className="flex gap-3 w-full md:w-auto md:min-w-[400px]">
                    <button 
                      onClick={() => onPrimaryCtaClick?.(currentProduct, activeIndex)}
                      className="flex-1 bg-[#FCEAAC] text-[#4A0404] font-bold py-3.5 px-6 rounded-full shadow-lg active:scale-[0.98] transition-transform text-sm md:text-base font-sans tracking-wide uppercase"
                    >
                      {currentProduct.primaryCtaLabel}
                    </button>
                    {currentProduct.secondaryCtaLabel && (
                      <button
                        onClick={() => {
                          onSecondaryCtaClick?.(currentProduct, activeIndex);
                          setShowDetails(true);
                        }}
                         className="bg-[#FCEAAC]/20 backdrop-blur-md border border-[#FCEAAC]/30 text-[#FCEAAC] font-bold py-3.5 px-6 rounded-full active:bg-[#FCEAAC]/30 transition-colors text-sm md:text-base font-sans tracking-wide uppercase"
                      >
                        {currentProduct.secondaryCtaLabel}
                      </button>
                    )}
                 </div>
            </div>

            {/* Phone Link Button */}
            <motion.a
              href="tel:3058279333"
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-52 right-6 md:bottom-32 md:right-12 z-30 w-12 h-12 md:w-16 md:h-16 bg-[#FCEAAC]/10 backdrop-blur-md border border-[#FCEAAC]/30 text-[#FCEAAC] rounded-full shadow-2xl flex items-center justify-center hover:bg-[#FCEAAC]/20 transition-colors"
              aria-label="Call Us"
            >
              <PhoneIcon className="w-5 h-5 md:w-7 md:h-7" />
            </motion.a>

            {/* Globe Link Button */}
            <motion.a
              href="https://www.californiashutters.com/shop/all-collections/flagship-collections/all-products/"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-36 right-6 md:bottom-12 md:right-12 z-30 w-12 h-12 md:w-16 md:h-16 bg-[#FCEAAC]/10 backdrop-blur-md border border-[#FCEAAC]/30 text-[#FCEAAC] rounded-full shadow-2xl flex items-center justify-center hover:bg-[#FCEAAC]/20 transition-colors"
              aria-label="Visit Shop"
            >
              <GlobeIcon className="w-6 h-6 md:w-8 md:h-8" />
            </motion.a>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TUTORIAL OVERLAY --- */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTutorial(false)}
            className="absolute inset-0 z-50 bg-[#4A0404]/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 cursor-pointer"
          >
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="text-[#FCEAAC] max-w-md"
             >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FCEAAC]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                   <DoubleTapIcon className="w-8 h-8 md:w-10 md:h-10 text-[#FCEAAC]" />
                </div>
                <h3 className="text-4xl md:text-5xl font-playfair italic font-semibold mb-3">How to browse</h3>
                <p className="text-[#FCEAAC]/80 mb-6 leading-relaxed font-cormorant italic font-semibold text-2xl md:text-3xl">
                  <strong className="text-[#FCEAAC] block mb-1 font-sans not-italic text-sm uppercase tracking-wider font-bold">Double Tap</strong> 
                  to see how this product looks in your home.
                </p>
                <p className="text-[#FCEAAC]/80 mb-8 leading-relaxed font-cormorant italic font-semibold text-2xl md:text-3xl">
                  <strong className="text-[#FCEAAC] block mb-1 font-sans not-italic text-sm uppercase tracking-wider font-bold">Swipe Left & Right</strong> 
                  to cycle through the collection.
                </p>
                <button className="bg-[#FCEAAC] text-[#4A0404] px-8 py-2.5 rounded-full font-bold text-sm md:text-base font-sans uppercase tracking-wide">Got it</button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAILS POPUP --- */}
      <AnimatePresence>
        {showDetails && currentProduct && (
          <DetailsModal 
            product={currentProduct}
            onClose={() => setShowDetails(false)}
            onBook={() => {
              onPrimaryCtaClick?.(currentProduct, activeIndex);
              setShowDetails(false);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
};