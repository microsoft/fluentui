import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { injectGlobalCss } from '../../shared/injectStyles';
import { getTestParams } from '../../shared/testParams';
import { performanceMeasure } from '../../shared/performanceMeasure';

const styles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

const template = html<StressContainer>`<slot></slot>`;

@customElement({
  name: 'stress-container',
  template,
  styles,
})
export class StressContainer extends FASTElement {
  constructor() {
    super();
  }

  public connectedCallback(): void {
    super.connectedCallback();

    const { test } = getTestParams();

    if (test === 'mount') {
      performance.mark('start');
    }

    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener(
      'slotchange',
      e => {
        if (test === 'inject-styles') {
          setTimeout(() => {
            performanceMeasure('stress', 'start');
            injectGlobalCss();
          }, 2000);
          return;
        }

        if (test === 'mount') {
          // requestPostAnimationFrame polyfill
          requestAnimationFrame(() => {
            addEventListener(
              'message',
              () => {
                performance.measure('stress', 'start');
              },
              { once: true },
            );
            postMessage('', '*');
          });
        }
      },
      { once: true },
    );
  }
}
