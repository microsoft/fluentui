import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralShadowAmbient,
  colorNeutralShadowKey,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentStroke,
  spacingHorizontalL,
  spacingHorizontalS,
  spacingVerticalL,
  spacingVerticalMNudge,
} from '../theme/design-tokens.js';
import {
  typographyBody1Styles,
  typographyCaption1Styles,
  typographyTitle2Styles,
  typographyTitle3Styles,
} from '../styles/index.js';
import { forcedColorsStylesheetBehavior } from '../utils/index.js';

/**
 * Styles for the DonutChart component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-block')}

  .root {
    ${typographyBody1Styles}
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .chart {
    box-sizing: content-box;
    overflow: visible;
    alignment-adjust: center;
    display: block;
  }

  .arc:focus {
    outline: none;
    stroke-width: 1px;
    stroke: ${colorStrokeFocus1};
  }

  .focusOutline {
    fill: none;
  }

  .focusOutline:has(+ .arc:focus) {
    stroke-width: 4px;
    stroke: ${colorStrokeFocus2};
  }

  .insideDonutString {
    ${typographyTitle3Styles}
    fill: ${colorNeutralForeground1};
  }

  .legendContainer {
    padding-top: ${spacingVerticalL};
    white-space: nowrap;
    width: 100%;
    align-items: center;
    margin: -8px 0 0 -8px;
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

  .legendRect {
    width: 12px;
    height: 12px;
    margin-inline-end: ${spacingHorizontalS};
    border: 1px solid;
  }

  .legendText {
    ${typographyCaption1Styles}
    color: ${colorNeutralForeground1};
  }

  .calloutContentRoot {
    display: grid;
    overflow: hidden;
    padding: ${spacingVerticalMNudge} ${spacingHorizontalL};
    background-color: ${colorNeutralBackground1};
    background-blend-mode: normal, luminosity;
    border-radius: ${borderRadiusMedium};
    border: 1px solid ${colorTransparentStroke};
    filter: drop-shadow(0 0 2px ${colorNeutralShadowAmbient}) drop-shadow(0 8px 16px ${colorNeutralShadowKey});
    position: absolute;
    opacity: 0;
    z-index: 1;
    pointer-events: none;
  }

  .calloutBlockContainer {
    padding-inline-start: ${spacingHorizontalS};
    color: ${colorNeutralForeground1};
    border-inline-start: 4px solid;
  }

  .calloutLegendText {
    ${typographyCaption1Styles}
  }

  .calloutContentY {
    ${typographyTitle2Styles}
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    .insideDonutString {
      fill: rgb(179, 179, 179);
    }

    .legendRect,
    .calloutBlockContainer {
      forced-color-adjust: none;
    }

    .calloutLegendText,
    .calloutContentY {
      forced-color-adjust: auto;
      color: rgb(255, 255, 255);
    }
  `),
);
