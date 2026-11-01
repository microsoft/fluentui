import * as React from 'react';
import { render } from '@testing-library/react';

import { composeComponent } from './composeComponent';

type TestProps = React.HTMLAttributes<HTMLDivElement> & { label?: string };
type TestState = { root: React.HTMLAttributes<HTMLDivElement> & { ref: React.Ref<HTMLDivElement> }; label?: string };

const useTest = (props: TestProps, ref: React.Ref<HTMLDivElement>): TestState => ({
  root: { ref, className: props.className },
  label: props.label,
});

describe('composeComponent', () => {
  it('renders the output of the render function for the state returned by the state hook', () => {
    const Test = composeComponent('Test', useTest, (state: TestState) => (
      <div {...state.root} data-testid="root">
        {state.label}
      </div>
    ));

    const { getByTestId } = render(<Test label="hello" className="foo" />);

    expect(getByTestId('root').textContent).toBe('hello');
    expect(getByTestId('root').className).toBe('foo');
  });

  it('forwards the ref to the state hook', () => {
    const Test = composeComponent('Test', useTest, (state: TestState) => <div {...state.root} />);
    const ref = React.createRef<HTMLDivElement>();

    const { container } = render(<Test ref={ref} />);

    expect(ref.current).toBe(container.firstElementChild);
  });

  it('sets the display name', () => {
    const Test = composeComponent('Test', useTest, (state: TestState) => <div {...state.root} />);

    expect(Test.displayName).toBe('Test');
  });

  it('calls the render function with the state only when there are no context values', () => {
    const renderFn = jest.fn((state: TestState) => <div {...state.root} />);
    const Test = composeComponent('Test', useTest, renderFn);

    render(<Test />);

    expect(renderFn).toHaveBeenCalledTimes(1);
    expect(renderFn.mock.calls[0]).toHaveLength(1);
  });

  it('passes the context values derived from the state to the render function', () => {
    const useGetContextValues = jest.fn((state: TestState) => ({ doubled: `${state.label}${state.label}` }));
    const Test = composeComponent(
      'Test',
      useTest,
      (state: TestState, contextValues: { doubled: string }) => <div {...state.root}>{contextValues.doubled}</div>,
      useGetContextValues,
    );

    const { container } = render(<Test label="ab" />);

    expect(container.textContent).toBe('abab');
    expect(useGetContextValues).toHaveBeenCalledWith(expect.objectContaining({ label: 'ab' }));
  });

  it('calls the hooks in order: state, context values, render', () => {
    const calls: string[] = [];
    const useOrderedState = (props: TestProps, ref: React.Ref<HTMLDivElement>) => {
      calls.push('state');
      return useTest(props, ref);
    };
    const Test = composeComponent(
      'Test',
      useOrderedState,
      (state: TestState, contextValues: string) => {
        calls.push('render');
        return <div {...state.root}>{contextValues}</div>;
      },
      () => {
        calls.push('contextValues');
        return 'cv';
      },
    );

    render(<Test />);

    expect(calls).toEqual(['state', 'contextValues', 'render']);
  });

  it('keeps calling its hooks in a stable order across re-renders', () => {
    const useGetContextValues = jest.fn((state: TestState) => state.label);
    const Test = composeComponent(
      'Test',
      useTest,
      (state: TestState, label: string | undefined) => <div {...state.root}>{label}</div>,
      useGetContextValues,
    );

    const { rerender, container } = render(<Test label="a" />);
    rerender(<Test label="b" />);

    expect(container.textContent).toBe('b');
    expect(useGetContextValues).toHaveBeenCalledTimes(2);
  });
});
