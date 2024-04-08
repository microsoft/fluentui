import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
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

  :host([nowrap]) ::slotted(*) {
    white-space: nowrap;
    overflow: hidden;
  }
  :host([truncate]) ::slotted(*) {
    text-overflow: ellipsis;
  }
  :host([block]),
  :host([block]) ::slotted(*) {
    display: block;
  }
  :host([italic]) ::slotted(*) {
    font-style: italic;
  }
  :host([underline]) ::slotted(*) {
    text-decoration-line: underline;
  }
  :host([strikethrough]) ::slotted(*) {
    text-decoration-line: line-through;
  }
  :host([underline][strikethrough]) ::slotted(*) {
    text-decoration-line: line-through underline;
  }
  :host([size='100']) ::slotted(*) {
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
  }
  :host([size='200']) ::slotted(*) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }
  :host([size='400']) ::slotted(*) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }
  :host([size='500']) ::slotted(*) {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
  }
  :host([size='600']) ::slotted(*) {
    font-size: ${fontSizeBase600};
    line-height: ${lineHeightBase600};
  }
  :host([size='700']) ::slotted(*) {
    font-size: ${fontSizeHero700};
    line-height: ${lineHeightHero700};
  }
  :host([size='800']) ::slotted(*) {
    font-size: ${fontSizeHero800};
    line-height: ${lineHeightHero800};
  }
  :host([size='900']) ::slotted(*) {
    font-size: ${fontSizeHero900};
    line-height: ${lineHeightHero900};
  }
  :host([size='1000']) ::slotted(*) {
    font-size: ${fontSizeHero1000};
    line-height: ${lineHeightHero1000};
  }
  :host([font='monospace']) ::slotted(*) {
    font-family: ${fontFamilyMonospace};
  }
  :host([font='numeric']) ::slotted(*) {
    font-family: ${fontFamilyNumeric};
  }
  :host([weight='medium']) ::slotted(*) {
    font-weight: ${fontWeightMedium};
  }
  :host([weight='semibold']) ::slotted(*) {
    font-weight: ${fontWeightSemibold};
  }
  :host([weight='bold']) ::slotted(*) {
    font-weight: ${fontWeightBold};
  }
  :host([align='center']) ::slotted(*) {
    text-align: center;
  }
  :host([align='end']) ::slotted(*) {
    text-align: end;
  }
  :host([align='justify']) ::slotted(*) {
    text-align: justify;
  }
`;
