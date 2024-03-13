import { ElementViewTemplate, html, ref, slotted, ViewTemplate } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import type { AnchorButton, AnchorOptions } from './anchor-button.js';

/**
 * The template for the Button component.
 * @public
 */
export function anchorTemplate<T extends AnchorButton>(options: AnchorOptions = {}): ViewTemplate<T> {
  return html<T>`
    <a
      class="control"
      part="control"
      download="${x => x.download}"
      href="${x => x.href}"
      hreflang="${x => x.hreflang}"
      ping="${x => x.ping}"
      referrerpolicy="${x => x.referrerpolicy}"
      rel="${x => x.rel}"
      target="${x => x.target}"
      type="${x => x.type}"
      aria-atomic="${x => x.ariaAtomic}"
      aria-busy="${x => x.ariaBusy}"
      aria-controls="${x => x.ariaControls}"
      aria-current="${x => x.ariaCurrent}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-details="${x => x.ariaDetails}"
      aria-disabled="${x => x.ariaDisabled}"
      aria-errormessage="${x => x.ariaErrormessage}"
      aria-expanded="${x => x.ariaExpanded}"
      aria-flowto="${x => x.ariaFlowto}"
      aria-haspopup="${x => x.ariaHaspopup}"
      aria-hidden="${x => x.ariaHidden}"
      aria-invalid="${x => x.ariaInvalid}"
      aria-keyshortcuts="${x => x.ariaKeyshortcuts}"
      aria-label="${x => x.ariaLabel}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-live="${x => x.ariaLive}"
      aria-owns="${x => x.ariaOwns}"
      aria-relevant="${x => x.ariaRelevant}"
      aria-roledescription="${x => x.ariaRoledescription}"
      ${ref('control')}
    >
      ${startSlotTemplate(options)}
      <span class="content" part="content">
        <slot ${slotted('defaultSlottedContent')}></slot>
      </span>
      ${endSlotTemplate(options)}
    </a>
  `;
}

/**
 * The template for the Button component.
 * @public
 */
export const template: ElementViewTemplate<AnchorButton> = anchorTemplate();
