import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use react-aria-live or similar component to announce the loading state.',
  'If loader is only the element in the screen or region, consider making it focusable by setting `tabIndex` prop to the `Loader`. In most of these cases value of `tabIndex` should be 0.',
];

const LoaderBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default LoaderBestPractices;
