import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = ['For good screen reader experience set `aria-label` or `aria-labelledby` attribute for input.'];

const dontList = ['Do not use `placeholder` when using `label` with `labelPosition="inside"`'];

const InputBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default InputBestPractices;
