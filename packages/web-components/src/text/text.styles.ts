import { css } from '@microsoft/fast-element';
import {
  fontFamilyBase,
  fontFamilyMonospace,
  fontFamilyNumeric,
  fontSizeBase100,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontSizeBase500,
  fontSizeBase600,
  fontSizeHero1000,
  fontSizeHero700,
  fontSizeHero800,
  fontSizeHero900,
  fontWeightBold,
  fontWeightMedium,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase100,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  lineHeightBase500,
  lineHeightBase600,
  lineHeightHero1000,
  lineHeightHero700,
  lineHeightHero800,
  lineHeightHero900,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';
import { state } from '../utils/states.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('inline')}

  :host {
    contain: content;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    text-align: start;
  }

  :host(${state('nowrap')}),
  :host(${state('nowrap')}) ::slotted(*) {
    white-space: nowrap;
    overflow: hidden;
  }
  :host(${state('truncate')}),
  :host(${state('truncate')}) ::slotted(*) {
    text-overflow: ellipsis;
  }
  :host(${state('block')}) {
    display: block;
  }
  :host(${state('italic')}) {
    font-style: italic;
  }
  :host(${state('underline')}) {
    text-decoration-line: underline;
  }
  :host(${state('strikethrough')}) {
    text-decoration-line: line-through;
  }
  :host(${state('underline')}${state('strikethrough')}) {
    text-decoration-line: line-through underline;
  }
  :host(${state('size-100')}) {
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
  }
  :host(${state('size-200')}) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }
  :host(${state('size-400')}) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }
  :host(${state('size-500')}) {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
  }
  :host(${state('size-600')}) {
    font-size: ${fontSizeBase600};
    line-height: ${lineHeightBase600};
  }
  :host(${state('size-700')}) {
    font-size: ${fontSizeHero700};
    line-height: ${lineHeightHero700};
  }
  :host(${state('size-800')}) {
    font-size: ${fontSizeHero800};
    line-height: ${lineHeightHero800};
  }
  :host(${state('size-900')}) {
    font-size: ${fontSizeHero900};
    line-height: ${lineHeightHero900};
  }
  :host(${state('size-1000')}) {
    font-size: ${fontSizeHero1000};
    line-height: ${lineHeightHero1000};
  }
  :host(${state('monospace')}) {
    font-family: ${fontFamilyMonospace};
  }
  :host(${state('numeric')}) {
    font-family: ${fontFamilyNumeric};
  }
  :host(${state('medium')}) {
    font-weight: ${fontWeightMedium};
  }
  :host(${state('semibold')}) {
    font-weight: ${fontWeightSemibold};
  }
  :host(${state('bold')}) {
    font-weight: ${fontWeightBold};
  }
  :host(${state('center')}) {
    text-align: center;
  }
  :host(${state('end')}) {
    text-align: end;
  }
  :host(${state('justify')}) {
    text-align: justify;
  }

  ::slotted(*) {
    font: inherit;
    line-height: inherit;
    text-decoration-line: inherit;
    text-align: inherit;
    text-decoration-line: inherit;
    margin: 0;
  }
`;
