/** @jsxRuntime classic */
/** @jsx createElement */

import { render } from '@testing-library/react';
import { assertSlots, resolveShorthand, slot } from '@fluentui/react-utilities';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { createElement } from './createElement';

describe('resolveShorthand with assertSlots', () => {
  describe('custom behavior tests', () => {
    it('keeps children from "defaultProps" in a render callback', () => {
      const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
      type TestComponentSlots = {
        someSlot: NonNullable<Slot<'div'>>;
      };
      type TestComponentProps = ComponentProps<Partial<TestComponentSlots>>;
      type TestComponentState = ComponentState<TestComponentSlots>;

      const TestComponent = (props: TestComponentProps) => {
        const state: TestComponentState = {
          components: { someSlot: 'div' },
          // eslint-disable-next-line deprecation/deprecation
          someSlot: resolveShorthand(props.someSlot, {
            required: true,
            defaultProps: { children: 'Default Children', id: 'slot' },
          }),
        };
        assertSlots<TestComponentSlots>(state);
        return <state.someSlot />;
      };

      const children = jest.fn().mockImplementation((Component, props) => (
        <div id="render-fn">
          <Component {...props} />
        </div>
      ));
      const result = render(<TestComponent someSlot={{ children }} />);

      expect(children).toHaveBeenCalledTimes(1);
      expect(children).toHaveBeenCalledWith('div', { children: 'Default Children', id: 'slot' });

      expect(result.container.firstChild).toMatchInlineSnapshot(`
        <div
          id="render-fn"
        >
          <div
            id="slot"
          >
            Default Children
          </div>
        </div>
      `);

      expect(consoleWarnMock).toHaveBeenCalledTimes(1);
      consoleWarnMock.mockRestore();
    });

    it('keeps children from a render template in a render callback', () => {
      const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
      type TestComponentSlots = { outer: NonNullable<Slot<'div'>>; inner: NonNullable<Slot<'div'>> };
      type TestComponentState = ComponentState<TestComponentSlots>;
      type TestComponentProps = ComponentProps<Partial<TestComponentSlots>>;

      const TestComponent = (props: TestComponentProps) => {
        const state: TestComponentState = {
          components: { outer: 'div', inner: 'div' },
          // eslint-disable-next-line deprecation/deprecation
          inner: resolveShorthand(props.inner, { defaultProps: { id: 'inner' }, required: true }),
          // eslint-disable-next-line deprecation/deprecation
          outer: resolveShorthand(props.outer, { defaultProps: { id: 'outer' }, required: true }),
        };
        assertSlots<TestComponentSlots>(state);
        return (
          <state.outer>
            <state.inner />
          </state.outer>
        );
      };

      const children = jest.fn().mockImplementation((Component, props) => (
        <div id="render-fn">
          <Component {...props} />
        </div>
      ));
      const result = render(<TestComponent outer={{ children }} inner={{ children: 'Inner children' }} />);

      expect(children).toHaveBeenCalledTimes(1);
      expect(children.mock.calls[0][0]).toBe('div');
      expect(children.mock.calls[0][1].id).toBe('outer');
      expect(children.mock.calls[0][1].children).toMatchInlineSnapshot(`
        <React.Fragment>
          <div
            id="inner"
          >
            Inner children
          </div>
        </React.Fragment>
      `);

      expect(result.container.firstChild).toMatchInlineSnapshot(`
        <div
          id="render-fn"
        >
          <div
            id="outer"
          >
            <div
              id="inner"
            >
              Inner children
            </div>
          </div>
        </div>
      `);
      expect(consoleWarnMock).toHaveBeenCalledTimes(2);
      consoleWarnMock.mockRestore();
    });

    it("should support 'as' property to opt-out of base element type", () => {
      const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
      type TestComponentSlots = { slot: NonNullable<Slot<'div', 'span'>> };
      type TestComponentState = ComponentState<TestComponentSlots>;
      type TestComponentProps = ComponentProps<Partial<TestComponentSlots>>;

      const TestComponent = (props: TestComponentProps) => {
        const state: TestComponentState = {
          components: { slot: 'div' },
          // eslint-disable-next-line deprecation/deprecation
          slot: resolveShorthand(props.slot, { required: true }),
        };
        assertSlots<TestComponentSlots>(state);
        return <state.slot />;
      };

      const result = render(<TestComponent slot={{ as: 'span' }} />);

      expect(result.container.firstChild).toMatchInlineSnapshot(`<span />`);
      expect(consoleWarnMock).toHaveBeenCalledTimes(1);
      consoleWarnMock.mockRestore();
    });
    it('should support if someone passes an invalid slot', () => {
      const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
      type TestComponentSlots = { slot: NonNullable<Slot<'div', 'span'>> };
      type TestComponentState = ComponentState<TestComponentSlots>;
      type TestComponentProps = ComponentProps<Partial<TestComponentSlots>>;

      const TestComponent = (props: TestComponentProps) => {
        const state: TestComponentState = {
          components: { slot: 'div' },
          slot: {},
        };
        assertSlots<TestComponentSlots>(state);
        return <state.slot />;
      };

      const result = render(<TestComponent slot={{ as: 'span' }} />);

      expect(result.container.firstChild).toMatchInlineSnapshot(`<div />`);
      expect(consoleWarnMock).toHaveBeenCalledTimes(1);
      consoleWarnMock.mockRestore();
    });
    it('should support overriding a slot declaration with spread props', () => {
      const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
      type TestComponentSlots = { slot: NonNullable<Slot<'div', 'span'>> };
      type TestComponentState = ComponentState<TestComponentSlots>;
      type TestComponentProps = ComponentProps<Partial<TestComponentSlots>>;
      const useHigherOrderStateHook = (props: TestComponentProps): TestComponentState => ({
        components: { slot: 'div' },
        slot: slot.always(props.slot, { elementType: 'div' }),
      });
      const TestComponent = (props: TestComponentProps) => {
        const higherOrderState = useHigherOrderStateHook(props);
        const state: TestComponentState = {
          components: { ...higherOrderState.components, slot: 'span' },
          slot: {
            ...higherOrderState.slot,
            children: 'slot children',
          },
        };
        assertSlots<TestComponentSlots>(state);
        return <state.slot />;
      };
      const result = render(<TestComponent />);

      expect(result.container.firstChild).toMatchInlineSnapshot(`
        <span>
          slot children
        </span>
      `);
      expect(consoleWarnMock).toHaveBeenCalledTimes(1);
      consoleWarnMock.mockRestore();
    });
  });
});
