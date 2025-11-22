import React from 'react';
import { MobileLookbook, Product } from './components/MobileLookbook';

const App: React.FC = () => {
  // Analytics / Tracking Handlers
  const handlePrimaryCtaClick = (product: Product, index: number) => {
    console.log(`[Analytics] Conversion: User clicked 'Book Consultation' on "${product.name}"`);
    // Navigate to consultation booking
    window.location.href = 'https://www.californiashutters.com/consultations/';
  };

  const handleSecondaryCtaClick = (product: Product, index: number) => {
    console.log(`[Analytics] Interest: User clicked Details on "${product.name}"`);
    // Details are handled internally by the MobileLookbook component popup, 
    // but this callback captures the event for analytics.
  };

  const handleCardChange = (product: Product, index: number) => {
    console.log(`[Analytics] Swipe: Viewed "${product.name}"`);
  };

  return (
    <main className="min-h-screen w-full bg-[#FCEAAC] flex items-center justify-center">
      <MobileLookbook 
        landingTitle="Design Your View"
        landingSubtitle="Select a style to get started."
        onPrimaryCtaClick={handlePrimaryCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
        onCardChange={handleCardChange}
      />
    </main>
  );
};

export default App;