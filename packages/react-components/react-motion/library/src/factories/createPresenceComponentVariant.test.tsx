import * as React from 'react';
import { render } from '@testing-library/react';

import type { PresenceMotionFn } from '../types';
import { createPresenceComponent } from './createPresenceComponent';
import { overridePresenceMotion, createPresenceComponentVariant } from './createPresenceComponentVariant';

jest.mock('./createPresenceComponent', () => {
  const module = jest.requireActual('./createPresenceComponent');

  return {
    ...module,
    createPresenceComponent: jest.fn().mockImplementation(module.createPresenceComponent),
  };
});

const PRESENCE_MOTION: PresenceMotionFn<{ direction: 'start' | 'end' }> = () => ({
  enter: { keyframes: [], duration: 1000, easing: 'linear' },
  exit: { keyframes: [], duration: 1000, easing: 'linear' },
});
const PRESENCE_COMPONENT = createPresenceComponent<{ direction: 'start' | 'end' }>(PRESENCE_MOTION);

const MOTION_PARAMS = {
  element: document.createElement('div'),
  direction: 'start' as const,
};

describe('overridePresenceMotion', () => {
  it('overrides "all"', () => {
    expect(
      overridePresenceMotion(PRESENCE_MOTION, { all: { duration: 500, easing: 'ease-in-out' } })(MOTION_PARAMS),
    ).toEqual({
      enter: {
        duration: 500,
        easing: 'ease-in-out',
        keyframes: [],
      },
      exit: {
        duration: 500,
        easing: 'ease-in-out',
        keyframes: [],
      },
    });
  });

  it('overrides "enter"', () => {
    expect(
      overridePresenceMotion(PRESENCE_MOTION, { enter: { duration: 500, easing: 'ease-in-out' } })(MOTION_PARAMS),
    ).toEqual({
      enter: {
        duration: 500,
        easing: 'ease-in-out',
        keyframes: [],
      },
      exit: {
        keyframes: [],
        duration: 1000,
        easing: 'linear',
      },
    });
  });

  it('overrides "exit"', () => {
    expect(
      overridePresenceMotion(PRESENCE_MOTION, { exit: { duration: 500, easing: 'ease-in-out' } })(MOTION_PARAMS),
    ).toEqual({
      enter: {
        keyframes: [],
        duration: 1000,
        easing: 'linear',
      },
      exit: {
        duration: 500,
        easing: 'ease-in-out',
        keyframes: [],
      },
    });
  });
});

describe('createPresenceComponentVariant', () => {
  it('appends override to the original motion', () => {
    const PresenceVariant = createPresenceComponentVariant(PRESENCE_COMPONENT, {
      all: { duration: 500, easing: 'ease-in-out' },
    });
    const overrideFn = (createPresenceComponent as jest.Mock).mock.calls[0][0];

    const { getByText } = render(
      <PresenceVariant direction="start" visible>
        <div>Hello world!</div>
      </PresenceVariant>,
    );

    expect(PresenceVariant).not.toBe(PRESENCE_COMPONENT);
    expect(getByText('Hello world!')).toBeInTheDocument();

    expect(createPresenceComponent).toHaveBeenCalledTimes(1);
    expect(createPresenceComponent).toHaveBeenCalledWith(expect.any(Function));

    expect(overrideFn).toBeInstanceOf(Function);
    expect(overrideFn(MOTION_PARAMS)).toEqual({
      enter: {
        duration: 500,
        easing: 'ease-in-out',
        keyframes: [],
      },
      exit: {
        duration: 500,
        easing: 'ease-in-out',
        keyframes: [],
      },
    });
  });
});
