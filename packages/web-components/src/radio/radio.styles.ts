import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  borderRadiusCircular,
  borderRadiusSmall,
  colorCompoundBrandForeground1,
  colorCompoundBrandForeground1Pressed,
  colorCompoundBrandStrokeHover,
  colorCompoundBrandStrokePressed,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorStrokeFocus1,
  colorStrokeFocus2,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalS,
} from '../theme/design-tokens.js';

/** Radio styles
 * @public
 */
export const styles = css`
  ${display('inline-grid')}

  :host {
    grid-auto-flow: column;
    grid-template-columns: max-content;
    gap: ${spacingHorizontalXS};
    align-items: center;
    height: 32px;
    cursor: pointer;
    outline: none;
    position: relative;
    user-select: none;
    color: blue;
    color: var(--state-color, ${colorNeutralForeground3});
    padding-inline-end: ${spacingHorizontalS};
    --control-border-color: ${colorNeutralStrokeAccessible};
    --checked-indicator-background-color: ${colorCompoundBrandForeground1};
    --state-color: ${colorNeutralForeground3};
  }
  :host([disabled]) {
    --control-border-color: ${colorNeutralForegroundDisabled};
    --checked-indicator-background-color: ${colorNeutralForegroundDisabled};
    --state-color: ${colorNeutralForegroundDisabled};
  }
  .label {
    cursor: pointer;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }
  .label__hidden {
    display: none;
  }
  .control {
    box-sizing: border-box;
    align-items: center;
    border: 1px solid var(--control-border-color, ${colorNeutralStrokeAccessible});
    border-radius: ${borderRadiusCircular};
    display: flex;
    height: 16px;
    justify-content: center;
    margin: ${spacingVerticalS} ${spacingHorizontalS};
    position: relative;
    width: 16px;
    justify-self: center;
  }
  .checked-indicator {
    border-radius: ${borderRadiusCircular};
    height: 10px;
    opacity: 0;
    width: 10px;
  }
  :host([aria-checked='false']:hover) .control {
    color: ${colorNeutralForeground2};
  }
  :host(:focus-visible) {
    border-radius: ${borderRadiusSmall};
    box-shadow: 0 0 0 3px ${colorStrokeFocus2};
    outline: 1px solid ${colorStrokeFocus1};
  }
  :host(:hover) .control {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:active) .control {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host([aria-checked='true']) .checked-indicator {
    opacity: 1;
  }
  :host([aria-checked='true']) .control {
    border-color: var(--control-border-color, ${colorNeutralStrokeAccessible});
  }
  :host([aria-checked='true']) .checked-indicator {
    background-color: var(--checked-indicator-background-color, ${colorCompoundBrandForeground1});
  }
  :host([aria-checked='true']:hover) .control {
    border-color: ${colorCompoundBrandStrokeHover};
  }
  :host([aria-checked='true']:hover) .checked-indicator {
    background-color: ${colorCompoundBrandStrokeHover};
  }
  :host([aria-checked='true']:active) .control {
    border-color: ${colorCompoundBrandStrokePressed};
  }
  :host([aria-checked='true']:active) .checked-indicator {
    background: ${colorCompoundBrandForeground1Pressed};
  }
  :host([disabled]) {
    color: ${colorNeutralForegroundDisabled};
    pointer-events: none;
  }
  :host([disabled]) .control {
    pointer-events: none;
    border-color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) .checked-indicator {
    background: ${colorNeutralForegroundDisabled};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host .control {
      border-color: InactiveBorder;
    }
    :host([aria-checked='true']) .checked-indicator,
    :host([aria-checked='true']:active) .checked-indicator,
    :host([aria-checked='true']:hover) .checked-indicator {
      background-color: Highlight;
      border-color: ActiveBorder;
    }
  `),
);
