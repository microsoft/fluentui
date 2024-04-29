import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Limit use of `aria-roledescription` property to clarifying the purpose of card, or to providing a more specific description of a widget.',
  'Use `cardsContainerBehavior` for cards container, so it would be navigable using arrows.',
  'Use `cardChildrenFocusableBehavior` for focusable cards with interactive children.',
  'Use `cardFocusableBehavior` for focusable cards without interactive children.',
  'Use `cardSelectableBehavior` for selectable cards without interactive children.',
];

const dontList = [
  'Use `onClick` property together with interactive children.',
  'Create selectable cards with a single text child that has `id`. It might cause incorrect narration in NVDA with virtual cursor navigation.',
];

const CardBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default CardBestPractices;
