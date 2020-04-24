import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Provide a function that returns the string equivalent of your item if it is an object using the `itemToString` prop',
  'Provide `getA11ySelectionMessage`, `getA11yStatusMessage`, `noResultsMessage` and `loadingMessage` props to visualize dropdown state correctly.',
  'Provide `aria-label` to `triggerButton` slot for non-searchable variants if the placeholder prop is not used.',
];

const DropdownBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default DropdownBestPractices;
