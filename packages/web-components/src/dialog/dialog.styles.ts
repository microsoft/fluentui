import {
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
  spacingHorizontalL,
  spacingHorizontalXXL,
  spacingVerticalL,
  spacingVerticalXS,
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

  :host {
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
    overflow: auto;
  }

  .control {
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    z-index: 2;
    margin: auto auto;
    width: 100%;
    max-width: 600px;
    max-height: 100vh;
    box-shadow: ${shadow64};
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: ${spacingVerticalXS};
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
    font-weight: ${fontWeightSemibold};
    font-family: ${fontFamilyBase};
    padding: ${spacingHorizontalXXL};
  }

  .content {
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0 ${spacingHorizontalXXL};
    vertical-align: top;
    height: fit-content;
    min-height: 32px;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    font-family: ${fontFamilyBase};
  }

  .actions {
    display: flex;
    flex-direction: row;
    padding: ${spacingVerticalXS} ${spacingHorizontalXXL} ${spacingHorizontalXXL} ${spacingHorizontalXXL};
    align-items: flex-end;
  }

  @media screen and (max-width: 480px) {
    .control {
      max-width: 100%;
      width: 100vh;
    }
    .actions {
      flex-direction: column;
    }
  }
`;
