import logoWhite from '@/assets/logo/logo_white.svg';

const FOOTER_DATA = {
  tagline: '일상의 이동이 배송이 되는 새로운 플랫폼',
  service: {
    title: '서비스',
    links: [
      { label: '서비스 소개', href: '/#problem' },
      { label: '이용방법', href: '/#process' },
      {
        label: '사전등록',
        href: '/#register',
        mobileHref: '/preregistration',
      },
    ],
  },
  contact: {
    title: '문의',
    email: 'contact@gyeomsa.com',
    kakao: '카카오톡: @겸사겸사',
  },
  copyright: '© 2026 겸사겸사. All rights reserved.',
};

function Footer() {
  return (
    <footer className="w-full bg-[#2D2D2D] text-white">
      <div className="container-px desktop:flex-row desktop:items-start desktop:justify-between desktop:gap-16 mx-auto flex max-w-[950px] flex-col gap-10 py-12">
        {/* 브랜드 - 아이콘·설명 영역, 더 넓은 너비 + 왼쪽 정렬 */}
        <div className="desktop:min-w-[420px] desktop:flex-1 flex flex-col items-start gap-2">
          <img src={logoWhite} alt="겸사겸사" className="h-8 w-auto" />
          <p className="typography-body-2 max-w-[380px] text-left text-white/90">
            {FOOTER_DATA.tagline}
          </p>
        </div>

        {/* 서비스 링크 */}
        <div className="flex flex-col gap-3">
          <h3 className="typography-body-1 font-gsgs-semibold">{FOOTER_DATA.service.title}</h3>
          <nav className="flex flex-col gap-2">
            {FOOTER_DATA.service.links.map(link => {
              const desktopHref = link.href;
              const mobileHref = 'mobileHref' in link ? link.mobileHref : link.href;
              const hasDifferentHref = desktopHref !== mobileHref;
              return hasDifferentHref ? (
                <span key={link.label} className="relative">
                  <a
                    href={desktopHref}
                    className="typography-body-2 desktop:inline hidden text-white/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                  <a
                    href={mobileHref}
                    className="typography-body-2 desktop:hidden text-white/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </span>
              ) : (
                <a
                  key={link.label}
                  href={desktopHref}
                  className="typography-body-2 text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* 문의 */}
        <div className="flex flex-col gap-3">
          <h3 className="typography-body-1 font-gsgs-semibold">{FOOTER_DATA.contact.title}</h3>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${FOOTER_DATA.contact.email}`}
              className="typography-body-2 text-white/90 transition-colors hover:text-white"
            >
              {FOOTER_DATA.contact.email}
            </a>
            <p className="typography-body-2 text-white/90">{FOOTER_DATA.contact.kakao}</p>
          </div>
        </div>
      </div>

      {/* 구분선 + 저작권 */}
      <div className="container-px mx-auto max-w-[950px] border-t border-white/20 pt-8 pb-10">
        <p className="typography-caption text-center text-white/70">{FOOTER_DATA.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
