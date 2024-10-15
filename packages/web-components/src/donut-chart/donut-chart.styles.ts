import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
import {
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeHero700,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightHero700,
} from '../theme/design-tokens.js';

/**
 * Styles for the DonutChart component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-block')}

  .root {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    // font-family: ${fontFamilyBase};
    // font-size: ${fontSizeBase300};
    // font-weight: ${fontWeightRegular};
    // line-height: ${lineHeightBase300};
    position: relative;
  }

  .chart {
    box-sizing: content-box;
    overflow: visible;
    alignment-adjust: center;
    display: block;
  }

  .legendContainer {
    padding-top: 16px;

    white-space: nowrap;
    width: 100%;
    align-items: center;
    margin: -8px 0 0 -8px;

    flex-wrap: wrap;
    display: flex;
  }

  .insideDonutString {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeHero700};
    font-weight: ${fontWeightSemibold};
    line-height: ${lineHeightHero700};
    fill: ${colorNeutralForeground1};
  }

  .legend {
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    padding: 8px;
    background: none;
    text-transform: capitalize;
  }

  .legendRect {
    width: 12px;
    height: 12px;
    margin-right: 8px;
    border: 1px solid;
  }

  .legendText {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    color: ${colorNeutralForeground1};
  }
`;
