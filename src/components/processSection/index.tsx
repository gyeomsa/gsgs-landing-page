import { useRef, useState } from 'react';

import SectionTitle from '@/components/shared/SectionTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ProcessStepCard from './ProcessStepCard';
import type { ProcessItem } from './ProcessStepCard';
import ProcessTabSwitchButton from './ProcessTabSwitchButton';
import { TAB_CONTENTS, TAB_VALUES, type TabValue } from './constants';

function ProcessTabContent({ value, contents }: { value: TabValue; contents: ProcessItem[] }) {
  return (
    <TabsContent
      value={value}
      className="gap-gsgs-48 pt-gsgs-24 desktop:gap-gsgs-80 desktop:max-w-[1232px] flex flex-col"
    >
      {contents.map((item, index) => (
        <ProcessStepCard key={index} item={item} index={index} />
      ))}
    </TabsContent>
  );
}

function ProcessSection() {
  const [activeTab, setActiveTab] = useState<TabValue>(TAB_VALUES.DELIVERY);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="container-px">
      <SectionTitle description="How it works" title="이렇게 작동합니다" />
      <Tabs
        value={activeTab}
        onValueChange={v => setActiveTab(v as TabValue)}
        className="container-px flex flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value={TAB_VALUES.DELIVERY} className="typography-body-2">
            배송자
          </TabsTrigger>
          <TabsTrigger value={TAB_VALUES.REQUESTER} className="typography-body-2">
            의뢰인
          </TabsTrigger>
        </TabsList>
        <ProcessTabContent
          value={TAB_VALUES.DELIVERY}
          contents={TAB_CONTENTS[TAB_VALUES.DELIVERY]}
        />
        <ProcessTabContent
          value={TAB_VALUES.REQUESTER}
          contents={TAB_CONTENTS[TAB_VALUES.REQUESTER]}
        />
        <ProcessTabSwitchButton
          activeTab={activeTab}
          onSwitchTab={setActiveTab}
          sectionRef={sectionRef}
        />
      </Tabs>
    </section>
  );
}

export default ProcessSection;
