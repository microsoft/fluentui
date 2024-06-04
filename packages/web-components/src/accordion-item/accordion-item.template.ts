import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import { staticallyCompose } from '../utils/index.js';
import type { AccordionItem, AccordionItemOptions } from './accordion-item.js';

const chevronRight20Filled = html.partial(`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="default-collapsed-icon"
>
  <path
    d="M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z"
    fill="currentColor"
  />
</svg>`);

const chevronDown20Filled = html.partial(`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="default-expanded-icon"
>
  <path
    d="M15.794 7.73271C16.0797 8.03263 16.0681 8.50737 15.7682 8.79306L10.5178 13.7944C10.2281 14.0703 9.77285 14.0703 9.48318 13.7944L4.23271 8.79306C3.93279 8.50737 3.92125 8.03263 4.20694 7.73271C4.49264 7.43279 4.96737 7.42125 5.26729 7.70694L10.0005 12.2155L14.7336 7.70694C15.0336 7.42125 15.5083 7.43279 15.794 7.73271Z"
    fill="currentColor"
  />
</svg>`);

export function accordionItemTemplate<T extends AccordionItem>(
  options: AccordionItemOptions = {},
): ElementViewTemplate<T> {
  return html<T>`
      <div
          class="heading"
          part="heading"
          role="heading"
          aria-level="${x => x.headinglevel}"
      >
          <button
              class="button"
              part="button"
              ${ref('expandbutton')}
              ?disabled="${x => (x.disabled ? 'true' : void 0)}"
              aria-expanded="${x => x.expanded}"
              aria-controls="${x => x.id}-panel"
              id="${x => x.id}"
              @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
          >
              <span class="heading-content" part="heading-content">
                  <slot name="heading"></slot>
              </span>
          </button>
          ${startSlotTemplate(options)}
          ${endSlotTemplate(options)}
          <span class="icon" part="icon" aria-hidden="true">
              <slot name="expanded-icon">
                  ${staticallyCompose(options.expandedIcon)}
              </slot>
              <slot name="collapsed-icon">
                  ${staticallyCompose(options.collapsedIcon)}
              </slot>
          <span>
      </div>
      <div
          class="region"
          part="region"
          id="${x => x.id}-panel"
          role="region"
          aria-labelledby="${x => x.id}"
      >
          <slot></slot>
      </div>
`;
}

/**
 * The template for the fluent-accordion component.
 * @public
 */
export const template: ElementViewTemplate<AccordionItem> = accordionItemTemplate({
  collapsedIcon: chevronRight20Filled,
  expandedIcon: chevronDown20Filled,
});
