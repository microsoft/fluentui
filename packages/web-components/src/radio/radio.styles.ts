import { css } from '@microsoft/fast-element';
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
import { state } from '../utils/states.js';

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

  :host(${state('checked')}) {
    border-color: ${colorCompoundBrandStroke};
  }

  :host(${state('checked')}) .checked-indicator {
    background-color: ${colorCompoundBrandBackground};
  }

  :host(${state('checked')}:hover) .checked-indicator {
    background-color: ${colorCompoundBrandBackgroundHover};
  }

  :host(:active) {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host(${state('checked')}:active) .checked-indicator {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(${state('disabled')}) {
    background-color: ${colorNeutralBackgroundDisabled};
    border-color: ${colorNeutralStrokeDisabled};
  }

  :host(${state('checked')}${state('disabled')}) .checked-indicator {
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

    :host(:not(${state('disabled')}):hover),
    :host(:not([slot='input']):focus-visible)::after {
      border-color: Highlight;
    }

    .checked-indicator {
      color: HighlightText;
    }

    :host(${state('checked')}) .checked-indicator {
      background-color: FieldText;
    }

    :host(${state('checked')}:not(${state('disabled')}):hover) .checked-indicator {
      background-color: Highlight;
    }

    :host(${state('disabled')}) {
      border-color: GrayText;
      color: GrayText;
    }

    :host(${state('disabled')}${state('checked')}) .checked-indicator {
      background-color: GrayText;
    }
  `),
);
