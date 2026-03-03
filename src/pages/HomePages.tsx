import BenefitSection from '@/components/BenefitSection';
import EndingSection from '@/components/EndingSection';
import HeroSection from '@/components/HeroSection';
import PilotTestResultSection from '@/components/pilotTestResultSection';
import PreregistrationSection from '@/components/preRegistration/PreregistrationSection';
import ProcessSection from '@/components/processSection';
import FloatingActionButtons from '@/components/shared/FloatingActionButtons';

function HomePages() {
  return (
    <div className="mx-auto">
      <HeroSection />
      <ProcessSection />
      <PilotTestResultSection />
      <BenefitSection />
      <div id="register" className="desktop:block hidden">
        <PreregistrationSection />
      </div>
      <EndingSection />
      <FloatingActionButtons />
    </div>
  );
}

export default HomePages;
