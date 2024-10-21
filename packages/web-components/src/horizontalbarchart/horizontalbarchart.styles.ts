import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  shadow4,
  spacingHorizontalL,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalMNudge,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';
import {
  typographyBody1StrongStyles,
  typographyBody1Styles,
  typographyCaption1Styles,
} from '../styles/partials/typography.partials.js';

/**
 * Styles for the HorizontalBarChart component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  ${display('inline-block')}

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
    display: grid;
    overflow: hidden;
    padding: ${spacingVerticalMNudge} ${spacingHorizontalL};
    backgroundcolor: ${colorNeutralBackground1};
    backgroundblendmode: normal, luminosity;
    text-align: center;
    background: white;
    box-shadow: ${shadow4};
    border: 2px;
    pointer-events: none;
    opacity: 0;
    z-index: 999;
  }
  .bar {
    opacity: 1;
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
  .barLabel {
    ${typographyBody1StrongStyles}
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
`;
