import { ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation';
import type { Popover } from './popover.js';

/**
 * The template for the Popover component.
 * @public
 */
export function PopoverTemplate<T extends Popover>(options: any = {}): ElementViewTemplate<T> {
  return html<T>`
    ${startSlotTemplate(options)}
    <slot name="popover-trigger" ${slotted('anchorReferences')}></slot>
    <div class="popover-container" id="${x => x.targetId}" popover="${x => x.mode}" ${ref('popoverReference')}>
      <slot name="popover-content"></slot>
    </div>
    ${endSlotTemplate(options)}
  `;
}

export const template: ElementViewTemplate<Popover> = PopoverTemplate();
