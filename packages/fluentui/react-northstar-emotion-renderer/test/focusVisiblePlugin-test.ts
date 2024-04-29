import { compile, middleware, serialize, stringify } from 'stylis';
import { focusVisiblePlugin } from '../src/focusVisiblePlugin';

function evaluateCSS(input: string): string {
  return serialize(compile(input), middleware([focusVisiblePlugin, stringify]));
}

describe('focusVisiblePlugin', () => {
  it('replaces :focus-visible with the proper selector', () => {
    expect(evaluateCSS('#test:focus-visible { color: red; }')).toMatchInlineSnapshot(
      `"[data-whatinput=\\"keyboard\\"] #test:focus{color:red;}"`,
    );
  });

  it('replaces the proper selector', () => {
    expect(evaluateCSS('#foo, #test:focus-visible { color: red; }')).toMatchInlineSnapshot(
      `"#foo,[data-whatinput=\\"keyboard\\"] #test:focus{color:red;}"`,
    );
  });

  it('works with the :not pseudo-class', () => {
    expect(evaluateCSS('#test:not(:focus-visible) { color: red; }')).toMatchInlineSnapshot(
      `"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus{color:red;}"`,
    );
  });

  it('works with a combination of :focus and :not pseudo-class', () => {
    expect(evaluateCSS('#test:focus:not(:focus-visible) { color: red; }')).toMatchInlineSnapshot(
      `"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus:focus{color:red;}"`,
    );
  });

  it('works with a combination of :not(:focus-visible) and :focus-visible pseudo-classes', () => {
    expect(evaluateCSS('#test:focus-visible .foobar:not(:focus-visible) { color: red; }')).toMatchInlineSnapshot(
      `"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus-visible .foobar:focus{color:red;}"`,
    );
  });

  it("doesn't affects normal Stylis usage", () => {
    expect(evaluateCSS('#test:focus { color: red; }')).toMatchInlineSnapshot(`"#test:focus{color:red;}"`);
  });
});
