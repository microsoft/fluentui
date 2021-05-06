import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';
import { link, code } from '../../../../utils/helpers';
import { Text } from '@fluentui/react-northstar';

const doList = [
  'Add textual representation if the component only contains an icon (using `title`, `aria-label` or `aria-labelledby` props).',
  'Use react-aria-live or similar component to announce the loading button state change.',
  <Text>
    When button is in loading state, use {code('disabledFocusable')} prop to ensure best experience for screen reader,
    then {link('buttonBehavior', '/components/button/accessibility#default-behavior')} adds {code('aria-disabled')}{' '}
    attribute. When {code('disabled')} attribute is used, then button cannot receive focus.
  </Text>,
];

const ButtonBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default ButtonBestPractices;
