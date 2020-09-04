import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use `Form.Datepicker` example for cases when you need to announce validation/requirement errors to the user.',
  'Add `aria-*` attributes to describe advanced keyboard navigation shortcuts.',
];

const dontList = ['Use standalone `Datepicker` with allowed user manual date input.'];

const DatepickerBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default DatepickerBestPractices;
