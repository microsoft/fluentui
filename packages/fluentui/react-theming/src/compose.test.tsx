import React from 'react';
import { _composeFactory } from './compose';
import { ITheme } from './theme.types';

const compose = _composeFactory(() => makeBlankTheme());

const reifyTheme = (partial: Partial<ITheme>): ITheme => {
  const result = { components: {}, ...partial };

  return result as ITheme;
};

const makeBlankTheme = (): ITheme => {
  return reifyTheme({});
};

const baseComponent = () => {
  // In a function so that side effects from compose don't affect the next run
  const c: React.FunctionComponent<{}> = (props: {}) => {
    return <div />;
  };
  return c;
};

describe('compose', () => {
  describe('base', () => {
    it('returns a component', () => {
      const composed = compose(baseComponent(), {});
      expect(typeof composed).toEqual('function');
    });

    it('sets options on the result', () => {
      const composed: any = compose(baseComponent(), {});
      expect(composed.__optionsSet).toEqual([{}]);
    });

    it('sets complicated options on the result', () => {
      const composed: any = compose(baseComponent(), { slots: { bar: 'baz' } });
      expect(composed.__optionsSet).toEqual([{ slots: { bar: 'baz' } }]);
    });

    it('sets direct render on the resulting component for recomposition', () => {
      const baseComponentInstance = baseComponent();
      const composed: any = compose(baseComponentInstance, {});
      expect(composed.__directRender).toEqual(baseComponentInstance);
    });

    it('sets direct render on the resulting component for recomposition when nested', () => {
      const baseComponentInstance = baseComponent();
      const composed: any = compose(compose(compose(compose(baseComponentInstance, {}), {}), {}), {});
      expect(composed.__directRender).toEqual(baseComponentInstance);
    });

    it('stacks optionSets', () => {
      const composed: any = compose(compose(baseComponent(), { slots: { foo: 'div' } }), {
        slots: { bar: 'baz' },
      });
      expect(composed.__optionsSet).toEqual([{ slots: { foo: 'div' } }, { slots: { bar: 'baz' } }]);
    });

    it('calls the base component with correct slot values', () => {
      const mock = jest.fn();
      const composed = compose(mock, { name: 'Mock' });
      composed({});
      expect(mock).toBeCalledWith({
        slots: {},
        classes: {},
      });
    });

    it('calls the base component with correct slot values when slots have been mixed', () => {
      const mock = jest.fn();
      const composed = compose(
        compose(compose(mock, { name: 'Mock', slots: { foo: 'foo', bar: 'bar' } }), {
          name: 'Mock2',
          slots: { baz: 'baz2', bar: 'bar2' },
        }),
        {
          name: 'Mock3',
          slots: { foo: 'foo3' },
        },
      );
      composed({});
      expect(mock).toBeCalledWith({
        slots: {
          foo: 'foo3',
          bar: 'bar2',
          baz: 'baz2',
        },
        classes: {},
      });
    });

    it('calls the base component with correct slot values, mixing in props', () => {
      const mock = jest.fn();
      const composed = compose(mock, { name: 'Mock' });
      composed({ foo: 'bar' });
      expect(mock).toBeCalledWith({
        slots: {},
        foo: 'bar',
        classes: {},
      });
    });
  });

  describe('resolveSlots', () => {
    it("merges slots that don't overlap (simple)", () => {
      expect(compose.resolveSlots('', [{ slots: { foo: 'bar' } }], makeBlankTheme())).toEqual({
        foo: 'bar',
      });
    });
    it("merges slots that don't overlap", () => {});
    it('returns empty when no options provided', () => {
      expect(compose.resolveSlots('', [], makeBlankTheme())).toEqual({});
    });
    it('returns empty when no slots defined in options', () => {
      expect(compose.resolveSlots('', [{ styles: { foo: 'bar' } }], makeBlankTheme())).toEqual({});
    });
    it('overwrites slots that are defined "later"', () => {
      const opts = [{ slots: { foo: 'bar' } }, { slots: { foo: 'baz', button: 'button' } }, { slots: { x: 'y' } }];
      expect(compose.resolveSlots('', opts, makeBlankTheme())).toEqual({
        foo: 'baz',
        button: 'button',
        x: 'y',
      });
    });

    it('overwrites slots that are defined in the theme', () => {
      const opts = [{ slots: { foo: 'should not see', baz: 'baz' } }];
      const theme: ITheme = reifyTheme({
        components: {
          Mock: {
            slots: {
              foo: 'foo-from-theme',
              bar: 'bar-from-theme',
            },
          },
        },
      });
      expect(compose.resolveSlots('Mock', opts, theme)).toEqual({
        bar: 'bar-from-theme',
        foo: 'foo-from-theme',
        baz: 'baz',
      });
    });
  });
});
