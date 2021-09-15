import * as React from 'react';
import { render } from '@testing-library/react';
import { applyTriggerPropsToChildren } from './applyTriggerPropsToChildren';

describe('applyTriggerPropsToChildren', () => {
  const child: React.ReactElement = <div>This is a valid React element</div>;
  const triggerProps = { id: 'testId', className: 'testClassName' };

  it('returns the child with the props applied if a React element is sent as the child', () => {
    const result = applyTriggerPropsToChildren(child, triggerProps);
    const div = render(result).getByRole('div');

    expect(div.id).toBe(triggerProps.id);
    expect(div.className).toBe(triggerProps.className);
  });

  it(`returns the child of the fragment with the props applied if a React fragment with a single child is sent as the
      child`, () => {
    const fragment = <>{child}</>;
    const result = applyTriggerPropsToChildren(fragment, triggerProps);
    const div = render(result).getByRole('div');

    expect(div.id).toBe(triggerProps.id);
    expect(div.className).toBe(triggerProps.className);
  });

  it('returns the output of the function if a function component is sent as the child', () => {
    // With props applied at top level
    const functionComponent = (props: { id: string; className: string }) => (
      <div id={props.id} className={props.className}>
        This is a valid element
      </div>
    );
    const result = applyTriggerPropsToChildren(functionComponent, triggerProps);
    const div = render(result).getByRole('div');

    expect(div.id).toBe(triggerProps.id);
    expect(div.className).toBe(triggerProps.className);

    // With props being custom applied
    const functionComponent2 = (props: { id: string; className: string }) => (
      <div id={props.id} className={props.className}>
        This is a valid element
      </div>
    );
    const result2 = applyTriggerPropsToChildren(functionComponent2, triggerProps);
    const div2 = render(result2).getByRole('div');

    expect(div2.id).toBe(triggerProps.id);
    expect(div2.className).toBe(triggerProps.className);
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
});
