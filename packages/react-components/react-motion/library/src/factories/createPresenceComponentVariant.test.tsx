import * as React from 'react';
import { render } from '@testing-library/react';

import type { PresenceMotionFn } from '../types';
import { createPresenceComponent } from './createPresenceComponent';
import { createPresenceComponentVariant } from './createPresenceComponentVariant';

jest.mock('./createPresenceComponent', () => {
  const module = jest.requireActual('./createPresenceComponent');

  return {
    ...module,
    createPresenceComponent: jest.fn().mockImplementation(module.createPresenceComponent),
  };
});

const PRESENCE_MOTION: PresenceMotionFn<{ outOpacity?: number; duration?: number; easing?: string }> = ({
  outOpacity = 0,
  duration = 1000,
  easing = 'linear',
}) => ({
  enter: [{ keyframes: [{ opacity: outOpacity }, { opacity: 1 }], duration, easing }],
  exit: [{ keyframes: [{ opacity: 1 }, { opacity: outOpacity }], duration, easing }],
});
const PRESENCE_COMPONENT = createPresenceComponent(PRESENCE_MOTION);

const MOTION_PARAMS = {
  element: document.createElement('div'),
};

describe('createPresenceComponentVariant', () => {
  it('overrides motion parameters used within motion atom arrays', () => {
    // variant params overriding the default motion params
    const outOpacity = 0.3;
    const duration = 500;
    const easing = 'ease-in-out';

    const PresenceVariant = createPresenceComponentVariant(PRESENCE_COMPONENT, {
      outOpacity,
      duration,
      easing,
    });
    const overrideFn = (createPresenceComponent as jest.Mock).mock.calls[0][0];

    const { getByText } = render(
      <PresenceVariant visible>
        <div>Hello world!</div>
      </PresenceVariant>,
    );

    expect(PresenceVariant).not.toBe(PRESENCE_COMPONENT);
    expect(getByText('Hello world!')).toBeInTheDocument();

    expect(createPresenceComponent).toHaveBeenCalledTimes(1);
    expect(createPresenceComponent).toHaveBeenCalledWith(expect.any(Function));

    expect(overrideFn).toBeInstanceOf(Function);
    expect(overrideFn(MOTION_PARAMS)).toEqual({
      enter: [
        {
          duration,
          easing,
          keyframes: [{ opacity: outOpacity }, { opacity: 1 }],
        },
      ],
      exit: [
        {
          duration,
          easing,
          keyframes: [{ opacity: 1 }, { opacity: outOpacity }],
        },
      ],
    });
  });
});
