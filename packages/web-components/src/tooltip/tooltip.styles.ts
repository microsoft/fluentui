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
    --position-area: block-start;
    --position-try-options: flip-block;
    --block-offset: ${spacingVerticalXS};
    --inline-offset: ${spacingHorizontalXS};
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
    overflow: visible;
    padding: 4px ${spacingHorizontalMNudge} 6px;
    position: absolute;
    position-area: var(--position-area);
    position-try-fallbacks: var(--position-try-options);
    width: auto;
    z-index: 1;
  }

  @supports (inset-area: block-start) {
    :host {
      inset-area: var(--position-area);
      position-try-fallbacks: var(--position-try-options);
    }
  }

  :host(:is([positioning^='above'], [positioning^='below'], :not([positioning]))) {
    margin-block: var(--block-offset);
  }

  :host(:is([positioning^='before'], [positioning^='after'])) {
    margin-inline: var(--inline-offset);
    --position-try-options: flip-inline;
  }

  :host([positioning='above-start']) {
    --position-area: block-start span-inline-end;
  }
  :host([positioning='above']) {
    --position-area: block-start;
  }
  :host([positioning='above-end']) {
    --position-area: block-start span-inline-start;
  }
  :host([positioning='below-start']) {
    --position-area: block-end span-inline-end;
  }
  :host([positioning='below']) {
    --position-area: block-end;
  }
  :host([positioning='below-end']) {
    --position-area: block-end span-inline-start;
  }
  :host([positioning='before-top']) {
    --position-area: inline-start span-block-end;
  }
  :host([positioning='before']) {
    --position-area: inline-start;
  }
  :host([positioning='before-bottom']) {
    --position-area: inline-start span-block-start;
  }
  :host([positioning='after-top']) {
    --position-area: inline-end span-block-end;
  }
  :host([positioning='after']) {
    --position-area: inline-end;
  }
  :host([positioning='after-bottom']) {
    --position-area: inline-end span-block-start;
  }
`;
