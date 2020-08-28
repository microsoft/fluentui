import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleLocalizationStrings = () => (
  <Datepicker
    shortDays={['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']}
    days={['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']}
    months={[
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
    ]}
    today={new Date(2020, 9, 1, 0, 0, 0, 0)}
  />
);

export default DatepickerExampleLocalizationStrings;
