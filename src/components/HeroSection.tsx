import type { ReactNode } from 'react';

import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

import brandIcon from '@/assets/hero/brand-icon.png';
import character from '@/assets/hero/character01.png';
import desktopHero from '@/assets/hero/desktop-hero.png';

const HERO_SECTION_DATA = {
  tagline: '일상의 이동을 가치 있게',
  brandIcon: brandIcon,
  headline: ['매일 반복되는 그 길이', '수익이 되는 순간'],
  description: '출퇴근·등하굣길을 활용한\n초저비용 배송 플랫폼',
  character: character,
  cta: {
    text: '사전등록하고 얼리버드 혜택 받기',
    subText: '배송인, 의뢰인 모두 사전등록 가능',
    desktopHref: '#register', // 섹션 스크롤
    mobileHref: '/preregistration', // 라우터 이동
  },
};

function FeatureSection({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-[94px] flex-1 items-center justify-center rounded-[20px] py-[16px]"
      style={{
        border: '2px solid var(--semantic-border-secondary, #D2D2D2)',
        background: 'var(--semantic-background-subtle, #F1F5FF)',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="text-center">{children}</div>
    </div>
  );
}

function HeroSection() {
  const { text, subText, desktopHref, mobileHref } = HERO_SECTION_DATA.cta;

  return (
    <>
      <section className="container-px flex max-h-[706px] justify-between">
        <div className="desktop:gap-[140px] flex w-full flex-col gap-[44px]">
          {/* 아이콘 */}
          <div className="desktop:gap-[24px] flex flex-col gap-[14px] pt-[60px]">
            <p className="typography-body-1 text-semantic-text-brand">
              {HERO_SECTION_DATA.tagline}
            </p>
            <div className="desktop:w-[425px] w-[192px]">
              <img
                src={HERO_SECTION_DATA.brandIcon}
                alt="brand-icon"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          {/* 헤드라인, 설명 */}
          <div className="flex w-full">
            <div className="desktop:gap-[28px] mb-[52px] flex w-full flex-col justify-end gap-[240px]">
              <div>
                {HERO_SECTION_DATA.headline.map(headline => (
                  <p
                    key={headline}
                    className="typography-heading-3 text-semantic-background-surface"
                  >
                    {headline}
                  </p>
                ))}
              </div>
              <p className="typography-body-1 text-semantic-text-secondary desktop:whitespace-normal desktop:justify-start desktop:text-start flex justify-center text-center whitespace-pre-line">
                {HERO_SECTION_DATA.description}
              </p>
            </div>
            <div className="desktop:block hidden w-[260px]">
              <img
                src={HERO_SECTION_DATA.character}
                alt="character"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
        {/* 폰 이미지 - 아래 section 위로 겹침 */}
        <div className="desktop:block desktop:-mb-[80px] relative z-10 hidden max-w-[740px]">
          <img src={desktopHero} alt="desktop-hero" />
        </div>
      </section>
      <section
        className="desktop:gap-[124px] desktop:rounded-t-[120px] flex flex-col items-center gap-[100px] pt-[32px] pb-[66px]"
        style={{
          background:
            'linear-gradient(180deg, var(--component-card-feature, rgba(143, 175, 255, 0.44)) 0%, rgba(255, 255, 255, 0.44) 100%)',
        }}
      >
        <div className="gap-gsgs-8 flex flex-col items-center gap-[16px]">
          <div className="gap-gsgs-12 flex">
            {/* 모바일 버튼 - h-auto로 글자 높이 반영 */}
            <Button
              asChild
              className="typography-cta-button desktop:hidden h-auto min-h-0 px-[1.5em] py-[0.75em]"
            >
              <Link to={mobileHref}>{text}</Link>
            </Button>
            {/* 데스크탑 버튼 - h-auto로 글자 높이 반영 */}
            <Button
              asChild
              className="typography-cta-button desktop:inline-flex text-semantic-text-default hover:bg-gsgs-neutral-100 hidden h-auto min-h-0 min-w-[388px] rounded-[30px] bg-white px-[1.5em] py-[1.2em] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
            >
              <a href={desktopHref}>{text}</a>
            </Button>
          </div>
          <p className="typography-body-2 text-semantic-text-secondary">{subText}</p>
        </div>
        <div className="desktop:flex-row desktop:max-w-[948px] flex w-full max-w-2/5 flex-col justify-center gap-[24px]">
          <FeatureSection>
            오토바이 기반 배송 대비 <br /> 탄소 <span>70%</span> 절감
          </FeatureSection>
          <FeatureSection>
            <span>월 10만원</span> + 추가 수익
          </FeatureSection>
          <FeatureSection>
            기존 퀵 대비 <br /> <span>60% 저렴</span>
          </FeatureSection>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
