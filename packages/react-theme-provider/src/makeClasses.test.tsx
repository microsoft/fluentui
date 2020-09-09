/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { makeClasses } from './makeClasses';
import { safeMount } from '@uifabric/test-utilities';
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles';

describe('makeClasses', () => {
  const stylesheet: Stylesheet = Stylesheet.getInstance();

  let lastState: any;
  let useClassesHook: any;

  const TestComponent = (props: any) => {
    lastState = { ...props };

    useClassesHook(lastState);

    return null;
  };

  beforeEach(() => {
    lastState = undefined;
    stylesheet.setConfig({ injectionMode: InjectionMode.none });
    stylesheet.reset();
  });

  it('can auto-distribute classes to the correct components', () => {
    useClassesHook = makeClasses({ root: { background: 'red' } });

    safeMount(<TestComponent />);

    expect(lastState).toEqual({ className: 'root-0' });
  });

  it('can concatenate the root correctly', () => {
    useClassesHook = makeClasses({ root: { background: 'red' } });

    safeMount(<TestComponent className="foo" />);

    expect(lastState).toEqual({ className: 'foo root-0' });
  });

  it('can distribute to a slot prop', () => {
    useClassesHook = makeClasses({ icon: { background: 'red' } });

    safeMount(<TestComponent icon={{ className: 'foo' }} />);

    expect(lastState).toEqual({ icon: { className: 'foo icon-0' } });
  });

  it('can distribute a modifier', () => {
    useClassesHook = makeClasses({ _primary: { background: 'red' } });

    safeMount(<TestComponent />);

    expect(lastState).toEqual({});

    safeMount(<TestComponent primary />);

    expect(lastState).toEqual({ className: '_primary-0', primary: true });
  });

  it('can distribute an enum value', () => {
    useClassesHook = makeClasses({ ['_size_small']: { background: 'red' } });

    safeMount(<TestComponent size="large" />);

    expect(lastState).toEqual({ size: 'large' });

    safeMount(<TestComponent size="small" />);

    expect(lastState).toEqual({ className: '_size_small-0', size: 'small' });
  });
});
