import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase300,
  fontSizeBase500,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase300,
  lineHeightBase500,
  spacingHorizontalS,
  spacingHorizontalXXL,
  spacingVerticalL,
  spacingVerticalS,
  spacingVerticalXXL,
} from '../theme/design-tokens.js';

/** Dialog Body styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  /* formerly .root */
  :host {
    background: ${colorNeutralBackground1};
    box-sizing: border-box;
    display: grid;
    gap: ${spacingVerticalS};
    padding: ${spacingVerticalXXL} ${spacingHorizontalXXL};
    container: dialog-body / inline-size;
  }

  .title {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
    font-family: ${fontFamilyBase};
    color: ${colorNeutralForeground1};
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 8px;

    /* Sticky header */
    background: ${colorNeutralBackground1};
    inset-block-start: 0;
    margin-block-end: calc(${spacingVerticalS} * -1);
    margin-block-start: calc(${spacingVerticalXXL} * -1);
    padding-block-end: ${spacingVerticalS};
    padding-block-start: ${spacingVerticalXXL};
    position: sticky;
    z-index: 1;
  }

  /* Hide slot if nothing is slotted to remove gap */
  :not(:has(:is([slot='title'], [slot='title-action']))) .title:not(:has(.title-action)) {
    display: none;
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

  .actions {
    display: flex;
    grid-column-start: 1;
    flex-direction: column;
    max-width: 100vw;
    row-gap: ${spacingVerticalS};
    padding-block-start: ${spacingVerticalL};
    justify-self: stretch;
    width: 100%;

    /* Sticky footer */
    background: ${colorNeutralBackground1};
    inset-block-end: 0;
    margin-block-end: calc(${spacingVerticalXXL} * -1);
    padding-block-end: ${spacingVerticalXXL};
    position: sticky;
  }

  /* Hide slot if nothing is slotted to remove gap */
  :not(:has([slot='action'])) .actions {
    display: none;
  }

  ::slotted([slot='action']) {
    width: 100%;
  }

  @container (min-width: 480px) {
    ::slotted([slot='action']) {
      width: fit-content;
    }

    .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      column-gap: ${spacingHorizontalS};
      box-sizing: border-box;

      /* Sticky footer */
      margin-block-start: calc(${spacingVerticalS} * -1);
      padding-block-start: ${spacingVerticalS};
    }
  }
`;
