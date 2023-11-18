import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';
import { link } from '../../../../utils/helpers';
import { Text } from '@fluentui/react-northstar';

const doList = [
  'Provide a function that returns the string equivalent of your item if it is an object using the `itemToString` prop',
  'Provide `getA11ySelectionMessage`, `getA11yStatusMessage`, `noResultsMessage` and `loadingMessage` props to visualize dropdown state correctly.',
  'Provide `aria-label` to `triggerButton` slot for non-searchable variants if the placeholder prop is not used.',
  <Text>
    Provide corresponding "getA11yStatusMessage" if `loadingMessage` prop is used. Refer to{' '}
    {link('loading example', '#state-loading')} for details.
  </Text>,
];

const dontList = [
  'Use the `id` property in `items` shorthand as it breaks the aria-activedescendant relationship between the trigger and the item.',
];

const DropdownBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default DropdownBestPractices;
