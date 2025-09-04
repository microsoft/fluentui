import * as React from 'react';
import { render } from '@testing-library/react';

import type { AtomMotionFn } from '../types';
import { createMotionComponent } from './createMotionComponent';
import { createMotionComponentVariant } from './createMotionComponentVariant';

jest.mock('./createMotionComponent', () => {
  const module = jest.requireActual('./createMotionComponent');

  return {
    ...module,
    createMotionComponent: jest.fn().mockImplementation(module.createMotionComponent),
  };
});

const MOTION_FUNCTION: AtomMotionFn<{ opacity?: number; duration?: number; easing?: string }> = ({
  opacity = 0,
  duration = 1000,
  easing = 'linear',
}) => ({
  keyframes: [{ opacity }, { opacity: 1 }],
  duration,
  easing,
});
const MOTION_COMPONENT = createMotionComponent(MOTION_FUNCTION);

const MOTION_PARAMS = {
  element: document.createElement('div'),
};

describe('createMotionComponentVariant', () => {
  it('overrides motion parameters used within motion function', () => {
    // variant params overriding the default motion params
    const opacity = 0.3;
    const duration = 500;
    const easing = 'ease-in-out';

    const MotionVariant = createMotionComponentVariant(MOTION_COMPONENT, {
      opacity,
      duration,
      easing,
    });
    const overrideFn = (createMotionComponent as jest.Mock).mock.calls[0][0];

    const { getByText } = render(
      <MotionVariant>
        <div>Hello world!</div>
      </MotionVariant>,
    );

    expect(MotionVariant).not.toBe(MOTION_COMPONENT);
    expect(getByText('Hello world!')).toBeInTheDocument();

    expect(createMotionComponent).toHaveBeenCalledTimes(1);
    expect(createMotionComponent).toHaveBeenCalledWith(expect.any(Function));

    expect(overrideFn).toBeInstanceOf(Function);
    expect(overrideFn(MOTION_PARAMS)).toEqual({
      keyframes: [{ opacity }, { opacity: 1 }],
      duration,
      easing,
    });
  });
});
