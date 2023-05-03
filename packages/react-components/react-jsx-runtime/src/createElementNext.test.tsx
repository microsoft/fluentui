/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElementNext */

import { render } from '@testing-library/react';
import { ComponentProps, NextComponentState, Slot, slot } from '@fluentui/react-utilities';
import { createElementNext } from './createElementNext';

describe('createElement next', () => {
  describe('general behavior tests', () => {
    it('handles a string', () => {
      const result = render(<div>Hello world</div>);

      expect(result.container.firstChild).toMatchInlineSnapshot(`
        <div>
          Hello world
        </div>
      `);
    });

    it('handles an array', () => {
      const result = render(
        <div>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i}>{i}</div>
          ))}
        </div>,
      );

      expect(result.container.firstChild).toMatchInlineSnapshot(`
        <div>
          <div>
            0
          </div>
          <div>
            1
          </div>
          <div>
            2
          </div>
        </div>
      `);
    });

    it('handles an array of children', () => {
      const result = render(
        <div>
          <div>1</div>
          <div>2</div>
        </div>,
      );

      expect(result.container.firstChild).toMatchInlineSnapshot(`
        <div>
          <div>
            1
          </div>
          <div>
            2
          </div>
        </div>
      `);
    });
  });

  describe('custom behavior tests', () => {
    it('keeps children from "defaultProps" in a render callback', () => {
      type TestComponentSlots = { slot: NonNullable<Slot<'div'>> };
      type TestComponentState = NextComponentState<TestComponentSlots>;
      type TestComponentProps = ComponentProps<Partial<TestComponentSlots>>;

      const TestComponent = (props: TestComponentProps) => {
        const state: TestComponentState = {
          slot: slot(props.slot, {
            required: true,
            componentType: 'div',
            defaultProps: { children: 'Default Children', id: 'slot' },
          }),
        };
        return <state.slot />;
      };

      const children = jest.fn().mockImplementation((Component, props) => (
        <div id="render-fn">
          <Component {...props} />
        </div>
      ));
      const result = render(<TestComponent slot={{ children }} />);

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
    });

    it('keeps children from a render template in a render callback', () => {
      type TestComponentSlots = { outer: NonNullable<Slot<'div'>>; inner: NonNullable<Slot<'div'>> };
      type TestComponentState = NextComponentState<TestComponentSlots>;
      type TestComponentProps = ComponentProps<Partial<TestComponentSlots>>;

      const TestComponent = (props: TestComponentProps) => {
        const state: TestComponentState = {
          inner: slot(props.inner, { required: true, defaultProps: { id: 'inner' }, componentType: 'div' }),
          outer: slot(props.outer, { required: true, defaultProps: { id: 'outer' }, componentType: 'div' }),
        };
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
    });
  });
});
