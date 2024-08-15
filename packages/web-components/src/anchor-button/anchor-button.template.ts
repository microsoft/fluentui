import { ElementViewTemplate, html, ViewTemplate } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import type { AnchorButton, AnchorOptions } from './anchor-button.js';

/**
 * The template for the Button component.
 * @public
 */
export function anchorTemplate<T extends AnchorButton>(options: AnchorOptions = {}): ViewTemplate<T> {
  return html<T>`
    <template
      tabindex="0"
      @click="${(x, c) => x.clickHandler(c.event as PointerEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
      ${startSlotTemplate(options)}
      <span class="content" part="content">
        <slot></slot>
      </span>
      ${endSlotTemplate(options)}
    </template>
  `;
}

/**
 * The template for the Button component.
 * @public
 */
export const template: ElementViewTemplate<AnchorButton> = anchorTemplate();
