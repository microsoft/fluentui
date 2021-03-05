import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use `treeAsListBehavior` for `Tree` component, and `treeAsListboxBehavior` for Multi-select `Tree` component, when `Tree` is displayed for macOS.',
  'Provide label to the `Tree` component using `aria-label` or `aria-labelledby` prop.',
  'Due to VoiceOver issue, when using treeAsListboxBehavior on mac, provide label to parent `TreeItem` to state that it is expandable using `aria-label` or `aria-labelledby` prop.',
];

const TreeBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default TreeBestPractices;
