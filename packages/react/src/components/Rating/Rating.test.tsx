import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { Rating } from './Rating';
import { KeyCodes } from '../../Utilities';
import { isConformant } from '../../common/isConformant';
import type { IRating } from './Rating.types';

describe('Rating', () => {
  const ref = React.createRef<IRating>();
  const noOp = () => undefined;

  it('renders correctly', () => {
    const component = renderer.create(<Rating />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with half star', () => {
    const component = renderer.create(<Rating defaultRating={2.5} componentRef={ref} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Rating,
    displayName: 'Rating',
    disabledTests: ['component-handles-classname'],
  });

  it('can change rating', () => {
    const onChange = jest.fn();
    const { container } = render(<Rating onChange={onChange} componentRef={ref} />);

    expect(ref.current?.rating).toBe(1);
    _checkState(container, [100, 0, 0, 0, 0]);

    // Find the first rating button and trigger right arrow key
    const ratingButtons = container.querySelector('.ms-Rating-button')!;
    fireEvent.keyDown(ratingButtons, { which: KeyCodes.right, keyCode: KeyCodes.right });

    expect(ref.current?.rating).toBe(2);
    _checkState(container, [100, 100, 0, 0, 0]);
  });

  it('clamps input rating to allowed range', () => {
    const { container } = render(<Rating defaultRating={10} componentRef={ref} />);

    const ratingButtons = container.querySelectorAll('.ms-Rating-button');
    expect(ratingButtons.length).toEqual(5);

    expect(ref.current?.rating).toBe(5);
    _checkState(container, [100, 100, 100, 100, 100]);
  });

  it('displays half star when 2.5 value is passed', () => {
    const { container } = render(<Rating defaultRating={2.5} componentRef={ref} />);

    expect(ref.current?.rating).toBe(2.5);
    _checkState(container, [100, 100, 50, 0, 0]);
  });

  it('cannot change when disabled', () => {
    const { container } = render(<Rating disabled />);
    const ratingButtons = container.querySelectorAll('.ms-Rating-button');

    for (let i = 0; i < 5; i++) {
      expect(ratingButtons[i].hasAttribute('disabled')).toBeTruthy();
    }
  });

  it('behaves correctly when controlled with allowZeroStars enabled', () => {
    const { container, rerender } = render(<Rating rating={3} allowZeroStars componentRef={ref} onChange={noOp} />);
    expect(ref.current?.rating).toBe(3);

    rerender(<Rating rating={0} allowZeroStars componentRef={ref} onChange={noOp} />);

    expect(ref.current?.rating).toBe(0);
    _checkState(container, [0, 0, 0, 0, 0]);
  });
});

function _checkState(container: HTMLElement, states: number[]) {
  for (let i = 0; i < states.length; i++) {
    const ratingFrontStars = container.querySelectorAll('.ms-RatingStar-front');
    const width = ratingFrontStars[i].getAttribute('style');

    expect(width).toContain(`width: ${states[i]}%`);
  }
}
