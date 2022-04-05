import { getCSSRules } from './getCSSRules';

describe('getCSSRules', () => {
  it('get css rules from stylesheet', () => {
    const style = document.createElement('style');
    document.head.appendChild(style);

    const stylesheet = style.sheet as CSSStyleSheet;
    stylesheet.insertRule('.foo { background: red }', 0);
    stylesheet.insertRule('body { color: grey }', 1);

    expect(getCSSRules(style)).toMatchInlineSnapshot(`
      Array [
        ".foo {background: red;}",
        "body {color: grey;}",
      ]
    `);

    style.remove();
  });
});
