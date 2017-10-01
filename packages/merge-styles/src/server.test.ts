import { renderStatic } from './server';
import { mergeStyleSets } from './mergeStyleSets';

describe('staticRender', () => {
  it('can render content', () => {
    const { html, css } = renderStatic(() => {
      const classNames: { root: string } = mergeStyleSets({
        root: {
          background: 'red'
        }
      });

      return `<div class="${classNames.root}">Hello!</div>`;
    });

    expect(html).toEqual(`<div class="css-0">Hello!</div>`);
    expect(css).toEqual(`.css-0{background:red;}`);
  });
});
