import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = ['Use other libraries (for example `react-aria-live`) to announce the skeleton presence.'];

const SkeletonBestPractices = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default SkeletonBestPractices;
