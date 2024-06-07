import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  borderRadiusCircular,
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground3,
  colorNeutralForeground3Hover,
  colorNeutralForeground3Pressed,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralForegroundInvertedHover,
  colorNeutralForegroundInvertedPressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorStrokeFocus2,
  colorTransparentBackground,
  colorTransparentStroke,
  curveEasyEase,
  durationNormal,
  shadow4,
  spacingHorizontalXXS,
  strokeWidthThick,
} from '../theme/design-tokens.js';

/**
 * Selector for the `checked` state.
 * @public
 */
const checkedState = css.partial`:is([state--checked], :state(checked))`;

export const styles = css`
  ${display('inline-flex')}

  :host {
    box-sizing: border-box;
    align-items: center;
    flex-direction: row;
    outline: none;
    user-select: none;
    contain: content;
    padding: 0 ${spacingHorizontalXXS};
    width: 40px;
    height: 20px;
    background-color: ${colorTransparentBackground};
    border: 1px solid ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusCircular};
    cursor: pointer;
  }

  :host(:hover) {
    background: none;
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:active) {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host(:disabled),
  :host([readonly]) {
    border: 1px solid ${colorNeutralStrokeDisabled};
    background-color: none;
    pointer: default;
  }
  :host(${checkedState}) {
    background: ${colorCompoundBrandBackground};
    border-color: ${colorCompoundBrandBackground};
  }
  :host(${checkedState}:hover) {
    background: ${colorCompoundBrandBackgroundHover};
    border-color: ${colorCompoundBrandBackgroundHover};
  }
  :host(${checkedState}:active) {
    background: ${colorCompoundBrandBackgroundPressed};
    border-color: ${colorCompoundBrandBackgroundPressed};
  }
  :host(${checkedState}:disabled) {
    background: ${colorNeutralBackgroundDisabled};
    border-color: ${colorNeutralStrokeDisabled};
  }
  .checked-indicator {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    margin-inline-start: 0;
    background-color: ${colorNeutralForeground3};
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveEasyEase};
    transition-property: margin-inline-start;
  }
  :host(${checkedState}) .checked-indicator {
    background-color: ${colorNeutralForegroundInverted};
    margin-inline-start: calc(100% - 14px);
  }
  :host(${checkedState}:hover) .checked-indicator {
    background: ${colorNeutralForegroundInvertedHover};
  }
  :host(${checkedState}:active) .checked-indicator {
    background: ${colorNeutralForegroundInvertedPressed};
  }
  :host(:hover) .checked-indicator {
    background-color: ${colorNeutralForeground3Hover};
  }
  :host(:active) .checked-indicator {
    background-color: ${colorNeutralForeground3Pressed};
  }
  :host(:disabled) .checked-indicator,
  :host([readonly]) .checked-indicator {
    background: ${colorNeutralForegroundDisabled};
  }
  :host(${checkedState}:disabled) .checked-indicator {
    background: ${colorNeutralForegroundDisabled};
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:not([slot='input']):focus-visible) {
    border-color: ${colorTransparentStroke};
    outline: ${strokeWidthThick} solid ${colorTransparentStroke};
    box-shadow: ${shadow4}, 0 0 0 2px ${colorStrokeFocus2};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      border-color: InactiveBorder;
    }
    :host(${checkedState}),
    :host(${checkedState}:active),
    :host(${checkedState}:hover) {
      background: Highlight;
      border-color: Highlight;
    }
    .checked-indicator,
    :host(:hover) .checked-indicator,
    :host(:active) .checked-indicator {
      background-color: ActiveCaption;
    }
    :host(${checkedState}) .checked-indicator,
    :host(${checkedState}:hover) .checked-indicator,
    :host(${checkedState}:active) .checked-indicator {
      background-color: ButtonFace;
    }
  `),
);
