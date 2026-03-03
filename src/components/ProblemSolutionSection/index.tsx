import { cn } from '@/lib/utils';

import photo01 from '@/assets/hero/photo01.png';

const SECTION_DATA = {
  title: '우리는 매일\n시간을 버리고 있습니다.',
  stats: [
    { label: '매일 이동하는 사람은', value: '수천만명' },
    { label: '하루 평균', value: '67분' },
  ],
  valueStatement: '연 270만 원 가치의 시간이\n이동만 하며 사라지고 있습니다.',
  source: [
    '출처: 2020년 대한민국 국가 지도집 통근/통학,',
    '2024년 서울열린데이터광장 서울특별시 평균 왕복 통근/통학 시간',
    '최저지급 10,030원*1년 약 270시간',
  ],
  bubbles: [
    {
      text: '겸사겸사는 그 낭비를 수익으로, 그 필요를 저렴한 배송으로 바꿉니다.',
      align: 'left' as const,
    },
    {
      text: '그냥 지나가던 길을 돈이 되는 동선으로 바꿉니다.',
      align: 'right' as const,
    },
  ],
};

function ProblemSolutionSection() {
  return (
    <section className="flex w-full flex-col bg-white">
      {/* 1. 타이틀 (흰색 배경) */}
      <div className="container-px desktop:py-16 mx-auto w-full max-w-[950px] py-10">
        <h2 className="typography-heading-2 font-gsgs-bold whitespace-pre-line text-[#0F172A]">
          {SECTION_DATA.title}
        </h2>
      </div>

      {/* 2. 통계 이미지 영역 (어두운 배경 + 오버레이 텍스트) */}
      <div
        className="desktop:min-h-[560px] relative min-h-[480px] w-full overflow-hidden"
        style={{
          background: `linear-gradient(180deg, rgba(30,40,60,0.6) 0%, rgba(20,30,50,0.65) 100%), url(${photo01}) center/cover no-repeat`,
          backgroundColor: '#1a2433',
        }}
      >
        {/* 이동 인구·시간 통계: 데스크탑=왼쪽 위, 모바일=오른쪽 위 */}
        <div className="container-px desktop:top-12 desktop:gap-5 desktop:items-start desktop:text-left absolute top-8 left-1/2 flex w-full max-w-[950px] -translate-x-1/2 flex-col items-end gap-4 text-right">
          {SECTION_DATA.stats.map(({ label, value }) => (
            <p key={value} className="typography-body-2">
              <span className="text-white/90">{label}</span>{' '}
              <span className="typography-heading-3 font-gsgs-bold text-[#0C51FF]">{value}</span>
            </p>
          ))}
        </div>

        {/* 연간 가치 시간: 데스크탑=오른쪽 중간, 모바일=왼쪽 중간 */}
        <div className="container-px absolute top-1/2 left-1/2 flex w-full max-w-[950px] -translate-x-1/2 -translate-y-1/2">
          <div className="desktop:ml-auto desktop:w-auto flex w-full max-w-[380px]">
            <div className="desktop:text-right text-left">
              <p className="typography-body-1 font-gsgs-semibold text-[#0C51FF]">
                연 270만 원 가치의 시간이
              </p>
              <p className="typography-body-2 mt-1 text-white/90">이동만 하며 사라지고 있습니다.</p>
            </div>
          </div>
        </div>

        {/* 출처: 이미지 왼쪽 하단, 최대 너비 범위 내 */}
        <div className="container-px desktop:bottom-6 absolute bottom-4 left-1/2 flex w-full max-w-[950px] -translate-x-1/2 flex-col gap-0.5">
          {SECTION_DATA.source.map((line, i) => (
            <p key={i} className="typography-caption text-[#B0B8C4]">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* 3. 말풍선 영역 (연한 파란 배경) - 모바일: 세로 배치 / 데스크탑: 좌우 staggered */}
      <div className="desktop:py-20 w-full bg-[#D7E3FF] py-12">
        <div className="container-px desktop:flex-row desktop:items-stretch desktop:justify-between desktop:gap-8 desktop:px-16 mx-auto flex w-full max-w-[950px] flex-col gap-6">
          {SECTION_DATA.bubbles.map((bubble, i) => (
            <div
              key={i}
              className={cn(
                'desktop:px-8 desktop:py-6 rounded-2xl bg-white px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
                i === 0 ? 'desktop:w-[48%] desktop:self-start' : 'desktop:w-[48%] desktop:self-end',
                bubble.align === 'left' ? 'text-left' : 'desktop:text-center text-right'
              )}
            >
              <p className="typography-body-2 whitespace-pre-line text-[#0F172A]">{bubble.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemSolutionSection;
