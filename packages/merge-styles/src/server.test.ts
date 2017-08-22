import { renderStatic } from './server';
import {
  mergeStyleSets
} from './mergeStyleSets';

const { expect } = chai;

describe('staticRender', () => {
  it('can render content', () => {

    const { html, css } = renderStatic(() => {
      const classNames = mergeStyleSets({
        root: {
          background: 'red'
        }
      });

      return `<div class="${classNames.root}">Hello!</div>`;
    });

    expect(html).equals(`<div class="css-0">Hello!</div>`);
    expect(css).equals(`.css-0{background:red;}`);
  });
});