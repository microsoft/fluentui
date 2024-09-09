import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Divider } from './divider.js';

export function dividerTemplate<T extends Divider>(): ElementViewTemplate<T> {
  return html<T>`<slot></slot>`;
}

/**
 * Template for the Divider component
 * @public
 */
export const template: ElementViewTemplate<Divider> = dividerTemplate();
