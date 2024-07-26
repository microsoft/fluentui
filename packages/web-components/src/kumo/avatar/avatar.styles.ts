import { css } from '@microsoft/fast-element';
import { display } from '../../utils/index.js';
import {
  borderRadiusCircular,
  colorBrandBackgroundStatic,
  colorNeutralBackground1,
  colorNeutralBackground6,
  colorNeutralForeground3,
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
  fontWeightRegular,
  shadow8,
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
