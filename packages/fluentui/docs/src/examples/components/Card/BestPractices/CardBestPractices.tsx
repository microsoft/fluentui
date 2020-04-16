import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Limit use of `aria-roledescription` property to clarifying the purpose of card, or to providing a more specific description of a widget.',
];

const dontList = ['Use `onClick` property together with clickable children.'];

const CardBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default CardBestPractices;
