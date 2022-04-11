import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { tokens } from '@fluentui/react-theme';

export const accordionStyles = css`
    ${display('flex')} :host {
      box-sizing: border-box;
      flex-direction: column;
    }

    :host([disabled]) ::slotted(fluent-accordion-item) {
      background-image: none;
      pointer-events: none;
      user-select: none;
      color: ${tokens.colorNeutralForegroundDisabled};
    }
  `;
