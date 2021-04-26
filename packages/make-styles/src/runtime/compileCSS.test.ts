import { compileCSS, CompileCSSOptions } from './compileCSS';

const defaultOptions: Pick<
  CompileCSSOptions,
  'rtlClassName' | 'className' | 'media' | 'pseudo' | 'support' | 'unstable_cssPriority'
> = {
  className: 'foo',
  rtlClassName: 'rtl-foo',
  media: '',
  pseudo: '',
  support: '',

  unstable_cssPriority: 0,
};

describe('compileCSS', () => {
  it('handles pseudo', () => {
    expect(
      compileCSS({
        ...defaultOptions,
        pseudo: ':hover',
        property: 'color',
        value: 'red',
      }),
    ).toMatchInlineSnapshot(`
      Array [
        ".foo:hover{color:red;}",
      ]
    `);
    expect(
      compileCSS({
        ...defaultOptions,
        pseudo: ':focus:hover',
        property: 'color',
        value: 'red',
      }),
    ).toMatchInlineSnapshot(`
      Array [
        ".foo:focus:hover{color:red;}",
      ]
    `);
  });

  it('handles at-rules', () => {
    expect(
      compileCSS({
        ...defaultOptions,
        media: '(max-width: 100px)',
        property: 'color',
        value: 'red',
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "@media (max-width: 100px){.foo{color:red;}}",
      ]
    `);
    expect(
      compileCSS({
        ...defaultOptions,
        support: '(display: table-cell)',
        property: 'color',
        value: 'red',
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "@supports (display: table-cell){.foo{color:red;}}",
      ]
    `);
  });

  it('handles rtl properties', () => {
    expect(
      compileCSS({
        ...defaultOptions,

        property: 'paddingLeft',
        value: '10px',

        rtlProperty: 'paddingRight',
        rtlValue: '10px',
      }),
    ).toMatchInlineSnapshot(`
      Array [
        ".foo{padding-left:10px;}",
        ".rtl-foo{padding-right:10px;}",
      ]
    `);
  });

  it('handles rtl properties with preudo selectors', () => {
    expect(
      compileCSS({
        ...defaultOptions,
        pseudo: ':before',

        property: 'paddingLeft',
        value: '10px',

        rtlProperty: 'paddingRight',
        rtlValue: '10px',
      }),
    ).toMatchInlineSnapshot(`
      Array [
        ".foo:before{padding-left:10px;}",
        ".rtl-foo:before{padding-right:10px;}",
      ]
    `);
  });

  describe('global', () => {
    it('compiles global rules', () => {
      expect(
        compileCSS({
          ...defaultOptions,
          pseudo: ':global(body)',
          property: 'color',
          value: 'red',
        }),
      ).toMatchInlineSnapshot(`
      Array [
        "body .foo{color:red;}",
      ]
    `);
      expect(
        compileCSS({
          ...defaultOptions,
          pseudo: ':global(body) &',
          property: 'color',
          value: 'red',
        }),
      ).toMatchInlineSnapshot(`
      Array [
        "body .foo{color:red;}",
      ]
    `);
    });

    it('compiles global rules with RTL', () => {
      expect(
        compileCSS({
          ...defaultOptions,
          pseudo: ':global(body)',
          property: 'paddingLeft',
          value: '10px',

          rtlProperty: 'paddingRight',
          rtlValue: '10px',
        }),
      ).toMatchInlineSnapshot(`
      Array [
        "body .foo{padding-left:10px;}",
        "body .rtl-foo{padding-right:10px;}",
      ]
    `);
    });
  });
});
