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

/** Text styles
 * @public
 */
export const styles = css`
  ${display('inline')}

  :host {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    text-align: start;
  }

  :host([nowrap]),
  :host([nowrap]) ::slotted(*) {
    white-space: nowrap;
    overflow: hidden;
  }
  :host([truncate]),
  :host([truncate]) ::slotted(*) {
    text-overflow: ellipsis;
  }
  :host([block]) {
    display: block;
  }
  :host([italic]) {
    font-style: italic;
  }
  :host([underline]) {
    text-decoration-line: underline;
  }
  :host([strikethrough]) {
    text-decoration-line: line-through;
  }
  :host([underline][strikethrough]) {
    text-decoration-line: line-through underline;
  }
  :host([size='100']) {
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
  }
  :host([size='200']) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }
  :host([size='400']) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }
  :host([size='500']) {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
  }
  :host([size='600']) {
    font-size: ${fontSizeBase600};
    line-height: ${lineHeightBase600};
  }
  :host([size='700']) {
    font-size: ${fontSizeHero700};
    line-height: ${lineHeightHero700};
  }
  :host([size='800']) {
    font-size: ${fontSizeHero800};
    line-height: ${lineHeightHero800};
  }
  :host([size='900']) {
    font-size: ${fontSizeHero900};
    line-height: ${lineHeightHero900};
  }
  :host([size='1000']) {
    font-size: ${fontSizeHero1000};
    line-height: ${lineHeightHero1000};
  }
  :host([font='monospace']) {
    font-family: ${fontFamilyMonospace};
  }
  :host([font='numeric']) {
    font-family: ${fontFamilyNumeric};
  }
  :host([weight='medium']) {
    font-weight: ${fontWeightMedium};
  }
  :host([weight='semibold']) {
    font-weight: ${fontWeightSemibold};
  }
  :host([weight='bold']) {
    font-weight: ${fontWeightBold};
  }
  :host([align='center']) {
    text-align: center;
  }
  :host([align='end']) {
    text-align: end;
  }
  :host([align='justify']) {
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
