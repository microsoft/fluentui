import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use warning and danger variants to announce the alert by the screen reader.',
  'Use other libraries (for example `react-aria-live`) if the content of default or success variant needs to be announced.',
  'Add textual representation to action slot if they only contain an icon (using `title`, `aria-label` or `aria-labelledby` props on the slot).',
  'Add textual representation to `dismissAction` slot if it contains only an icon.',
];

const PopupBestPractices = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default PopupBestPractices;
