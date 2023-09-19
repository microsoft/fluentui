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
  spacingHorizontalXXL,
  spacingVerticalS,
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
    z-index: var(--dialog-elevation, 9999);
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
    display: flex;
    row-gap: 8px;
    flex-direction: column;
    overflow: unset;
    max-height: calc(100vh - 48px);
    padding: ${spacingVerticalXXL} ${spacingHorizontalXXL};
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
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
    font-family: ${fontFamilyBase};
    color: ${colorNeutralForeground1};
    margin-bottom: ${spacingVerticalS};
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 8px;
  }

  .content {
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

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: fit-content;
    column-gap: ${spacingHorizontalS};
    box-sizing: border-box;
    row-gap: ${spacingHorizontalS};
    column-gap: ${spacingVerticalS};
  }

  @media screen and (max-width: 480px) {
    .control {
      max-width: 100%;
      width: 100vw;
    }

    .footer {
      display: flex;
      grid-column-start: 1;
      flex-direction: column;
      max-width: 100vw;
      padding-top: ${spacingVerticalXXL};
      justify-self: stretch;
      width: 100%;
    }
    ::slotted([slot='footer']) {
      width: 100%;
    }
  }
`;
