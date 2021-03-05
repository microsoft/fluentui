import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const dontList = [
  "Don't use as a replacement for actionable component - use `Button` text variant with an icon instead.",
];

const FormBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices dontList={dontList} />;
};

export default FormBestPractices;
