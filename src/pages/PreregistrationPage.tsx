import { Navigate } from 'react-router';

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
    <div className="container-px flex h-screen flex-col items-center bg-[#F6F6F6]">
      <SectionTitle title="사전등록 신청" description="Pre-registration" />
      <div className="desktop:rounded-[20px] desktop:px-[124px] desktop:py-[98px] w-full max-w-[950px] border border-[#7E817A] bg-white px-4 py-6">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default PreregistrationPage;
