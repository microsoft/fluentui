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
    inset: 0;
    background: ${colorBackgroundOverlay};
    touch-action: none;
  }

  .positioning-region {
    display: flex;
    justify-content: center;
    position: fixed;
    inset: 0;
    z-index: var(--dialog-elevation, 9999);
  }

  .control {
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    z-index: 2;
    margin: auto auto;
    max-width: 100%;
    width: 100vw;
    border-radius: ${borderRadiusXLarge};
    box-shadow: ${shadow64};
    max-height: 100vh;
    height: fit-content;
    overflow: unset;
    position: fixed;
    inset: 0;
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

  .header {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
    font-family: ${fontFamilyBase};
    color: ${colorNeutralForeground1};
    margin-bottom: ${spacingVerticalS};
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
    grid-column-start: 1;
    flex-direction: column;
    max-width: 100vw;
    padding-top: ${spacingVerticalXXL};
    justify-self: stretch;
    width: 100%;
    row-gap: ${spacingVerticalS};
  }

  ::slotted([slot='actions']) {
    width: 100%;
  }

  @media screen and (min-width: 480px) {
    ::slotted([slot='actions']) {
      width: fit-content;
    }
    .control {
      max-width: 600px;
      width: 100%;
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
  }
`;
