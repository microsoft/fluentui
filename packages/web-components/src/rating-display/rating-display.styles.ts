import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  colorBrandBackground2,
  colorBrandForeground1,
  colorNeutralBackground6,
  colorNeutralForeground1,
  colorPaletteMarigoldBackground2,
  colorPaletteMarigoldBorderActive,
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
import { svgToDataURI } from './rating-display.base.js';
import { defaultIconFilled, defaultIconOutlined } from './rating-display.template.js';

/**
 * The styles for the Rating Display component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --_icon-size: 16px;
    --_icon-gradient-degree: 90deg;
    --_icon-color-value: ${colorPaletteMarigoldBorderActive};
    --_icon-color-empty: ${colorPaletteMarigoldBackground2};
    --_default-value: 0;
    --_default-max: 5;
    --_mask-image-filled: url(${svgToDataURI(defaultIconFilled)});
    --_mask-image-outlined: url(${svgToDataURI(defaultIconOutlined)});
    --_mask-position-x: left;

    align-items: center;
    color: ${colorNeutralForeground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    contain: layout style;
    user-select: none;
  }

  :host(:dir(rtl)) {
    --_icon-gradient-degree: -90deg;
    --_mask-position-x: right;
  }

  :host([size='small']) {
    --_icon-size: 12px;
  }

  :host([size='large']) {
    --_icon-size: 20px;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
  }

  ::slotted([slot='icon']) {
    display: none;
  }

  :host([color='neutral']) {
    --_icon-color-value: ${colorNeutralForeground1};
    --_icon-color-empty: ${colorNeutralBackground6};
  }

  :host([color='brand']) {
    --_icon-color-value: ${colorBrandForeground1};
    --_icon-color-empty: ${colorBrandBackground2};
  }

  @supports (width: attr(value type(<number>))) {
    :host {
      --_attr-value: attr(value type(<number>));
      --_attr-max: attr(max type(<number>));
    }
  }

  :host([compact]) .display {
    --_max: 1;
  }

  .display {
    --_value: max(0, round(var(--_attr-value, var(--_default-value)) * 2) / 2);
    --_max: max(1, var(--_attr-max, var(--_default-max)));
    --_mask-inline-size: calc(var(--_icon-size) + ${spacingHorizontalXXS});
    --_icon-gradient-stop-visual-adjustment: 0px;
    --_icon-gradient-stop: calc(
      var(--_mask-inline-size) * var(--_value) - var(--_icon-gradient-stop-visual-adjustment)
    );

    background-image: linear-gradient(
      var(--_icon-gradient-degree),
      var(--_icon-color-value) var(--_icon-gradient-stop),
      var(--_icon-color-empty) calc(var(--_icon-gradient-stop) + 0.5px)
    );
    block-size: var(--_icon-size);
    display: grid;
    inline-size: calc(var(--_max) * var(--_mask-inline-size) - ${spacingHorizontalXXS} / 2);
    mask-image: var(--_mask-image-filled);
    mask-repeat: repeat no-repeat;
    mask-size: var(--_mask-inline-size) var(--_icon-size);
    mask-position: var(--_mask-position-x) center;
  }

  .value-label,
  ::slotted([slot='value']) {
    display: block;
    margin-inline-start: ${spacingHorizontalXS};
    font-weight: ${fontWeightSemibold};
  }

  :host([size='small']) .value-label,
  :host([size='small']) ::slotted([slot='value']) {
    margin-inline-start: ${spacingHorizontalXXS};
  }

  :host([size='large']) .value-label,
  :host([size='large']) ::slotted([slot='value']) {
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

  :host([size='small']) .count-label::before,
  :host([size='small']) ::slotted([slot='count'])::before {
    margin-inline: ${spacingHorizontalXXS};
  }

  :host([size='large']) .count-label::before,
  :host([size='large']) ::slotted([slot='count'])::before {
    margin-inline: ${spacingHorizontalSNudge};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    .display {
      --_icon-color-value: CanvasText;
      --_icon-color-empty: Canvas;
      --_icon-gradient-stop-visual-adjustment: 0.5px;

      forced-color-adjust: none;
    }

    .display::before {
      background-color: var(--_icon-color-value);
      content: '';
      grid-area: 1 / 1 / -1 / -1;
      mask: inherit;
      mask-image: var(--_mask-image-outlined);
    }
  `),
);
