import endingImg from '@/assets/ending/ending_img.png';

function RegistrationSuccess() {
  return (
    <div className="flex flex-col items-center gap-6">
      <img src={endingImg} alt="사전 등록 완료" className="max-w-[200px] object-contain" />
      <p className="typography-body-2 text-semantic-text-default text-center">
        사전 등록이 완료되었습니다.
      </p>
    </div>
  );
}

export default RegistrationSuccess;
