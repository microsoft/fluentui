import { css } from '@microsoft/fast-element';
import { typographyBody1Styles } from '../styles/partials/typography.partials.js';
import { disabledState, multipleState, selectedState } from '../styles/states/index.js';
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
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';
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
    -webkit-tap-highlight-color: transparent;
    background-color: ${colorNeutralBackground1};
    align-items: center;
    border: ${strokeWidthThick} solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
    color: ${colorNeutralForeground2};
    cursor: pointer;
    gap: ${spacingHorizontalXS};
    ${typographyBody1Styles}
    height: 32px;
    padding-inline: ${spacingHorizontalSNudge};
  }

  :host(:hover) {
    background-color: ${colorNeutralBackground1Hover};
    color: ${colorNeutralForeground2Hover};
  }

  :host(:active) {
    background-color: ${colorNeutralBackground1Pressed};
    color: ${colorNeutralForeground2Pressed};
  }

  :host(:focus-visible) {
    border-color: ${colorStrokeFocus2};
  }

  :host(${disabledState}) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForegroundDisabled};
  }

  .checkmark-16-filled {
    fill: currentColor;
    width: 16px;
  }

  ${slottedCheckedIndicator} {
    aspect-ratio: 1;
    width: 16px;
    flex: 0 0 auto;
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
    fill: transparent;
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusSmall};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    visibility: visible;
    width: 16px;
  }

  :host(${multipleState}${selectedState}) .checkmark-12-regular {
    background-color: ${colorCompoundBrandBackground};
    border-color: ${colorCompoundBrandStroke};
    fill: ${colorNeutralForegroundInverted};
  }
`;
