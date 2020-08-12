import { Datepicker } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerExampleLocaliation = () => (
  <Datepicker
    shortDays={['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']}
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
  />
);

export default DatepickerExampleLocaliation;
