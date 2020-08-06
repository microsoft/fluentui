import { ComponentStyleFunctionParam, emptyTheme } from '@fluentui/styles';
import { resolveDesignProp } from '../../src/styles/resolveDesignProp';

const styleParam: ComponentStyleFunctionParam = {
  disableAnimations: false,
  props: {},
  rtl: false,
  theme: emptyTheme,
  variables: {},
};

describe('resolveDesignProp', () => {
  test('supports arrays', () => {
    const result = resolveDesignProp([{ color: 'red', padding: 5 }, { color: 'green' }], styleParam);

    expect(result).toMatchInlineSnapshot(`
      Object {
        "className": "design-pest6k",
        "css": "color:red;padding:5px;color:green;",
      }
    `);
  });

  test('supports functions', () => {
    const design = jest.fn().mockImplementation(() => ({ color: 'blue' }));
    const result = resolveDesignProp(design, styleParam);

    expect(result).toMatchInlineSnapshot(`
      Object {
        "className": "design-14ksm7b",
        "css": "color:blue;",
      }
    `);
    expect(design).toHaveBeenCalledWith(styleParam);
  });

  test('supports objects', () => {
    const result = resolveDesignProp({ color: 'red' }, styleParam);

    expect(result).toMatchInlineSnapshot(`
      Object {
        "className": "design-tokvmb",
        "css": "color:red;",
      }
    `);
  });

  test('handles RTL', () => {
    const result = resolveDesignProp({ color: 'red', left: '5px' }, { ...styleParam, rtl: true });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "className": "design-rtl-1wzmosp",
        "css": "color:red;right:5px;",
      }
    `);
  });
});
