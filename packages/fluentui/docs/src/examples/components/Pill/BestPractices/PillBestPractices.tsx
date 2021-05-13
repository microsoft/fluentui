import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use aria-label for PillGroup.',
  'Use aria-multiselectable="true" for PillGroup when multiple Pills can be selected',
];

const PillBestPractices = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default PillBestPractices;
