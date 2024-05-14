import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  colorNeutralForeground1,
  colorPaletteMarigoldBackground2,
  colorPaletteMarigoldBackground3,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightSemibold,
  lineHeightBase200,
  spacingHorizontalXS,
} from '../theme/design-tokens.js';

/**
 * The styles for the Rating Display component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --icon-size: 12px;
    align-items: center;
    contain: layout style;
    user-select: none;
  }

  svg {
    width: var(--icon-size);
    height: var(--icon-size);
    fill: ${colorPaletteMarigoldBackground3};
  }

  svg.half {
    clip-path: inset(0 50% 0 0);
    margin-inline-end: calc(0px - var(--icon-size));
  }

  :host(.blank) svg,
  svg.selected ~ svg {
    fill: ${colorPaletteMarigoldBackground2};
  }

  .value {
    margin-inline-start: ${spacingHorizontalXS};
    color: ${colorNeutralForeground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightSemibold};
    line-height: ${lineHeightBase200};
  }
`.withBehaviors(forcedColorsStylesheetBehavior(css``));
