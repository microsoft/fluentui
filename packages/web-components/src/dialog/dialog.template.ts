import { ElementViewTemplate, html, ref, when } from '@microsoft/fast-element';
import type { Dialog } from './dialog.js';

/**
 * Template for the Dialog component
 * @public
 */
export const template: ElementViewTemplate<Dialog> = html`
  <div class="positioning-region" part="positioning-region">
    ${when(
      x => x.modal || x.alert,
      html` <div class="overlay" part="overlay" role="presentation" @click="${x => x.dismiss()}"></div> `,
    )}
    <div
      role="${x => (x.alert ? 'alertdialog' : 'dialog')}"
      tabindex="-1"
      class="control"
      part="control"
      aria-modal="${x => (x.modal ? x.modal : void 0)}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
      ${ref('dialog')}
    >
      <div class="root" part="root">
        <div class="header" part="header">
          <slot name="header"></slot>
          <slot name="close"></slot>
        </div>

        <div class="content" part="content">
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
`;
