import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralForeground2,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForeground2Selected,
  colorNeutralForeground3,
  colorNeutralForeground3Hover,
  colorNeutralForeground3Pressed,
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
  }

  :host(:focus-visible) .positioning-region {
    box-shadow: ${spacingVerticalNone} ${spacingVerticalNone} ${spacingVerticalNone} ${spacingVerticalXXS}
      ${colorStrokeFocus2} inset;
  }
  @media (prefers-contrast: more) {
    :host(:focus-visible) .positioning-region {
      outline: 1px solid ${colorStrokeFocus2};
    }
  }

  /**
   * Default variants:
   * Size - medium
   * Appearance - subtle
   */
  .positioning-region {
    padding-inline-start: calc(var(--indent) * ${spacingHorizontalXXL});
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    cursor: pointer;
    height: ${spacingVerticalXXXL};
    padding-inline-end: ${spacingVerticalS};
    border-radius: ${borderRadiusMedium};
    background-color: ${colorSubtleBackground};
    color: ${colorNeutralForeground2};

    & .content-region {
      display: flex;
      align-items: center;
      font-size: ${fontSizeBase300};
      min-width: 0;
      & .chevron-region {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        min-width: 0;
        justify-content: center;
        width: ${spacingHorizontalXXL};
        height: ${spacingVerticalXXL};
        color: ${colorNeutralForeground3};
        transition: transform ${durationFaster} ${curveEasyEaseMax};
        transform: rotate(0deg);

        &:dir(rtl) {
          transform: rotate(180deg);
        }
      }

      & .start-region {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      ::slotted([slot='start']),
      ::slotted(:not([slot])) {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      ::slotted([slot='start']) {
        flex-shrink: 0;
        margin-inline-end: ${spacingHorizontalXS};
      }

      ::slotted(:not([slot])) {
        padding-inline: ${spacingHorizontalXXS};
      }
    }
    & .badging-region,
    & .toolbar-region {
      display: flex;
      align-items: center;
      min-width: 0;
      font-size: ${fontSizeBase300};
    }

    &:hover {
      background-color: ${colorSubtleBackgroundHover};
      color: ${colorNeutralForeground2Hover};
      & .content-region .chevron-region {
        color: ${colorNeutralForeground3Hover};
      }
    }

    &:active {
      background-color: ${colorSubtleBackgroundPressed};
      color: ${colorNeutralForeground2Pressed};
      & .content-region .chevron-region {
        color: ${colorNeutralForeground3Pressed};
      }
    }
  }

  .items {
    display: none;
  }

  :host([expanded]) .items {
    display: block;
  }

  :host([empty]) {
    .chevron-region {
      visibility: hidden;
    }
    .items {
      visibility: hidden;
    }
  }

  /* Appearance - subtle + selected */
  :host([selected]) .positioning-region {
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
    & .content-region .chevron-region {
      color: ${colorNeutralForeground3Selected};
    }
  }

  :host([size='small']) .positioning-region {
    height: ${spacingVerticalXXL};
    padding-inline-start: calc(var(--indent) * ${spacingHorizontalM});
  }

  /* Appearance variants - subtle-alpha */
  :host([appearance='subtle-alpha']) .positioning-region {
    background-color: ${colorSubtleBackground};
    &:hover {
      background-color: ${colorSubtleBackgroundLightAlphaHover};
    }

    &:active {
      background-color: ${colorSubtleBackgroundLightAlphaPressed};
    }
  }
  :host([appearance='subtle-alpha'][selected]) .positioning-region {
    background-color: ${colorSubtleBackgroundLightAlphaSelected};
    color: ${colorNeutralForeground2Selected};
  }

  /* Appearance variants - transparent */
  :host([appearance='transparent']) .positioning-region {
    background-color: ${colorTransparentBackground};
    &:hover {
      background-color: ${colorTransparentBackgroundHover};
    }

    &:active {
      background-color: ${colorTransparentBackgroundPressed};
    }
  }
  :host([appearance='transparent'][selected]) .positioning-region {
    background-color: ${colorTransparentBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host([expanded]) .chevron-region {
    transform: rotate(90deg);
  }
`;
