import * as React from 'react';

import { Text } from '@fluentui/react-northstar';
import ComponentBestPractices from '../../../../components/ComponentBestPractices';
import { link } from '../../../../utils/helpers';

const doList = [
  <Text>
    Choose desired accessibility behavior for grid cell depending on the use case.(Check the{' '}
    {link('Behaviors', '/components/table/accessibility')} section).
  </Text>,
  'Provide label to the Table component using `aria-label` or `aria-labelledby` prop. If no label is provided, the whole header will be used as label for the table.',
  'Consider providing label to the `TableRow` component using `aria-label` or `aria-labelledby` prop. When not provided, the whole row (all cells) will ne narrated by the screen reader when the user navigates to the row.',
  'Provide label to the table header column, if cell has no content.',
  'If you use actionable element or component in the cell, stop propagation of the click event in order to avoid performing row click action.',
  'If you use `onClick` on the row, make also one (preferably the first) cell actionable and add `onClick` handler with the same action to it. Screen readers with virtual cursor do not navigate to rows, so actions need to be available on cells as well.',
  'Use `aria-sort` on the header cell to indicate sort order, if the table is sorted by that particular column.',
];

const TableBestPractices = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default TableBestPractices;
