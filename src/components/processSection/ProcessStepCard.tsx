import { cn } from '@/lib/utils';

export type ProcessItem = {
  image: string;
  title: string;
  description: string;
};

type ProcessStepCardProps = {
  item: ProcessItem;
  index: number;
  /** 데스크탑에서 이미지 위치 - true면 오른쪽 (의뢰인 교차 레이아웃) */
  isImageRight?: boolean;
};

function ProcessStepCard({ item, index, isImageRight = false }: ProcessStepCardProps) {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <div
      className={cn(
        'desktop:flex-row desktop:items-center desktop:gap-12 flex flex-col gap-6',
        // 배달자/의뢰인 01,03: 이미지 왼쪽, 텍스트 오른쪽 → flex-row-reverse
        // 의뢰인 02: 이미지 오른쪽, 텍스트 왼쪽 → flex-row
        !isImageRight && 'desktop:flex-row-reverse'
      )}
    >
      {/* 텍스트 영역 */}
      <div
        className={cn(
          'flex flex-1 flex-col gap-4',
          isImageRight && 'desktop:items-end desktop:text-right'
        )}
      >
        <div className={cn('flex flex-col gap-1', isImageRight && 'desktop:items-end')}>
          <h3 className="typography-heading-3 font-gsgs-semibold text-[#0C51FF]">{stepNumber}</h3>
          <h3 className="typography-heading-3 font-gsgs-semibold text-[#0F172A]">{item.title}</h3>
        </div>
        <p
          className={cn(
            'typography-body-2 text-gsgs-neutral-600 whitespace-pre-line',
            isImageRight && 'desktop:max-w-[400px] desktop:text-right'
          )}
        >
          {item.description}
        </p>
      </div>

      {/* 폰 이미지 */}
      <div className="flex shrink-0 justify-center">
        <img
          src={item.image}
          alt={item.title}
          className="desktop:max-h-[320px] max-h-[280px] w-auto rounded-xl border-0 object-contain"
        />
      </div>
    </div>
  );
}

export default ProcessStepCard;
