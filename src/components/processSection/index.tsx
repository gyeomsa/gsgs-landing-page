import { useRef, useState } from 'react';

import SectionTitle from '@/components/shared/SectionTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ProcessStepCard from './ProcessStepCard';
import type { ProcessItem } from './ProcessStepCard';
import ProcessTabSwitchButton from './ProcessTabSwitchButton';
import { TAB_CONTENTS, TAB_VALUES, type TabValue } from './constants';

type ProcessTabContentProps = {
  value: TabValue;
  contents: ProcessItem[];
  activeTab: TabValue;
  onSwitchTab: (v: TabValue) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
};

/** 홀수(01, 03): 이미지 왼쪽 / 짝수(02, 04): 이미지 오른쪽 */
function getIsImageRight(index: number) {
  return index % 2 === 1;
}

function ProcessTabContent({
  value,
  contents,
  activeTab,
  onSwitchTab,
  sectionRef,
}: ProcessTabContentProps) {
  return (
    <TabsContent
      value={value}
      className="desktop:gap-8 flex w-full max-w-[975px] flex-col items-center gap-6"
    >
      <div className="desktop:gap-12 desktop:p-10 flex w-full flex-col gap-8 rounded-2xl border border-[#D2DFFF] bg-white p-6">
        {contents.map((item, index) => (
          <div key={index}>
            <ProcessStepCard item={item} index={index} isImageRight={getIsImageRight(index)} />
            {index < contents.length - 1 && (
              <div className="desktop:mt-12 mt-8 border-t border-[#D2DFFF]/60" />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <ProcessTabSwitchButton
          activeTab={activeTab}
          onSwitchTab={onSwitchTab}
          sectionRef={sectionRef}
        />
      </div>
    </TabsContent>
  );
}

function ProcessSection() {
  const [activeTab, setActiveTab] = useState<TabValue>(TAB_VALUES.DELIVERY);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="container-px desktop:py-24 flex flex-col items-center bg-white py-16"
    >
      <SectionTitle description="How it works" title="이렇게 작동합니다" />
      <Tabs
        value={activeTab}
        onValueChange={v => setActiveTab(v as TabValue)}
        className="flex w-full max-w-[950px] flex-col items-center"
      >
        <TabsList className="bg-gsgs-neutral-200 desktop:p-2 mb-8 inline-flex rounded-full border-0 p-1.5 shadow-none">
          <TabsTrigger
            value={TAB_VALUES.DELIVERY}
            className="typography-body-2 text-gsgs-neutral-600 desktop:py-4 rounded-full border-0 bg-transparent px-6 py-3 shadow-none transition-colors data-[state=active]:bg-[#0C51FF] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            배달자
          </TabsTrigger>
          <TabsTrigger
            value={TAB_VALUES.REQUESTER}
            className="typography-body-2 text-gsgs-neutral-600 desktop:py-4 rounded-full border-0 bg-transparent px-6 py-3 shadow-none transition-colors data-[state=active]:bg-[#0C51FF] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            의뢰인
          </TabsTrigger>
        </TabsList>
        <ProcessTabContent
          value={TAB_VALUES.DELIVERY}
          contents={TAB_CONTENTS[TAB_VALUES.DELIVERY]}
          activeTab={activeTab}
          onSwitchTab={setActiveTab}
          sectionRef={sectionRef}
        />
        <ProcessTabContent
          value={TAB_VALUES.REQUESTER}
          contents={TAB_CONTENTS[TAB_VALUES.REQUESTER]}
          activeTab={activeTab}
          onSwitchTab={setActiveTab}
          sectionRef={sectionRef}
        />
      </Tabs>
    </section>
  );
}

export default ProcessSection;
