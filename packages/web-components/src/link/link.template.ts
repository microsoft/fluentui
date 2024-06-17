import { ElementViewTemplate, html, ViewTemplate } from '@microsoft/fast-element';
import type { Link } from './link.js';

/**
 * The template for the Link component.
 * @public
 */
export function anchorTemplate<T extends Link>(): ViewTemplate<T> {
  return html<T>`
    <template
      tabindex="0"
      @click="${(x, c) => x.clickHandler(c.event as PointerEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
      <slot></slot>
    </template>
  `;
}

/**
 * The template for the Link component.
 * @public
 */
export const template: ElementViewTemplate<Link> = anchorTemplate();
