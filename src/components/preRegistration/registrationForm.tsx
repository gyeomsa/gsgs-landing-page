import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { event } from '@/lib/analytics';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

import RegistrationSuccess from './RegistrationSuccess';
import { INTEREST_ROLES, REGIONS, VALIDATION_LIMITS } from './constants';
import { type RegistrationFormData, registrationSchema } from './schema';

/* 공통 폼 스타일 - Input/Select 일관성 및 모바일 터치 영역(44px) */
const INPUT_STYLE =
  'typography-body-2 h-auto min-h-[44px] w-full rounded-md border border-[#CBD5E1] p-4 text-[#0F172A]';
const SELECT_TRIGGER_STYLE =
  'typography-body-2 h-auto! min-h-[44px] w-full! min-w-0! rounded-md border border-[#CBD5E1] p-4! text-[#0F172A]';
const SELECT_ITEM_STYLE =
  'typography-body-2 py-4 pl-4 pr-10 text-[#0F172A] min-h-[44px] focus:bg-[#F1F5F9] focus:text-[#0F172A] data-highlighted:bg-[#F1F5F9] data-highlighted:text-[#0F172A]';

type FormFieldProps = {
  label: React.ReactNode;
  error?: { message?: string };
  labelHtmlFor?: string;
  children: React.ReactNode;
};

function FormField({ label, error, labelHtmlFor, children }: FormFieldProps) {
  const isInvalid = !!error;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={labelHtmlFor} className="typography-body-1 text-[#0F172A]">
        {label}
      </FieldLabel>
      <FieldContent>{children}</FieldContent>
      <FieldError errors={error ? [error] : undefined} />
    </Field>
  );
}

type CheckboxFormFieldProps = {
  label: React.ReactNode;
  error?: { message?: string };
  labelHtmlFor?: string;
  children: React.ReactNode;
  compact?: boolean;
};

function CheckboxFormField({
  label,
  error,
  labelHtmlFor,
  children,
  compact,
}: CheckboxFormFieldProps) {
  const isInvalid = !!error;

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <FieldContent
        className={cn(
          'min-h-[44px] flex-row items-center gap-3 py-1',
          !compact && 'desktop:mb-[66px]'
        )}
      >
        {children}
        <FieldLabel
          htmlFor={labelHtmlFor}
          className={cn(
            'typography-body-1 flex-1 cursor-pointer leading-tight text-[#0F172A]',
            !compact && 'desktop:mb-[24px]'
          )}
        >
          {label}
        </FieldLabel>
      </FieldContent>
      <FieldError errors={error ? [error] : undefined} />
    </Field>
  );
}

function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      interestRole: undefined,
      mainRegion: '',
      departureRegion: '',
      arrivalRegion: '',
      serviceNotificationConsent: true,
      privacyConsent: true,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('preregistrations').insert({
        name: data.name,
        email: data.email,
        interest_role: data.interestRole,
        main_region: data.mainRegion,
        departure_region: data.departureRegion || null,
        arrival_region: data.arrivalRegion || null,
        service_notification_consent: data.serviceNotificationConsent,
        privacy_consent: data.privacyConsent,
      });

      if (error) throw error;
      event('preregistration_complete');
      setIsSubmitted(true);
    } catch (error) {
      console.error('사전등록 실패:', error);
      event('preregistration_error');
      toast.error('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <RegistrationSuccess />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <FieldGroup className="desktop:gap-7 gap-5">
        <FormField label="이름" error={errors.name} labelHtmlFor="name">
          <Input
            id="name"
            type="text"
            placeholder="이름을 입력해주세요"
            maxLength={VALIDATION_LIMITS.name}
            aria-invalid={!!errors.name}
            {...register('name')}
            className={INPUT_STYLE}
          />
        </FormField>

        <FormField label="이메일" error={errors.email} labelHtmlFor="email">
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            maxLength={VALIDATION_LIMITS.email}
            aria-invalid={!!errors.email}
            {...register('email')}
            className={INPUT_STYLE}
          />
        </FormField>

        <FormField label="관심 역할" error={errors.interestRole}>
          <Controller
            name="interestRole"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="desktop:gap-4 flex flex-col gap-3"
                aria-invalid={!!errors.interestRole}
              >
                {INTEREST_ROLES.map(role => (
                  <div
                    key={role}
                    className="flex min-h-[44px] cursor-pointer items-center gap-3 py-2"
                  >
                    <RadioGroupItem value={role} id={`role-${role}`} className="size-5 shrink-0" />
                    <Label
                      htmlFor={`role-${role}`}
                      className="typography-body-1 flex-1 cursor-pointer font-normal text-[#0F172A]"
                    >
                      {role}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </FormField>

        <FormField label="주 이용 지역" error={errors.mainRegion}>
          <Controller
            name="mainRegion"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={SELECT_TRIGGER_STYLE} aria-invalid={!!errors.mainRegion}>
                  <SelectValue placeholder="지역을 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="typography-body-2 border-[#CBD5E1] bg-white text-[#0F172A]">
                  {REGIONS.map(region => (
                    <SelectItem key={region} value={region} className={SELECT_ITEM_STYLE}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="주 이동 출발 지역 (선택)"
          error={errors.departureRegion}
          labelHtmlFor="departureRegion"
        >
          <Input
            id="departureRegion"
            type="text"
            placeholder="출발 지역을 입력해주세요"
            maxLength={VALIDATION_LIMITS.departureRegion}
            aria-invalid={!!errors.departureRegion}
            {...register('departureRegion')}
            className={INPUT_STYLE}
          />
        </FormField>

        <FormField
          label="주 이동 도착 지역 (선택)"
          error={errors.arrivalRegion}
          labelHtmlFor="arrivalRegion"
        >
          <Input
            id="arrivalRegion"
            type="text"
            placeholder="도착 지역을 입력해주세요"
            maxLength={VALIDATION_LIMITS.arrivalRegion}
            aria-invalid={!!errors.arrivalRegion}
            {...register('arrivalRegion')}
            className={INPUT_STYLE}
          />
        </FormField>

        <div className="flex w-full flex-col gap-[24px]">
          <CheckboxFormField
            compact
            label="서비스 출시 알림 신청에 동의합니다"
            error={errors.serviceNotificationConsent}
            labelHtmlFor="serviceNotificationConsent"
          >
            <Controller
              name="serviceNotificationConsent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="serviceNotificationConsent"
                  checked={field.value}
                  onCheckedChange={value => field.onChange(value === true)}
                  aria-invalid={!!errors.serviceNotificationConsent}
                  className="desktop:size-4 size-5 shrink-0"
                />
              )}
            />
          </CheckboxFormField>

          <CheckboxFormField
            compact
            label="개인 정보 수집 및 이용에 동의합니다"
            error={errors.privacyConsent}
            labelHtmlFor="privacyConsent"
          >
            <Controller
              name="privacyConsent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="privacyConsent"
                  checked={field.value}
                  onCheckedChange={value => field.onChange(value === true)}
                  aria-invalid={!!errors.privacyConsent}
                  className="desktop:size-4 size-5 shrink-0"
                />
              )}
            />
          </CheckboxFormField>
        </div>
      </FieldGroup>

      <button
        type="submit"
        disabled={isSubmitting}
        className="typography-cta-button bg-primary text-primary-foreground hover:bg-primary/90 min-h-[48px] w-full rounded-md px-6 py-3 transition-colors disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? '사전등록 중...' : '사전등록 완료하기'}
      </button>
    </form>
  );
}

export default RegistrationForm;
