import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use `gridBehavior` for bidirectional keyboard navigation with arrow keys.',
  'Use `gridHorizontalBehavior` for horizontal keyboard navigation with arrow keys.',
  'Use appropriate ARIA role for the grid and actionable components inside of it when keyboard navigation provided.',
];

const dontList = ["Don't use grid component as a replacement for table."];

const GridBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default GridBestPractices;
