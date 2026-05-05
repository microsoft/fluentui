import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';

export const styles = css`
  ${display('flex')}

  :host {
    flex-direction: column;
    width: 100%;
    contain: content;
  }
`;
