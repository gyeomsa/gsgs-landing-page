import { Link } from 'react-router';
import { toast } from 'sonner';

import { event } from '@/lib/analytics';
import { copyToClipboard } from '@/lib/utils';

import endingImg from '@/assets/ending/ending_img.png';
import logoBrand from '@/assets/logo/logo_brand.svg';

function EndingSection() {
  const handleShare = async () => {
    const url = `${window.location.origin}/#register`;
    const shareData = {
      title: '겸사겸사 - 등하굣길, 이제 돈이 됩니다',
      text: '매일 반복되는 그 길, 이제 낭비하지 마세요',
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        event('share', { method: 'native', location: 'ending' });
        toast.success('공유되었습니다');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          const ok = await copyToClipboard(url);
          if (ok) {
            event('share', { method: 'clipboard', location: 'ending' });
            toast.success('링크가 클립보드에 복사되었습니다');
          } else {
            toast.error('링크 복사에 실패했습니다');
          }
        }
      }
    } else {
      const ok = await copyToClipboard(url);
      if (ok) {
        event('share', { method: 'clipboard', location: 'ending' });
        toast.success('링크가 클립보드에 복사되었습니다');
      } else {
        toast.error('링크 복사에 실패했습니다');
      }
    }
  };

  const trackCtaClick = (location: string, device: string) => {
    event('cta_click', { location, device });
  };

  const ctaButtons = (
    <>
      <a
        href="#register"
        className="typography-cta-button desktop:flex hidden min-h-[48px] max-w-[280px] min-w-[200px] flex-none items-center justify-center rounded-md border border-[#CBD5E1] bg-white px-6 py-3 text-[#0F172A] transition-colors hover:bg-[#F6F6F6]"
        onClick={() => trackCtaClick('ending', 'desktop')}
      >
        사전등록하기
      </a>
      <Link
        to="/preregistration"
        className="typography-cta-button desktop:hidden desktop:flex-none desktop:min-w-[200px] desktop:max-w-[280px] flex min-h-[48px] max-w-[260px] flex-1 items-center justify-center rounded-md border border-[#CBD5E1] bg-white px-6 py-3 text-[#0F172A] transition-colors hover:bg-[#F6F6F6]"
        onClick={() => trackCtaClick('ending', 'mobile')}
      >
        사전등록하기
      </Link>
      <button
        type="button"
        onClick={handleShare}
        className="typography-cta-button desktop:flex-none desktop:min-w-[200px] desktop:max-w-[280px] flex min-h-[48px] max-w-[260px] flex-1 items-center justify-center rounded-md border border-[#0C51FF] bg-white px-6 py-3 text-[#0C51FF] transition-colors hover:bg-[#F1F5FF]"
      >
        친구에게 공유하기
      </button>
    </>
  );

  return (
    <section id="ending" className="w-full">
      {/* 데스크탑: 블루 그라데이션 + 화이트 하단 */}
      <div className="desktop:block hidden">
        <div
          className="container-px flex min-h-[480px] gap-16 py-20"
          style={{
            background: 'linear-gradient(180deg, #2462FF 0%, #8FAFFF 50%, #D2DFFF 100%)',
          }}
        >
          <div className="mx-auto flex max-w-[1440px] min-w-[1200px] items-center justify-between">
            <div className="h-full max-w-[480px]">
              <h2 className="typography-heading-2 font-gsgs-bold mb-4 leading-tight text-white">
                등하굣길,
                <br />
                이제 돈이 됩니다
              </h2>
              <p className="typography-body-2 text-white/90">
                매일 반복되는 그 길, 이제 낭비하지 마세요
              </p>
            </div>
            <div className="flex h-full items-end justify-end">
              <img
                src={endingImg}
                alt="겸사겸사 앱 화면"
                className="max-h-[480px] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="container-px flex flex-col items-center gap-8 bg-white py-16">
          <img src={logoBrand} alt="겸사겸사" className="h-12" />
          <div className="flex gap-4">{ctaButtons}</div>
        </div>
      </div>

      {/* 모바일: 화이트 배경 */}
      <div className="desktop:hidden flex flex-col items-center gap-10 py-16">
        <div className="flex min-w-[280px] flex-col gap-4">
          <h2 className="typography-heading-2 font-gsgs-bold mb-[60px] w-full text-[#0F172A]">
            등하굣길,
            <br />
            이제 돈이 됩니다
          </h2>
          <p className="typography-body-2 text-gsgs-neutral-500 flex items-center justify-center text-center">
            매일 반복되는 그 길,
            <br />
            이제 낭비하지 마세요
          </p>
        </div>
        <img src={logoBrand} alt="겸사겸사" className="h-10" />
        <div className="flex w-full max-w-[260px] flex-col gap-3">{ctaButtons}</div>
      </div>
    </section>
  );
}

export default EndingSection;
