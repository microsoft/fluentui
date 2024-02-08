import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
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
} from '../theme/design-tokens.js';

/** Dialog styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    --dialog-backdrop: var(${colorBackgroundOverlay});
  }

  dialog {
    background: var(${colorNeutralBackground1});
    border: var(${strokeWidthThin}) solid var(${colorTransparentStroke});
    z-index: 2;
    margin: auto auto;
    max-width: 100%;
    width: 100vw;
    border-radius: var(${borderRadiusXLarge});
    box-shadow: var(${shadow64});
    max-height: 100vh;
    height: fit-content;
    overflow: unset;
    position: fixed;
    inset: 0;
    padding: 0;
  }

  dialog::backdrop {
    background: var(--dialog-backdrop, rgba(0, 0, 0, 0.4));
  }

  .root {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: unset;
    max-height: calc(100vh - 48px);
    padding: var(${spacingVerticalXXL}) var(${spacingHorizontalXXL});
  }

  .title {
    font-size: var(${fontSizeBase500});
    line-height: var(${lineHeightBase500});
    font-weight: var(${fontWeightSemibold});
    font-family: var(${fontFamilyBase});
    color: var(${colorNeutralForeground1});
    margin-bottom: var(${spacingVerticalS});
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 8px;
  }

  .content {
    vertical-align: top;
    min-height: 32px;
    color: var(${colorNeutralForeground1});
    font-size: var(${fontSizeBase300});
    line-height: var(${lineHeightBase300});
    font-weight: var(${fontWeightRegular});
    font-family: var(${fontFamilyBase});
    overflow-y: auto;
    box-sizing: border-box;
  }

  .actions {
    display: flex;
    grid-column-start: 1;
    flex-direction: column;
    max-width: 100vw;
    row-gap: var(${spacingVerticalS});
    padding-top: var(${spacingVerticalXXL});
    justify-self: stretch;
    width: 100%;
  }
  ::slotted([slot='action']) {
    width: 100%;
  }

  @media screen and (min-width: 480px) {
    ::slotted([slot='action']) {
      width: fit-content;
    }
    dialog {
      max-width: 600px;
      width: 100%;
    }
    .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      column-gap: var(${spacingHorizontalS});
      padding-top: var(${spacingVerticalS});
      box-sizing: border-box;
    }
  }
`;
