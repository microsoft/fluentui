import { Button } from '../button/button.js';

/**
 * A CompoundButton component that provides a customizable compound button element.
 * @extends Button
 *
 * @csspart control - The root element of the button.
 * @csspart content - The content of the button.
 *
 * @slot - Default slot for the button's content.
 * @slot start - Slot for content at the start of the button.
 * @slot end - Slot for content at the end of the button.
 * @slot description - Slot for the description content of the button.
 *
 * @summary The CompoundButton component functions as a customizable compound button element.
 *
 * @tag fluent-compound-button
 *
 * @public
 */
export class CompoundButton extends Button {}
