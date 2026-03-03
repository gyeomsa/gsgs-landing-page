import { Check } from 'lucide-react';

import benefit01 from '@/assets/benefit/benefit01.png';
import benefit02 from '@/assets/benefit/benefit02.png';

import SectionTitle from './shared/SectionTitle';

const BENEFIT_DATA = [
  {
    title: '첫 배송 무료',
    description: ['첫 배송 수수료 100% 할인', '첫 배송 보상 2배 지급'],
    image: benefit01,
  },
  {
    title: '전용 굿즈 증정',
    description: ['사전 예약자 한정 에코백'],
    image: benefit02,
  },
];

function BenefitSection() {
  return (
    <section className="desktop:py-24 flex w-full flex-col items-center bg-white py-16">
      <SectionTitle title="지금 사전등록하면 이런 혜택이!" description="Early Bird Benefits" />
      <div className="container-px desktop:flex-row desktop:gap-8 desktop:pb-8 desktop:pt-8 flex w-full max-w-[950px] flex-col gap-6 pt-4 pb-4">
        {BENEFIT_DATA.map(item => (
          <div
            key={item.title}
            className="flex w-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          >
            {/* 상단 블루 섹션 */}
            <div className="desktop:min-h-[200px] desktop:py-10 flex min-h-[160px] w-full flex-1 flex-col items-center justify-center gap-4 bg-[#0C51FF] px-6 py-8">
              <h4 className="typography-body-1 font-gsgs-semibold text-white">{item.title}</h4>
              <img
                src={item.image}
                alt={item.title}
                className="desktop:h-[140px] h-[100px] w-auto object-contain"
              />
            </div>
            {/* 하단 그레이 섹션 - 두 카드 동일 높이 */}
            <div className="desktop:min-h-[120px] flex min-h-[100px] w-full flex-col justify-center gap-3 bg-[#F0F0F0] px-6 py-5">
              {item.description.map(text => (
                <div key={text} className="flex items-center gap-2">
                  <Check className="size-5 shrink-0 text-[#0C51FF]" strokeWidth={2.5} />
                  <span className="typography-body-2 text-[#0F172A]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BenefitSection;
