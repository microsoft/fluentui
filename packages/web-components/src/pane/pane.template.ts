import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Pane } from './pane.js';

/**
 * The template for the Pane component.
 * @public
 */

export function paneTemplate<T extends Pane>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="${x => (x.modal ? 'dialog' : 'complementary')}"
      ?open="${x => x.open}"
      ?modal="${x => x.modal}"
      control-size="${x => x.controlSize}"
      position="${x => x.position}"
      focus-target="${x => x.focusTarget}"
      aria-disabled="${x => x.ariaDisabled}"
      aria-hidden="${x => (x.open ? 'false' : 'true')}"
      aria-label="${x => x.ariaLabel}"
      ?trap-focus="${x => x.trapFocus}"
      tabindex="${x => (x.open ? '0' : '-1')}"
      aria-modal="${x => (x.modal ? 'true' : 'false')}"
    >
      <div
        class="pane"
        part="pane"
        aria-modal="${x => (x.modal ? 'true' : 'false')}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-label="${x => x.ariaLabel}"
      >
        <slot></slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Pane> = paneTemplate();
