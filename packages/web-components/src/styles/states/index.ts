import { css } from '@microsoft/fast-element';

/**
 * Selector for the `primary` state.
 * @public
 */
export const primaryState = css.partial`:is([state--primary], :state(primary))`;

/**
 * Selector for the `outline` state.
 * @public
 */
export const outlineState = css.partial`:is([state--outline], :state(outline))`;

/**
 * Selector for the `subtle` state.
 * @public
 */
export const subtleState = css.partial`:is([state--subtle], :state(subtle))`;

/**
 * Selector for the `transparent` state.
 * @public
 */
export const transparentState = css.partial`:is([state--transparent], :state(transparent))`;

/**
 * Selector for the `circular` state.
 * @public
 */
export const circularState = css.partial`:is([state--circular], :state(circular))`;

/**
 * Selector for the `square` state.
 * @public
 */
export const squareState = css.partial`:is([state--square], :state(square))`;

/**
 * Selector for the `small` state.
 * @public
 */
export const smallState = css.partial`:is([state--small], :state(small))`;

/**
 * Selector for the `large` state.
 * @public
 */
export const largeState = css.partial`:is([state--large], :state(large))`;

/**
 * Selector for the `iconOnly` state.
 * @public
 */
export const iconOnlyState = css.partial`:is([state--icon], :state(icon))`;

/**
 * Selector for the `pressed` state.
 * @public
 */
export const pressedState = css.partial`:is([state--pressed], :state(pressed))`;
