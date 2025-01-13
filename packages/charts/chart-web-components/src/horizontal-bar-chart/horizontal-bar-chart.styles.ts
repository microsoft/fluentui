import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStrokeAccessible,
  display,
  forcedColorsStylesheetBehavior,
  shadow4,
  spacingHorizontalL,
  spacingHorizontalNone,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalM,
  spacingVerticalMNudge,
  spacingVerticalNone,
  spacingVerticalS,
  spacingVerticalXS,
  strokeWidthThick,
  strokeWidthThickest,
  strokeWidthThin,
  typographyBody1StrongStyles,
  typographyBody1Styles,
  typographyCaption1Styles,
  typographyTitle2Styles,
} from '@fluentui/web-components';

/**
 * Styles for the HorizontalBarChart component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  ${display('inline-block')}

  :host {
    position: relative;
  }
  .root {
    background-color: ${colorNeutralBackground1};
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .tooltip {
    ${typographyCaption1Styles}
    position: absolute;
    z-index: 999;
    display: grid;
    overflow: hidden;
    padding: ${spacingVerticalMNudge} ${spacingHorizontalL};
    backgroundcolor: ${colorNeutralBackground1};
    background-blend-mode: normal, luminosity;
    text-align: center;
    background: ${colorNeutralBackground1};
    box-shadow: ${shadow4};
    border: ${strokeWidthThick};
    pointer-events: none;
  }
  .tooltip-line {
    padding-inline-start: ${spacingHorizontalS};
    height: 50px;
    border-inline-start: ${strokeWidthThickest} solid;
  }
  .tooltip-legend-text {
    ${typographyCaption1Styles}
    color: ${colorNeutralForeground1};
    text-align: start;
  }
  .tooltip-data-y {
    ${typographyTitle2Styles}
    text-align: start;
  }
  .bar {
    opacity: 1;
  }
  .bar.inactive {
    opacity: 0.1;
  }
  .bar:focus {
    outline: none;
    stroke-width: ${strokeWidthThick};
    stroke: black;
  }
  .svg-chart {
    display: block;
    overflow: visible;
  }
  .chart-title {
    ${typographyBody1Styles}
    display: flex;
    justify-content: space-between;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    color: ${colorNeutralForeground1};
    margin-bottom: ${spacingHorizontalSNudge};
  }
  .legendcontainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: ${spacingVerticalL};
    width: 100%;
    align-items: center;
    margin: -${spacingVerticalS} ${spacingHorizontalNone} ${spacingVerticalNone} -${spacingHorizontalS};
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
  .bar-label {
    ${typographyBody1StrongStyles}
    fill: ${colorNeutralForeground1};
  }
  .chart-title-div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .ratio-numerator {
    ${typographyBody1StrongStyles}
    color: ${colorNeutralForeground1};
  }
  .ratio-denominator {
    ${typographyBody1StrongStyles}
    color: ${colorNeutralForeground1};
    font-weight: bold;
  }
  .benchmark-container {
    position: relative;
    height: 7px;
    margin-top: -3px;
  }
  .triangle {
    width: 0;
    height: 0;
    border-left: ${strokeWidthThickest} solid transparent;
    border-right: ${strokeWidthThickest} solid transparent;
    border-bottom: 7px solid;
    border-bottom-color: ${colorNeutralStrokeAccessible};
    margin-bottom: ${spacingVerticalXS};
    position: absolute;
  }
  .chart-data-text {
    ${typographyBody1StrongStyles}
    color: ${colorNeutralForeground1};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    .legend-rect,
    .tooltip-line,
    .triangle {
      forced-color-adjust: none;
    }
    .tooltip-legend-text,
    .tooltip-content-y {
      forced-color-adjust: auto;
      color: CanvasText;
    }
    .bar-label {
      fill: CanvasText !important;
    }
  `),
);
