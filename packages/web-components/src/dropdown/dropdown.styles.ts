import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
import {
  blockState,
  displayShadowState,
  filledDarkerState,
  filledLighterState,
  largeState,
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
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  colorStrokeFocus1,
  colorStrokeFocus2,
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
import { typographyBody1Styles, typographyBody2Styles, typographyCaption1Styles } from '../styles/index.js';

/**
 * Styles of the {@link (Dropdown:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

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
    cursor: pointer;
    gap: var(--gap);
    justify-content: space-between;
    min-block-size: var(--min-block-size);
    touch-action: manipulation;
    padding-inline: var(--padding-inline);
    position: relative;
  }

  :host(${blockState}:not([hidden])) {
    display: flex;
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

  .content {
    padding-inline: var(--content-padding-inline);
  }

  .placeholder {
    color: var(--placeholder-color);
  }

  .trigger-indicator {
    aspect-ratio: 1;
    display: grid;
    inline-size: var(--trigger-indicator-size);
    flex-shrink: 0;
    place-items: center;
  }

  svg {
    fill: var(--trigger-indicator-color);
    inline-size: var(--trigger-indicator-icon-inilne-size);
  }
`;
