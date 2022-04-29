import * as React from 'react';
import { render } from '@testing-library/react';
import { applyTriggerPropsToChildren } from './applyTriggerPropsToChildren';
import { TestTrigger } from './getTriggerChild.test';

describe('applyTriggerPropsToChildren', () => {
  const dataTestId = 'dataTestId';
  const child: React.ReactElement = <div data-testid={dataTestId}>This is a valid React element</div>;
  const triggerProps = { id: 'testId', className: 'testClassName', 'data-testattr': 'testAttr' };

  it('returns the child with the props applied if a React element is sent as the child', () => {
    const result = applyTriggerPropsToChildren(child, triggerProps);
    const div = render(result as React.ReactElement).getByTestId(dataTestId);

    expect(div.tagName).toBe('DIV');
    expect(div.id).toBe(triggerProps.id);
    expect(div.className).toBe(triggerProps.className);
    expect(div.getAttribute('data-testattr')).toBe(triggerProps['data-testattr']);
  });

  it('returns the output of the function if a function component is sent as the child', () => {
    // With props applied at top level
    let functionComponent = (props: { id: string; className: string; 'data-testattr': string }) => (
      <div data-testid={dataTestId} id={props.id} className={props.className} data-testattr={props['data-testattr']}>
        This is a valid element
      </div>
    );
    let result = applyTriggerPropsToChildren(functionComponent, triggerProps);
    const div = render(result as React.ReactElement).getByTestId(dataTestId);

    expect(div.tagName).toBe('DIV');
    expect(div.id).toBe(triggerProps.id);
    expect(div.className).toBe(triggerProps.className);
    expect(div.getAttribute('data-testattr')).toBe(triggerProps['data-testattr']);

    // With props being custom applied
    const dataTestId2 = dataTestId + '2';
    functionComponent = (props: { id: string; className: string; 'data-testattr': string }) => (
      <div>
        <button>This is a valid element</button>
        <span
          data-testid={dataTestId2}
          id={props.id}
          className={props.className}
          data-testattr={props['data-testattr']}
        >
          This is a valid element
        </span>
      </div>
    );
    result = applyTriggerPropsToChildren(functionComponent, triggerProps);
    const span = render(result as React.ReactElement).getByTestId(dataTestId2);

    expect(span.tagName).toBe('SPAN');
    expect(span.id).toBe(triggerProps.id);
    expect(span.className).toBe(triggerProps.className);
    expect(span.getAttribute('data-testattr')).toBe(triggerProps['data-testattr']);
  });

  it(`throws an error if a React fragment with a single child is sent as the child`, () => {
    const fragment = <>{child}</>;
    expect(() => applyTriggerPropsToChildren(fragment, triggerProps)).toThrow();
  });

  it('throws an error if a React fragment with multiple children is sent as the child', () => {
    const fragment = (
      <>
        {child}
        {child}
        {child}
      </>
    );
    expect(() => applyTriggerPropsToChildren(fragment, triggerProps)).toThrow();
  });

  it('applies props to the child if a valid element is sent as the child', () => {
    const trigger = <div id="child" />;
    const result = applyTriggerPropsToChildren(<div id="child" />, { 'data-test': 'test-value' });

    expect(result).not.toBe(trigger);
    expect(result).toEqual(<div id="child" data-test="test-value" />);
  });

  it('applies props to the child of a trigger', () => {
    const result = applyTriggerPropsToChildren(
      <TestTrigger id="trigger">
        <div id="child" />
      </TestTrigger>,
      { 'data-test': 'test-value' },
    );

    expect(result).toEqual(
      <TestTrigger id="trigger">
        <div id="child" data-test="test-value" />
      </TestTrigger>,
    );
  });

  it('applies props to the child of nested triggers', () => {
    const result = applyTriggerPropsToChildren(
      <TestTrigger id="a">
        <TestTrigger id="b">
          <TestTrigger id="c">
            <div id="child" />
          </TestTrigger>
        </TestTrigger>
      </TestTrigger>,
      { 'data-test': 'test-value' },
    );

    expect(result).toEqual(
      <TestTrigger id="a">
        <TestTrigger id="b">
          <TestTrigger id="c">
            <div id="child" data-test="test-value" />
          </TestTrigger>
        </TestTrigger>
      </TestTrigger>,
    );
  });

  it('throws an error if a render function is sent as the child of nested triggers', () => {
    expect(() =>
      applyTriggerPropsToChildren(
        <TestTrigger>
          <TestTrigger>
            <TestTrigger>{() => <div />}</TestTrigger>
          </TestTrigger>
        </TestTrigger>,
        {},
      ),
    ).toThrow();
  });
});
