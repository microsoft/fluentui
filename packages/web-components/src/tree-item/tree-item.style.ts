// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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

export const styles = css`
  :host {
    display: block;
    outline: none;
    /**
     * The tree-view's font-size is 0, so 1em = 0px,
     * by applying this, we are going to have:
     *
     * Medium/Default:
     * <tree-item> font-size: 24px
     *     <tree-item> font-size: 48px
     *         <tree-item> font-size: 72px
     *             ...
     */
    font-size: calc(1em + ${spacingHorizontalXXL});
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
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    cursor: pointer;

    height: ${spacingVerticalXXXL};
    padding-inline-end: ${spacingVerticalS};
    border-radius: ${borderRadiusMedium};
    background-color: ${colorSubtleBackground};
    color: ${colorNeutralForeground2};

    /**
     * The positioning-region's font size is inherited from host element,
     * therefore:
     *
     * indentation: 0
     *     indentation: 24
     *         indentation: 48
     *             ...
     */
    padding-inline-start: calc(1em - ${spacingHorizontalXXL});

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

      & .start-region,
      & .middle-region {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      & .start-region {
        flex-shrink: 0;
        margin-inline-end: ${spacingHorizontalXS};
      }

      & .middle-region {
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

  /* Appearance - subtle + selected */
  :host([selected]) .positioning-region {
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
    & .content-region .chevron-region {
      color: ${colorNeutralForeground3Selected};
    }
  }

  /* Size variants - small */
  :host(.small) {
    /**
     *
     * <tree-item> font-size: 12px
     *     <tree-item> font-size: 24px
     *         <tree-item> font-size: 36px
     *             ...
     */
    font-size: calc(1em + ${spacingHorizontalM});
  }

  :host(.small) .positioning-region {
    height: ${spacingVerticalXXL};
    /**
     *
     * indentation: 0
     *     indentation: 12
     *         indentation: 24
     *             ...
     */
    padding-inline-start: calc(1em - ${spacingHorizontalM});
  }

  :host(.leaf) .positioning-region {
    /**
     * According to the designs, the indentation of the leaf item will be 24px larger than non-leaf item,
     * So we don't need to subtract with the ${spacingHorizontalXXL} or ${spacingHorizontalM}, and just set it to 1em
     */
    padding-inline-start: 1em;
  }
  :host(.leaf.small) .positioning-region {
    padding-inline-start: calc(1em + ${spacingHorizontalM});
  }

  /* Appearance variants - subtle-alpha */
  :host(.subtle-alpha) .positioning-region {
    background-color: ${colorSubtleBackground};
    &:hover {
      background-color: ${colorSubtleBackgroundLightAlphaHover};
    }

    &:active {
      background-color: ${colorSubtleBackgroundLightAlphaPressed};
    }
  }
  :host(.subtle-alpha[selected]) .positioning-region {
    background-color: ${colorSubtleBackgroundLightAlphaSelected};
    color: ${colorNeutralForeground2Selected};
  }

  /* Appearance variants - transparent */
  :host(.transparent) .positioning-region {
    background-color: ${colorTransparentBackground};
    &:hover {
      background-color: ${colorTransparentBackgroundHover};
    }

    &:active {
      background-color: ${colorTransparentBackgroundPressed};
    }
  }
  :host(.transparent[selected]) .positioning-region {
    background-color: ${colorTransparentBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host([expanded]) .chevron-region {
    transform: rotate(90deg);
  }
`;
