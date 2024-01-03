import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorBrandBackground2,
  colorNeutralBackground1,
  colorNeutralBackground2,
  colorNeutralStroke1,
  colorStrokeFocus2,
  colorSubtleBackground,
  colorTransparentBackground,
  colorTransparentStroke,
  fontFamilyBase,
  shadow4,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalL,
  spacingVerticalM,
  spacingVerticalS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Card styles
 * @public
 */
export const styles = css`
  ${display('inline-block')}

  :host {
    font-family: ${fontFamilyBase};
    background: ${colorTransparentBackground};
    border-radius: ${borderRadiusMedium};
    position: relative;
    max-width: 100%;
    height: fit-content;
    overflow: hidden;
    box-shadow: ${shadow4};
    box-sizing: border-box;
    width: var(--card-width, 360px);
    height: var(--card-height, fit-content);
    z-index: var(--card-elevation, 1);
  }

  .card:focus-visible::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-color: ${colorBrandBackground2};
    outline: ${strokeWidthThick} solid ${colorTransparentStroke};
    box-shadow: ${shadow4}, 0 0 0 2px ${colorStrokeFocus2};
  }

  .card {
    display: grid;
    row-gap: ${spacingVerticalM};
    column-gap: ${spacingHorizontalM};
    padding: ${spacingVerticalM} ${spacingHorizontalM};
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
  }

  :host([size='small']) .card {
    row-gap: ${spacingVerticalS};
    column-gap: ${spacingHorizontalS};
    padding: ${spacingVerticalS} ${spacingHorizontalS};
  }
  :host([size='large']) .card {
    row-gap: ${spacingVerticalL};
    column-gap: ${spacingHorizontalL};
    padding: ${spacingVerticalL} ${spacingHorizontalL};
  }

  :host([appearance='filled-alternative']) .card {
    background: ${colorNeutralBackground2};
  }
  :host([appearance='outline']) .card {
    background: ${colorTransparentBackground};
    border-color: ${colorNeutralStroke1};
    box-shadow: none;
  }
  :host([appearance='subtle']) .card {
    background: ${colorSubtleBackground};
    border-color: ${colorTransparentStroke};
    box-shadow: none;
  }
`;
