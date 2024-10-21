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
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { display } from '../utils/display.js';
import { state } from '../utils/states.js';

/** Divider styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
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

  :host(${state('inset')}) {
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

  :host(${state('align-start')})::before,
  :host(${state('align-end')})::after {
    flex-basis: 12px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  :host(${state('vertical')}) {
    height: 100%;
    min-height: 84px;
  }
  :host(${state('vertical')}):empty {
    min-height: 20px;
  }

  :host(${state('vertical')}) {
    flex-direction: column;
    align-items: center;
  }

  :host(${state('vertical')}${state('inset')})::before {
    margin-top: 12px;
  }
  :host(${state('vertical')}${state('inset')})::after {
    margin-bottom: 12px;
  }

  :host(${state('vertical')}):empty::before,
  :host(${state('vertical')}):empty::after {
    height: 10px;
    min-height: 10px;
    flex-grow: 0;
  }

  :host(${state('vertical')})::before,
  :host(${state('vertical')})::after {
    width: ${strokeWidthThin};
    min-height: 20px;
    height: 100%;
  }

  :host(${state('vertical')}) ::slotted(*) {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    line-height: 20px;
  }

  :host(${state('vertical')}${state('align-start')})::before,
  :host(${state('vertical')}${state('align-end')})::after {
    min-height: 8px;
  }

  :host(${state('strong')})::before,
  :host(${state('strong')})::after {
    background: ${colorNeutralStroke1};
  }
  :host(${state('strong')}) ::slotted(*) {
    color: ${colorNeutralForeground1};
  }
  :host(${state('brand')})::before,
  :host(${state('brand')})::after {
    background: ${colorBrandStroke1};
  }
  :host(${state('brand')}) ::slotted(*) {
    color: ${colorBrandForeground1};
  }
  :host(${state('subtle')})::before,
  :host(${state('subtle')})::after {
    background: ${colorNeutralStroke3};
  }
  :host(${state('subtle')}) ::slotted(*) {
    color: ${colorNeutralForeground3};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host(${state('strong')})::before,
    :host(${state('strong')})::after,
    :host(${state('brand')})::before,
    :host(${state('brand')})::after,
    :host(${state('subtle')})::before,
    :host(${state('subtle')})::after,
    :host::after,
    :host::before {
      background: WindowText;
      color: WindowText;
    }
  `),
);
