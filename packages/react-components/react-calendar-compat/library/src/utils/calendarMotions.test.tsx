import * as React from 'react';
import { render } from '@testing-library/react';
import { DirectionalSlide } from './calendarMotions';
import { AnimationDirection } from '../Calendar';

describe('DirectionalSlide', () => {
  it('renders its children with default props', () => {
    const { getByTestId } = render(
      <DirectionalSlide>
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    expect(getByTestId('child').textContent).toBe('content');
  });

  it.each<[AnimationDirection, boolean]>([
    [AnimationDirection.Vertical, false],
    [AnimationDirection.Vertical, true],
    [AnimationDirection.Horizontal, false],
    [AnimationDirection.Horizontal, true],
  ])('renders children with animationDirection=%s, animateBackwards=%s', (animationDirection, animateBackwards) => {
    const { getByTestId } = render(
      <DirectionalSlide animationDirection={animationDirection} animateBackwards={animateBackwards}>
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('accepts custom duration and easing', () => {
    const { getByTestId } = render(
      <DirectionalSlide duration={500} easing="linear">
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });
});
