import * as React from 'react';

import { DrawerMotionParams, InlineDrawerMotion } from './drawerMotions';
import { mergePresenceSlots } from './drawerMotionUtils';

const TestComponent = InlineDrawerMotion;
const testProps: DrawerMotionParams = { position: 'start', size: 'medium', dir: 'ltr' };

describe('mergePresenceSlots', () => {
  it('should return null if inputSlot is null', () => {
    expect(mergePresenceSlots(null, TestComponent, testProps)).toBe(null);
  });

  it('should return an input object with children function when undefined is passed', () => {
    const result = mergePresenceSlots(undefined, TestComponent, testProps);

    expect(result).toMatchObject({ children: expect.any(Function) });
  });

  it('should return an input object with children function when an object is passed', () => {
    const result = mergePresenceSlots({ onMotionStart: () => jest.fn() }, TestComponent, testProps);

    expect(result).toMatchObject({
      onMotionStart: expect.any(Function),
      children: expect.any(Function),
    });
  });

  it('should return an input object with children function its passed', () => {
    const children = jest.fn();
    const renderProps = { children: <div />, ...testProps };
    const result = mergePresenceSlots({ children }, TestComponent, testProps);

    // @ts-expect-error "TestComponent" is not assignable there
    result?.children?.(TestComponent, renderProps);

    expect(result).toMatchObject({ children: expect.any(Function) });
    expect(children).toHaveBeenCalledWith(TestComponent, renderProps);
  });
});
