import image01 from '@/assets/process/delivery01.png';

import SectionTitle from './shared/SectionTitle';

const BENEFIT_DATA = [
  {
    title: '첫 배송 무료',
    description: ['첫 배송 수수료 100% 할인', '첫 배송 보상 2배 지급'],
    image: image01,
  },
  {
    title: '전용 굿즈 증정',
    description: ['사전 예약자 한정 에코백'],
    image: image01,
  },
];

function BenefitSection() {
  return (
    <section className="flex flex-col items-center">
      <SectionTitle title="지금 사전 등록하면 이런 혜택이" description="Early Bird Benefits" />
      <div className="desktop:flex-row gap-gsgs-64 flex flex-col">
        {BENEFIT_DATA.map(item => (
          <div key={item.title} className="flex flex-col items-center">
            <p className="typography-body-1">{item.title}</p>
            <img
              src={item.image}
              alt={item.title}
              className="desktop:size-[160px] size-[90px] object-cover"
            />
            {item.description.map(text => (
              <p key={text} className="typography-body-2">
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default BenefitSection;
