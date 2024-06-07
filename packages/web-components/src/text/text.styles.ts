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
    contain: content;
  }

  ::slotted(*) {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    text-align: start;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    margin: 0;
    display: inline;
  }

  :host([nowrap]) ::slotted(*),
  :host([nowrap]) {
    white-space: nowrap;
    overflow: hidden;
  }
  :host([truncate]) ::slotted(*),
  :host([truncate]) {
    text-overflow: ellipsis;
  }
  :host([block]),
  :host([block]) ::slotted(*),
  :host([block]) {
    display: block;
  }
  :host([italic]) ::slotted(*),
  :host([italic]) {
    font-style: italic;
  }
  :host([underline]) ::slotted(*),
  :host([underline]) {
    text-decoration-line: underline;
  }
  :host([strikethrough]) ::slotted(*),
  :host([strikethrough]) {
    text-decoration-line: line-through;
  }
  :host([underline][strikethrough]) ::slotted(*),
  :host([underline][strikethrough]) {
    text-decoration-line: line-through underline;
  }
  :host([size='100']) ::slotted(*),
  :host([size='100']) {
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
  }
  :host([size='200']) ::slotted(*),
  :host([size='200']) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }
  :host([size='400']) ::slotted(*),
  :host([size='400']) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }
  :host([size='500']) ::slotted(*),
  :host([size='500']) {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
  }
  :host([size='600']) ::slotted(*),
  :host([size='600']) {
    font-size: ${fontSizeBase600};
    line-height: ${lineHeightBase600};
  }
  :host([size='700']) ::slotted(*),
  :host([size='700']) {
    font-size: ${fontSizeHero700};
    line-height: ${lineHeightHero700};
  }
  :host([size='800']) ::slotted(*),
  :host([size='800']) {
    font-size: ${fontSizeHero800};
    line-height: ${lineHeightHero800};
  }
  :host([size='900']) ::slotted(*),
  :host([size='900']) {
    font-size: ${fontSizeHero900};
    line-height: ${lineHeightHero900};
  }
  :host([size='1000']) ::slotted(*),
  :host([size='1000']) {
    font-size: ${fontSizeHero1000};
    line-height: ${lineHeightHero1000};
  }
  :host([font='monospace']) ::slotted(*),
  :host([font='monospace']) {
    font-family: ${fontFamilyMonospace};
  }
  :host([font='numeric']) ::slotted(*),
  :host([font='numeric']) {
    font-family: ${fontFamilyNumeric};
  }
  :host([weight='medium']) ::slotted(*),
  :host([weight='medium']) {
    font-weight: ${fontWeightMedium};
  }
  :host([weight='semibold']) ::slotted(*),
  :host([weight='semibold']) {
    font-weight: ${fontWeightSemibold};
  }
  :host([weight='bold']) ::slotted(*),
  :host([weight='bold']) {
    font-weight: ${fontWeightBold};
  }
  :host([align='center']) ::slotted(*),
  :host([align='center']) {
    text-align: center;
  }
  :host([align='end']) ::slotted(*),
  :host([align='end']) {
    text-align: end;
  }
  :host([align='justify']) ::slotted(*),
  :host([align='justify']) {
    text-align: justify;
  }
`;
