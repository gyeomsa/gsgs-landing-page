import { TAB_VALUES, type TabValue } from './constants';

const OTHER_TAB_LABEL: Record<TabValue, string> = {
  [TAB_VALUES.DELIVERY]: '의뢰인 프로세스 보기',
  [TAB_VALUES.REQUESTER]: '배송자 프로세스 보기',
};

type ProcessTabSwitchButtonProps = {
  activeTab: TabValue;
  onSwitchTab: (targetValue: TabValue) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
};

function ProcessTabSwitchButton({
  activeTab,
  onSwitchTab,
  sectionRef,
}: ProcessTabSwitchButtonProps) {
  const otherTabValue =
    activeTab === TAB_VALUES.DELIVERY ? TAB_VALUES.REQUESTER : TAB_VALUES.DELIVERY;

  const handleSwitch = () => {
    onSwitchTab(otherTabValue);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="typography-cta-button text-semantic-text-brand hover:underline"
    >
      {OTHER_TAB_LABEL[activeTab]}
    </button>
  );
}

export default ProcessTabSwitchButton;
