
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/config';

export function useI18n() {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  return {
    locale,
    t,
    isVietnamese: locale === 'vi',
    isEnglish: locale === 'en'
  };
}
