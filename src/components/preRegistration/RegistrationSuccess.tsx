import { Link } from 'react-router';
import { toast } from 'sonner';

import { event } from '@/lib/analytics';
import { copyToClipboard } from '@/lib/utils';

import characterImg from '@/assets/ending/character2.png';

function RegistrationSuccess() {
  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    const shareData = {
      title: '겸사겸사 사전등록',
      text: '겸사겸사 사전 등록하고, 등하굣길 시간에 수익을 만들어보세요!',
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        event('share', {
          method: 'native',
          location: 'registration_success',
          event_label: '사전등록 완료 화면 - 네이티브 공유',
        });
        toast.success('공유되었습니다');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          const ok = await copyToClipboard(url);
          if (ok) {
            event('share', {
              method: 'clipboard',
              location: 'registration_success',
              event_label: '사전등록 완료 화면 - 클립보드 복사',
            });
            toast.success('링크가 클립보드에 복사되었습니다');
          } else {
            toast.error('링크 복사에 실패했습니다');
          }
        }
      }
    } else {
      const ok = await copyToClipboard(url);
      if (ok) {
        event('share', {
          method: 'clipboard',
          location: 'registration_success',
          event_label: '사전등록 완료 화면 - 클립보드 복사',
        });
        toast.success('링크가 클립보드에 복사되었습니다');
      } else {
        toast.error('링크 복사에 실패했습니다');
      }
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
