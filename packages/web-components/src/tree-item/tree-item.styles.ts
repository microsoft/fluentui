import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralForeground2,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForeground2Selected,
  colorNeutralForeground3Selected,
  colorStrokeFocus2,
  colorSubtleBackground,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundLightAlphaHover,
  colorSubtleBackgroundLightAlphaPressed,
  colorSubtleBackgroundLightAlphaSelected,
  colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected,
  colorTransparentBackground,
  colorTransparentBackgroundHover,
  colorTransparentBackgroundPressed,
  colorTransparentBackgroundSelected,
  curveEasyEaseMax,
  durationFaster,
  fontSizeBase300,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalXS,
  spacingHorizontalXXL,
  spacingHorizontalXXS,
  spacingVerticalNone,
  spacingVerticalS,
  spacingVerticalXXL,
  spacingVerticalXXS,
  spacingVerticalXXXL,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';

export const styles = css`
  ${display('block')}

  :host {
    outline: none;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  :host(:focus-visible) .positioning-region {
    box-shadow: ${spacingVerticalNone} ${spacingVerticalNone} ${spacingVerticalNone} ${spacingVerticalXXS}
      ${colorStrokeFocus2} inset;
  }

  /**
   * Default variants:
   * Size - medium
   * Appearance - subtle
   */
  .positioning-region {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    height: ${spacingVerticalXXXL};
    padding-inline-start: calc(var(--indent) * ${spacingHorizontalXXL});
    padding-inline-end: ${spacingVerticalS};
    border-radius: ${borderRadiusMedium};
    background-color: ${colorSubtleBackground};
    color: ${colorNeutralForeground2};
    gap: ${spacingHorizontalXS};
  }

  @media (prefers-contrast: more) {
    :host(:focus-visible) .positioning-region {
      outline: 1px solid ${colorStrokeFocus2};
    }
  }

  .content {
    display: flex;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  .chevron {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    width: ${spacingHorizontalXXL};
    height: ${spacingVerticalXXL};
    transition: transform ${durationFaster} ${curveEasyEaseMax};
    transform: rotate(0deg);
  }

  .chevron:dir(rtl) {
    transform: rotate(180deg);
  }

  .chevron svg {
    inline-size: 12px;
    block-size: 12px;
  }

  .aside {
    display: flex;
    align-items: center;
  }

  .positioning-region:hover {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
  }

  .positioning-region:active {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
  }

  ::slotted([slot='start']),
  ::slotted([slot='end']),
  ::slotted(:not([slot])) {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  ::slotted([slot='start']) {
    flex-shrink: 0;
  }

  ::slotted(:not([slot])) {
    padding-inline: ${spacingHorizontalXXS};
  }

  .items {
    display: none;
  }

  :host([expanded]) .items {
    display: block;
  }

  :host([empty]) .chevron,
  :host([empty]) .items {
    visibility: hidden;
  }

  :host([selected]) .positioning-region {
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host([selected]) .content,
  :host([selected]) .chevron {
    color: ${colorNeutralForeground3Selected};
  }

  :host([size='small']) .positioning-region {
    height: ${spacingVerticalXXL};
    padding-inline-start: calc(var(--indent) * ${spacingHorizontalM});
  }

  :host([appearance='subtle-alpha']) .positioning-region:hover {
    background-color: ${colorSubtleBackgroundLightAlphaHover};
  }

  :host([appearance='subtle-alpha']) .positioning-region:active {
    background-color: ${colorSubtleBackgroundLightAlphaPressed};
  }

  :host([appearance='subtle-alpha'][selected]) .positioning-region {
    background-color: ${colorSubtleBackgroundLightAlphaSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host([appearance='transparent']) .positioning-region {
    background-color: ${colorTransparentBackground};
  }

  :host([appearance='transparent']) .positioning-region:hover {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host([appearance='transparent']) .positioning-region:active {
    background-color: ${colorTransparentBackgroundPressed};
  }

  :host([appearance='transparent'][selected]) .positioning-region {
    background-color: ${colorTransparentBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host([expanded]) .chevron {
    transform: rotate(90deg);
  }
`;
