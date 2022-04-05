import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = ['Add `aria-controls="id1 id2"` for indeterminate checkbox referring to the controls which it depends'];

const dontList = [];

const CheckboxBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default CheckboxBestPractices;
