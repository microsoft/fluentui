import { css } from '@microsoft/fast-element';
import { checkedState, disabledState } from '../styles/states/index.js';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorCompoundBrandStroke,
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

/**
 * Styles for the Radio component
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --size: 16px;
    aspect-ratio: 1;
    background-color: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusCircular};
    box-sizing: border-box;
    position: relative;
    width: var(--size);
  }

  :host([size='large']) {
    --size: 20px;
  }

  .checked-indicator {
    aspect-ratio: 1;
    border-radius: ${borderRadiusCircular};
    color: ${colorNeutralForegroundInverted};
    inset: 0;
    margin: auto;
    position: absolute;
    width: calc(var(--size) * 0.625);
  }

  :host(:not([slot='input']))::after {
    content: '' / '';
    position: absolute;
    display: block;
    inset: -8px;
    box-sizing: border-box;
    outline: none;
    border: ${strokeWidthThick} solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
  }

  :host(:not([slot='input']):focus-visible)::after {
    border-color: ${colorStrokeFocus2};
  }

  :host(:hover) {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }

  :host(${checkedState}) {
    border-color: ${colorCompoundBrandStroke};
  }

  :host(${checkedState}) .checked-indicator {
    background-color: ${colorCompoundBrandBackground};
  }

  :host(${checkedState}:hover) .checked-indicator {
    background-color: ${colorCompoundBrandBackgroundHover};
  }

  :host(:active) {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host(${checkedState}:active) .checked-indicator {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(${disabledState}) {
    background-color: ${colorNeutralBackgroundDisabled};
    border-color: ${colorNeutralStrokeDisabled};
  }

  :host(${checkedState}${disabledState}) .checked-indicator {
    background-color: ${colorNeutralStrokeDisabled};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      border-color: FieldText;
    }

    :host(:not([slot='input']:focus-visible))::after {
      border-color: Canvas;
    }

    :host(:not(${disabledState}):hover),
    :host(:not([slot='input']):focus-visible)::after {
      border-color: Highlight;
    }

    .checked-indicator {
      color: HighlightText;
    }

    :host(${checkedState}) .checked-indicator {
      background-color: FieldText;
    }

    :host(${checkedState}:not(${disabledState}):hover) .checked-indicator {
      background-color: Highlight;
    }

    :host(${disabledState}) {
      border-color: GrayText;
      color: GrayText;
    }

    :host(${disabledState}${checkedState}) .checked-indicator {
      background-color: GrayText;
    }
  `),
);
