//Copied from @microsoft/fast-foundation

import { Direction } from '@microsoft/fast-web-utilities';

/**
 * Determines the current localization direction of an element.
 *
 * @param rootNode - the HTMLElement to begin the query from, usually "this" when used in a component controller
 * @returns the localization direction of the element
 *
 * @public
 */
export const getDirection = (rootNode: HTMLElement): Direction => {
  return rootNode.closest<HTMLElement>('[dir]')?.dir === 'rtl' ? Direction.rtl : Direction.ltr;
};
