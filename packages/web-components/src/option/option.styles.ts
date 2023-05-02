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
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    fill: currentcolor;
    display: inline-flex;
    flex-shrink: 0;
    height: 32px;
    outline: none;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    background: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
    padding: 0 ${spacingHorizontalSNudge};
    border-radius: ${borderRadiusMedium};
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    font-family: inherit;
    color: ${colorNeutralForeground2};
    column-gap: ${spacingHorizontalXS};
    padding: inherit ${spacingVerticalSNudge};
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
    color: ${colorNeutralForegroundDisabled};
    background: ${colorNeutralBackground1};
  }

  .before-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin-right: ${spacingHorizontalXXS};
    column-gap: ${spacingHorizontalXS};
  }

  ::slotted([slot='icon']) {
    font-size: var(--icon-size, 20px);
    line-height: 0;
  }

  .checkmark {
    width: 16px;
    height: 16px;
    line-height: 0;
    font-size: var(--checkmark-size, 16px);
    border-radius: ${borderRadiusSmall};
    border: var(--checkmark-border, 0 none);
    color: var(--checkmark-color, ${colorNeutralForeground1});
  }
  :host([aria-selected='true']) .checkmark {
    background: var(--checkmark-selected-background, ${colorTransparentBackground});
  }

  .select-indicator {
    width: 100%;
    height: 100%;
    display: none;
  }

  :host([aria-selected='true']) .select-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    padding-inline: var(--large-content-padding, ${spacingHorizontalXXS});
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: flex;
    flex-direction: row;
  }
`;
