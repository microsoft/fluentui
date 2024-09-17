import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';

import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralShadowAmbient,
  colorNeutralShadowKey,
  fontFamilyBase,
  fontSizeBase200,
  lineHeightBase200,
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
    --blockOffset: ${spacingVerticalXS};
    --inlineOffset: ${spacingHorizontalXS};
    background: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: 1px solid var(--colorTransparentStroke);
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    display: inline-flex;
    filter: drop-shadow(0 0 2px ${colorNeutralShadowAmbient}) drop-shadow(0 4px 8px ${colorNeutralShadowKey});
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    inset-area: block-start;
    line-height: ${lineHeightBase200};
    margin: 0;
    max-width: 240px;
    padding: 4px 11px 6px;
    position-try-fallbacks: flip-block flip-inline;
    position: absolute;
    width: max-content;
    z-index: 1;
  }

  :host(:is([positioning^='above'], [positioning^='below'])) {
    margin-block: var(--blockOffset);
  }
  :host(:is([positioning^='before'], [positioning^='after'])) {
    margin-inline: var(--inlineOffset);
  }

  :host([positioning='above-start']) {
    inset-area: block-start span-inline-end;
  }
  :host([positioning='above']) {
    inset-area: block-start;
  }
  :host([positioning='above-end']) {
    inset-area: block-start span-inline-start;
  }
  :host([positioning='below-start']) {
    inset-area: block-end span-inline-end;
  }
  :host([positioning='below']) {
    inset-area: block-end;
  }
  :host([positioning='below-end']) {
    inset-area: block-end span-inline-start;
  }
  :host([positioning='before-top']) {
    inset-area: inline-start span-block-end;
  }
  :host([positioning='before']) {
    inset-area: inline-start;
  }
  :host([positioning='before-bottom']) {
    inset-area: inline-start span-block-start;
  }
  :host([positioning='after-top']) {
    inset-area: inline-end span-block-end;
  }
  :host([positioning='after']) {
    inset-area: inline-end;
  }
  :host([positioning='after-bottom']) {
    inset-area: inline-end span-block-start;
  }
`;
