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

  .rootDiv {
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
    padding-left: 8px;
    height: 50px;
  }
  .tooltiplegend {
    font-size: 13px;
    color: theme.semanticColors.bodyText;
    text-align: left;
  }
  .tooltipdata {
    font-weight: bold;
    font-size: 30px;
    text-align: left;
    lineheight: 36px;
    margin-top: 12px;
  }
  .bar {
    opacity: 1;
  }
  .bar.inactive {
    opacity: 0.1;
  }
  .chartTitle {
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
  .legendRect {
    width: 12px;
    height: 12px;
    margin-right: ${spacingHorizontalS};
    border: 1px solid;
  }
  .legendText {
    ${typographyCaption1Styles}
    color: ${colorNeutralForeground1};
  }
  .legend.inactive .legendRect {
    background-color: transparent !important;
  }
  .legend.inactive .legendText {
    opacity: 0.67;
  }
  .barLabel {
    ${typographyBody1StrongStyles}
    fill: ${colorNeutralForeground1};
  }
  .chartTitleDiv {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .ratioNumerator {
    ${typographyBody1StrongStyles}
    color: ${colorNeutralForeground1};
  }
  .ratioDenominator {
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
`;
