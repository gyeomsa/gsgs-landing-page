import RegistrationForm from '@/components/preRegistration/registrationForm';
import SectionTitle from '@/components/shared/SectionTitle';

function PreregistrationSection() {
  return (
    <section className="container-px flex flex-col items-center">
      <SectionTitle title="사전등록 신청" description="Pre-registration" />
      <RegistrationForm />
    </section>
  );
}

export default PreregistrationSection;
