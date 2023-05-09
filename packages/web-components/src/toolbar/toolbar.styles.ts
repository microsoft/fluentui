import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralForeground1,
  fontFamilyBase,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalNone,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingHorizontalXL,
  spacingVerticalL,
  spacingVerticalM,
  spacingVerticalNone,
  spacingVerticalS,
  spacingVerticalXS,
  spacingVerticalXL,
} from '../theme/design-tokens.js';

/**
 * Toolbar styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --toolbar-item-gap: 4px;
    align-items: center;
    background: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
    height: 40px;
    box-sizing: border-box;
    width: 100%;
    border-radius: ${borderRadiusMedium};
    font-family: ${fontFamilyBase};
    padding: ${spacingHorizontalXS} ${spacingHorizontalS};
  }
  ::slotted(:not([slot])) {
    flex: 0 0 auto;
    margin: 0 var(--toolbar-item-gap);
  }

  .positioning-region {
    align-items: center;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    flex-grow: 1;
  }
  ::slotted([slot='label']) {
    margin-right: var(--toolbar-item-gap);
  }
  ::slotted([slot='start']) {
    margin: 0 var(--toolbar-item-gap);
  }
  ::slotted([slot='end']) {
    margin-inline-start: auto;
  }
  :host([size='small']) {
    height: 32px;
    padding: ${spacingHorizontalXS} ${spacingHorizontalNone};
  }
  :host([size='large']) {
    height: 48px;
    padding: ${spacingHorizontalXS} ${spacingHorizontalXL};
  }
  ::slotted(fluent-divider) {
    max-height: 20px;
    min-height: 20px;
  }
  :host([orientation='vertical']) {
    flex-direction: column;
    height: 100%;
    width: 44px;
    padding: ${spacingHorizontalS} ${spacingHorizontalXS};
  }
  :host([orientation='vertical']) ::slotted(:not([slot])) {
    flex: 0 0 auto;
    margin: var(--toolbar-item-gap) 0;
  }
  :host([orientation='vertical']) .positioning-region {
    flex-direction: column;
  }
  :host([orientation='vertical']) ::slotted([slot='label']) {
    margin-bottom: var(--toolbar-item-gap);
  }
  :host([orientation='vertical']) ::slotted([slot='start']) {
    margin: var(--toolbar-item-gap) 0;
  }
  :host([orientation='vertical']) ::slotted([slot='end']) {
    display: flex;
    flex-direction: column;
    row-gap: var(--toolbar-item-gap);
    column-gap: 0;
    margin-inline-start: auto;
  }
  :host([orientation='vertical'][size='small']) {
    padding: ${spacingHorizontalNone} ${spacingHorizontalXS};
  }
  :host([orientation='vertical'][size='large']) {
    padding: ${spacingHorizontalXL} ${spacingHorizontalXS};
  }
  :host([orientation='vertical']) ::slotted(fluent-divider) {
    max-width: 20px;
    min-width: 20px;
  }
`;
