import {
  borderRadiusXLarge,
  colorNeutralBackground1,
  colorTransparentStroke,
  fontFamilyBase,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase300,
  lineHeightBase400,
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
    background: rgba(0, 0, 0, 0.3);
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
    grid-template-columns: 1fr 1fr auto;
    overflow: unset;
    max-height: calc(100vh - 48px);
  }

  .header {
    grid-column-start: 1;
    grid-row-end: 1;
    grid-row-start: 1;
    padding-bottom: ${spacingVerticalXS};
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
    font-weight: ${fontWeightSemibold};
    font-family: ${fontFamilyBase};
    padding: ${spacingVerticalXXL} ${spacingHorizontalXS} ${spacingVerticalXS} ${spacingHorizontalXXL};
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
    .root {
      max-width: 100vw;
      grid-template-rows: auto 1fr auto;
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
