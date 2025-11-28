import React, { useState, useMemo, useEffect } from 'react';
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
  },
  {
    id: 'cat_factory',
    title: 'Factory',
    image: 'https://framerusercontent.com/images/N0ew03Y7rvyw5FFYNpyEY0T79I.png?width=1024&height=976', 
    description: 'View our production factory.'
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

// --- Redirect Popup Modal ---
const RedirectModal = ({ 
  isOpen, 
  onClose, 
  onConfirm 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
}) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#FCEAAC] w-full max-w-md rounded-2xl p-8 shadow-2xl border border-[#4A0404]/10 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[#4A0404]/50 hover:text-[#4A0404]">
            <CloseIcon className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-playfair font-bold text-[#4A0404] mb-4">Leaving App</h3>
        <p className="font-cormorant text-xl text-[#4A0404]/80 mb-8 leading-relaxed">
          You are now being redirected to YouTube. Feel free to come back here to shop products or contact us with any questions at (305) 827-9333. Happy Holidays!
        </p>
        <div className="flex gap-4 justify-center">
            <button 
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-[#4A0404]/20 text-[#4A0404] font-bold uppercase text-xs tracking-wider hover:bg-[#4A0404]/5 transition-colors font-sans"
            >
                Cancel
            </button>
            <button 
                onClick={onConfirm}
                className="px-6 py-3 rounded-full bg-[#4A0404] text-[#FCEAAC] font-bold uppercase text-xs tracking-wider shadow-lg hover:bg-[#360303] transition-colors font-sans"
            >
                Watch Video
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
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [lastTap, setLastTap] = useState<number>(0);

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    return selectedCategoryId 
      ? products.filter(p => p.categoryId === selectedCategoryId)
      : [];
  }, [selectedCategoryId, products]);

  // Actions
  const handleSelectCategory = (catId: string) => {
    // Intercept Factory click for redirect modal
    if (catId === 'cat_factory') {
        setShowRedirectModal(true);
        return;
    }

    setSelectedCategoryId(catId);
    setActiveIndex(0);
    setViewState('PRODUCT_SWIPE');
    setShowTutorial(true);
  };

  const handleBackToCategories = () => {
    setViewState('CATEGORY_SELECT');
    setSelectedCategoryId(null);
  };

  const handleRedirectConfirm = () => {
    window.open('https://youtube.com/shorts/ZoGGhnZKKnM?si=hlZM5vThXO1wmEWt', '_blank');
    setShowRedirectModal(false);
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

  // Auto-hide tutorial after 3s
  useEffect(() => {
    if (showTutorial) {
      const timer = setTimeout(() => setShowTutorial(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showTutorial]);

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
                  className={`group relative h-40 md:h-96 w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow text-left ${cat.id === 'cat_factory' ? 'lg:hidden' : ''}`}
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
      </AnimatePresence>

      {/* --- PRODUCT SWIPE VIEW --- */}
      <AnimatePresence mode="wait">
        {viewState === 'PRODUCT_SWIPE' && currentProduct && (
          <motion.div
            key="products-view"
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
                      className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 md:w-6 bg-[#FCEAAC]' : 'w-1.5 md:w-2 bg-[#FCEAAC]/40'}`} 
                    />
                  ))}
                </div>
             </div>

             {/* Main Card */}
             <div className="flex-1 relative w-full h-full">
                <AnimatePresence initial={false} custom={activeIndex} mode="popLayout">
                    <motion.div
                        key={currentProduct.id}
                        custom={activeIndex}
                        variants={{
                            enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 1 }),
                            center: { x: 0, opacity: 1 },
                            exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 1 })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ x: { type: "spring", stiffness: 300, damping: 30 } }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={onDragEnd}
                        onClick={handleCardTap}
                        className="absolute inset-0 w-full h-full bg-[#000]"
                    >
                        <LazyImage 
                          src={currentProduct.imageUrl} 
                          alt={currentProduct.name} 
                          className="absolute inset-0 w-full h-full object-cover" 
                        />

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4A0404]/95 via-[#4A0404]/10 to-transparent pointer-events-none" />
                        
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-10 md:pb-16 text-[#FCEAAC] z-20 pointer-events-none">
                            <div className="pointer-events-auto">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-80 font-sans">{currentProduct.collection}</p>
                                    <h2 className="text-4xl md:text-5xl font-playfair italic font-semibold mb-3">{currentProduct.name}</h2>
                                    <p className="text-lg md:text-xl opacity-90 font-cormorant leading-snug max-w-xl mb-6">{currentProduct.shortDescription}</p>
                                    
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onPrimaryCtaClick?.(currentProduct, activeIndex); }}
                                            className="bg-[#FCEAAC] text-[#4A0404] px-6 py-3 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-wider text-xs md:text-sm shadow-lg hover:bg-[#F3E5A0] transition-colors font-sans"
                                        >
                                            {currentProduct.primaryCtaLabel}
                                        </button>
                                        <button 
                                            onClick={(e) => { 
                                              e.stopPropagation(); 
                                              if (currentProduct.secondaryCtaHref) {
                                                window.location.href = currentProduct.secondaryCtaHref;
                                              } else {
                                                setShowDetails(true); 
                                              }
                                              onSecondaryCtaClick?.(currentProduct, activeIndex); 
                                            }}
                                            className="bg-transparent border border-[#FCEAAC]/40 text-[#FCEAAC] px-6 py-3 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-[#FCEAAC]/10 transition-colors backdrop-blur-sm font-sans"
                                        >
                                            {currentProduct.secondaryCtaLabel}
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
             </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODALS & OVERLAYS --- */}

      {/* Redirect Modal */}
      <AnimatePresence>
        {showRedirectModal && (
          <RedirectModal 
            isOpen={showRedirectModal}
            onClose={() => setShowRedirectModal(false)}
            onConfirm={handleRedirectConfirm}
          />
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && currentProduct && (
          <DetailsModal 
            product={currentProduct} 
            onClose={() => setShowDetails(false)}
            onBook={() => {
                setShowDetails(false);
                onPrimaryCtaClick?.(currentProduct, activeIndex);
            }}
          />
        )}
      </AnimatePresence>

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center pointer-events-none"
           >
              <div className="bg-[#FCEAAC]/90 p-4 rounded-2xl shadow-2xl flex flex-col items-center">
                 <DoubleTapIcon className="w-12 h-12 text-[#4A0404] animate-pulse mb-2" />
                 <p className="text-[#4A0404] font-bold font-sans text-sm tracking-wide">DOUBLE TAP TO BOOK</p>
                 <p className="text-[#4A0404]/70 font-serif italic mt-1">or swipe to explore</p>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};