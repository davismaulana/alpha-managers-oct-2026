import React from 'react';
import { Layout } from './components/layout/Layout';
import { Navigation } from './components/sections/Navigation';
import { Hero } from './components/sections/Hero';
import { ProblemStatement } from './components/sections/ProblemStatement';
import { TargetAudience } from './components/sections/TargetAudience';
import { WhatYoullLearn } from './components/sections/WhatYoullLearn';
import { Speakers } from './components/sections/Speakers';
import { VenueGallery } from './components/sections/VenueGallery';
import { EventFormat } from './components/sections/EventFormat';
import { LimitedSeats } from './components/sections/LimitedSeats';
import { IndustryTrust } from './components/sections/IndustryTrust';
import { VideoProof } from './components/sections/VideoProof';
import { FinalCTA } from './components/sections/FinalCTA';
import { FAQ } from './components/sections/FAQ';
import { Footer } from './components/sections/Footer';

const App: React.FC = () => {
  return (
    <Layout>
      <Navigation />
      <Hero />
      <ProblemStatement />
      <TargetAudience />
      <WhatYoullLearn />
      <Speakers />
      <VenueGallery />
      <EventFormat />
      <LimitedSeats />
      <IndustryTrust />
      <VideoProof />
      <FinalCTA />
      <FAQ />
      <Footer />
    </Layout>
  );
};

export default App;
