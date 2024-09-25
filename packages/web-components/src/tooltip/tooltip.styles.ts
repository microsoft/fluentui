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
  spacingHorizontalXS,
  spacingVerticalXS,
} from '../theme/design-tokens.js';
import { TooltipPositioning } from './tooltip.options.js';

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
    padding: 4px 11px 6px;
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
    position-area: ${TooltipPositioning['above-start']};
  }
  :host([positioning='above']) {
    position-area: ${TooltipPositioning.above};
  }
  :host([positioning='above-end']) {
    position-area: ${TooltipPositioning['above-end']};
  }
  :host([positioning='below-start']) {
    position-area: ${TooltipPositioning['below-start']};
  }
  :host([positioning='below']) {
    position-area: ${TooltipPositioning.below};
  }
  :host([positioning='below-end']) {
    position-area: ${TooltipPositioning['below-end']};
  }
  :host([positioning='before-top']) {
    position-area: ${TooltipPositioning['before-top']};
  }
  :host([positioning='before']) {
    position-area: ${TooltipPositioning.before};
  }
  :host([positioning='before-bottom']) {
    position-area: ${TooltipPositioning['before-bottom']};
  }
  :host([positioning='after-top']) {
    position-area: ${TooltipPositioning['after-top']};
  }
  :host([positioning='after']) {
    position-area: ${TooltipPositioning.after};
  }
  :host([positioning='after-bottom']) {
    position-area: ${TooltipPositioning['after-bottom']};
  }
`;
