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

import { supabase } from '@/lib/supabase';

import RegistrationSuccess from './RegistrationSuccess';
import { INTEREST_ROLES, REGIONS, VALIDATION_LIMITS } from './constants';
import { type RegistrationFormData, registrationSchema } from './schema';

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
      <FieldLabel htmlFor={labelHtmlFor}>{label}</FieldLabel>
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
};

function CheckboxFormField({ label, error, labelHtmlFor, children }: CheckboxFormFieldProps) {
  const isInvalid = !!error;

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <FieldContent className="flex-row items-start gap-2">
        {children}
        <FieldLabel htmlFor={labelHtmlFor} className="cursor-pointer font-normal">
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
      setIsSubmitted(true);
    } catch (error) {
      console.error('사전등록 실패:', error);
      toast.error('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <RegistrationSuccess />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
      <FieldGroup>
        <FormField label="이름" error={errors.name} labelHtmlFor="name">
          <Input
            id="name"
            type="text"
            placeholder="이름을 입력해주세요"
            maxLength={VALIDATION_LIMITS.name}
            aria-invalid={!!errors.name}
            {...register('name')}
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
                className="flex flex-col gap-2"
                aria-invalid={!!errors.interestRole}
              >
                {INTEREST_ROLES.map(role => (
                  <div key={role} className="flex items-center gap-2">
                    <RadioGroupItem value={role} id={`role-${role}`} />
                    <Label htmlFor={`role-${role}`} className="cursor-pointer font-normal">
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
                <SelectTrigger className="w-full" aria-invalid={!!errors.mainRegion}>
                  <SelectValue placeholder="지역을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map(region => (
                    <SelectItem key={region} value={region}>
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
          />
        </FormField>

        <CheckboxFormField
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
              />
            )}
          />
        </CheckboxFormField>

        <CheckboxFormField
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
              />
            )}
          />
        </CheckboxFormField>
      </FieldGroup>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? '제출 중...' : '제출'}
      </button>
    </form>
  );
}

export default RegistrationForm;
