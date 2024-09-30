import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { SplitButton } from './split-button.js';

export function splitButtonTemplate<T extends SplitButton>(): ElementViewTemplate<T> {
  return html<T>`<slot></slot>`;
}

/**
 * Template for the Split Button component
 * @public
 */
export const template: ElementViewTemplate<SplitButton> = splitButtonTemplate();
