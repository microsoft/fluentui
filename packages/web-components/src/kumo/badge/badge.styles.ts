import { css } from '@microsoft/fast-element';
import { forcedColorsStylesheetBehavior } from '../../utils/index.js';
import {
  borderRadiusCircular,
  colorBrandBackground,
  colorNeutralBackground6,
  colorNeutralForeground1,
  colorNeutralForegroundOnBrand,
  colorTransparentBackground,
  colorTransparentStroke,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightSemibold,
  lineHeightBase200,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  strokeWidthThin,
} from '../../theme/design-tokens.js';
import { display } from '../../utils/display.js';
import { brandState, neutralState, transparentState } from '../../styles/states/index.js';

/** Badge styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')} :host {
    position: relative;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightSemibold};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    min-width: 24px;
    height: 24px;
    padding-inline: calc(${spacingHorizontalXS} + ${spacingHorizontalXXS});
    border-radius: ${borderRadiusCircular};
    border-color: ${colorTransparentStroke};
    background-color: ${colorBrandBackground};
    color: ${colorNeutralForegroundOnBrand};
    contain: content;
  }

  ::slotted(svg) {
    font-size: 12px;
  }

  :host::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-style: solid;
    border-width: ${strokeWidthThin};
    border-color: inherit;
    border-radius: inherit;
  }

  :host(${brandState}) {
    background-color: ${colorBrandBackground};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${neutralState}) {
    background-color: ${colorNeutralBackground6};
    color: ${colorNeutralForeground1};
  }

  :host(${transparentState}) {
    background-color: ${colorTransparentBackground};
    color: ${colorNeutralForeground1};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host,
    :host(${transparentState}),
    :host(${neutralState}) {
      border-color: CanvasText;
    }
  `),
);
