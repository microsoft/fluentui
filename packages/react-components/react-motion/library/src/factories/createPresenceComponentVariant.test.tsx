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

// TODO: replace `direction` param with something more concrete, less confusing
const PRESENCE_MOTION: PresenceMotionFn<{ duration?: number; easing?: string }> = ({
  duration = 1000,
  easing = 'linear',
}) => ({
  enter: { keyframes: [], duration, easing },
  exit: { keyframes: [], duration, easing },
});
const PRESENCE_COMPONENT = createPresenceComponent(PRESENCE_MOTION);

const MOTION_PARAMS = {
  element: document.createElement('div'),
};

describe('createPresenceComponentVariant', () => {
  // TODO: update for new implementation of createPresenceComponentVariant
  it('appends override to the original motion', () => {
    const PresenceVariant = createPresenceComponentVariant(PRESENCE_COMPONENT, {
      duration: 500,
      easing: 'ease-in-out',
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
