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

  :host([align-content='start']) span::before,
  :host([align-content='end']) span::after {
    flex-basis: 12px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  :host([orientation='vertical']) {
    height: 100%;
    min-height: 84px;
  }
  :host([orientation='vertical'][empty]) {
    min-height: 20px;
  }

  :host([orientation='vertical']) span {
    flex-direction: column;
    align-items: center;
  }

  :host([orientation='vertical'][inset]) span {
    padding: 12px 0;
  }

  :host([orientation='vertical'][empty]) span::before,
  :host([orientation='vertical'][empty]) span::after {
    height: 10px;
    min-height: 10px;
    flex-grow: 0;
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

  :host([orientation='vertical']) span::before,
  :host([orientation='vertical']) span::after {
    width: ${strokeWidthThin};
    min-height: 20px;
    height: 100%;
  }

  :host([orientation='vertical'][align-content='start']) span::before {
    min-height: 8px;
  }
  :host([orientation='vertical'][align-content='end']) span::after {
    min-height: 8px;
  }

  :host([appearance='strong']) span::before,
  :host([appearance='strong']) span::after {
    background: ${colorNeutralStroke1};
  }
  :host([appearance='strong']) ::slotted(*) {
    color: ${colorNeutralForeground1};
  }
  :host([appearance='brand']) span::before,
  :host([appearance='brand']) span::after {
    background: ${colorBrandStroke1};
  }
  :host([appearance='brand']) ::slotted(*) {
    color: ${colorBrandForeground1};
  }
  :host([appearance='subtle']) span::before,
  :host([appearance='subtle']) span::after {
    background: ${colorNeutralStroke3};
  }
  :host([appearance='subtle']) ::slotted(*) {
    color: ${colorNeutralForeground3};
  }
`;
