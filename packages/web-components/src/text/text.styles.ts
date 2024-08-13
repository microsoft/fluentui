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

/**
 * Selector for the `nowrap` state.
 * @public
 */
const nowrapState = css.partial`:is([state--nowrap], :state(nowrap))`;

/**
 * Selector for the `truncate` state.
 * @public
 */
const truncateState = css.partial`:is([state--truncate], :state(truncate))`;

/**
 * Selector for the `underline` state.
 * @public
 */
const underlineState = css.partial`:is([state--underline], :state(underline))`;

/**
 * Selector for the `strikethrough` state.
 * @public
 */
const strikethroughState = css.partial`:is([state--strikethrough], :state(strikethrough))`;

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
  :host(:is([state--block], :state(block))) {
    display: block;
  }
  :host(:is([state--italic], :state(italic))) {
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
  :host(:is([state--size-100], :state(size-100))) {
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
  }
  :host(:is([state--size-200], :state(size-200))) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }
  :host(:is([state--size-400], :state(size-400))) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }
  :host(:is([state--size-500], :state(size-500))) {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
  }
  :host(:is([state--size-600], :state(size-600))) {
    font-size: ${fontSizeBase600};
    line-height: ${lineHeightBase600};
  }
  :host(:is([state--size-700], :state(size-700))) {
    font-size: ${fontSizeHero700};
    line-height: ${lineHeightHero700};
  }
  :host(:is([state--size-800], :state(size-800))) {
    font-size: ${fontSizeHero800};
    line-height: ${lineHeightHero800};
  }
  :host(:is([state--size-900], :state(size-900))) {
    font-size: ${fontSizeHero900};
    line-height: ${lineHeightHero900};
  }
  :host(:is([state--size-1000], :state(size-1000))) {
    font-size: ${fontSizeHero1000};
    line-height: ${lineHeightHero1000};
  }
  :host(:is([state--monospace], :state(monospace))) {
    font-family: ${fontFamilyMonospace};
  }
  :host(:is([state--numeric], :state(numeric))) {
    font-family: ${fontFamilyNumeric};
  }
  :host(:is([state--medium], :state(medium))) {
    font-weight: ${fontWeightMedium};
  }
  :host(:is([state--semibold], :state(semibold))) {
    font-weight: ${fontWeightSemibold};
  }
  :host(:is([state--bold], :state(bold))) {
    font-weight: ${fontWeightBold};
  }
  :host(:is([state--center], :state(center))) {
    text-align: center;
  }
  :host(:is([state--end], :state(end))) {
    text-align: end;
  }
  :host(:is([state--justify], :state(justify))) {
    text-align: justify;
  }

  ::slotted(*) {
    display: inherit;
    font: inherit;
    line-height: inherit;
    text-decoration-line: inherit;
    text-align: inherit;
    text-decoration-line: inherit;
    margin: 0;
  }
`;
