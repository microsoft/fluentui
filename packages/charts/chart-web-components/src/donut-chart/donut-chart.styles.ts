import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralShadowAmbient,
  colorNeutralShadowKey,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentStroke,
  display,
  forcedColorsStylesheetBehavior,
  spacingHorizontalL,
  spacingHorizontalNone,
  spacingHorizontalS,
  spacingVerticalL,
  spacingVerticalMNudge,
  spacingVerticalNone,
  spacingVerticalS,
  strokeWidthThickest,
  strokeWidthThin,
  typographyBody1Styles,
  typographyCaption1Styles,
  typographyTitle2Styles,
  typographyTitle3Styles,
} from '@fluentui/web-components';

/**
 * Styles for the DonutChart component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-block')}

  :host {
    ${typographyBody1Styles}
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .chart {
    box-sizing: content-box;
    overflow: visible;
    display: block;
  }

  .arc.inactive {
    opacity: 0.1;
  }

  .arc:focus {
    outline: none;
    stroke-width: ${strokeWidthThin};
    stroke: ${colorStrokeFocus1};
  }

  .arc-outline {
    fill: none;
  }

  .arc-outline:has(+ .arc:focus) {
    stroke-width: ${strokeWidthThickest};
    stroke: ${colorStrokeFocus2};
  }

  .text-inside-donut {
    ${typographyTitle3Styles}
    fill: ${colorNeutralForeground1};
  }

  .legend-container {
    padding-top: ${spacingVerticalL};
    white-space: nowrap;
    width: 100%;
    align-items: center;
    margin: -${spacingVerticalS} ${spacingHorizontalNone} ${spacingVerticalNone} -${spacingHorizontalS};
    flex-wrap: wrap;
    display: flex;
  }

  .legend {
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    padding: ${spacingHorizontalS};
    background: none;
    text-transform: capitalize;
  }

  .legend-rect {
    width: 12px;
    height: 12px;
    margin-inline-end: ${spacingHorizontalS};
    border: ${strokeWidthThin} solid;
  }

  .legend-text {
    ${typographyCaption1Styles}
    color: ${colorNeutralForeground1};
  }

  .legend.inactive .legend-rect {
    background-color: transparent !important;
  }

  .legend.inactive .legend-text {
    opacity: 0.67;
  }

  .tooltip {
    display: grid;
    overflow: hidden;
    padding: ${spacingVerticalMNudge} ${spacingHorizontalL};
    background-color: ${colorNeutralBackground1};
    background-blend-mode: normal, luminosity;
    border-radius: ${borderRadiusMedium};
    border: 1px solid ${colorTransparentStroke};
    filter: drop-shadow(0 0 2px ${colorNeutralShadowAmbient}) drop-shadow(0 8px 16px ${colorNeutralShadowKey});
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }

  .tooltip-body {
    padding-inline-start: ${spacingHorizontalS};
    color: ${colorNeutralForeground1};
    border-inline-start: 4px solid;
  }

  .tooltip-legend-text {
    ${typographyCaption1Styles}
  }

  .tooltip-content-y {
    ${typographyTitle2Styles}
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    .text-inside-donut {
      fill: CanvasText;
    }

    .legend-rect,
    .tooltip-body {
      forced-color-adjust: none;
    }

    .tooltip-legend-text,
    .tooltip-content-y {
      forced-color-adjust: auto;
      color: CanvasText;
    }
  `),
);
