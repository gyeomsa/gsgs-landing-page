import { Navigate } from 'react-router';

import Footer from '@/components/Footer';
import PreregistrationEndedOverlay from '@/components/preRegistration/PreregistrationEndedOverlay';
import RegistrationForm from '@/components/preRegistration/registrationForm';
import SectionTitle from '@/components/shared/SectionTitle';

import { useMediaQuery } from '@/hooks/useMediaQuery';

const DESKTOP_BREAKPOINT = '(min-width: 90rem)'; /* 1440px */

function PreregistrationPage() {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  if (isDesktop) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F6F6]">
      <div className="container-px flex flex-1 flex-col items-center py-8">
        <SectionTitle title="사전등록 신청" description="Pre-registration" />
        <div className="desktop:rounded-[20px] desktop:px-[124px] desktop:py-[98px] relative w-full max-w-[950px] border border-[#7E817A] bg-white px-4 py-6">
          <PreregistrationEndedOverlay />
          <RegistrationForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PreregistrationPage;
