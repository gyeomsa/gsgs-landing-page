import delivery01 from '@/assets/process/delivery01.png';
import delivery02 from '@/assets/process/delivery02.png';
import delivery03 from '@/assets/process/delivery03.png';
import delivery04 from '@/assets/process/delivery04.png';

import type { ProcessItem } from './ProcessStepCard';

export const TAB_VALUES = {
  DELIVERY: 'delivery',
  REQUESTER: 'requester',
} as const;

export type TabValue = (typeof TAB_VALUES)[keyof typeof TAB_VALUES];

export const TAB_CONTENTS: Record<(typeof TAB_VALUES)[keyof typeof TAB_VALUES], ProcessItem[]> = {
  [TAB_VALUES.DELIVERY]: [
    {
      image: delivery01,
      title: '루틴 등록',
      description:
        '출퇴근 경로와 시간대를 한번만 등록하세요\n매일 같은 길을 가는 것만으로도 준비 완료!',
    },
    {
      image: delivery02,
      title: '동선과 겹치는 배송 추천',
      description:
        '시스템이 자동으로 내 경로와 맞는 배송을 찾아\n제안해드립니다.\n원하는 것만 선택하세요.',
    },
    {
      image: delivery03,
      title: '가는 길에 픽업 / 전달',
      description:
        '평소처럼 출퇴근하면서 물품을 픽업하고 목적지에서 전달.\n사진으로 간편하게 인증합니다.',
    },
    {
      image: delivery04,
      title: '정산',
      description: '배송 완료 즉시 포인트 적립.\n원하는 시점에 계좌로 출금하세요.',
    },
  ],
  [TAB_VALUES.REQUESTER]: [
    {
      image: delivery01, // TODO: requester01.png로 교체
      title: '출발·도착·시간 입력',
      description: '지도에서 출발지와 도착지를 선택하고,\n희망하는 수령 시간을 입력하세요.',
    },
    {
      image: delivery01, // TODO: requester02.png로 교체
      title: '이동 중인 배송자와 매칭',
      description:
        '시스템이 자동으로 조건에 맞는 배송자를 찾아 연결해드립니다.\n10분 내 매칭 완료!',
    },
    {
      image: delivery01, // TODO: requester03.png로 교체
      title: '사진 인증 후 완료',
      description:
        '픽업과 전달 단계에서 사진으로 배송 상태를 확인할 수 있습니다.\n안전하고 투명한 배송 과정!',
    },
  ],
};
