import * as React from 'react';
import { getTriggerChild } from './getTriggerChild';
import { FluentTriggerComponent } from './isFluentTrigger';

export const TestTrigger: React.FC<{ id?: string }> & FluentTriggerComponent = props => <>{props.children}</>;
TestTrigger.displayName = 'TestTrigger';
TestTrigger.isFluentTriggerComponent = true;

describe('getTriggerChild', () => {
  const child: React.ReactElement = <div>This is a valid React element</div>;

  it('returns the child if a valid element is sent as the child', () => {
    expect(getTriggerChild(child)).toBe(child);
  });

  it('throws an error if a non-valid element is sent as the child', () => {
    const nonValid = () => child;
    expect(() => getTriggerChild(nonValid)).toThrow();
  });

  it('returns the child of a trigger', () => {
    const trigger = <TestTrigger>{child}</TestTrigger>;

    expect(getTriggerChild(trigger)).toBe(child);
  });

  it('returns the nested child of multiple layers of triggers', () => {
    const nestedTriggers = (
      <TestTrigger>
        <TestTrigger>
          <TestTrigger>{child}</TestTrigger>
        </TestTrigger>
      </TestTrigger>
    );

    expect(getTriggerChild(nestedTriggers)).toBe(child);
  });
});
