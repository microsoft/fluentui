import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
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
  ${display('flex')}

  :host {
    --_vertical-min-height: 10px;

    contain: content;
  }

  :host::after,
  :host::before {
    align-self: center;
    background: ${colorNeutralStroke2};
    box-sizing: border-box;
    content: '';
    display: flex;
    flex-grow: 1;
    height: ${strokeWidthThin};
  }

  :host([inset]) {
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

  :host([align-content='start'])::before,
  :host([align-content='end'])::after {
    flex-basis: 12px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  :host([orientation='vertical']) {
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  :host([orientation='vertical'][inset])::before {
    margin-top: 12px;
  }

  :host([orientation='vertical'][inset])::after {
    margin-bottom: 12px;
  }

  :host([orientation='vertical'])::before,
  :host([orientation='vertical'])::after {
    width: ${strokeWidthThin};
    min-height: var(--_vertical-min-height);
    height: 100%;
  }

  /**
   * Use @supports to avoid the scoped styles from applying in Safari. Because
   * Safari supports @scope but ':scope:has(*)' would select a host with no
   * children.
   */
  @supports not selector(:host(:has(*))) {
    @scope {
      :scope:has(*) {
        --_vertical-min-height: 20px;
      }
    }
  }

  :host(:has(*)) {
    --_vertical-min-height: 20px;
  }

  :host([orientation='vertical']) ::slotted(*) {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    line-height: 20px;
  }

  :host([orientation='vertical'][align-content='start'])::before {
    min-height: 8px;
  }
  :host([orientation='vertical'][align-content='end'])::after {
    min-height: 8px;
  }

  :host([appearance='strong'])::before,
  :host([appearance='strong'])::after {
    background: ${colorNeutralStroke1};
  }
  :host([appearance='strong']) ::slotted(*) {
    color: ${colorNeutralForeground1};
  }
  :host([appearance='brand'])::before,
  :host([appearance='brand'])::after {
    background: ${colorBrandStroke1};
  }
  :host([appearance='brand']) ::slotted(*) {
    color: ${colorBrandForeground1};
  }
  :host([appearance='subtle'])::before,
  :host([appearance='subtle'])::after {
    background: ${colorNeutralStroke3};
  }
  :host([appearance='subtle']) ::slotted(*) {
    color: ${colorNeutralForeground3};
  }

  @media (forced-colors: active) {
    :host([appearance='strong'])::before,
    :host([appearance='strong'])::after,
    :host([appearance='brand'])::before,
    :host([appearance='brand'])::after,
    :host([appearance='subtle'])::before,
    :host([appearance='subtle'])::after,
    :host::after,
    :host::before {
      background: WindowText;
      color: WindowText;
    }
  }
`;
