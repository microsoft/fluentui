import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Pane } from './pane.js';

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
 * The template for the Pane component.
 * @public
 */

export function paneTemplate<T extends Pane>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="${x => (x.modal ? 'dialog' : 'complementary')}"
      ?compact="${x => x.compact}"
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
      <div class="toolbar-container" ?hidden="${x => !x.toolbar}">
        <div class="close">
          <fluent-button appearance="transparent" icon-only @click="${x => x.closePane()}">
            <slot name="close-icon"></slot>
          </fluent-button>
        </div>
      </div>
      <div class="header-container">
        <div class="header"><slot name="header"></slot></div>
        <div ?hidden="${x => x.toolbar}" class="close">
          <fluent-button appearance="transparent" icon-only @click="${x => x.closePane()}">
            <slot name="close-icon"></slot>
          </fluent-button>
        </div>
      </div>
      <div class="subheader-container">
        <slot name="subheader"><slot>
      </div>
      <slot></slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Pane> = paneTemplate();
