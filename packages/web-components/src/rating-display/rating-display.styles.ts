import { css } from '@microsoft/fast-element';
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
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { display } from '../utils/display.js';
import { state } from '../utils/states.js';

/**
 * The styles for the Rating Display component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --icon-size: 16px;
    --icon-color-filled: ${colorPaletteMarigoldBackground3};
    --icon-color-empty: ${colorPaletteMarigoldBackground2};
    align-items: center;
    color: ${colorNeutralForeground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    contain: layout style;
    user-select: none;
  }

  :host(${state('small')}) {
    --icon-size: 12px;
  }

  :host(${state('large')}) {
    --icon-size: 20px;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  ::slotted([slot='icon']) {
    display: none;
  }

  svg {
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--icon-color-filled);
    margin-inline-end: ${spacingHorizontalXXS};
  }

  svg:nth-child(odd) {
    clip-path: inset(0 50% 0 0);
    margin-inline-end: calc(0px - var(--icon-size));
  }

  :host(${state('neutral')}) svg {
    --icon-color-filled: ${colorNeutralForeground1};
  }

  :host(${state('brand')}) svg {
    --icon-color-filled: ${colorBrandBackground};
  }

  :host(:is([value^='-'], [value='0'])) svg,
  :host(:not([value])) svg,
  svg[selected] ~ svg {
    fill: var(--icon-color-empty);
  }

  :host(${state('neutral')}:is([value^='-'], [value='0'])) svg,
  :host(${state('neutral')}:not([value])) svg,
  :host(${state('neutral')}) svg[selected] ~ svg {
    --icon-color-empty: ${colorNeutralBackground1Pressed};
  }

  :host(${state('brand')}:is([value^='-'], [value='0'])) svg,
  :host(${state('brand')}:not([value])) svg,
  :host(${state('brand')}) svg[selected] ~ svg {
    --icon-color-empty: ${colorBrandStroke2};
  }

  .value-label,
  ::slotted([slot='value']) {
    display: block;
    margin-inline-start: ${spacingHorizontalXS};
    font-weight: ${fontWeightSemibold};
  }

  :host(${state('small')}) .value-label,
  :host(${state('small')}) ::slotted([slot='value']) {
    margin-inline-start: ${spacingHorizontalXXS};
  }

  :host(${state('large')}) .value-label,
  :host(${state('large')}) ::slotted([slot='value']) {
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

  :host(${state('small')}) .count-label::before,
  :host(${state('small')}) ::slotted([slot='count'])::before {
    margin-inline: ${spacingHorizontalXXS};
  }

  :host(${state('large')}) .count-label::before,
  :host(${state('large')}) ::slotted([slot='count'])::before {
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
