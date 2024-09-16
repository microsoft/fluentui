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
import { brandState, largeState, neutralState, smallState } from '../styles/states/index.js';

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

  :host(${smallState}) {
    --icon-size: 12px;
  }

  :host(${largeState}) {
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

  :host(${neutralState}) svg {
    fill: ${colorNeutralForeground1};
  }

  :host(${brandState}) svg {
    fill: ${colorBrandBackground};
  }

  :host(:is([value^='-'], [value='0'])) svg,
  :host(:not([value])) svg,
  svg[selected] ~ svg {
    fill: ${colorPaletteMarigoldBackground2};
  }

  :host(${neutralState}:is([value^='-'], [value='0'])) svg,
  :host(${neutralState}:not([value])) svg,
  :host(${neutralState}) svg[selected] ~ svg {
    fill: ${colorNeutralBackground1Pressed};
  }

  :host(${brandState}:is([value^='-'], [value='0'])) svg,
  :host(${brandState}:not([value])) svg,
  :host(${brandState}) svg[selected] ~ svg {
    fill: ${colorBrandStroke2};
  }

  .value-label,
  ::slotted([slot='value']) {
    display: block;
    margin-inline-start: ${spacingHorizontalXS};
    font-weight: ${fontWeightSemibold};
  }

  :host(${smallState}) .value-label,
  :host(${smallState}) ::slotted([slot='value']) {
    margin-inline-start: ${spacingHorizontalXXS};
  }

  :host(${largeState}) .value-label,
  :host(${largeState}) ::slotted([slot='value']) {
    margin-inline-start: ${spacingHorizontalSNudge};
  }

  :host(:not([count])) .count-label {
    display: none;
  }

  .count-label::before,
  ::slotted([slot='count'])::before {
    content: '·';
    margin-inline: ${spacingHorizontalXS};
  }

  :host(${smallState}) .count-label::before,
  :host(${smallState}) ::slotted([slot='count'])::before {
    margin-inline: ${spacingHorizontalXXS};
  }

  :host(${largeState}) .count-label::before,
  :host(${largeState}) ::slotted([slot='count'])::before {
    margin-inline: ${spacingHorizontalSNudge};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host([color]) svg {
      fill: CanvasText;
    }

    :host([color]:is([value^='-'], [value='0'])) svg,
    :host(:not([value])) svg,
    :host([color]) svg[selected] ~ svg {
      fill: Canvas;
      stroke: CanvasText;
    }
  `),
);
