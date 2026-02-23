# 겸사겸사 Landing Page

React + Vite 기반 랜딩 페이지 프로젝트입니다.

## 기술 스택

- **React 19** - UI 라이브러리
- **Vite 7** - 빌드 도구
- **TypeScript** - 타입 안정성
- **Tailwind CSS 4** - 유틸리티 기반 스타일링
- **shadcn UI** - UI 컴포넌트
- **Radix UI** - 접근성 기반 프리미티브
- **React Hook Form** - 폼 상태 관리
- **Zod** - 스키마 검증
- **Lucide React** - 아이콘

## 프로젝트 구조

```
src/
├── app/              # 앱 진입점, 글로벌 스타일
├── components/       # 재사용 컴포넌트
├── pages/            # 페이지 컴포넌트
├── lib/              # 유틸리티, 헬퍼 함수
└── assets/           # 이미지, 아이콘 등 정적 자원
```

## 코드 품질

- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅 (import 정렬, Tailwind 클래스 정렬 포함)
- **Husky** - Git 훅
- **lint-staged** - 커밋 전 자동 린트/포맷 적용

## 시작하기

```bash
pnpm install
pnpm dev
```
