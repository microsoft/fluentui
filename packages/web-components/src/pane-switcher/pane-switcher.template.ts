import { ElementViewTemplate, html, ref, when } from '@microsoft/fast-element';
import type { PaneSwitcher } from './pane-switcher.js';

/**
 * The template for the Pane component.
 * @public
 */

export function paneSwitcherTemplate<T extends PaneSwitcher>(): ElementViewTemplate<T> {
  return html<T>`
    <div class="root" part="root">
      <div class="toggle-buttons">
        <slot name="toggle-buttons"></slot>
      </div>
      <div class="panes">
        <slot></slot>
      </div>
    </div>
  `;
}

export const template: ElementViewTemplate<PaneSwitcher> = paneSwitcherTemplate();
