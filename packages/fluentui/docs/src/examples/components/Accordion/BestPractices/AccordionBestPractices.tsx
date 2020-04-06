import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use Accordion for grouping parts of the UI (multipart forms, articles...).',
  'Use Tree component to display a hierarchical structure that allows user to select one item.',
];

const AccordionBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default AccordionBestPractices;
