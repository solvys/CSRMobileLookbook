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
