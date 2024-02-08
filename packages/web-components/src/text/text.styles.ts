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
    font-family: var(${fontFamilyBase});
    font-size: var(${fontSizeBase300});
    line-height: var(${lineHeightBase300});
    font-weight: var(${fontWeightRegular});
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
    font-size: var(${fontSizeBase100});
    line-height: var(${lineHeightBase100});
  }
  :host([size='200']) ::slotted(*) {
    font-size: var(${fontSizeBase200});
    line-height: var(${lineHeightBase200});
  }
  :host([size='400']) ::slotted(*) {
    font-size: var(${fontSizeBase400});
    line-height: var(${lineHeightBase400});
  }
  :host([size='500']) ::slotted(*) {
    font-size: var(${fontSizeBase500});
    line-height: var(${lineHeightBase500});
  }
  :host([size='600']) ::slotted(*) {
    font-size: var(${fontSizeBase600});
    line-height: var(${lineHeightBase600});
  }
  :host([size='700']) ::slotted(*) {
    font-size: var(${fontSizeHero700});
    line-height: var(${lineHeightHero700});
  }
  :host([size='800']) ::slotted(*) {
    font-size: var(${fontSizeHero800});
    line-height: var(${lineHeightHero800});
  }
  :host([size='900']) ::slotted(*) {
    font-size: var(${fontSizeHero900});
    line-height: var(${lineHeightHero900});
  }
  :host([size='1000']) ::slotted(*) {
    font-size: var(${fontSizeHero1000});
    line-height: var(${lineHeightHero1000});
  }
  :host([font='monospace']) ::slotted(*) {
    font-family: var(${fontFamilyMonospace});
  }
  :host([font='numeric']) ::slotted(*) {
    font-family: var(${fontFamilyNumeric});
  }
  :host([weight='medium']) ::slotted(*) {
    font-weight: var(${fontWeightMedium});
  }
  :host([weight='semibold']) ::slotted(*) {
    font-weight: var(${fontWeightSemibold});
  }
  :host([weight='bold']) ::slotted(*) {
    font-weight: var(${fontWeightBold});
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
