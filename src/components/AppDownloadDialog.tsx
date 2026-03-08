import { Download } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { Button } from '@/components/ui/button';
import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import endingImg from '@/assets/ending/ending_img.png';

// TODO: 배포 후 원스토어 링크로 교체
// const ONESTORE_LINK = 'https://onestore.co.kr/...';

// 테스트용 APK 다운로드 링크 (배포 전)
const APK_DOWNLOAD_LINK = ''; // TODO: APK 파일 URL 추가

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
                    겸사겸사를 미리 경험해보세요!
                  </h2>
                </DialogPrimitive.Title>
                <p className="typography-body-2 text-gsgs-neutral-600 text-center">
                  배포 전 서비스를 테스트해보실 수 있습니다.
                  <br />
                  APK 파일을 다운로드 받아 설치해주세요.
                </p>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <img
                  src={endingImg}
                  alt="겸사겸사 앱 화면"
                  className="desktop:max-h-[280px] max-h-[200px] w-auto max-w-full object-contain"
                />
                <span className="typography-body-2 text-gsgs-neutral-600 text-center">
                  오른쪽 하단 언제든 다시 이 팝업을 열어보실 수 있어요.
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {/* APK 다운로드 버튼 */}
                <Button
                  asChild
                  className="typography-cta-button h-auto min-h-[48px] w-full rounded-[20px] bg-[#0C51FF] px-6 py-3 text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-[#0C51FF]/90"
                >
                  <a href={APK_DOWNLOAD_LINK || '#'} download>
                    <Download className="mr-2 size-5" />
                    APK 다운로드
                  </a>
                </Button>

                {/* TODO: 원스토어 배포 후 아래 버튼 활성화 */}
                {/* <Button
                asChild
                className="typography-cta-button h-auto min-h-[48px] w-full rounded-[20px] border-2 border-[#0C51FF] bg-white px-6 py-3 text-[#0C51FF] hover:bg-[#F1F5FF]"
              >
                <a href={ONESTORE_LINK} target="_blank" rel="noopener noreferrer">
                  원스토어에서 다운로드
                </a>
              </Button> */}
              </div>
            </DialogPrimitive.Content>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}

export default AppDownloadDialog;
