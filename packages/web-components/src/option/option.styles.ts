import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalS,
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
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    height: 32px;
    line-height: ${lineHeightBase300};
    outline: none;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    background: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
    padding: 0 ${spacingHorizontalSNudge};
    border-radius: ${borderRadiusMedium};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground2};
    column-gap: ${spacingHorizontalXS};
    padding: ${spacingVerticalSNudge} ${spacingHorizontalS};
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
    width: 16px;
    height: 16px;
    margin-right: ${spacingHorizontalXXS};
    color: ${colorNeutralForeground2};
  }

  .single-select,
  .multi-select {
    display: none;
  }

  :host([aria-selected='true']) .multi-select {
    display: var(--display-multiple-checkmark);
  }

  :host([aria-selected='true']) .single-select {
    display: var(--display-single-checkmark);
  }

  .content {
    padding: 0 ${spacingHorizontalXXS};
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: flex;
    flex-direction: row;
  }
`;
