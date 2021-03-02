import * as React from 'react';
import { Text } from '@fluentui/react-northstar';
import { link } from '../../../../utils/helpers';
import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  <Text>
    Use toolbar as a grouping element only if the group contains 3 or more controls. Refer to{' '}
    {link('toolbar aria practices', 'https://www.w3.org/TR/wai-aria-practices-1.2/#toolbar')} for details.
  </Text>,
  <Text>
    Label each toolbar when the application contains more than one toolbar (using `aria-label` or `aria-labelledby`
    props). Refer to {link('toolbar(role)', 'https://www.w3.org/WAI/PF/aria/roles#toolbar')} for details.
  </Text>,
  'Use `active` prop on a ToolbarMenuItem if you want to have an active icon indicator displayed next to it.',
  'If `Toolbar` contains menu, the menu closes after clicking on one of the menu items. To prevent losing focus, move it manually in the `onClick` handler.',
  'If `Toolbar` contains multiple radio groups in the menu, consider using role="group" and `aria-label` for radio group shorthands',
];

const ToolbarBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default ToolbarBestPractices;
