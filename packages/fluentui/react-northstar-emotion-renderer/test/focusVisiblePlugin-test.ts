import * as stylis from 'stylis';
import { focusVisiblePlugin } from '../src/focusVisiblePlugin';

stylis.use(focusVisiblePlugin);
// @ts-ignore
const useStylis = stylis.default;

it('replaces :focus-visible with the proper selector', () => {
  expect(
    useStylis(
      '#test',
      `
    &:focus-visible {
      color: red;
    }
  `,
    ),
  ).toMatchInlineSnapshot(`"[data-whatinput=\\"keyboard\\"] #test:focus{color:red;}"`);
});

it('works with the :not pseudo-class', () => {
  expect(
    useStylis(
      '#test',
      `
    &:not(:focus-visible) {
      color: red;
    }
  `,
    ),
  ).toMatchInlineSnapshot(`"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus{color:red;}"`);
});

it('works with a combination of :focus and :not pseudo-class', () => {
  expect(
    useStylis(
      '#test',
      `
    &:focus:not(:focus-visible) {
      color: red;
    }
  `,
    ),
  ).toMatchInlineSnapshot(`"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus:focus{color:red;}"`);
});

it('works with a combination of :not(:focus-visible) and :focus-visible pseudo-classes', () => {
  expect(
    useStylis(
      '#test',
      `
    &:focus-visible .foobar:not(:focus-visible) {
      color: red;
    }
  `,
    ),
  ).toMatchInlineSnapshot(
    `"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus-visible .foobar:focus{color:red;}"`,
  );
});

it("doesn't affects normal Stylis usage", () => {
  expect(
    useStylis(
      '#test',
      `
    &:focus {
      color: red;
    }
  `,
    ),
  ).toMatchInlineSnapshot(`"#test:focus{color:red;}"`);
});
