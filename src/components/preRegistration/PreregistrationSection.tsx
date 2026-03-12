import PreregistrationEndedOverlay from '@/components/preRegistration/PreregistrationEndedOverlay';
import RegistrationForm from '@/components/preRegistration/registrationForm';
import SectionTitle from '@/components/shared/SectionTitle';

function PreregistrationSection() {
  return (
    <section className="container-px flex flex-col items-center bg-[#F6F6F6] pb-[120px]">
      <SectionTitle title="사전등록 신청" description="Pre-registration" />
      <div className="desktop:rounded-[20px] desktop:px-[124px] desktop:py-[98px] relative w-full max-w-[950px] border border-[#7E817A] bg-white px-4 py-6">
        <PreregistrationEndedOverlay />
        <RegistrationForm />
      </div>
    </section>
  );
}

export default PreregistrationSection;
