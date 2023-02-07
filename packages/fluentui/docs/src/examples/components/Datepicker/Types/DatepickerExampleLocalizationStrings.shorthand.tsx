import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleLocalizationStrings = () => {
  const localizationStrings = {
    shortDays: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    days: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    months: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    openCalendarTitle: 'تقويم مفتوح',
    inputPlaceholder: 'حدد التاريخ',
    weekNumberFormatString: 'رقم الأسبوع',
    prevMonthAriaLabel: 'الشهر الماضى',
    nextMonthAriaLabel: 'الشهر القادم',
    prevYearAriaLabel: 'السنة الماضية',
    nextYearAriaLabel: 'العام القادم',
    prevYearRangeAriaLabel: 'نطاق العام السابق',
    nextYearRangeAriaLabel: 'نطاق العام المقبل',
    closeButtonAriaLabel: 'قريب',
    selectedDateFormatString: '{0} التاريخ المحدد',
    todayDateFormatString: '{0} تاريخ اليوم',
    monthPickerHeaderAriaLabel: '{0} حدد لتغيير السنة',
    yearPickerHeaderAriaLabel: '{0} حدد لتغيير الشهر',
    isRequiredErrorMessage: 'مطلوب تحديد التاريخ',
    invalidInputErrorMessage: 'التاريخ الذي تم إدخاله يدويًا ليس بالتنسيق الصحيح.',
    isOutOfBoundsErrorMessage: 'التاريخ المحدد من النطاق المقيد.',
  };
  return <Datepicker {...localizationStrings} today={new Date(2020, 9, 1, 0, 0, 0, 0)} />;
};
export default DatepickerExampleLocalizationStrings;
