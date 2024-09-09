import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
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
import {
  alignEndState,
  alignStartState,
  brandState,
  insetState,
  strongState,
  subtleState,
  verticalState,
} from '../styles/states/index.js';

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

  :host(${insetState}) {
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

  :host(${alignStartState})::before,
  :host(${alignEndState})::after {
    flex-basis: 12px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  :host(${verticalState}) {
    height: 100%;
    min-height: 84px;
  }
  :host(${verticalState}):empty {
    min-height: 20px;
  }

  :host(${verticalState}) {
    flex-direction: column;
    align-items: center;
  }

  :host(${verticalState}${insetState})::before {
    margin-top: 12px;
  }
  :host(${verticalState}${insetState})::after {
    margin-bottom: 12px;
  }

  :host(${verticalState}):empty::before,
  :host(${verticalState}):empty::after {
    height: 10px;
    min-height: 10px;
    flex-grow: 0;
  }

  :host(${verticalState})::before,
  :host(${verticalState})::after {
    width: ${strokeWidthThin};
    min-height: 20px;
    height: 100%;
  }

  :host(${verticalState}) ::slotted(*) {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    line-height: 20px;
  }

  :host(${verticalState}${alignStartState})::before {
    min-height: 8px;
  }
  :host(${verticalState}${alignEndState})::after {
    min-height: 8px;
  }

  :host(${strongState})::before,
  :host(${strongState})::after {
    background: ${colorNeutralStroke1};
  }
  :host(${strongState}) ::slotted(*) {
    color: ${colorNeutralForeground1};
  }
  :host(${brandState})::before,
  :host(${brandState})::after {
    background: ${colorBrandStroke1};
  }
  :host(${brandState}) ::slotted(*) {
    color: ${colorBrandForeground1};
  }
  :host(${subtleState})::before,
  :host(${subtleState})::after {
    background: ${colorNeutralStroke3};
  }
  :host(${subtleState}) ::slotted(*) {
    color: ${colorNeutralForeground3};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host(${strongState})::before,
    :host(${strongState})::after,
    :host(${brandState})::before,
    :host(${brandState})::after,
    :host(${subtleState})::before,
    :host(${subtleState})::after,
    :host::after,
    :host::before {
      background: WindowText;
      color: WindowText;
    }
  `),
);
