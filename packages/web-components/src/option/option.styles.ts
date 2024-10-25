import { css } from '@microsoft/fast-element';
import { typographyBody1Styles } from '../styles/partials/typography.partials.js';
import { ariaActiveState, multipleState, selectedState } from '../styles/states/index.js';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandBackground,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralForeground2,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStrokeAccessible,
  colorStrokeFocus2,
  colorTransparentStroke,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalSNudge,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { display } from '../utils/display.js';

const slottedCheckedIndicator = css.partial`slot[name='checked-indicator'], ::slotted([slot='checked-indicator'])`;

/**
 * Styles for the {@link (Option:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --border-color: ${colorTransparentStroke};
    --background-color: ${colorNeutralBackground1};
    --color: ${colorNeutralForeground2};
    --multiple-selected-indicator-border-color: transparent;
    --multiple-selected-indicator-background-color: transparent;
    --multiple-selected-indicator-fill: transparent;

    -webkit-tap-highlight-color: transparent;
    background-color: var(--background-color);
    align-items: center;
    border: ${strokeWidthThick} solid var(--border-color);
    border-radius: ${borderRadiusMedium};
    color: var(--color);
    cursor: pointer;
    gap: ${spacingHorizontalXS};
    ${typographyBody1Styles}
    padding-block: ${spacingVerticalSNudge};
    padding-inline: ${spacingHorizontalSNudge};
  }

  :host(${multipleState}) {
    --multiple-selected-indicator-border-color: ${colorNeutralStrokeAccessible};
    --multiple-selected-indicator-background-color: ${colorNeutralBackground1};
  }

  :host(${multipleState}${selectedState}) {
    --multiple-selected-indicator-border-color: ${colorCompoundBrandStroke};
    --multiple-selected-indicator-background-color: ${colorCompoundBrandBackground};
    --multiple-selected-indicator-fill: ${colorNeutralForegroundInverted};
  }

  :host(:hover) {
    --background-color: ${colorNeutralBackground1Hover};
    --color: ${colorNeutralForeground2Hover};
  }

  :host(:active) {
    --background-color: ${colorNeutralBackground1Pressed};
    --color: ${colorNeutralForeground2Pressed};
  }

  :host(${ariaActiveState}),
  :host(:focus-visible) {
    --border-color: ${colorStrokeFocus2};
  }

  :host(:disabled) {
    --background-color: ${colorNeutralBackground1};
    --color: ${colorNeutralForegroundDisabled};
    --multiple-selected-indicator-border-color: ${colorNeutralForegroundDisabled};

    cursor: default;
  }

  .content {
    flex-grow: 1;
    padding-inline: ${spacingHorizontalXXS};
  }

  .checkmark-16-filled,
  .checkmark-12-regular,
  ${slottedCheckedIndicator} {
    aspect-ratio: 1;
    flex: 0 0 auto;
    inline-size: 16px;
  }

  .checkmark-12-regular {
    background-color: var(--multiple-selected-indicator-background-color);
    border: ${strokeWidthThin} solid var(--multiple-selected-indicator-border-color);
    border-radius: ${borderRadiusSmall};
    box-sizing: border-box;
    fill: var(--multiple-selected-indicator-fill);
    position: relative;
  }

  .checkmark-16-filled {
    fill: currentColor;
  }

  ${slottedCheckedIndicator} {
    visibility: hidden;
  }

  :host(${selectedState}) :is(${slottedCheckedIndicator}) {
    visibility: visible;
  }

  :host(${multipleState}) .checkmark-16-filled,
  :host(:not(${multipleState})) .checkmark-12-regular {
    display: none;
  }

  :host(${multipleState}) .checkmark-12-regular {
    visibility: visible;
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      --border-color: Canvas;
    }

    :host(${multipleState}) {
      --multiple-selected-indicator-background-color: Field;
    }

    :host(${multipleState}${selectedState}) {
      --multiple-selected-indicator-border-color: Highlight;
      --multiple-selected-indicator-background-color: Highlight;
      --multiple-selected-indicator-fill: HighlightText;
    }

    :host(:hover) {
      --color: HighlightText;
      --background-color: Highlight;

      forced-color-adjust: none;
    }

    :host(${multipleState}:hover) {
      --multiple-selected-indicator-background-color: transparent;
      --multiple-selected-indicator-border-color: HighlightText;
    }

    :host(${ariaActiveState}),
    :host(:focus-visible) {
      --border-color: Highlight;
      --multiple-selected-indicator-border-color: FieldText;
    }

    :host(:disabled) {
      --background-color: Field;
      --color: GrayText;
    }

    :host(${multipleState}:disabled) {
      --multiple-selected-indicator-border-color: GrayText;
    }
  `),
);
