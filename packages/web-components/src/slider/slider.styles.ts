import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
// import { } from '../theme/design-tokens.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('inline-grid')} :host {
    --thumb-size: 16;
    align-items: center;
    width: 100%;
    user-select: none;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
  }

  .track {
    background: #000;
    height: 2px;
  }

  .thumb-container {
    position: absolute;
  }

  .thumb-cursor {
    height: 20px;
    width: 20px;
    border-radius: 40px;
    background: red;
  }

  :host([orientation='horizontal']) .positioning-region {
    position: relative;
    margin: 0 8px;
    display: grid;
    grid-template-rows: calc(var(--thumb-size) * 1px) 1fr;
  }
  :host([orientation='vertical']) .positioning-region {
    position: relative;
    margin: 0 8px;
    display: grid;
    height: 100%;
    grid-template-columns: calc(var(--thumb-size) * 1px) 1fr;
  }
`;
