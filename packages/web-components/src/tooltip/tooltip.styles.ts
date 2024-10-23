import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralShadowAmbient,
  colorNeutralShadowKey,
  colorTransparentStroke,
  fontFamilyBase,
  fontSizeBase200,
  lineHeightBase200,
  spacingHorizontalMNudge,
  spacingHorizontalXS,
  spacingVerticalXS,
} from '../theme/design-tokens.js';
import { TooltipPositioningOption } from './tooltip.options.js';

/**
 * Styles for the tooltip component
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host(:not(:popover-open)) {
    display: none;
  }

  :host {
    --blockOffset: ${spacingVerticalXS};
    --inlineOffset: ${spacingHorizontalXS};
    background: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: 1px solid ${colorTransparentStroke};
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    display: inline-flex;
    filter: drop-shadow(0 0 2px ${colorNeutralShadowAmbient}) drop-shadow(0 4px 8px ${colorNeutralShadowKey});
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    inset: unset;
    line-height: ${lineHeightBase200};
    margin: unset; /* Remove browser default for [popover] */
    max-width: 240px;
    padding: 4px ${spacingHorizontalMNudge} 6px;
    position: absolute;
    position-area: block-start;
    width: auto;
    z-index: 1;
  }

  :host(:is([positioning^='above'], [positioning^='below'], :not([positioning]))) {
    margin-block: var(--blockOffset);
    position-try-fallbacks: flip-block;
  }
  :host(:is([positioning^='before'], [positioning^='after'])) {
    margin-inline: var(--inlineOffset);
    position-try-fallbacks: flip-inline;
  }

  :host([positioning='above-start']) {
    position-area: ${TooltipPositioningOption['above-start']};
  }
  :host([positioning='above']) {
    position-area: ${TooltipPositioningOption.above};
  }
  :host([positioning='above-end']) {
    position-area: ${TooltipPositioningOption['above-end']};
  }
  :host([positioning='below-start']) {
    position-area: ${TooltipPositioningOption['below-start']};
  }
  :host([positioning='below']) {
    position-area: ${TooltipPositioningOption.below};
  }
  :host([positioning='below-end']) {
    position-area: ${TooltipPositioningOption['below-end']};
  }
  :host([positioning='before-top']) {
    position-area: ${TooltipPositioningOption['before-top']};
  }
  :host([positioning='before']) {
    position-area: ${TooltipPositioningOption.before};
  }
  :host([positioning='before-bottom']) {
    position-area: ${TooltipPositioningOption['before-bottom']};
  }
  :host([positioning='after-top']) {
    position-area: ${TooltipPositioningOption['after-top']};
  }
  :host([positioning='after']) {
    position-area: ${TooltipPositioningOption.after};
  }
  :host([positioning='after-bottom']) {
    position-area: ${TooltipPositioningOption['after-bottom']};
  }
`;
