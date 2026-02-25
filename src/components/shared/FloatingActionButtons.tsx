import { useEffect, useState } from 'react';

import { ArrowUpIcon, Share2Icon, UserPlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

function FloatingActionButtons() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRegisterSection = () => {
    const element = document.getElementById('register');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('링크가 클립보드에 복사되었습니다');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success('링크가 클립보드에 복사되었습니다');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: '겸사겸사 - 일상의 이동을 가치 있게',
      text: '출퇴근·등하굣길을 활용한 초저비용 배송 플랫폼',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('공유되었습니다');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await copyToClipboard(window.location.href);
        }
      }
    } else {
      await copyToClipboard(window.location.href);
    }
  };

  const buttonBaseClass =
    'flex size-12 items-center justify-center rounded-full bg-gsgs-white text-gsgs-neutral-600 shadow-lg transition-all hover:bg-color-gsgs-neutral-500 active:scale-95';

  return (
    <div className="bottom-gsgs-24 right-gsgs-16 gap-gsgs-12 desktop:bottom-gsgs-24 desktop:right-gsgs-24 fixed z-50 flex flex-col">
      {showTopButton && (
        <button
          type="button"
          onClick={scrollToTop}
          className={buttonBaseClass}
          aria-label="맨 위로"
        >
          <ArrowUpIcon className="size-5" />
        </button>
      )}
      <button type="button" onClick={handleShare} className={buttonBaseClass} aria-label="공유하기">
        <Share2Icon className="size-5" />
      </button>
      <Link
        to="/preregistration"
        className={`${buttonBaseClass} desktop:hidden`}
        aria-label="사전 등록"
      >
        <UserPlusIcon className="size-5" />
      </Link>
      <button
        type="button"
        onClick={scrollToRegisterSection}
        className={`${buttonBaseClass} desktop:flex hidden`}
        aria-label="사전 등록"
      >
        <UserPlusIcon className="size-5" />
      </button>
    </div>
  );
}

export default FloatingActionButtons;
