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

  it('forwards its ref to the child element', () => {
    const ref = React.createRef<HTMLElement>();
    const { getByTestId } = render(
      <DirectionalSlide ref={ref}>
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    expect(ref.current).toBe(getByTestId('child'));
  });

  it('does not introduce a wrapper DOM element around the child', () => {
    const { container, getByTestId } = render(
      <DirectionalSlide>
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    expect(container.firstElementChild).toBe(getByTestId('child'));
  });

  it('preserves child DOM identity when replayKey changes (does not remount)', () => {
    const { getByTestId, rerender } = render(
      <DirectionalSlide replayKey="a">
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    const childBefore = getByTestId('child');

    rerender(
      <DirectionalSlide replayKey="b">
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    const childAfter = getByTestId('child');

    expect(childAfter).toBe(childBefore);
  });

  it('preserves child DOM identity across replayKey changes within the same direction', () => {
    const { getByTestId, rerender } = render(
      <DirectionalSlide animateBackwards={false} replayKey="a">
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    const childBefore = getByTestId('child');

    rerender(
      <DirectionalSlide animateBackwards={false} replayKey="b">
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );

    expect(getByTestId('child')).toBe(childBefore);
  });

  it('remounts the child when animateBackwards flips so the new slide direction takes effect', () => {
    const { getByTestId, rerender } = render(
      <DirectionalSlide animateBackwards={false} replayKey="a">
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );
    const childBefore = getByTestId('child');

    rerender(
      <DirectionalSlide animateBackwards={true} replayKey="b">
        <div data-testid="child">content</div>
      </DirectionalSlide>,
    );

    expect(getByTestId('child')).not.toBe(childBefore);
  });
});
