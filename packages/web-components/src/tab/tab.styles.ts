import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation/utilities.js';
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
    flex-direction: column;
    cursor: pointer;
    box-sizing: border-box;
    justify-content: center;
    line-height: var(${lineHeightBase300});
    font-family: var(${fontFamilyBase});
    font-size: var(${fontSizeBase300});
    color: var(${colorNeutralForeground2});
    fill: currentcolor;
    grid-row: 1;
    padding: var(${spacingHorizontalM}) var(${spacingHorizontalMNudge});
    border-radius: var(${borderRadiusMedium});
  }
  :host .tab-content {
    display: inline-flex;
    flex-direction: column;
    padding: 0 2px;
  }

  :host([aria-selected='true']) {
    color: var(${colorNeutralForeground1});
    font-weight: var(${fontWeightSemibold});
  }

  /* adds hidden textContent to prevent shifting ui on bold / unbolding of text */
  :host .tab-content::after {
    content: var(--textContent);
    visibility: hidden;
    height: 0;
    line-height: var(${lineHeightBase300});
    font-weight: var(${fontWeightSemibold});
  }

  :host([aria-selected='true'])::after {
    background-color: var(${colorCompoundBrandStroke});
    border-radius: var(${borderRadiusCircular});
    content: '';
    inset: 0;
    position: absolute;
    z-index: 2;
  }

  :host([aria-selected='false']:hover)::after {
    background-color: var(${colorNeutralStroke1Hover});
    border-radius: var(${borderRadiusCircular});
    content: '';
    inset: 0;
    position: absolute;
    z-index: 1;
  }

  :host([aria-selected='true'][disabled])::after {
    background-color: var(${colorNeutralForegroundDisabled});
  }

  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: flex;
  }
  ::slotted([slot='start']) {
    margin-inline-end: 11px;
  }
  ::slotted([slot='end']) {
    margin-inline-start: 11px;
  }
  :host([disabled]) {
    cursor: not-allowed;
    fill: var(${colorNeutralForegroundDisabled});
    color: var(${colorNeutralForegroundDisabled});
  }

  :host([disabled]:hover)::after {
    background-color: unset;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    border-radius: var(${borderRadiusSmall});
    box-shadow: 0 0 0 3px var(${colorStrokeFocus2});
    outline: 1px solid var(${colorStrokeFocus1});
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host([aria-selected='true'])::after {
      background-color: Highlight;
    }
  `),
);
