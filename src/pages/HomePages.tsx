import { useState } from 'react';

import AppDownloadDialog from '@/components/AppDownloadDialog';
import BenefitSection from '@/components/BenefitSection';
import EndingSection from '@/components/EndingSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import PilotTestResultSection from '@/components/pilotTestResultSection';
import PreregistrationSection from '@/components/preRegistration/PreregistrationSection';
import ProcessSection from '@/components/processSection';
import FloatingActionButtons from '@/components/shared/FloatingActionButtons';

function HomePages() {
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(true);

  return (
    <div className="mx-auto">
      <AppDownloadDialog open={downloadDialogOpen} onOpenChange={setDownloadDialogOpen} />
      <HeroSection />
      <ProblemSolutionSection />
      <ProcessSection />
      <PilotTestResultSection />
      <BenefitSection />
      <div id="register" className="desktop:block hidden">
        <PreregistrationSection />
      </div>
      <EndingSection />
      <Footer />
      <FloatingActionButtons onOpenDownloadDialog={() => setDownloadDialogOpen(true)} />
    </div>
  );
}

export default HomePages;
