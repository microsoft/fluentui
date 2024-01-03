import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { FASTListboxElement } from './listbox.element.js';

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTListbox:class)} component.
 * @public
 */
export function listboxTemplate<T extends FASTListboxElement>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      aria-activedescendant="${x => x.ariaActiveDescendant}"
      aria-multiselectable="${x => x.ariaMultiSelectable}"
      role="listbox"
      tabindex="${x => (!x.disabled ? '0' : null)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      @mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}"
    >
      <slot
        ${slotted({
          filter: FASTListboxElement.slottedOptionFilter,
          flatten: true,
          property: 'slottedOptions',
        })}
      ></slot>
    </template>
  `;
}
