import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use `aria-roledescription` with the value of `splitbutton` on the `button` slot to announce the proper semantics of the component.',
  'Use `aria-describedby` on the `button` slot and an invisible text element to announce that the split button can be opened by Alt+ArrowDown.',
];

const dontList = [];

const SplitButtonBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default SplitButtonBestPractices;
