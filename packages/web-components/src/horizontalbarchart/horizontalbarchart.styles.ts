import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralBackgroundInverted,
  colorNeutralForeground1,
  colorNeutralForeground4,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorPaletteRedBorder2,
  colorTransparentBackground,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  shadow2,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalS,
  spacingVerticalSNudge,
  spacingVerticalXS,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { display } from '../utils/display.js';
import { typographyCaption1Styles } from '../styles/partials/typography.partials.js';

/**
 * Styles for the HorizontalBarChart component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  ${display('inline-block')}

  .root {
    background-color: var(--background-color);
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .tooltip {
    position: absolute;
    display: grid;
    overflow: hidden;
    padding: 11px 16px 10px 16px;
    backgroundcolor: theme.semanticColors.bodyBackground;
    backgroundblendmode: normal, luminosity;
    text-align: center;
    font: 12px sans-serif;
    background: white;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    border: 2px;
    pointer-events: none;
    opacity: 0;
    z-index: 999;
  }
  .bar {
    opacity: 1;
  }
  .chartTitle {
    display: flex;
    justify-content: space-between;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    font-size: 14px;
    font-weight: 400px;
    line-height: 16px;
    color: ${colorNeutralForeground1};
    margin-bottom: 5px;
  }
  .legendcontainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 16px;
    width: 90%;
    align-items: center;
    margin: -8px 0 0 -8px;
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
    ${typographyCaption1Styles}
    color: ${colorNeutralForeground1};
  }
  .barLabel {
    font-size: ${fontSizeBase300};
  }
`;
