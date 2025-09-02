import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';

export const styles = css`
  ${display('block')}

  :host {
    outline: none;
  }
`;
