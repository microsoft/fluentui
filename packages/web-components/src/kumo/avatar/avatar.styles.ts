import { css } from '@microsoft/fast-element';
import { display } from '../../utils/index.js';
import {
  borderRadiusCircular,
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderRadiusXLarge,
  colorBrandBackgroundStatic,
  colorNeutralBackground1,
  colorNeutralBackground6,
  colorNeutralForeground3,
  colorNeutralForegroundStaticInverted,
  colorPaletteAnchorBackground2,
  colorPaletteAnchorForeground2,
  colorPaletteBeigeBackground2,
  colorPaletteBeigeForeground2,
  colorPaletteBlueBackground2,
  colorPaletteBlueForeground2,
  colorPaletteBrassBackground2,
  colorPaletteBrassForeground2,
  colorPaletteBrownBackground2,
  colorPaletteBrownForeground2,
  colorPaletteCornflowerBackground2,
  colorPaletteCornflowerForeground2,
  colorPaletteCranberryBackground2,
  colorPaletteCranberryForeground2,
  colorPaletteDarkGreenBackground2,
  colorPaletteDarkGreenForeground2,
  colorPaletteDarkRedBackground2,
  colorPaletteDarkRedForeground2,
  colorPaletteForestBackground2,
  colorPaletteForestForeground2,
  colorPaletteGoldBackground2,
  colorPaletteGoldForeground2,
  colorPaletteGrapeBackground2,
  colorPaletteGrapeForeground2,
  colorPaletteLavenderBackground2,
  colorPaletteLavenderForeground2,
  colorPaletteLightTealBackground2,
  colorPaletteLightTealForeground2,
  colorPaletteLilacBackground2,
  colorPaletteLilacForeground2,
  colorPaletteMagentaBackground2,
  colorPaletteMagentaForeground2,
  colorPaletteMarigoldBackground2,
  colorPaletteMarigoldForeground2,
  colorPaletteMinkBackground2,
  colorPaletteMinkForeground2,
  colorPaletteNavyBackground2,
  colorPaletteNavyForeground2,
  colorPalettePeachBackground2,
  colorPalettePeachForeground2,
  colorPalettePinkBackground2,
  colorPalettePinkForeground2,
  colorPalettePlatinumBackground2,
  colorPalettePlatinumForeground2,
  colorPalettePlumBackground2,
  colorPalettePlumForeground2,
  colorPalettePumpkinBackground2,
  colorPalettePumpkinForeground2,
  colorPalettePurpleBackground2,
  colorPalettePurpleForeground2,
  colorPaletteRedBackground2,
  colorPaletteRedForeground2,
  colorPaletteRoyalBlueBackground2,
  colorPaletteRoyalBlueForeground2,
  colorPaletteSeafoamBackground2,
  colorPaletteSeafoamForeground2,
  colorPaletteSteelBackground2,
  colorPaletteSteelForeground2,
  colorPaletteTealBackground2,
  colorPaletteTealForeground2,
  curveAccelerateMax,
  curveAccelerateMid,
  curveAccelerateMin,
  curveDecelerateMax,
  curveDecelerateMid,
  curveDecelerateMin,
  curveEasyEase,
  curveEasyEaseMax,
  curveLinear,
  durationFaster,
  durationSlower,
  durationUltraSlow,
  fontFamilyBase,
  fontSizeBase100,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontSizeBase500,
  fontSizeBase600,
  fontWeightRegular,
  fontWeightSemibold,
  shadow16,
  shadow28,
  shadow4,
  shadow8,
  strokeWidthThick,
  strokeWidthThicker,
  strokeWidthThickest,
  strokeWidthThin,
} from '../../theme/design-tokens.js';

const animations = {
  fastOutSlowInMax: curveDecelerateMax,
  fastOutSlowInMid: curveDecelerateMid,
  fastOutSlowInMin: curveDecelerateMin,
  slowOutFastInMax: curveAccelerateMax,
  slowOutFastInMid: curveAccelerateMid,
  slowOutFastInMin: curveAccelerateMin,
  fastEase: curveEasyEaseMax,
  normalEase: curveEasyEase,
  nullEasing: curveLinear,
};

/** Avatar styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')} :host {
    position: relative;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    font-size: ${fontSizeBase100};
    font-weight: ${fontWeightRegular};
    font-family: ${fontFamilyBase};
    border-radius: ${borderRadiusCircular};
    color: ${colorNeutralForeground3};
    background-color: ${colorNeutralBackground6};
    contain: layout style;
  }

  .default-icon,
  ::slotted(svg) {
    width: 16px;
    height: 16px;
    font-size: 16px;
  }

  ::slotted(img) {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: ${borderRadiusCircular};
  }

  ::slotted([slot='badge']) {
    position: absolute;
    bottom: 0;
    right: 0;
    box-shadow: 0 0 0 ${strokeWidthThin}) ${colorNeutralBackground1};
  }

  :host([active]) {
    /* Work-around for text pixel snapping at the end of the animation */
    transform: perspective(1px);
    transition-property: transform, opacity;
    transition-duration: ${durationUltraSlow}, ${durationFaster};
    transition-delay: ${animations.fastEase}, ${animations.nullEasing};
  }

  :host([active])::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: inherit;
    transition-property: margin, opacity;
    transition-duration: ${durationUltraSlow}), ${durationSlower};
    transition-delay: ${animations.fastEase}), ${animations.nullEasing});
  }
  :host([active])::before {
    box-shadow: ${shadow8};
    border-style: solid;
    border-color: ${colorBrandBackgroundStatic};
  }

  :host([active='inactive']) {
    opacity: 0.8;
    transform: scale(0.875);
    transition-property: transform, opacity;
    transition-duration: ${durationUltraSlow}, ${durationFaster};
    transition-delay: ${animations.fastOutSlowInMin}, ${animations.nullEasing};
  }

  :host([active='inactive'])::before {
    margin: 0;
    opacity: 0;
    transition-property: margin, opacity;
    transition-duration: ${durationUltraSlow}, ${durationSlower};
    transition-delay: ${animations.fastOutSlowInMin}, ${animations.nullEasing};
  }

  @media screen and (prefers-reduced-motion: reduce) {
    :host([active]) {
      transition-duration: 0.01ms;
    }

    :host([active])::before {
      transition-duration: 0.01ms;
      transition-delay: 0.01ms;
    }
  }
`;
