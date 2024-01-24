import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation';
import type { Popover } from './popover.js';

/**
 * The template for the Popover component.
 * @public
 */
export function PopoverTemplate<T extends Popover>(options: any = {}): ElementViewTemplate<T> {
  return html<T>`
    ${startSlotTemplate(options)}
    <slot></slot>
    <div class="popover-content-container" ?hidden="${x => !x.open}" ?visible="${x => x.open}">
      <slot name="popover-content"></slot>
    </div>
    ${endSlotTemplate(options)}
  `;
}

export const template: ElementViewTemplate<Popover> = PopoverTemplate();
