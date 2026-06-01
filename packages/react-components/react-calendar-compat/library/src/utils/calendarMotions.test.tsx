import * as React from 'react';
import { render } from '@testing-library/react';
import { DirectionalSlideIn } from './calendarMotions';
import { AnimationDirection } from '../Calendar';

describe('DirectionalSlideIn', () => {
  it('renders its children with default props', () => {
    const { getByTestId } = render(
      <DirectionalSlideIn>
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
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
      <DirectionalSlideIn animationDirection={animationDirection} animateBackwards={animateBackwards}>
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('accepts custom duration and easing', () => {
    const { getByTestId } = render(
      <DirectionalSlideIn duration={500} easing="linear">
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('forwards its ref to the child element', () => {
    const ref = React.createRef<HTMLElement>();
    const { getByTestId } = render(
      <DirectionalSlideIn ref={ref}>
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );
    expect(ref.current).toBe(getByTestId('child'));
  });

  it('does not introduce a wrapper DOM element around the child', () => {
    const { container, getByTestId } = render(
      <DirectionalSlideIn>
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );
    expect(container.firstElementChild).toBe(getByTestId('child'));
  });

  it('preserves child DOM identity when replayKey changes (does not remount)', () => {
    const { getByTestId, rerender } = render(
      <DirectionalSlideIn replayKey="a">
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );
    const childBefore = getByTestId('child');

    rerender(
      <DirectionalSlideIn replayKey="b">
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );
    const childAfter = getByTestId('child');

    expect(childAfter).toBe(childBefore);
  });

  it('preserves child DOM identity across replayKey changes within the same direction', () => {
    const { getByTestId, rerender } = render(
      <DirectionalSlideIn animateBackwards={false} replayKey="a">
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );
    const childBefore = getByTestId('child');

    rerender(
      <DirectionalSlideIn animateBackwards={false} replayKey="b">
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );

    expect(getByTestId('child')).toBe(childBefore);
  });

  it('remounts the child when animateBackwards flips so the new slide direction takes effect', () => {
    const { getByTestId, rerender } = render(
      <DirectionalSlideIn animateBackwards={false} replayKey="a">
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );
    const childBefore = getByTestId('child');

    rerender(
      <DirectionalSlideIn animateBackwards={true} replayKey="b">
        <div data-testid="child">content</div>
      </DirectionalSlideIn>,
    );

    expect(getByTestId('child')).not.toBe(childBefore);
  });
});
