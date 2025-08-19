import { css } from '@microsoft/fast-element';
import { typographyBody1Styles, typographyCaption1Styles } from '../styles/partials/typography.partials.js';
import { activeState, descriptionState, multipleState, selectedState } from '../styles/states/index.js';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandBackground,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground2,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeDisabled,
  colorStrokeFocus2,
  colorTransparentStroke,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';

/**
 * Styles for the {@link (DropdownOption:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-grid')}

  :host {
    -webkit-tap-highlight-color: transparent;
    ${typographyBody1Styles}
    align-items: center;
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: ${strokeWidthThick} solid ${colorTransparentStroke};
    box-sizing: border-box;
    color: ${colorNeutralForeground2};
    column-gap: ${spacingHorizontalXS};
    cursor: pointer;
    grid-template-areas: 'indicator start content';
    grid-template-columns: auto auto 1fr;
    min-height: 32px;
    padding: ${spacingHorizontalSNudge};
    text-align: start;
  }

  .content {
    grid-area: content;
    line-height: 1;
  }

  ::slotted([slot='start']) {
    grid-area: start;
  }

  :host(:hover) {
    background-color: ${colorNeutralBackground1Hover};
    color: ${colorNeutralForeground2Hover};
  }

  :host(:active) {
    background-color: ${colorNeutralBackground1Pressed};
    color: ${colorNeutralForeground2Pressed};
  }

  :host(:disabled) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForegroundDisabled};
    cursor: default;
  }

  .checkmark-16-filled {
    fill: currentColor;
    width: 16px;
  }

  slot[name='checked-indicator'] > *,
  ::slotted([slot='checked-indicator']) {
    aspect-ratio: 1;
    flex: 0 0 auto;
    grid-area: indicator;
    visibility: hidden;
  }

  :host(${selectedState}) :is(slot[name='checked-indicator'] > *, ::slotted([slot='checked-indicator'])) {
    visibility: visible;
  }

  :host(${multipleState}) .checkmark-16-filled,
  :host(:not(${multipleState})) .checkmark-12-regular {
    display: none;
  }

  :host(${multipleState}) .checkmark-12-regular {
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusSmall};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
    box-sizing: border-box;
    cursor: pointer;
    fill: transparent;
    position: relative;
    visibility: visible;
    width: 16px;
  }

  :host(${multipleState}${selectedState}) .checkmark-12-regular {
    background-color: ${colorCompoundBrandBackground};
    border-color: ${colorCompoundBrandStroke};
    fill: ${colorNeutralForegroundInverted};
  }

  :host(:disabled${multipleState}) .checkmark-12-regular {
    border-color: ${colorNeutralStrokeDisabled};
  }

  :host(:disabled${multipleState}${selectedState}) .checkmark-12-regular {
    background-color: ${colorNeutralBackgroundDisabled};
  }

  :host(${activeState}) {
    border: ${strokeWidthThick} solid ${colorStrokeFocus2};
  }

  @supports (selector(:host(:has(*)))) {
    :host(:has([slot='start']:not([size='16']))) {
      column-gap: ${spacingHorizontalSNudge};
    }
  }

  :host(${descriptionState}) {
    column-gap: ${spacingHorizontalSNudge};
    grid-template-areas:
      'indicator start content'
      'indicator start description';
  }

  ::slotted([slot='description']) {
    color: ${colorNeutralForeground3};
    grid-area: description;
    ${typographyCaption1Styles}
  }
`;
