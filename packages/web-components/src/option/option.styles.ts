import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
  colorStrokeFocus2,
  colorTransparentBackground,
  colorTransparentStroke,
  fontFamilyBase,
  shadow4,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalSNudge,
  strokeWidthThick,
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
    font-family: ${fontFamilyBase};
    cursor: pointer;
    display: inline-flex;
    fill: currentcolor;
    flex-shrink: 0;
    font-size: inherit;
    font-weight: inherit;
    height: 32px;
    line-height: inherit;
    overflow: hidden;
    padding: inherit ${spacingVerticalSNudge};
    user-select: none;
    white-space: nowrap;
    width: 100%;
  }
  :host[aria-checked='true'],
  :host[aria-selected='true'] {
    border-color: ${colorTransparentStroke};
    outline: ${strokeWidthThick} solid ${colorTransparentStroke};
    box-shadow: ${shadow4}, 0 0 0 2px ${colorStrokeFocus2};
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
    cursor: auto;
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
  :host([aria-checked][aria-selected='true']) .checkmark {
    background: var(--checkmark-selected-background, ${colorTransparentBackground});
  }

  .select-indicator {
    display: none;
    height: 100%;
    width: 100%;
  }

  :host([aria-checked]) .select-indicator,
  :host([data-selected]) .select-indicator {
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
