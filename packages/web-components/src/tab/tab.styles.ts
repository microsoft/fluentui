import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandStroke,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1Hover,
  colorStrokeFocus1,
  colorStrokeFocus2,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightSemibold,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalMNudge,
} from '../theme/design-tokens.js';

export const styles = css`
  ${display('inline-flex')}

  :host {
    position: relative;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    justify-content: center;
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    color: ${colorNeutralForeground2};
    fill: currentcolor;
    grid-row: 1;
    padding: ${spacingHorizontalM} ${spacingHorizontalMNudge};
    border-radius: ${borderRadiusMedium};
    gap: 4px;
  }
  :host .tab-content {
    display: inline-flex;
    flex-direction: column;
    padding: 0 2px;
  }

  :host([aria-selected='true']) {
    color: ${colorNeutralForeground1};
    font-weight: ${fontWeightSemibold};
  }

  /* adds hidden textContent to prevent shifting ui on bold / unbolding of text */
  :host .tab-content::after {
    content: var(--textContent);
    visibility: hidden;
    height: 0;
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightSemibold};
  }

  :host([aria-selected='true'])::after {
    background-color: ${colorCompoundBrandStroke};
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    position: absolute;
    z-index: 2;
  }

  :host([aria-selected='false']:hover)::after {
    background-color: ${colorNeutralStroke1Hover};
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    position: absolute;
    z-index: 1;
  }

  :host([aria-selected='true'][disabled])::after {
    background-color: ${colorNeutralForegroundDisabled};
  }

  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: flex;
  }
  :host([disabled]) {
    cursor: not-allowed;
    fill: ${colorNeutralForegroundDisabled};
    color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]:hover)::after {
    background-color: unset;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    border-radius: ${borderRadiusSmall};
    box-shadow: 0 0 0 3px ${colorStrokeFocus2};
    outline: 1px solid ${colorStrokeFocus1};
  }

  :host([data-hasIndent]) {
    display: grid;
    grid-template-columns: 20px 1fr auto;
  }

  :host([data-hasIndent]) .tab-content {
    grid-column: 2;
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host([aria-selected='true'])::after {
      background-color: Highlight;
    }
  `),
);
