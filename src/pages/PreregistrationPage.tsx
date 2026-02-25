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
    <div>
      <SectionTitle title="사전등록 신청" description="Pre-registration" />
      <RegistrationForm />
    </div>
  );
}

export default PreregistrationPage;
