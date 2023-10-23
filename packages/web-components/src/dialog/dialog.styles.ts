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

  dialog {
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
    padding: 0;
  }

  dialog::backdrop {
    background: ${colorBackgroundOverlay};
  }

  .root {
    box-sizing: border-box;
    display: flex;
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
    row-gap: ${spacingVerticalS};
    padding-top: ${spacingVerticalXXL};
    justify-self: stretch;
    width: 100%;
  }
  ::slotted([slot='footer-action']) {
    width: 100%;
  }

  @media screen and (min-width: 480px) {
    ::slotted([slot='footer-action']) {
      width: fit-content;
    }
    dialog {
      max-width: 600px;
      width: 100%;
    }
    .footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      column-gap: ${spacingHorizontalS};
      padding-top: ${spacingVerticalS};
      box-sizing: border-box;
    }
  }
`;
