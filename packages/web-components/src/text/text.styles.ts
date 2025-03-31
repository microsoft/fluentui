import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
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
import {
  blockState,
  boldState,
  centerState,
  endState,
  italicState,
  justifyState,
  mediumState,
  monospaceState,
  nowrapState,
  numericState,
  semiboldState,
  size1000State,
  size100State,
  size200State,
  size400State,
  size500State,
  size600State,
  size700State,
  size800State,
  size900State,
  strikethroughState,
  truncateState,
  underlineState,
} from '../styles/states/index.js';

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

  :host(${nowrapState}),
  :host(${nowrapState}) ::slotted(*) {
    white-space: nowrap;
    overflow: hidden;
  }
  :host(${truncateState}),
  :host(${truncateState}) ::slotted(*) {
    text-overflow: ellipsis;
  }
  :host(${blockState}) {
    display: block;
  }
  :host(${italicState}) {
    font-style: italic;
  }
  :host(${underlineState}) {
    text-decoration-line: underline;
  }
  :host(${strikethroughState}) {
    text-decoration-line: line-through;
  }
  :host(${underlineState}${strikethroughState}) {
    text-decoration-line: line-through underline;
  }
  :host(${size100State}) {
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
  }
  :host(${size200State}) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }
  :host(${size400State}) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }
  :host(${size500State}) {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
  }
  :host(${size600State}) {
    font-size: ${fontSizeBase600};
    line-height: ${lineHeightBase600};
  }
  :host(${size700State}) {
    font-size: ${fontSizeHero700};
    line-height: ${lineHeightHero700};
  }
  :host(${size800State}) {
    font-size: ${fontSizeHero800};
    line-height: ${lineHeightHero800};
  }
  :host(${size900State}) {
    font-size: ${fontSizeHero900};
    line-height: ${lineHeightHero900};
  }
  :host(${size1000State}) {
    font-size: ${fontSizeHero1000};
    line-height: ${lineHeightHero1000};
  }
  :host(${monospaceState}) {
    font-family: ${fontFamilyMonospace};
  }
  :host(${numericState}) {
    font-family: ${fontFamilyNumeric};
  }
  :host(${mediumState}) {
    font-weight: ${fontWeightMedium};
  }
  :host(${semiboldState}) {
    font-weight: ${fontWeightSemibold};
  }
  :host(${boldState}) {
    font-weight: ${fontWeightBold};
  }
  :host(${centerState}) {
    text-align: center;
  }
  :host(${endState}) {
    text-align: end;
  }
  :host(${justifyState}) {
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
