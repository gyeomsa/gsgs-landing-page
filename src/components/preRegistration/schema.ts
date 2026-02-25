import * as z from 'zod';

import { INTEREST_ROLES, VALIDATION_LIMITS } from './constants';

export const registrationSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(VALIDATION_LIMITS.name, `이름은 ${VALIDATION_LIMITS.name}자 이내로 입력해주세요`),
  email: z
    .string()
    .min(1, { error: '이메일을 입력해주세요' })
    .max(VALIDATION_LIMITS.email, {
      error: `이메일은 ${VALIDATION_LIMITS.email}자 이내로 입력해주세요`,
    })
    .pipe(z.email({ error: '올바른 이메일 형식을 입력해주세요' })),
  interestRole: z.enum(INTEREST_ROLES, {
    error: '관심 역할을 선택해주세요',
  }),
  mainRegion: z.string().min(1, '주 이용 지역을 선택해주세요'),
  departureRegion: z
    .string()
    .max(
      VALIDATION_LIMITS.departureRegion,
      `출발 지역은 ${VALIDATION_LIMITS.departureRegion}자 이내로 입력해주세요`
    )
    .optional(),
  arrivalRegion: z
    .string()
    .max(
      VALIDATION_LIMITS.arrivalRegion,
      `도착 지역은 ${VALIDATION_LIMITS.arrivalRegion}자 이내로 입력해주세요`
    )
    .optional(),
  serviceNotificationConsent: z.boolean().refine(val => val === true, { message: '' }),
  privacyConsent: z.boolean().refine(val => val === true, { message: '' }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
