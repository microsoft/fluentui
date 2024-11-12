import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStrokeAccessible,
  display,
  shadow4,
  spacingHorizontalL,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalMNudge,
  typographyBody1StrongStyles,
  typographyBody1Styles,
  typographyCaption1Styles,
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
    border: 2px;
    pointer-events: none;
  }
  .tooltipline {
    padding-inline-start: 8px;
    height: 50px;
    border-inline-start: 4px solid;
  }
  .tooltiplegend {
    font-size: 13px;
    color: theme.semanticColors.bodyText;
    text-align: start;
  }
  .tooltipdata {
    font-weight: bold;
    font-size: 30px;
    text-align: start;
    lineheight: 36px;
    margin-top: 12px;
  }
  .bar {
    opacity: 1;
  }
  .bar.inactive {
    opacity: 0.1;
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
    margin: -8px 0 0 -8px;
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
    border: 1px solid;
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
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 7px solid;
    border-bottom-color: ${colorNeutralStrokeAccessible};
    margin-bottom: 4px;
    position: absolute;
  }
  .chart-data-text {
    ${typographyBody1StrongStyles}
    color: ${colorNeutralForeground1};
  }
`;
