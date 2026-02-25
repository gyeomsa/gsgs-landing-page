import * as z from 'zod';

import { INTEREST_ROLES } from './constants';

export const registrationSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z
    .string()
    .min(1, { error: '이메일을 입력해주세요' })
    .pipe(z.email({ error: '올바른 이메일 형식을 입력해주세요' })),
  interestRole: z.enum(INTEREST_ROLES, {
    error: '관심 역할을 선택해주세요',
  }),
  mainRegion: z.string().min(1, '주 이용 지역을 선택해주세요'),
  departureRegion: z.string().optional(),
  arrivalRegion: z.string().optional(),
  serviceNotificationConsent: z.boolean().refine(val => val === true, { error: '' }),
  privacyConsent: z.boolean().refine(val => val === true, { error: '' }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
