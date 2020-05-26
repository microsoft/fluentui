import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';

const doList = [
  'Limit use of `aria-roledescription` property to clarifying the purpose of card, or to providing a more specific description of a widget.',
  'Use `cardBehavior` for disabled cards, so it would not be focusable.',
  'Use `cardsContainerBehavior` for cards container, so it would be navigable using arrows.',
  'Use `cardChildrenFocusableBehavior` for focusable cards with inteactive children.',
  'Use `cardFocusableBehavior` for focusable cards without inteactive children.',
  'Use `cardSelectableBehavior` for selectable cards without inteactive children.',
];

const dontList = [
  'Use `onClick` property together with clickable children.',
  'Create selectable cards with a single text child that has `id`, that might cause incorrect narration in JAWS with virtual cursor navigation',
];

const CardBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default CardBestPractices;
