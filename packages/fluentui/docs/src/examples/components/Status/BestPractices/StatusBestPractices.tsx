import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'The `img` role is used to identify an element as image.',
  'The `title` attribute has to be provided on status component. Then reader narrate content of `title` attribute.',
];

const StatusBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default StatusBestPractices;
