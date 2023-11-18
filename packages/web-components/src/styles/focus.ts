import { cssPartial } from '@microsoft/fast-element';
import { focusStrokeOuter, focusStrokeWidth, strokeWidth } from '../design-tokens';

/**
 * Partial CSS for the focus treatment for most typical sized components like Button, Menu Item, etc.
 *
 * @public
 */
export const focusTreatmentBase = cssPartial`
  outline: calc(${focusStrokeWidth} * 1px) solid ${focusStrokeOuter};
  outline-offset: calc(${focusStrokeWidth} * -1px);
`;

/**
 * Partial CSS for the focus treatment for tighter components with spacing constraints, like Checkbox
 * and Radio, or plain text like Hypertext appearance Anchor or Breadcrumb Item.
 *
 * @public
 */
export const focusTreatmentTight = cssPartial`
  outline: calc(${focusStrokeWidth} * 1px) solid ${focusStrokeOuter};
  outline-offset: calc(${strokeWidth} * 1px);
`;
