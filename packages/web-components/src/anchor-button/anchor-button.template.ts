import { type ElementViewTemplate, html, ref, type ViewTemplate } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/start-end.js';
import type { AnchorButton, AnchorOptions } from './anchor-button.js';

/**
 * The template for the Button component.
 * @public
 */
export function anchorTemplate<T extends AnchorButton>(options: AnchorOptions = {}): ViewTemplate<T> {
  return html<T>`
    <template
      @focusin="${(x, c) => x.focusHandler(c.event)}"
      @focusout="${(x, c) => x.focusHandler(c.event)}"
      @pointerdown="${(x, c) => x.focusHandler(c.event)}"
    >
      <a
        download="${x => x.download}"
        href="${x => x.href}"
        hreflang="${x => x.hreflang}"
        part="control"
        ping="${x => x.ping}"
        referrerpolicy="${x => x.referrerpolicy}"
        rel="${x => x.rel}"
        tabindex="0"
        target="${x => x.target}"
        type="${x => x.type}"
        ${ref('control')}
      >
        ${startSlotTemplate(options)}
        <span class="content" part="content">
          <slot></slot>
        </span>
        ${endSlotTemplate(options)}
      </a>
    </template>
  `;
}

/**
 * The template for the Button component.
 * @public
 */
export const template: ElementViewTemplate<AnchorButton> = anchorTemplate();
