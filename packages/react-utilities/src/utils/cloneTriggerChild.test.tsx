import * as React from 'react';
import { cloneTriggerChild } from './cloneTriggerChild';
import { TestTrigger } from './getTriggerChild.test';

describe('cloneTriggerChild', () => {
  it('clones the child if a valid element is sent as the child', () => {
    const child = <div id="child" />;
    const clone = cloneTriggerChild(<div id="child" />, { 'data-test': 'test-value' });

    expect(clone).not.toBe(child);
    expect(clone).toEqual(<div id="child" data-test="test-value" />);
  });

  it('clones the child of a trigger', () => {
    const clone = cloneTriggerChild(
      <TestTrigger id="trigger">
        <div id="child" />
      </TestTrigger>,
      { 'data-test': 'test-value' },
    );

    expect(clone).toEqual(
      <TestTrigger id="trigger">
        <div id="child" data-test="test-value" />
      </TestTrigger>,
    );
  });

  it('clones the child of nested triggers', () => {
    const clone = cloneTriggerChild(
      <TestTrigger id="a">
        <TestTrigger id="b">
          <>
            <TestTrigger id="c">
              <div id="child" />
            </TestTrigger>
          </>
        </TestTrigger>
      </TestTrigger>,
      { 'data-test': 'test-value' },
    );

    expect(clone).toEqual(
      <TestTrigger id="a">
        <TestTrigger id="b">
          <>
            <TestTrigger id="c">
              <div id="child" data-test="test-value" />
            </TestTrigger>
          </>
        </TestTrigger>
      </TestTrigger>,
    );
  });

  it('throws an error if a React fragment with multiple children is sent as the child', () => {
    expect(() =>
      cloneTriggerChild(
        <>
          <div />
          <div />
          <div />
        </>,
        {},
      ),
    ).toThrow();
  });

  it('throws an error if a non-valid element (e.g. a render function) is sent as the child', () => {
    expect(() => cloneTriggerChild(<TestTrigger>{() => <div />}</TestTrigger>, {})).toThrow();
  });

  it('throws an error if a non-valid element (e.g. a render function) is sent as the child of nested triggers', () => {
    expect(() =>
      cloneTriggerChild(
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
