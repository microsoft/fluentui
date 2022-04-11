import { css } from '@microsoft/fast-element';
import {
  display,
  focusVisible,
} from '@microsoft/fast-foundation';
import { tokens } from '@fluentui/react-theme';

export const accordionItemStyles = css`
    ${display('flex')} :host {
      box-sizing: border-box;
      font-family: ${tokens.fontFamilyBase};
      font-size: ${tokens.fontSizeBase300};
      flex-direction: column;
      margin: 0;
      padding: 0 10px;
      background: ${tokens.colorNeutralBackground1};
      color: ${tokens.colorNeutralForeground1};
      border-radius: 2px;
      width: calc(100% - 22px);
      --accordion-item-height: 44px;
    }

    .region {
      display: none;
    }

    .heading {
      display: flex;
      position: relative;
      align-items: center;
    }

    .button {
      appearance: none;
      border: none;
      background: none;
      order: 3;
      outline: none;
      margin: 0;
      text-align: left;
      color: inherit;
      cursor: pointer;
      font-family: inherit;
      font-size: inherit;
      height: var(--accordion-item-height);
    }

    .button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      cursor: pointer;
    }

    /* needs focus styles */
    .button:${focusVisible}::before {
      outline: none;
    }

    :host(.expanded) .region {
      display: block;
      margin-inline: 12px;
    }

    .expand-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      order: 1;
      pointer-events: none;
    }

    .expand-icon,
    ::slotted([slot="start"]) {
      margin-inline-end: 8px;
    }

    :host([expanded]) .expand-icon {
      transform: rotate(90deg);
    }

    ::slotted([slot="start"]) {
      display: flex;
      align-items: center;
      justify-content: center;
      order: 2;
    }

    ::slotted([slot="end"]) {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-inline-start: 8px;
      order: 4;
    }

    .expand-icon,
    ::slotted([slot="start"]),
    ::slotted([slot="end"]) {
      fill: currentcolor;
      width: 20px;
      height: 20px;
      font-size: 20px;
    }

    :host([size="small"]) {
      --accordion-item-height: 32px;
    }

    :host([size="small"]) .button {
      font-size: ${tokens.fontSizeBase200};
    }

    :host([size="large"]) .button {
      font-size: ${tokens.fontSizeBase400};
    }

    :host([size="extra-large"]) .button {
      font-size: ${tokens.fontSizeBase500};
    }

    :host([expand-icon-position="end"]) .expand-icon {
      margin-inline-end: 0;
      margin-inline-start: auto;
      order: 4;
      transform: rotate(90deg);
    }

    :host([expanded][expand-icon-position="end"]) .expand-icon {
      transform: rotate(-90deg);
    }
  `;
