import { DOMSelectorTreeComponentRenderer } from '../../../shared/vanilla/types';

declare global {
  interface Document {
    adoptedStyleSheets: CSSStyleSheet[];
  }

  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }

  interface CSSStyleSheet {
    replaceSync: (css: string) => void;
  }
}

const sheet = new CSSStyleSheet();
sheet.replaceSync(
  `
  button {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    vertical-align: middle;

    margin: 0;
    padding: 4px;
    overflow: hidden;

    background-color: transparent;
    color: #000000;

    border: 1px solid transparent;
    border-radius: 4px;

    font-family: 'Arial';
    font-size: 14px;
  }

  button:hover {
    border: 1px solid #000000;
    cursor: pointer;
    background-color: aliceblue;
  }

  button:hover:active {
    background-color: darkgrey;
  }

  @media (forced-colors: active) {
    button:focus {
      border-color: ButtonText;
    }

    button:hover {
      background-color: HighlightText;
      border-color: Highlight;
      color: Highlight;
      forced-color-adjust: none;
    }

    button:hover:active {
      background-color: HighlightText;
      border-color: Highlight;
      color: Highlight;
      forced-color-adjust: none;
    }
  }
`,
);

document.adoptedStyleSheets = [sheet];

const template = document.createElement('template');
template.innerHTML = `
  <button>
    <slot></slot>
  </button>`;

class WCBasicButton extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.adoptedStyleSheets = [sheet];
    root.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('wc-basic-button', WCBasicButton);

const componentRenderer: DOMSelectorTreeComponentRenderer = (node, depth, index) => {
  const btn = document.createElement('wc-basic-button');
  btn.innerHTML = node.value.name + ' ' + index;

  return btn;
};

export default componentRenderer;
