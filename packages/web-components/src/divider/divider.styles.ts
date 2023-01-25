import { css } from '@microsoft/fast-element';
import {
  colorBrandForeground1,
  colorBrandStroke1,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralStroke1,
  colorNeutralStroke2,
  colorNeutralStroke3,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightRegular,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Divider styles
 * @public
 */
export const styles = css`
  :host {
    display: flex;
  }

  :host span {
    display: flex;
    width: 100%;
  }

  :host([inset]) span {
    padding: 0 12px;
  }

  :host ::slotted(*) {
    color: ${colorNeutralForeground2};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    margin: 0;
    padding: 0 12px;
  }

  :host([align-content='start']) span::before {
    flex-basis: 12px;
    flex-grow: 0;
    flex-shrink: 0;
    order: 0;
  }
  :host([align-content='start']) ::slotted(*) {
    order: 1;
  }
  :host([align-content='start']) span::after {
    order: 2;
  }

  :host([align-content='end']) span::before {
    order: 0;
  }
  :host([align-content='end']) ::slotted(*) {
    order: 1;
  }
  :host([align-content='end']) span::after {
    flex-basis: 12px;
    flex-grow: 0;
    flex-shrink: 0;
    order: 2;
  }

  :host([orientation='vertical']) {
    height: 100%;
    min-height: 84px;
  }

  :host([orientation='vertical']) span {
    flex-direction: column;
    align-items: center;
  }

  :host([orientation='vertical'][inset]) span {
    padding: 12px 0;
  }

  :host([orientation='vertical']) span::before {
  }
  :host([orientation='vertical']) ::slotted(*) {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    line-height: 20px;
  }

  span::after,
  span::before {
    align-self: center;
    background: ${colorNeutralStroke2};
    content: '';
    flex-grow: 1;
    height: ${strokeWidthThin};
  }

  :host([orientation='vertical']) span::after,
  :host([orientation='vertical']) span::before {
    width: ${strokeWidthThin};
    min-height: 20px;
    height: 100%;
  }

  :host([appearance='strong']) span::after,
  :host([appearance='strong']) span::before {
    background: ${colorNeutralStroke1};
  }
  :host([appearance='strong']) ::slotted(*) {
    color: ${colorNeutralForeground1};
  }
  :host([appearance='brand']) span::after,
  :host([appearance='brand']) span::before {
    background: ${colorBrandStroke1};
  }
  :host([appearance='brand']) ::slotted(*) {
    color: ${colorBrandForeground1};
  }
  :host([appearance='subtle']) span::after,
  :host([appearance='subtle']) span::before {
    background: ${colorNeutralStroke3};
  }
  :host([appearance='subtle']) ::slotted(*) {
    color: ${colorNeutralForeground3};
  }
`;
