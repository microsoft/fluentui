import * as React from 'react';
import { Dropdown, dropdownItemClassName, dropdownSlotClassNames } from '@fluentui/react-northstar';

export const inputItems = [
  'Bruce Wayne',
  'Natasha Romanoff',
  'Steven Strange',
  'Alfred Pennyworth',
  `Scarlett O'Hara`,
  'Imperator Furiosa',
  'Bruce Banner',
  'Peter Parker',
  'Selina Kyle',
];

export const selectors = {
  previousFocusableSibling: 'previous-focusable-sibling',
  nextFocusableSibling: 'next-focusable-sibling',
  triggerButtonClass: dropdownSlotClassNames.triggerButton,
  listItem: dropdownItemClassName,
};

const DropdownMoveFocusOnTabExample = () => (
  <>
    <button id={selectors.previousFocusableSibling} />
    <Dropdown multiple moveFocusOnTab items={inputItems} placeholder="Select your heroes" />
    <button id={selectors.nextFocusableSibling} />
  </>
);

export default DropdownMoveFocusOnTabExample;
