import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Use actionable components (for example `Button`) if the reactions need to be actionable.',
  'Add textual representation to the `icon` slot if it only contains an icon (using `title` or `aria-label` props on the slot).',
];

const ReactionBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />;
};

export default ReactionBestPractices;
