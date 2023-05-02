import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  borderRadiusNone,
  borderRadiusSmall,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
  colorTransparentBackground,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalSNudge,
} from '../theme/design-tokens.js';

/** Option styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}
  :host {
    align-items: center;
    background: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
    column-gap: ${spacingHorizontalXS};
    color: ${colorNeutralForeground2};
    cursor: pointer;
    display: inline-flex;
    fill: currentcolor;
    flex-shrink: 0;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    height: 32px;
    line-height: inherit;
    outline: none;
    overflow: hidden;
    padding: inherit ${spacingVerticalSNudge};
    user-select: none;
    white-space: nowrap;
    width: 100%;
  }
  :host([hidden]) {
    display: none;
  }
  :host(:hover) {
    background: ${colorNeutralBackground1Hover};
  }
  :host(:active) {
    background-color: ${colorNeutralBackground1Pressed};
  }
  :host([disabled]) {
    background: ${colorNeutralBackground1};
    color: ${colorNeutralForegroundDisabled};
  }

  .before-content {
    align-items: center;
    column-gap: ${spacingHorizontalXS};
    display: flex;
    justify-content: center;
    margin-right: ${spacingHorizontalXXS};
    width: fit-content;
  }

  ::slotted([slot='icon']) {
    font-size: var(--icon-size, 20px);
    line-height: 0;
  }

  .checkmark {
    border: var(--checkmark-border, 0 none);
    border-radius: ${borderRadiusSmall};
    color: var(--checkmark-color, ${colorNeutralForeground1});
    font-size: var(--checkmark-size, 16px);
    height: 16px;
    line-height: 0;
    width: 16px;
  }
  :host([aria-selected='true']) .checkmark {
    background: var(--checkmark-selected-background, ${colorTransparentBackground});
  }

  .select-indicator {
    display: none;
    height: 100%;
    width: 100%;
  }

  :host([aria-selected='true']) .select-indicator {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .content {
    overflow: hidden;
    padding-inline: var(--large-content-padding, ${spacingHorizontalXXS});
    text-overflow: ellipsis;
  }
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: flex;
    flex-direction: row;
  }
`;
