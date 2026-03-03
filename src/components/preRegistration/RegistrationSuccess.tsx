import { Link } from 'react-router';

import characterImg from '@/assets/ending/character2.png';

function RegistrationSuccess() {
  const handleShare = async () => {
    const url = window.location.origin + window.location.pathname;
    const shareData = {
      title: '겸사겸사 사전등록',
      text: '겸사겸사 사전 등록하고, 등하굣길 시간에 수익을 만들어보세요!',
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await navigator.clipboard.writeText(url);
          alert('링크가 클립보드에 복사되었습니다.');
        }
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="flex flex-col items-center gap-2">
        <p className="typography-body-2 text-center text-[#0F172A]">사전등록이 완료되었습니다.</p>
        <p className="typography-body-2 text-center text-[#0F172A]">감사합니다.</p>
      </div>

      <img
        src={characterImg}
        alt="사전 등록 완료"
        className="w-full max-w-[200px] object-contain"
      />

      <div className="flex w-full flex-col gap-3">
        <Link
          to="/"
          className="typography-cta-button desktop:hidden flex min-h-[48px] w-full items-center justify-center rounded-md border border-[#0F172A] bg-white px-6 py-3 text-[#0F172A] transition-colors hover:bg-[#F6F6F6]"
        >
          페이지로 돌아가기
        </Link>
        <button
          type="button"
          onClick={handleShare}
          className="typography-cta-button flex min-h-[48px] w-full items-center justify-center rounded-md border border-[#0C51FF] bg-white px-6 py-3 text-[#0C51FF] transition-colors hover:bg-[#F1F5FF]"
        >
          친구에게 공유하기
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
