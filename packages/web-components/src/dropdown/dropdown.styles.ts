import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
import {
  blockState,
  displayShadowState,
  filledDarkerState,
  filledLighterState,
  largeState,
  placeholderVisibleState,
  smallState,
  transparentState,
} from '../styles/states/index.js';
import {
  borderRadiusMedium,
  borderRadiusNone,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForeground4,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentBackground,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  shadow2,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingHorizontalXXS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { typographyBody1Styles, typographyBody2Styles, typographyCaption1Styles } from '../styles/index.js';

/**
 * Styles of the {@link (Dropdown:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-grid')}

  :host {
    /* sizes */
    --min-block-size: 32px;
    --gap: ${spacingHorizontalXXS};
    --padding-inline: ${spacingHorizontalMNudge};
    --content-padding-inline: ${spacingHorizontalXXS};
    --trigger-indicator-size: 20px;
    --trigger-indicator-icon-inilne-size: 12px;
    --border-radius: ${borderRadiusMedium};

    /* colors */
    --color: ${colorNeutralForeground1};
    --background-color: ${colorNeutralBackground1};
    --border-color: ${colorNeutralStroke1};
    --border-block-end-color: ${colorNeutralStrokeAccessible};
    --placeholder-color: ${colorNeutralForeground4};
    --trigger-indicator-color: ${colorNeutralForeground3};
    --focus-indicator-color: ${colorCompoundBrandStroke};

    ${typographyBody1Styles}

    align-items: center;
    background-color: var(--background-color);
    border: ${strokeWidthThin} solid var(--border-color);
    border-block-end-color: var(--border-block-end-color);
    border-radius: var(--border-radius);
    color: var(--color);
    gap: var(--gap);
    grid-template: 'content indicator' 1fr / 1fr auto;
    min-block-size: var(--min-block-size);
    touch-action: manipulation;
    padding-inline: var(--padding-inline);
    position: relative;
  }

  :host(:not(:disabled)) {
    cursor: pointer;
  }

  :host(:hover) {
    --border-color: ${colorNeutralStroke1Hover};
    --border-block-end-color: ${colorNeutralStrokeAccessibleHover};
  }

  :host(:active) {
    --border-color: ${colorNeutralStroke1Pressed};
    --border-block-end-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host(:disabled) {
    --color: ${colorNeutralForegroundDisabled};
    --background-color: ${colorTransparentBackground};
    --border-color: ${colorNeutralStrokeDisabled};
    --border-block-end-color: var(--border-color);
    --box-shadow: none;
    --placeholder-color: ${colorNeutralForegroundDisabled};
    --trigger-indicator-color: ${colorNeutralForegroundDisabled};

    user-select: none;
  }

  :host(${blockState}:not([hidden])) {
    display: grid;
    justify-self: stretch; /* In case it’s placed in a grid area. */
  }

  :host(${smallState}) {
    --min-block-size: 24px;
    --trigger-indicator-size: 16px;
    --trigger-indicator-icon-inilne-size: 10px;
    --padding-inline: ${spacingHorizontalSNudge};

    ${typographyCaption1Styles};
  }

  :host(${largeState}) {
    --min-block-size: 40px;
    --trigger-indicator-size: 24px;
    --trigger-indicator-icon-inline-size: 16px;
    --padding-inline: ${spacingHorizontalM};
    --content-padding-inline: ${spacingHorizontalSNudge};

    ${typographyBody2Styles}
  }

  :host(${transparentState}),
  :host(${filledDarkerState}),
  :host(${filledLighterState}) {
    --border-color: transparent;
  }

  :host(${transparentState}) {
    --border-radius: ${borderRadiusNone};
    --background-color: transparent;
  }

  :host(${filledDarkerState}),
  :host(${filledLighterState}) {
    --border-block-end-color: transparent;
  }

  :host(${filledDarkerState}) {
    --background-color: ${colorNeutralBackground3};
  }

  :host(${filledDarkerState}${displayShadowState}),
  :host(${filledLighterState}${displayShadowState}) {
    box-shadow: ${shadow2};
  }

  :host([slot='input']) {
    outline: 0;
  }

  :host(:not([slot='input']):focus-visible) {
    box-shadow: 0 0 0 2pt ${colorStrokeFocus2};
    outline: 1px solid ${colorStrokeFocus1};
  }

  :host::after {
    border-bottom: ${strokeWidthThick} solid var(--focus-indicator-color);
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    box-sizing: border-box;
    clip-path: inset(calc(100% - 2px) 1px 0px);
    content: '';
    height: max(2px, ${borderRadiusMedium});
    inset: auto calc(-1 * ${strokeWidthThin}) calc(-1 * ${strokeWidthThin});
    position: absolute;
    transform: scaleX(0);
    transition-delay: ${curveAccelerateMid};
    transition-duration: ${durationUltraFast};
    transition-property: transform;
  }

  :host(:focus)::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }

  .content,
  .placeholder {
    grid-area: content;
    padding-inline: var(--content-padding-inline);
  }

  .placeholder {
    color: var(--placeholder-color);
    opacity: 0;
    pointer-events: none;
  }

  :host(${placeholderVisibleState}) .placeholder {
    opacity: 1;
  }

  .placeholder:empty {
    display: none;
  }

  .trigger-indicator {
    aspect-ratio: 1;
    display: grid;
    grid-area: indicator;
    inline-size: var(--trigger-indicator-size);
    flex-shrink: 0;
    place-items: center;
  }

  svg {
    fill: var(--trigger-indicator-color);
    inline-size: var(--trigger-indicator-icon-inilne-size);
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      --border-color: FieldText;
      --border-block-end-color: FieldText;
      --focus-indicator-color: Highlight;
      --placeholder-color: FieldText;
      --trigger-indicator-color: FieldText;
    }

    :host(:hover),
    :host(:active),
    :host(:focus-within) {
      --border-color: Highlight;
      --border-block-end-color: Highlight;
    }

    :host(${transparentState}) {
      --border-color: Canvas;
    }

    :host(:disabled) {
      --color: GrayText;
      --border-color: GrayText;
      --border-block-end-color: GrayText;
      --placeholder-color: GrayText;
      --trigger-indicator-color: GrayText;
    }
  `),
);
