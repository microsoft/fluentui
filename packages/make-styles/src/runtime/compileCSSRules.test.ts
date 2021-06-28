import { compileCSSRules } from './compileCSSRules';

describe('compileCSSRules', () => {
  it('TODO', () => {
    expect(compileCSSRules('.a { color: red } .b { color: blue }')).toMatchInlineSnapshot(`
      Array [
        ".a{color:red}",
        ".b{color:blue}",
      ]
    `);
    expect(compileCSSRules('.a { display: box }')).toMatchInlineSnapshot(`
      Array [
        ".a{-webkit-display:box;display:box}",
      ]
    `);
    expect(compileCSSRules('.a { color: red; background: blue }')).toMatchInlineSnapshot(`
      Array [
        ".a{color:red;background:blue}",
      ]
    `);
  });
});
