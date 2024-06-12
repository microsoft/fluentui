import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  colorBrandBackground,
  colorBrandStroke2,
  colorNeutralBackground1Pressed,
  colorNeutralForeground1,
  colorPaletteMarigoldBackground2,
  colorPaletteMarigoldBackground3,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontWeightSemibold,
  lineHeightBase200,
  lineHeightBase300,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
} from '../theme/design-tokens.js';
import { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

/**
 * The styles for the Rating Display component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --icon-size: 16px;
    align-items: center;
    color: ${colorNeutralForeground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    contain: layout style;
    user-select: none;
  }

  :host([size=${RatingDisplaySize.small}]) {
    --icon-size: 12px;
  }

  :host([size=${RatingDisplaySize.large}]) {
    --icon-size: 20px;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  svg {
    width: var(--icon-size);
    height: var(--icon-size);
    fill: ${colorPaletteMarigoldBackground3};
    margin-inline-end: ${spacingHorizontalXXS};
  }

  svg:nth-child(even) {
    clip-path: inset(0 50% 0 0);
    margin-inline-end: calc(0px - var(--icon-size));
  }

  :host([color=${RatingDisplayColor.neutral}]) svg {
    fill: ${colorNeutralForeground1};
  }

  :host([color=${RatingDisplayColor.brand}]) svg {
    fill: ${colorBrandBackground};
  }

  :host(:is([value^='-'], [value='0'])) svg,
  svg[selected] ~ svg {
    fill: ${colorPaletteMarigoldBackground2};
  }

  :host([color=${RatingDisplayColor.neutral}]:is([value^='-'], [value='0'])) svg,
  :host([color=${RatingDisplayColor.neutral}]) svg[selected] ~ svg {
    fill: ${colorNeutralBackground1Pressed};
  }

  :host([color=${RatingDisplayColor.brand}]:is([value^='-'], [value='0'])) svg,
  :host([color=${RatingDisplayColor.brand}]) svg[selected] ~ svg {
    fill: ${colorBrandStroke2};
  }

  slot[name='value'] {
    display: block;
    font-weight: ${fontWeightSemibold};
  }

  slot[name='count'] {
    display: none;
  }

  :host([count]) slot[name='count'] {
    display: block;
  }

  slot[name='value'],
  slot[name='count'] {
    margin-inline-start: ${spacingHorizontalXS};
  }

  :host([size=${RatingDisplaySize.small}]) :is(slot[name='value'], slot[name='count']) {
    margin-inline-start: ${spacingHorizontalXXS};
  }

  :host([size=${RatingDisplaySize.large}]) :is(slot[name='value'], slot[name='count']) {
    margin-inline-start: ${spacingHorizontalSNudge};
  }

  slot[name='count']:before {
    content: '·';
    margin-inline-end: ${spacingHorizontalXS};
  }

  :host([size=${RatingDisplaySize.small}]) slot[name='count']:before {
    margin-inline-end: ${spacingHorizontalXXS};
  }

  :host([size=${RatingDisplaySize.large}]) slot[name='count']:before {
    margin-inline-end: ${spacingHorizontalSNudge};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host([color]) svg {
      fill: CanvasText;
    }

    :host([color]:is([value^='-'], [value='0'])) svg,
    :host([color]) svg[selected] ~ svg {
      fill: Canvas;
      stroke: CanvasText;
    }
  `),
);
