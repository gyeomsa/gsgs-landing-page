import { ExternalLink } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { Button } from '@/components/ui/button';
import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import endingImg from '@/assets/ending/ending_img.png';

// 원스토어 앱 다운로드 링크 (contentsId는 원스토어 개발자센터에서 확인 후 수정)
const ONESTORE_LINK = 'https://m.onestore.co.kr/v2/ko-kr/app/0001004757';

type AppDownloadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function AppDownloadDialog({ open, onOpenChange }: AppDownloadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <div className="desktop:max-w-[560px] fixed top-[50%] left-[50%] z-50 flex w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 sm:max-w-[400px]">
          <div className="desktop:max-w-[560px] relative w-full max-w-[340px] sm:max-w-[400px]">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="typography-body-2 absolute -top-7 right-3 text-white/90 underline transition-colors hover:text-white"
              aria-label="팝업 닫기"
            >
              팝업 닫기
            </button>
            <DialogPrimitive.Content
              className={cn(
                'grid w-full max-w-[340px] gap-4 rounded-[20px] border-2 border-[#D2D2D2] bg-[#F1F5FF] p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.15)] outline-none',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                'desktop:max-w-[560px] desktop:p-8 duration-200 sm:max-w-[400px]'
              )}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <DialogPrimitive.Title asChild>
                  <h2 className="typography-heading-3 text-[#0F172A]">
                    겸사겸사 앱을 이용해보세요!
                  </h2>
                </DialogPrimitive.Title>
                <p className="typography-body-2 text-gsgs-neutral-600 text-center">
                  겸사겸사 앱이 원스토어에 출시되었습니다.
                  <br />
                  아래 버튼을 눌러 서비스를 다운로드 받아주세요!
                </p>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <img
                  src={endingImg}
                  alt="겸사겸사 앱 화면"
                  className="desktop:max-h-[280px] max-h-[200px] w-auto max-w-full object-contain"
                />
                <span className="typography-body-2 text-gsgs-neutral-600 text-center">
                  오른쪽 하단에서 언제든 <br className="sm:hidden" />
                  다시 이 팝업을 열어보실 수 있어요.
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  className="typography-cta-button h-auto min-h-[48px] w-full rounded-[20px] bg-[#0C51FF] px-6 py-3 text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-[#0C51FF]/90"
                >
                  <a href={ONESTORE_LINK} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 size-5" />
                    원스토어에서 다운로드
                  </a>
                </Button>
              </div>
            </DialogPrimitive.Content>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}

export default AppDownloadDialog;
