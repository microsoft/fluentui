import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
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
} from '../theme/design-tokens.js';

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
    width: 32px;
    height: 32px;
    font-family: var(${fontFamilyBase});
    font-weight: var(${fontWeightSemibold});
    font-size: var(${fontSizeBase300});
    border-radius: var(${borderRadiusCircular});
    color: var(${colorNeutralForeground3});
    background-color: var(${colorNeutralBackground6});
    contain: layout style;
  }

  .default-icon,
  ::slotted(svg) {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }

  ::slotted(img) {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: var(${borderRadiusCircular});
  }

  ::slotted([slot='badge']) {
    position: absolute;
    bottom: 0;
    right: 0;
    box-shadow: 0 0 0 var(${strokeWidthThin}) var(${colorNeutralBackground1});
  }

  :host([size='64']) ::slotted([slot='badge']),
  :host([size='72']) ::slotted([slot='badge']),
  :host([size='96']) ::slotted([slot='badge']),
  :host([size='120']) ::slotted([slot='badge']),
  :host([size='128']) ::slotted([slot='badge']) {
    box-shadow: 0 0 0 var(${strokeWidthThick}) var(${colorNeutralBackground1});
  }

  :host([size='16']),
  :host([size='20']),
  :host([size='24']) {
    font-size: var(${fontSizeBase100});
    font-weight: var(${fontWeightRegular});
  }

  :host([size='16']) {
    width: 16px;
    height: 16px;
  }

  :host([size='20']) {
    width: 20px;
    height: 20px;
  }

  :host([size='24']) {
    width: 24px;
    height: 24px;
  }

  :host([size='16']) .default-icon,
  :host([size='16']) ::slotted(svg) {
    width: 12px;
    height: 12px;
    font-size: 12px;
  }

  :host([size='20']) .default-icon,
  :host([size='24']) .default-icon,
  :host([size='20']) ::slotted(svg),
  :host([size='24']) ::slotted(svg) {
    width: 16px;
    height: 16px;
    font-size: 16px;
  }

  :host([size='28']) {
    width: 28px;
    height: 28px;
    font-size: var(${fontSizeBase200});
  }

  :host([size='36']) {
    width: 36px;
    height: 36px;
  }

  :host([size='40']) {
    width: 40px;
    height: 40px;
  }

  :host([size='48']),
  :host([size='56']) {
    font-size: var(${fontSizeBase400});
  }

  :host([size='48']) {
    width: 48px;
    height: 48px;
  }

  :host([size='48']) .default-icon,
  :host([size='48']) ::slotted(svg) {
    width: 24px;
    height: 24px;
    font-size: 24px;
  }

  :host([size='56']) {
    width: 56px;
    height: 56px;
  }

  :host([size='56']) .default-icon,
  :host([size='56']) ::slotted(svg) {
    width: 28px;
    height: 28px;
    font-size: 28px;
  }

  :host([size='64']),
  :host([size='72']),
  :host([size='96']) {
    font-size: var(${fontSizeBase500});
  }

  :host([size='64']) .default-icon,
  :host([size='72']) .default-icon,
  :host([size='64']) ::slotted(svg),
  :host([size='72']) ::slotted(svg) {
    width: 32px;
    height: 32px;
    font-size: 32px;
  }

  :host([size='64']) {
    width: 64px;
    height: 64px;
  }

  :host([size='72']) {
    width: 72px;
    height: 72px;
  }

  :host([size='96']) {
    width: 96px;
    height: 96px;
  }

  :host([size='96']) .default-icon,
  :host([size='120']) .default-icon,
  :host([size='128']) .default-icon,
  :host([size='96']) ::slotted(svg),
  :host([size='120']) ::slotted(svg),
  :host([size='128']) ::slotted(svg) {
    width: 48px;
    height: 48px;
    font-size: 48px;
  }

  :host([size='120']),
  :host([size='128']) {
    font-size: var(${fontSizeBase600});
  }

  :host([size='120']) {
    width: 120px;
    height: 120px;
  }

  :host([size='128']) {
    width: 128px;
    height: 128px;
  }

  :host([shape='square']) {
    border-radius: var(${borderRadiusMedium});
  }

  :host([shape='square'][size='20']),
  :host([shape='square'][size='24']) {
    border-radius: var(${borderRadiusSmall});
  }

  :host([shape='square'][size='56']),
  :host([shape='square'][size='64']),
  :host([shape='square'][size='72']) {
    border-radius: var(${borderRadiusLarge});
  }
  :host([shape='square'][size='96']),
  :host([shape='square'][size='120']),
  :host([shape='square'][size='128']) {
    border-radius: var(${borderRadiusXLarge});
  }

  :host([data-color='brand']) {
    color: var(${colorNeutralForegroundStaticInverted});
    background-color: var(${colorBrandBackgroundStatic});
  }

  :host([data-color='dark-red']) {
    color: var(${colorPaletteDarkRedForeground2});
    background-color: var(${colorPaletteDarkRedBackground2});
  }

  :host([data-color='cranberry']) {
    color: var(${colorPaletteCranberryForeground2});
    background-color: var(${colorPaletteCranberryBackground2});
  }

  :host([data-color='red']) {
    color: var(${colorPaletteRedForeground2});
    background-color: var(${colorPaletteRedBackground2});
  }

  :host([data-color='pumpkin']) {
    color: var(${colorPalettePumpkinForeground2});
    background-color: var(${colorPalettePumpkinBackground2});
  }

  :host([data-color='peach']) {
    color: var(${colorPalettePeachForeground2});
    background-color: var(${colorPalettePeachBackground2});
  }

  :host([data-color='marigold']) {
    color: var(${colorPaletteMarigoldForeground2});
    background-color: var(${colorPaletteMarigoldBackground2});
  }

  :host([data-color='gold']) {
    color: var(${colorPaletteGoldForeground2});
    background-color: var(${colorPaletteGoldBackground2});
  }

  :host([data-color='brass']) {
    color: var(${colorPaletteBrassForeground2});
    background-color: var(${colorPaletteBrassBackground2});
  }

  :host([data-color='brown']) {
    color: var(${colorPaletteBrownForeground2});
    background-color: var(${colorPaletteBrownBackground2});
  }

  :host([data-color='forest']) {
    color: var(${colorPaletteForestForeground2});
    background-color: var(${colorPaletteForestBackground2});
  }

  :host([data-color='seafoam']) {
    color: var(${colorPaletteSeafoamForeground2});
    background-color: var(${colorPaletteSeafoamBackground2});
  }

  :host([data-color='dark-green']) {
    color: var(${colorPaletteDarkGreenForeground2});
    background-color: var(${colorPaletteDarkGreenBackground2});
  }

  :host([data-color='light-teal']) {
    color: var(${colorPaletteLightTealForeground2});
    background-color: var(${colorPaletteLightTealBackground2});
  }

  :host([data-color='teal']) {
    color: var(${colorPaletteTealForeground2});
    background-color: var(${colorPaletteTealBackground2});
  }

  :host([data-color='steel']) {
    color: var(${colorPaletteSteelForeground2});
    background-color: var(${colorPaletteSteelBackground2});
  }

  :host([data-color='blue']) {
    color: var(${colorPaletteBlueForeground2});
    background-color: var(${colorPaletteBlueBackground2});
  }

  :host([data-color='royal-blue']) {
    color: var(${colorPaletteRoyalBlueForeground2});
    background-color: var(${colorPaletteRoyalBlueBackground2});
  }

  :host([data-color='cornflower']) {
    color: var(${colorPaletteCornflowerForeground2});
    background-color: var(${colorPaletteCornflowerBackground2});
  }

  :host([data-color='navy']) {
    color: var(${colorPaletteNavyForeground2});
    background-color: var(${colorPaletteNavyBackground2});
  }

  :host([data-color='lavender']) {
    color: var(${colorPaletteLavenderForeground2});
    background-color: var(${colorPaletteLavenderBackground2});
  }

  :host([data-color='purple']) {
    color: var(${colorPalettePurpleForeground2});
    background-color: var(${colorPalettePurpleBackground2});
  }

  :host([data-color='grape']) {
    color: var(${colorPaletteGrapeForeground2});
    background-color: var(${colorPaletteGrapeBackground2});
  }

  :host([data-color='lilac']) {
    color: var(${colorPaletteLilacForeground2});
    background-color: var(${colorPaletteLilacBackground2});
  }

  :host([data-color='pink']) {
    color: var(${colorPalettePinkForeground2});
    background-color: var(${colorPalettePinkBackground2});
  }

  :host([data-color='magenta']) {
    color: var(${colorPaletteMagentaForeground2});
    background-color: var(${colorPaletteMagentaBackground2});
  }

  :host([data-color='plum']) {
    color: var(${colorPalettePlumForeground2});
    background-color: var(${colorPalettePlumBackground2});
  }

  :host([data-color='beige']) {
    color: var(${colorPaletteBeigeForeground2});
    background-color: var(${colorPaletteBeigeBackground2});
  }

  :host([data-color='mink']) {
    color: var(${colorPaletteMinkForeground2});
    background-color: var(${colorPaletteMinkBackground2});
  }

  :host([data-color='platinum']) {
    color: var(${colorPalettePlatinumForeground2});
    background-color: var(${colorPalettePlatinumBackground2});
  }

  :host([data-color='anchor']) {
    color: var(${colorPaletteAnchorForeground2});
    background-color: var(${colorPaletteAnchorBackground2});
  }

  :host([active]) {
    /* Work-around for text pixel snapping at the end of the animation */
    transform: perspective(1px);
    transition-property: transform, opacity;
    transition-duration: var(${durationUltraSlow}), var(${durationFaster});
    transition-delay: var(${animations.fastEase}), var(${animations.nullEasing});
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
    transition-duration: var(${durationUltraSlow}), var(${durationSlower});
    transition-delay: var(${animations.fastEase}), var(${animations.nullEasing});
  }
  :host([active])::before {
    box-shadow: var(${shadow8});
    border-style: solid;
    border-color: var(${colorBrandBackgroundStatic});
  }

  :host([active][appearance='shadow'])::before {
    border-style: none;
    border-color: none;
  }

  :host([active]:not([appearance='shadow']))::before {
    margin: calc(-2 * var(${strokeWidthThick}));
    border-width: var(${strokeWidthThick});
  }

  :host([size='56'][active]:not([appearance='shadow']))::before,
  :host([size='64'][active]:not([appearance='shadow']))::before {
    margin: calc(-2 * var(${strokeWidthThicker}));
    border-width: var(${strokeWidthThicker});
  }

  :host([size='72'][active]:not([appearance='shadow']))::before,
  :host([size='96'][active]:not([appearance='shadow']))::before,
  :host([size='120'][active]:not([appearance='shadow']))::before,
  :host([size='128'][active]:not([appearance='shadow']))::before {
    margin: calc(-2 * var(${strokeWidthThickest}));
    border-width: var(${strokeWidthThickest});
  }

  :host([size='20'][active][appearance])::before,
  :host([size='24'][active][appearance])::before,
  :host([size='28'][active][appearance])::before {
    box-shadow: var(${shadow4});
  }

  :host([size='56'][active][appearance])::before,
  :host([size='64'][active][appearance])::before {
    box-shadow: var(${shadow16});
  }

  :host([size='72'][active][appearance])::before,
  :host([size='96'][active][appearance])::before,
  :host([size='120'][active][appearance])::before,
  :host([size='128'][active][appearance])::before {
    box-shadow: var(${shadow28});
  }

  :host([active][appearance='ring'])::before {
    box-shadow: none;
  }

  :host([active='inactive']) {
    opacity: 0.8;
    transform: scale(0.875);
    transition-property: transform, opacity;
    transition-duration: var(${durationUltraSlow}), var(${durationFaster});
    transition-delay: var(${animations.fastOutSlowInMin}), var(${animations.nullEasing});
  }

  :host([active='inactive'])::before {
    margin: 0;
    opacity: 0;
    transition-property: margin, opacity;
    transition-duration: var(${durationUltraSlow}), var(${durationSlower});
    transition-delay: var(${animations.fastOutSlowInMin}), var(${animations.nullEasing});
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
