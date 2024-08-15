import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
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
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightSemibold};
    font-size: ${fontSizeBase300};
    border-radius: ${borderRadiusCircular};
    color: ${colorNeutralForeground3};
    background-color: ${colorNeutralBackground6};
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
    border-radius: ${borderRadiusCircular};
  }

  ::slotted([slot='badge']) {
    position: absolute;
    bottom: 0;
    right: 0;
    box-shadow: 0 0 0 ${strokeWidthThin}) ${colorNeutralBackground1};
  }

  :host([size='64']) ::slotted([slot='badge']),
  :host([size='72']) ::slotted([slot='badge']),
  :host([size='96']) ::slotted([slot='badge']),
  :host([size='120']) ::slotted([slot='badge']),
  :host([size='128']) ::slotted([slot='badge']) {
    box-shadow: 0 0 0 ${strokeWidthThick}) ${colorNeutralBackground1};
  }

  :host([size='16']),
  :host([size='20']),
  :host([size='24']) {
    font-size: ${fontSizeBase100};
    font-weight: ${fontWeightRegular};
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
    font-size: ${fontSizeBase200};
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
    font-size: ${fontSizeBase400};
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
    font-size: ${fontSizeBase500};
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
    font-size: ${fontSizeBase600};
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
    border-radius: ${borderRadiusMedium};
  }

  :host([shape='square'][size='20']),
  :host([shape='square'][size='24']) {
    border-radius: ${borderRadiusSmall};
  }

  :host([shape='square'][size='56']),
  :host([shape='square'][size='64']),
  :host([shape='square'][size='72']) {
    border-radius: ${borderRadiusLarge};
  }
  :host([shape='square'][size='96']),
  :host([shape='square'][size='120']),
  :host([shape='square'][size='128']) {
    border-radius: ${borderRadiusXLarge};
  }

  :host(:is([state--brand], :state(brand))) {
    color: ${colorNeutralForegroundStaticInverted};
    background-color: ${colorBrandBackgroundStatic};
  }

  :host(:is([state--dark-red], :state(dark-red))) {
    color: ${colorPaletteDarkRedForeground2};
    background-color: ${colorPaletteDarkRedBackground2};
  }

  :host(:is([state--cranberry], :state(cranberry))) {
    color: ${colorPaletteCranberryForeground2};
    background-color: ${colorPaletteCranberryBackground2};
  }

  :host(:is([state--red], :state(red))) {
    color: ${colorPaletteRedForeground2};
    background-color: ${colorPaletteRedBackground2};
  }

  :host(:is([state--pumpkin], :state(pumpkin))) {
    color: ${colorPalettePumpkinForeground2};
    background-color: ${colorPalettePumpkinBackground2};
  }

  :host(:is([state--peach], :state(peach))) {
    color: ${colorPalettePeachForeground2};
    background-color: ${colorPalettePeachBackground2};
  }

  :host(:is([state--marigold], :state(marigold))) {
    color: ${colorPaletteMarigoldForeground2};
    background-color: ${colorPaletteMarigoldBackground2};
  }

  :host(:is([state--gold], :state(gold))) {
    color: ${colorPaletteGoldForeground2};
    background-color: ${colorPaletteGoldBackground2};
  }

  :host(:is([state--brass], :state(brass))) {
    color: ${colorPaletteBrassForeground2};
    background-color: ${colorPaletteBrassBackground2};
  }

  :host(:is([state--brown], :state(brown))) {
    color: ${colorPaletteBrownForeground2};
    background-color: ${colorPaletteBrownBackground2};
  }

  :host(:is([state--forest], :state(forest))) {
    color: ${colorPaletteForestForeground2};
    background-color: ${colorPaletteForestBackground2};
  }

  :host(:is([state--seafoam], :state(seafoam))) {
    color: ${colorPaletteSeafoamForeground2};
    background-color: ${colorPaletteSeafoamBackground2};
  }

  :host(:is([state--dark-green], :state(dark-green))) {
    color: ${colorPaletteDarkGreenForeground2};
    background-color: ${colorPaletteDarkGreenBackground2};
  }

  :host(:is([state--light-teal], :state(light-teal))) {
    color: ${colorPaletteLightTealForeground2};
    background-color: ${colorPaletteLightTealBackground2};
  }

  :host(:is([state--teal], :state(teal))) {
    color: ${colorPaletteTealForeground2};
    background-color: ${colorPaletteTealBackground2};
  }

  :host(:is([state--steel], :state(steel))) {
    color: ${colorPaletteSteelForeground2};
    background-color: ${colorPaletteSteelBackground2};
  }

  :host(:is([state--blue], :state(blue))) {
    color: ${colorPaletteBlueForeground2};
    background-color: ${colorPaletteBlueBackground2};
  }

  :host(:is([state--royal-blue], :state(royal-blue))) {
    color: ${colorPaletteRoyalBlueForeground2};
    background-color: ${colorPaletteRoyalBlueBackground2};
  }

  :host(:is([state--cornflower], :state(cornflower))) {
    color: ${colorPaletteCornflowerForeground2};
    background-color: ${colorPaletteCornflowerBackground2};
  }

  :host(:is([state--navy], :state(navy))) {
    color: ${colorPaletteNavyForeground2};
    background-color: ${colorPaletteNavyBackground2};
  }

  :host(:is([state--lavender], :state(lavender))) {
    color: ${colorPaletteLavenderForeground2};
    background-color: ${colorPaletteLavenderBackground2};
  }

  :host(:is([state--purple], :state(purple))) {
    color: ${colorPalettePurpleForeground2};
    background-color: ${colorPalettePurpleBackground2};
  }

  :host(:is([state--grape], :state(grape))) {
    color: ${colorPaletteGrapeForeground2};
    background-color: ${colorPaletteGrapeBackground2};
  }

  :host(:is([state--lilac], :state(lilac))) {
    color: ${colorPaletteLilacForeground2};
    background-color: ${colorPaletteLilacBackground2};
  }

  :host(:is([state--pink], :state(pink))) {
    color: ${colorPalettePinkForeground2};
    background-color: ${colorPalettePinkBackground2};
  }

  :host(:is([state--magenta], :state(magenta))) {
    color: ${colorPaletteMagentaForeground2};
    background-color: ${colorPaletteMagentaBackground2};
  }

  :host(:is([state--plum], :state(plum))) {
    color: ${colorPalettePlumForeground2};
    background-color: ${colorPalettePlumBackground2};
  }

  :host(:is([state--beige], :state(beige))) {
    color: ${colorPaletteBeigeForeground2};
    background-color: ${colorPaletteBeigeBackground2};
  }

  :host(:is([state--mink], :state(mink))) {
    color: ${colorPaletteMinkForeground2};
    background-color: ${colorPaletteMinkBackground2};
  }

  :host(:is([state--platinum], :state(platinum))) {
    color: ${colorPalettePlatinumForeground2};
    background-color: ${colorPalettePlatinumBackground2};
  }

  :host(:is([state--anchor], :state(anchor))) {
    color: ${colorPaletteAnchorForeground2};
    background-color: ${colorPaletteAnchorBackground2};
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

  :host([active][appearance='shadow'])::before {
    border-style: none;
    border-color: none;
  }

  :host([active]:not([appearance='shadow']))::before {
    margin: calc(-2 * ${strokeWidthThick});
    border-width: ${strokeWidthThick};
  }

  :host([size='56'][active]:not([appearance='shadow']))::before,
  :host([size='64'][active]:not([appearance='shadow']))::before {
    margin: calc(-2 * ${strokeWidthThicker});
    border-width: ${strokeWidthThicker};
  }

  :host([size='72'][active]:not([appearance='shadow']))::before,
  :host([size='96'][active]:not([appearance='shadow']))::before,
  :host([size='120'][active]:not([appearance='shadow']))::before,
  :host([size='128'][active]:not([appearance='shadow']))::before {
    margin: calc(-2 * ${strokeWidthThickest});
    border-width: ${strokeWidthThickest};
  }

  :host([size='20'][active][appearance])::before,
  :host([size='24'][active][appearance])::before,
  :host([size='28'][active][appearance])::before {
    box-shadow: ${shadow4};
  }

  :host([size='56'][active][appearance])::before,
  :host([size='64'][active][appearance])::before {
    box-shadow: ${shadow16};
  }

  :host([size='72'][active][appearance])::before,
  :host([size='96'][active][appearance])::before,
  :host([size='120'][active][appearance])::before,
  :host([size='128'][active][appearance])::before {
    box-shadow: ${shadow28};
  }

  :host([active][appearance='ring'])::before {
    box-shadow: none;
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
