import {
  borderRadiusXLarge,
  colorBackgroundOverlay,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorTransparentStroke,
  fontFamilyBase,
  fontSizeBase300,
  fontSizeBase500,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase300,
  lineHeightBase500,
  shadow64,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingHorizontalXXL,
  spacingVerticalS,
  spacingVerticalXS,
  spacingVerticalXXL,
  strokeWidthThin,
} from '@fluentui/web-components';
import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

/** Dialog styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host([hidden]) {
    display: none;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${colorBackgroundOverlay};
    touch-action: none;
  }

  .positioning-region {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .control {
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    z-index: 2;
    margin: auto auto;
    width: 100%;
    max-width: 600px;
    border-radius: ${borderRadiusXLarge};
    box-shadow: ${shadow64};
    max-height: 100vh;
    height: fit-content;
    overflow: unset;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .root {
    box-sizing: border-box;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr 76px;
    overflow: unset;
    max-height: calc(100vh - 48px);
  }

  :host([alert]) .root,
  :host([modal]) .root {
    grid-template-columns: auto 1fr;
  }

  :host([alert]) .header,
  :host([modal]) .header {
    padding-right: ${spacingVerticalXXL};
  }

  .header {
    grid-column: 1 / 3;
    grid-row: 1 / 1;
    padding-bottom: ${spacingVerticalXS};
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
    font-family: ${fontFamilyBase};
    padding: ${spacingVerticalXXL} ${spacingHorizontalXS} ${spacingVerticalXS} ${spacingHorizontalXXL};
    color: ${colorNeutralForeground1};
    margin-bottom: ${spacingVerticalS};
    display: inline-block;
    height: fit-content;
  }

  .close {
    align-self: start;
    justify-self: end;
    grid-column-start: 3;
    grid-row-end: 1;
    grid-row-start: 1;
    padding: ${spacingVerticalXXL} ${spacingHorizontalXL} ${spacingVerticalS} ${spacingHorizontalXXL};
  }

  .content {
    grid-row-end: 2;
    grid-row-start: 2;
    grid-column-start: 1;
    grid-column-end: 4;
    padding: 0 ${spacingHorizontalXXL};
    vertical-align: top;
    min-height: 32px;
    color: ${colorNeutralForeground1};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    font-family: ${fontFamilyBase};
    overflow-y: auto;
    box-sizing: border-box;
  }

  .actions {
    display: flex;
    flex-direction: row;
    padding: ${spacingVerticalS} ${spacingHorizontalXXL} ${spacingHorizontalXXL} ${spacingHorizontalXXL};
    height: fit-content;
    column-gap: ${spacingHorizontalS};
    box-sizing: border-box;
    grid-column-start: 2;
    grid-row-start: 3;
    justify-self: end;
    grid-column-end: 4;
    row-gap: ${spacingHorizontalS};
    column-gap: ${spacingVerticalS};
    grid-template-columns: 1fr 1fr auto;
    grid-template-rows: auto 1fr auto;
  }

  @media screen and (max-width: 480px) {
    .control {
      max-width: 100%;
      width: 100vw;
    }

    .actions {
      display: flex;
      grid-column-start: 1;
      flex-direction: column;
      max-width: 100vw;
      padding-top: ${spacingVerticalXXL};
      justify-self: stretch;
      width: 100%;
    }
    ::slotted([slot='actions']) {
      width: 100%;
    }
  }
`;
