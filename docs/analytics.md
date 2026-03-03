# Google Analytics (GA4) 설정 가이드

겸사겸사 랜딩 페이지의 Google Analytics 4 트래킹 설정 및 활용 방법을 설명합니다.

## 환경 변수 설정

`.env` 파일에 다음 변수를 추가합니다.

```env
VITE_GA_ID=G-XXXXXXXXXX
```

- **측정 ID**는 [Google Analytics](https://analytics.google.com/) → 관리 → 데이터 스트림 → 웹에서 확인할 수 있습니다.
- `VITE_GA_ID`가 비어 있으면 트래킹이 비활성화됩니다. (개발 환경에서 안전하게 사용 가능)

## 구현 구조

| 파일                   | 역할                                    |
| ---------------------- | --------------------------------------- |
| `src/lib/analytics.ts` | GA 초기화, `pageview`, `event` 유틸리티 |
| `src/app/App.tsx`      | SPA 라우트 변경 시 페이지뷰 자동 전송   |

### 동작 방식

- **지연 로딩**: `pageview` 또는 `event`가 처음 호출될 때만 gtag 스크립트를 로드합니다.
- **SPA 대응**: React Router의 `useLocation`으로 경로 변경을 감지하고, 변경 시마다 `pageview`를 전송합니다.

## 수집되는 이벤트

### 1. 페이지뷰 (자동)

- **이벤트**: `page_view` (GA4 기본)
- **트리거**: 페이지 로드, 라우트 변경 시
- **확인**: 보고서 → 참여도 → 페이지 및 화면

### 2. CTA 클릭 (`cta_click`)

사전등록 관련 버튼 클릭을 추적합니다.

| 파라미터   | 값                           | 설명               |
| ---------- | ---------------------------- | ------------------ |
| `location` | `hero`, `ending`, `floating` | 버튼이 위치한 섹션 |
| `device`   | `mobile`, `desktop`          | 디바이스 유형      |

**적용 위치**

- HeroSection: 메인 CTA 버튼
- EndingSection: 사전등록하기 버튼
- FloatingActionButtons: 플로팅 사전등록 버튼

### 3. 공유 (`share`)

링크 공유 시 추적합니다.

| 파라미터   | 값                    | 설명                                            |
| ---------- | --------------------- | ----------------------------------------------- |
| `method`   | `native`, `clipboard` | 공유 방식 (네이티브 공유 시트 vs 클립보드 복사) |
| `location` | `floating`, `ending`  | 공유 버튼 위치                                  |

**적용 위치**

- FloatingActionButtons: 공유 버튼
- EndingSection: 친구에게 공유하기 버튼

### 4. 사전등록 완료 (`preregistration_complete`)

- **트리거**: 사전등록 폼 제출 성공 시
- **용도**: 전환(Conversion) 지표로 활용 권장

### 5. 사전등록 실패 (`preregistration_error`)

- **트리거**: 사전등록 폼 제출 실패 시 (DB 에러, 네트워크 오류 등)

### 6. 탭 전환 (`tab_switch`)

| 파라미터  | 값                 | 설명      |
| --------- | ------------------ | --------- |
| `tab`     | `배달자`, `의뢰인` | 선택된 탭 |
| `section` | `process`          | 섹션 이름 |

**적용 위치**

- ProcessSection: 배달자/의뢰인 탭 전환

## GA4에서 확인하는 방법

### 실시간 확인

1. **보고서** → **실시간**
2. 배포된 사이트에서 버튼 클릭, 페이지 이동 등 수행
3. 실시간 사용자, 이벤트 수 확인

### 이벤트 확인

1. **보고서** → **참여도** → **이벤트**
2. `cta_click`, `share`, `preregistration_complete` 등 커스텀 이벤트 확인

### 전환 설정 (권장)

`preregistration_complete`를 전환으로 등록하면 전환율 분석이 가능합니다.

1. **관리** → **이벤트**
2. `preregistration_complete` 이벤트 찾기
3. **전환으로 표시** 토글 활성화

## 커스텀 이벤트 추가 방법

새로운 이벤트를 추가할 때는 `event` 함수를 사용합니다.

```ts
import { event } from '@/lib/analytics';

// 기본 사용
event('이벤트_이름');

// 파라미터와 함께
event('이벤트_이름', {
  button_name: '예시',
  location: 'hero',
});
```

- 이벤트 이름: `snake_case` 권장
- 파라미터: GA4에서 이벤트별로 필터링·분석 가능
