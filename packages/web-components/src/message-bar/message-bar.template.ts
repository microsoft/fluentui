import { ElementViewTemplate, html, when } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/index.js';
import type { MessageBar, MessageBarOptions } from './message-bar.js';

const infoIcon =
  html.partial(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10ZM9.50806 8.91012C9.55039 8.67687 9.75454 8.49999 10 8.49999C10.2455 8.49999 10.4496 8.67687 10.4919 8.91012L10.5 8.99999V13.5021L10.4919 13.592C10.4496 13.8253 10.2455 14.0021 10 14.0021C9.75454 14.0021 9.55039 13.8253 9.50806 13.592L9.5 13.5021V8.99999L9.50806 8.91012ZM9.25 6.74999C9.25 6.33578 9.58579 5.99999 10 5.99999C10.4142 5.99999 10.75 6.33578 10.75 6.74999C10.75 7.16421 10.4142 7.49999 10 7.49999C9.58579 7.49999 9.25 7.16421 9.25 6.74999Z"
      fill="currentColor"
    />
  </svg>`);

const warningIcon =
  html.partial(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M8.68149 2.78544C9.24892 1.73813 10.752 1.73821 11.3193 2.78557L17.8198 14.7865C18.3612 15.786 17.6375 17.0009 16.5009 17.0009H3.4982C2.36147 17.0009 1.63783 15.7858 2.17934 14.7864L8.68149 2.78544ZM10.5 7.5C10.5 7.22386 10.2761 7 10 7C9.72386 7 9.5 7.22386 9.5 7.5V11.5C9.5 11.7761 9.72386 12 10 12C10.2761 12 10.5 11.7761 10.5 11.5V7.5ZM10.75 13.75C10.75 13.3358 10.4142 13 10 13C9.58579 13 9.25 13.3358 9.25 13.75C9.25 14.1642 9.58579 14.5 10 14.5C10.4142 14.5 10.75 14.1642 10.75 13.75Z"
      fill="currentColor"
    />
  </svg>`);

const successIcon =
  html.partial(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM13.3584 7.64645C13.1849 7.47288 12.9154 7.4536 12.7206 7.58859L12.6513 7.64645L9 11.298L7.35355 9.65131L7.28431 9.59346C7.08944 9.45846 6.82001 9.47775 6.64645 9.65131C6.47288 9.82488 6.4536 10.0943 6.58859 10.2892L6.64645 10.3584L8.64645 12.3584L8.71569 12.4163C8.8862 12.5344 9.1138 12.5344 9.28431 12.4163L9.35355 12.3584L13.3584 8.35355L13.4163 8.28431C13.5513 8.08944 13.532 7.82001 13.3584 7.64645Z"
      fill="currentColor"
    />
  </svg>`);

const errorIcon =
  html.partial(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 12.5C9.58579 12.5 9.25 12.8358 9.25 13.25C9.25 13.6642 9.58579 14 10 14C10.4142 14 10.75 13.6642 10.75 13.25C10.75 12.8358 10.4142 12.5 10 12.5ZM10 6C9.75454 6 9.55039 6.17688 9.50806 6.41012L9.5 6.5V11L9.50806 11.0899C9.55039 11.3231 9.75454 11.5 10 11.5C10.2455 11.5 10.4496 11.3231 10.4919 11.0899L10.5 11V6.5L10.4919 6.41012C10.4496 6.17688 10.2455 6 10 6Z"
      fill="currentColor"
    />
  </svg>`);

/**
 * Generates a template for the MessageBar component.
 * @public
 * @param {MessageBar} T - The type of the MessageBar.
 * @returns {ElementViewTemplate<T>} - The template for the MessageBar component.
 */
export function messageBarTemplate<T extends MessageBar>(options: MessageBarOptions): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="status"
      aria-live="${(x: T) => x.politeness}"
      aria-labelledby="${(x: T) => x.ariaLabelledBy}"
    >
      <span class="info">
        <slot name="info-icon">
          ${staticallyCompose(options.infoIcon)}
        </slot>
      </span>
      <span class="warning">
        <slot name="warning-icon">
          ${staticallyCompose(options.warningIcon)}
        </slot>
      </span>
      <span class="error">
        <slot name="error-icon">
          ${staticallyCompose(options.errorIcon)}
        </span>
      </span>
      <span class="success">
        <slot name="success-icon">
          ${staticallyCompose(options.successIcon)}</span>
        </slot>
      </span>
      <div class="content">
        <slot></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
      <div class="close">
        <slot name="close"></slot>
      </div>
    </template>
  `;
}

/**
 * The template for the MessageBar component.
 * @type {ElementViewTemplate<MessageBar>}
 */
export const template: ElementViewTemplate<MessageBar> = messageBarTemplate({
  infoIcon: infoIcon,
  errorIcon: errorIcon,
  warningIcon: warningIcon,
  successIcon: successIcon,
});
