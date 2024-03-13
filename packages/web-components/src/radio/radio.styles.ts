import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation/utilities.js';
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
    gap: var(${spacingHorizontalXS});
    align-items: center;
    height: 32px;
    cursor: pointer;
    outline: none;
    position: relative;
    user-select: none;
    color: blue;
    color: var(--state-color, var(${colorNeutralForeground3}));
    padding-inline-end: var(${spacingHorizontalS});
    --control-border-color: var(${colorNeutralStrokeAccessible});
    --checked-indicator-background-color: var(${colorCompoundBrandForeground1});
    --state-color: var(${colorNeutralForeground3});
  }
  :host([disabled]) {
    --control-border-color: var(${colorNeutralForegroundDisabled});
    --checked-indicator-background-color: var(${colorNeutralForegroundDisabled});
    --state-color: var(${colorNeutralForegroundDisabled});
  }
  .label {
    cursor: pointer;
    font-family: var(${fontFamilyBase});
    font-size: var(${fontSizeBase300});
    font-weight: var(${fontWeightRegular});
    line-height: var(${lineHeightBase300});
  }
  .label__hidden {
    display: none;
  }
  .control {
    box-sizing: border-box;
    align-items: center;
    border: 1px solid var(--control-border-color, var(${colorNeutralStrokeAccessible}));
    border-radius: var(${borderRadiusCircular});
    display: flex;
    height: 16px;
    justify-content: center;
    margin: var(${spacingVerticalS}) var(${spacingHorizontalS});
    position: relative;
    width: 16px;
    justify-self: center;
  }
  .checked-indicator {
    border-radius: var(${borderRadiusCircular});
    height: 10px;
    opacity: 0;
    width: 10px;
  }
  :host([aria-checked='false']:hover) .control {
    color: var(${colorNeutralForeground2});
  }
  :host(:focus-visible) {
    border-radius: var(${borderRadiusSmall});
    box-shadow: 0 0 0 3px var(${colorStrokeFocus2});
    outline: 1px solid var(${colorStrokeFocus1});
  }
  :host(:hover) .control {
    border-color: var(${colorNeutralStrokeAccessibleHover});
  }
  :host(:active) .control {
    border-color: var(${colorNeutralStrokeAccessiblePressed});
  }
  :host([aria-checked='true']) .checked-indicator {
    opacity: 1;
  }
  :host([aria-checked='true']) .control {
    border-color: var(--control-border-color, var(${colorNeutralStrokeAccessible}));
  }
  :host([aria-checked='true']) .checked-indicator {
    background-color: var(--checked-indicator-background-color, var(${colorCompoundBrandForeground1}));
  }
  :host([aria-checked='true']:hover) .control {
    border-color: var(${colorCompoundBrandStrokeHover});
  }
  :host([aria-checked='true']:hover) .checked-indicator {
    background-color: var(${colorCompoundBrandStrokeHover});
  }
  :host([aria-checked='true']:active) .control {
    border-color: var(${colorCompoundBrandStrokePressed});
  }
  :host([aria-checked='true']:active) .checked-indicator {
    background: var(${colorCompoundBrandForeground1Pressed});
  }
  :host([disabled]) {
    color: var(${colorNeutralForegroundDisabled});
    pointer-events: none;
  }
  :host([disabled]) .control {
    pointer-events: none;
    border-color: var(${colorNeutralForegroundDisabled});
  }
  :host([disabled]) .checked-indicator {
    background: var(${colorNeutralForegroundDisabled});
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
