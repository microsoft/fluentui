import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Divider } from './divider.js';
import { DividerRole } from './divider.options.js';

export function dividerTemplate<T extends Divider>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="${x => x.role}"
      aria-orientation="${x => (x.role !== DividerRole.presentation ? x.orientation : void 0)}"
    >
      <slot></slot>
    </template>
  `;
}

/**
 * Template for the Divider component
 * @public
 */
export const template: ElementViewTemplate<Divider> = dividerTemplate();
