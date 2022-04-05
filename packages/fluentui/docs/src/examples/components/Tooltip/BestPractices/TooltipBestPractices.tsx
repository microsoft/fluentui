import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use `tooltipAsLabelBehavior` if adding tooltip to icon-only button or to another visual-only element without any text, title or label.',
  'Use `tooltipAsDescriptionBehavior` if adding tooltip to a button or to another visual-only element with text, title or label.',
];

const DropdownBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default DropdownBestPractices;
