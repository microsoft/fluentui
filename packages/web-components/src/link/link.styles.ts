import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorBrandForegroundLink,
  colorBrandForegroundLinkPressed,
  colorNeutralForeground2,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForegroundDisabled,
  colorStrokeFocus2,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  strokeWidthThin,
} from '../theme/design-tokens.js';

export const styles = css`
  ${display('inline')}

  :host {
    font-size: inherit;
  }

  :host .control {
    background-color: transparent;
    bo-sizing: border-box;
    color: ${colorBrandForegroundLink};
    cursor: pointer;
    display: inline;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    margin: 0;
    padding: 0;
    overflow: inherit;
    text-align: left;
    text-decoration: none;
    text-decoration-thickness: ${strokeWidthThin};
    text-overflow: inherit;
    user-select: text;
  }

  :host .control:hover,
  :host .control:active {
    text-decoration-line: underline;
  }

  :host .control:active {
    color: ${colorBrandForegroundLinkPressed};
  }

  :host([href]) {
    font-size: inherit;
  }

  :host(:is([href], [href][disabled-focusable])) .control:focus-visible {
    outline: none;
    text-decoration-color: ${colorStrokeFocus2};
    text-decoration-line: underline;
    text-decoration-style: double;
  }

  :host([appearance='subtle']) .control {
    color: ${colorNeutralForeground2};
  }

  :host([appearance='subtle']) .control:hover {
    color: ${colorNeutralForeground2Hover};
  }

  :host([appearance='subtle']) .control:active {
    color: ${colorNeutralForeground2Pressed};
  }

  :host([inline]) .control {
    text-decoration-line: underline;
  }

  :host(:is([disabled], [disabled-focusable], [disabled][appearance], [disabled-focusable][appearance])) .control,
  :host(:is([disabled], [disabled-focusable], [disabled][appearance], [disabled-focusable][appearance])) .control:hover,
  :host(:is([disabled], [disabled-focusable], [disabled][appearance], [disabled-focusable][appearance]))
    .control:active {
    text-decoration-line: none;
    color: ${colorNeutralForegroundDisabled};
    cursor: not-allowed;
  }
`;
