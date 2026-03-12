import { ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

const ONESTORE_LINK = 'https://m.onestore.co.kr/v2/ko-kr/app/0001004757';

function PreregistrationEndedOverlay() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isPreregistrationPage = pathname === '/preregistration';

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 flex max-w-[340px] flex-col gap-4 rounded-[20px] border-2 border-[#D2D2D2] bg-white p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.15)] sm:max-w-[400px]">
        <p className="typography-body-1 text-center text-[#0F172A]">
          사전등록이 종료되었습니다.
          <br />
          원스토어에서 겸사겸사를 이용해보세요.
        </p>
        <div className="flex flex-col gap-3">
          <Button asChild className="typography-cta-button min-h-[48px] shrink-0">
            <a href={ONESTORE_LINK} target="_blank" rel="noopener noreferrer">
              원스토어에서 다운로드
            </a>
          </Button>
          {isPreregistrationPage && (
            <Button
              variant="outline"
              className="typography-body-2 min-h-[44px] shrink-0"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="mr-1 size-5" />
              이전 페이지로 돌아가기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreregistrationEndedOverlay;
