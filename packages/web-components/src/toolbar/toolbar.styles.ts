import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralForeground1,
  fontFamilyBase,
  spacingHorizontalNone,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
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
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    font-family: ${fontFamilyBase};
    height: 40px;
    padding: ${spacingHorizontalXS} ${spacingHorizontalS};
    width: 100%;
  }
  ::slotted(:not([slot])) {
    flex: 0 0 auto;
    flex-direction: row;
    margin: 0 var(--toolbar-item-gap);
  }

  .positioning-region {
    align-items: center;
    display: inline-flex;
    flex-flow: row wrap;
    flex-grow: 1;
    justify-content: flex-start;
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
    padding: ${spacingHorizontalS} ${spacingHorizontalXS};
    width: 44px;
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
    column-gap: 0;
    display: flex;
    flex-direction: column;
    margin-inline-start: unset;
    row-gap: var(--toolbar-item-gap);
  }
  :host([orientation='vertical']) ::slotted(fluent-divider) {
    max-width: 20px;
    min-width: 20px;
  }
`;
