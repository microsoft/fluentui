import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
import {
  colorBrandForegroundLink,
  colorBrandForegroundLinkHover,
  colorBrandForegroundLinkPressed,
  colorNeutralForeground2Link,
  colorNeutralForeground2LinkHover,
  colorNeutralForeground2LinkPressed,
  colorStrokeFocus2,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { stateSelector } from '../utils/element-internals.js';

export const styles = css`
  ${display('inline')}

  :host {
    position: relative;
    box-sizing: border-box;
    background-color: transparent;
    color: ${colorBrandForegroundLink};
    cursor: pointer;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    overflow: inherit;
    text-align: start;
    text-decoration: none;
    text-decoration-thickness: ${strokeWidthThin};
    text-overflow: inherit;
    user-select: text;
  }

  :host(:hover) {
    outline: none;
    text-decoration-line: underline;
  }

  @media (hover: hover) {
    :host(:hover) {
      color: ${colorBrandForegroundLinkHover};
    }

    :host(:active) {
      color: ${colorBrandForegroundLinkPressed};
    }

    :host([appearance='subtle']:hover) {
      color: ${colorNeutralForeground2LinkHover};
    }

    :host([appearance='subtle']:active) {
      color: ${colorNeutralForeground2LinkPressed};
    }
  }

  :host([appearance='subtle']) {
    color: ${colorNeutralForeground2Link};
  }

  @supports (selector(:host-context(*))) {
    :host-context(:is(h1, h2, h3, h4, h5, h6, p, fluent-text)) {
      font: inherit;
      text-decoration: underline;
    }
  }

  :host([inline]) {
    font: inherit;
    text-decoration: underline;
  }

  :host(:is(:not(:defined):focus-within, ${stateSelector('focus-visible')})) {
    outline-style: none;
    text-decoration-line: underline;
    text-decoration-style: double;
    text-decoration-color: ${colorStrokeFocus2};
  }

  :host(:not([href])) {
    color: inherit;
    text-decoration: none;
  }

  a {
    color: inherit;
    text-decoration: inherit;
    outline-style: none;
  }

  @media (forced-colors: active) {
    :host {
      color: LinkText;
    }
  }
`;
