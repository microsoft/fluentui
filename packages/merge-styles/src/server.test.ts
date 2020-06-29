import { renderStatic } from './server';
import { mergeCssSets } from './mergeStyleSets';

describe('staticRender', () => {
  it('can render content', () => {
    const { html, css } = renderStatic(() => {
      const classNames: { root: string } = mergeCssSets([
        {
          root: {
            background: 'red',
          },
        },
      ]);

      return `<div class="${classNames.root}">Hello!</div>`;
    });

    expect(html).toEqual(`<div class="root-0">Hello!</div>`);
    expect(css).toEqual(`.root-0{background:red;}`);
  });

  it('can namespace things', () => {
    const { html, css } = renderStatic(() => {
      const classNames: { root: string } = mergeCssSets([
        {
          root: {
            background: 'red',
          },
        },
      ]);

      return `<div class="${classNames.root}">Hello!</div>`;
    }, 'test');

    expect(html).toEqual(`<div class="test-root-0">Hello!</div>`);
    expect(css).toEqual(`.test-root-0{background:red;}`);
  });
});
