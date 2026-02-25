import { cn } from '@/lib/utils';

export type ProcessItem = {
  image: string;
  title: string;
  description: string;
};

function StepTitle({
  stepNumber,
  title,
  className,
}: {
  stepNumber: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'gap-gsgs-14 typography-heading-3 text-semantic-text-brand flex flex-col',
        className
      )}
    >
      <h3>{stepNumber}</h3>
      <h3>{title}</h3>
    </div>
  );
}

function StepDescription({ value, className }: { value: string; className?: string }) {
  return (
    <p
      className={cn(
        'typography-body-1 text-semantic-text-secondary whitespace-pre-line',
        className
      )}
    >
      {value}
    </p>
  );
}

type ProcessStepCardProps = {
  item: ProcessItem;
  index: number;
};

function ProcessStepCard({ item, index }: ProcessStepCardProps) {
  const stepNumber = String(index + 1).padStart(2, '0');
  const isReversed = index % 2 === 1;

  return (
    <div
      className={cn(
        'gap-gsgs-16 grid',
        // Mobile: 3행 (StepTitle → Image → StepDescription)
        'grid-cols-1 grid-rows-[auto_auto_auto]',
        // Desktop: 2열, Image | (StepTitle + StepDescription)
        'desktop:grid-cols-2 desktop:grid-rows-[auto_1fr] desktop:gap-x-gsgs-48 desktop:gap-y-gsgs-0 desktop:rounded-lg desktop:p-gsgs-24 desktop:max-w-[975px]'
      )}
    >
      <StepTitle
        stepNumber={stepNumber}
        title={item.title}
        className={cn(
          'desktop:col-start-2 desktop:row-start-1 desktop:mb-gsgs-44',
          isReversed && 'desktop:col-start-1'
        )}
      />

      <div
        className={cn(
          'min-w-0',
          'desktop:col-start-1 desktop:row-span-2 desktop:row-start-1',
          isReversed && 'desktop:col-start-2'
        )}
      >
        <img src={item.image} alt={item.title} className="w-full rounded-lg object-cover" />
      </div>

      <StepDescription
        value={item.description}
        className={cn(
          'desktop:col-start-2 desktop:row-start-2',
          isReversed && 'desktop:col-start-1'
        )}
      />
    </div>
  );
}

export default ProcessStepCard;
