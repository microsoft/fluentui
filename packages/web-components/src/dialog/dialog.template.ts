import { ElementViewTemplate, html, ref, when } from '@microsoft/fast-element';
import type { Dialog } from './dialog.js';

const dismissed16Regular = html`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m2.59 2.72.06-.07a.5.5 0 0 1 .63-.06l.07.06L8 7.29l4.65-4.64a.5.5 0 0 1 .7.7L8.71 8l4.64 4.65c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L8 8.71l-4.65 4.64a.5.5 0 0 1-.7-.7L7.29 8 2.65 3.35a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
      fill="currentColor"
    ></path>
  </svg>
`;

/**
 * Template for the Dialog component
 * @public
 */
export const template: ElementViewTemplate<Dialog> = html` <div class="positioning-region" part="positioning-region">
  ${when(
    x => x.modal || x.alert,
    html` <div class="overlay" part="overlay" role="presentation" @click="${x => x.dismiss()}"></div> `,
  )}
  <div
    role="dialog"
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
        <slot name="title"></slot>
      </div>
      ${when(
        x => !x.modal && !x.alert,
        html`
          <fluent-button class="close" part="close" appearance="transparent" icon-only @click=${x => x.dismiss()}>
            <slot name="close-icon">${dismissed16Regular}</slot>
          </fluent-button>
        `,
      )}
      <div class="content" part="content">
        <slot></slot>
      </div>
      <div class="actions" part="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</div>`;
