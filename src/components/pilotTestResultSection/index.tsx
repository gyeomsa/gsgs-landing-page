import SectionTitle from '@/components/shared/SectionTitle';

import image01 from '@/assets/process/delivery01.png';

const RESULT_DATA = [
  {
    label: '사용자 만족도',
    value: '89%',
    image: image01,
  },
  {
    label: '재이용 의향',
    value: '88%',
    image: image01,
  },
  {
    label: '평균 우회 시간',
    value: '15분',
    image: image01,
  },
];

const SPEECH_BUBBLE_DATA =
  '매일 학교 가는 길에 잠깐 우회해서\n용돈벌이를 할 수 있는 게 너무 좋았어요';

function TestimonialQuote({ quote }: { quote: string }) {
  return (
    <div className="desktop:hidden gap-gsgs-12 flex flex-col items-center">
      <div className="speech-bubble typography-caption max-w-[218px] p-[22px] text-center whitespace-pre-line text-white">
        {quote}
      </div>
    </div>
  );
}

function PilotTestResultSection() {
  return (
    <section className="flex flex-col items-center">
      <SectionTitle title="파일럿 테스트" description="Pilot Test" />
      <div className="desktop:flex-row gap-gsgs-64 flex flex-col">
        {RESULT_DATA.map(item => (
          <div
            key={item.label}
            className="gap-gsgs-12 desktop:max-h-none desktop:max-w-[272px] desktop:flex-col desktop:items-center flex max-h-[98px] flex-row items-center"
          >
            {/* 모바일: label | value | image (좌우) / 데스크탑: image 위, label+value 아래 (상하) */}
            <img
              src={item.image}
              alt={item.label}
              className="desktop:order-1 desktop:max-h-none order-3 max-h-[98px] shrink-0 object-contain"
            />
            <div className="desktop:order-2 gap-x-gsgs-12 order-1 flex flex-row items-center">
              <p className="typography-body-2">{item.label}</p>
              <p className="typography-heading-3">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <TestimonialQuote quote={SPEECH_BUBBLE_DATA} />
      <p className="typography-caption desktop:block hidden">{SPEECH_BUBBLE_DATA}</p>
    </section>
  );
}

export default PilotTestResultSection;
