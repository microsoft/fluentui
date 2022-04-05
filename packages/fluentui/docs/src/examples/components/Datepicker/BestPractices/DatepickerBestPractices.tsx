import * as React from 'react';
import { Text } from '@fluentui/react-northstar';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';
import { link } from '../../../../utils/helpers';

const doList = [
  <Text>
    Use {link('FormDatepicker', '/components/form/definition#usage-datepicker')} example for cases when you need to
    announce validation/requirement errors to the user.
  </Text>,
  'Add localization strings.',
  'Add `aria-*` attributes to describe advanced keyboard navigation shortcuts (Home/End/Page Up/Page Down for navigation in the grid).',
  <Text>
    Use `onDateChange` to access selected date when using{' '}
    {link('Datepicker without input', '#variations-standalone-calendar-input')}.
  </Text>,
];

const dontList = [
  'Use standalone `Datepicker` with allowed user manual date input, because standalone `Datepicker` does not have mechanisms to announce validation errors.',
];

const DatepickerBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default DatepickerBestPractices;
