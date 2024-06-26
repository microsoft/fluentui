import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorCompoundBrandStroke,
  colorCompoundBrandStrokeHover,
  colorCompoundBrandStrokePressed,
  colorNeutralBackground1,
  colorNeutralBackgroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorStrokeFocus2,
  colorTransparentStroke,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { display } from '../utils/display.js';
import { circularState, largeState } from '../styles/states/index.js';

/**
 * Selector for the `checked` state.
 * @public
 */
const checkedState = css.partial`:is([state--checked], :state(checked))`;

/**
 * Selector for the `indeterminate` state.
 * @public
 */
const indeterminateState = css.partial`:is([state--indeterminate], :state(indeterminate))`;

/** Checkbox styles
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --size: 16px;
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusSmall};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    width: var(--size);
  }

  :host,
  .indeterminate-indicator,
  .checked-indicator {
    aspect-ratio: 1;
  }

  :host(:hover) {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }

  :host(:active) {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host(${checkedState}:hover) {
    background-color: ${colorCompoundBrandBackgroundHover};
    border-color: ${colorCompoundBrandStrokeHover};
  }

  :host(${checkedState}:active) {
    background-color: ${colorCompoundBrandBackgroundPressed};
    border-color: ${colorCompoundBrandStrokePressed};
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:not([slot='input']))::after {
    content: '';
    position: absolute;
    inset: -8px;
    box-sizing: border-box;
    outline: none;
    border: ${strokeWidthThick} solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
  }

  :host(:not([slot='input']):focus-visible)::after {
    border-color: ${colorStrokeFocus2};
  }

  .indeterminate-indicator,
  .checked-indicator {
    color: ${colorNeutralForegroundInverted};
    inset: 0;
    margin: auto;
    position: absolute;
  }

  ::slotted([slot='checked-indicator']),
  .checked-indicator {
    fill: currentColor;
    display: inline-flex;
    flex: 1 0 auto;
    width: 12px;
  }

  :host(:not(${checkedState})) *:is(::slotted([slot='checked-indicator']), .checked-indicator) {
    display: none;
  }

  :host(${checkedState}),
  :host(${indeterminateState}) {
    border-color: ${colorCompoundBrandStroke};
  }

  :host(${checkedState}),
  :host(${indeterminateState}) .indeterminate-indicator {
    background-color: ${colorCompoundBrandBackground};
  }

  :host(${indeterminateState}) .indeterminate-indicator {
    border-radius: ${borderRadiusSmall};
    position: absolute;
    width: calc(var(--size) / 2);
    inset: 0;
  }

  :host(${largeState}) {
    --size: 20px;
  }

  :host(${largeState}) ::slotted([slot='checked-indicator']),
  :host(${largeState}) .checked-indicator {
    width: 16px;
  }

  :host(${circularState}),
  :host(${circularState}) .indeterminate-indicator {
    border-radius: ${borderRadiusCircular};
  }

  :host([disabled]),
  :host([disabled]${checkedState}) {
    background-color: ${colorNeutralBackgroundDisabled};
    border-color: ${colorNeutralStrokeDisabled};
  }

  :host([disabled]) {
    cursor: unset;
  }

  :host([disabled]${indeterminateState}) .indeterminate-indicator {
    background-color: ${colorNeutralStrokeDisabled};
  }

  :host([disabled]${checkedState}) .checked-indicator {
    color: ${colorNeutralStrokeDisabled};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      border-color: FieldText;
    }

    :host(:not([slot='input']:focus-visible))::after {
      border-color: Canvas;
    }

    :host(:not([disabled]):hover),
    :host(${checkedState}:not([disabled]):hover),
    :host(:not([slot='input']):focus-visible)::after {
      border-color: Highlight;
    }

    .indeterminate-indicator,
    .checked-indicator {
      color: HighlightText;
    }

    :host(${checkedState}),
    :host(${indeterminateState}) .indeterminate-indicator {
      background-color: FieldText;
    }

    :host(${checkedState}:not([disabled]):hover),
    :host(${indeterminateState}:not([disabled]):hover) .indeterminate-indicator {
      background-color: Highlight;
    }

    :host([disabled]) {
      border-color: GrayText;
    }

    :host([disabled]${indeterminateState}) .indeterminate-indicator {
      background-color: GrayText;
    }

    :host([disabled]),
    :host([disabled]${checkedState}) .checked-indicator {
      color: GrayText;
    }
  `),
);
