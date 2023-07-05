import { ElementViewTemplate, elements, html, ref, slotted, when } from '@microsoft/fast-element';
import type { PaneSwitcher } from './pane-switcher.js';
import '../button/define.js';

/**
 * The template for the Pane component.
 * @public
 */
export function paneSwitcherTemplate<T extends PaneSwitcher>(): ElementViewTemplate<T> {
  return html<T>`
    <div class="root" part="root">
      <div class="toggle-buttons">
        <slot name="toggle-buttons" ${slotted({ property: 'slottedToggleButtons', filter: elements() })}> </slot>
      </div>
      <div class="panes">
        <slot ${slotted({ property: 'slottedPanes', filter: elements() })}> </slot>
      </div>
    </div>
  `;
}

export const template: ElementViewTemplate<PaneSwitcher> = paneSwitcherTemplate();
