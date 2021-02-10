import { getCSSRules } from '@fluentui/test-utilities';
import { createDOMRenderer, MakeStylesDOMRenderer, resetDOMRenderer } from './renderer/createDOMRenderer';
import { makeStaticStyles } from './makeStaticStyles';
import { cssRulesSerializer } from './runtime/utils/test/snapshotSerializer';

expect.addSnapshotSerializer(cssRulesSerializer);

describe('makeStaticStyles', () => {
  let renderer: MakeStylesDOMRenderer;
  beforeEach(() => {
    renderer = createDOMRenderer();
  });

  afterEach(() => {
    resetDOMRenderer();
  });

  it('handles static styles', () => {
    const useStyles = makeStaticStyles({
      body: {
        background: 'blue',
        transition: 'all 4s ease',
      },
      '.foo': {
        background: 'yellow',
        marginLeft: '5px',
      },
    });

    useStyles({ renderer, tokens: {} });

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      body {
        background: blue;
        -webkit-transition: all 4s ease;
        transition: all 4s ease;
      }
      .foo {
        background: yellow;
        margin-left: 5px;
      }
    `);
  });

  it('handles css string', () => {
    const useStyles = makeStaticStyles('body {background: red;}');

    useStyles({ renderer, tokens: {} });

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      body {
        background: red;
      }
    `);
  });
});
