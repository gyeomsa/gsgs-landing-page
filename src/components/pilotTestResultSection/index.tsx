import SectionTitle from '@/components/shared/SectionTitle';

import pilot01 from '@/assets/pilot/pilot01.svg';
import pilot02 from '@/assets/pilot/pilot02.svg';
import pilot03 from '@/assets/pilot/pilot03.svg';

const RESULT_DATA = [
  {
    label: '사용자 만족도',
    value: '89%',
    image: pilot01,
  },
  {
    label: '재이용 의향',
    value: '88%',
    image: pilot02,
  },
  {
    label: '평균 우회 시간',
    value: '15분',
    image: pilot03,
  },
];

const PILOT_DETAILS = [
  '파일럿 테스트 진행(2025.09.29-2025.10.25)',
  '-카카오톡 채널 활용, 서울대학교 재학생 대상',
];

const TESTIMONIAL = '매일 학교 가는 길에 잠깐 우회해서\n용돈벌이를 할 수 있는 게 너무 좋았어요';

function PilotTestResultSection() {
  return (
    <section className="desktop:py-24 flex w-full flex-col items-center bg-[#F1F5FF] py-16">
      <SectionTitle title="파일럿 테스트" description="Pilot Test" />

      {/* 메트릭 카드 */}
      <div className="container-px desktop:flex-row desktop:gap-6 flex w-full max-w-[950px] flex-col gap-4">
        {RESULT_DATA.map(item => (
          <div
            key={item.label}
            className="desktop:flex-col desktop:items-center desktop:gap-4 desktop:py-8 flex min-w-0 flex-1 flex-row items-center gap-4 rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          >
            <img
              src={item.image}
              alt={item.label}
              className="desktop:size-16 size-14 shrink-0 object-contain"
            />
            <div className="desktop:items-center desktop:text-center flex flex-1 flex-col gap-1">
              <p className="typography-body-2 text-gsgs-neutral-600">{item.label}</p>
              <p className="typography-heading-3 text-[#0C51FF]">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 파일럿 테스트 상세 */}
      <div className="container-px mt-8 flex w-full max-w-[950px] flex-col gap-1 text-center">
        {PILOT_DETAILS.map((line, i) => (
          <p key={i} className="typography-caption text-gsgs-neutral-600">
            {line}
          </p>
        ))}
      </div>

      {/* 사용자 후기 말풍선 */}
      <div className="container-px desktop:mt-12 mt-10 flex w-full max-w-[600px] justify-center overflow-visible">
        <div className="desktop:px-8 desktop:py-6 relative overflow-visible rounded-2xl bg-white px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          {/* 말풍선 꼬리 (좌측 하단) */}
          <div
            className="absolute bottom-[20%] -left-3 size-0 border-y-10 border-r-14 border-l-0 border-solid border-y-transparent border-r-white"
            aria-hidden
          />
          <p className="typography-body-2 text-gsgs-neutral-600 text-center whitespace-pre-line">
            {TESTIMONIAL}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PilotTestResultSection;
