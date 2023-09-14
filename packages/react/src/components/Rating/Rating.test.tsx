import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { Rating } from './Rating';
import { KeyCodes } from '../../Utilities';
import { isConformant } from '../../common/isConformant';
import type { IRatingProps, IRating } from './Rating.types';

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
    const rating = mount(<Rating onChange={onChange} componentRef={ref} />);

    expect(ref.current?.rating).toBe(1);
    _checkState(rating, [100, 0, 0, 0, 0]);

    rating.find('.ms-Rating-button').at(0).simulate('keyDown', { which: KeyCodes.right });

    expect(ref.current?.rating).toBe(2);
    _checkState(rating, [100, 100, 0, 0, 0]);
  });

  it('clamps input rating to allowed range', () => {
    const rating = mount(<Rating defaultRating={10} componentRef={ref} />);

    expect(rating.find('.ms-Rating-button').length).toEqual(5);

    expect(ref.current?.rating).toBe(5);
    _checkState(rating, [100, 100, 100, 100, 100]);
  });

  it('displays half star when 2.5 value is passed', () => {
    const rating = mount(<Rating defaultRating={2.5} componentRef={ref} />);

    expect(ref.current?.rating).toBe(2.5);
    _checkState(rating, [100, 100, 50, 0, 0]);
  });

  it('cannot change when disabled', () => {
    const rating = mount(<Rating disabled />);
    const ratingButtons = rating.find('.ms-Rating-button');

    for (let i = 0; i < 5; i++) {
      expect(ratingButtons.at(i).prop('disabled')).toEqual(true);
    }
  });

  it('behaves correctly when controlled with allowZeroStars enabled', () => {
    const rating = mount(<Rating rating={3} allowZeroStars componentRef={ref} onChange={noOp} />);
    expect(ref.current?.rating).toBe(3);

    rating.setProps({ rating: 0 });

    expect(ref.current?.rating).toBe(0);
    _checkState(rating, [0, 0, 0, 0, 0]);
  });
});

function _checkState(rating: ReactWrapper<IRatingProps>, states: number[]) {
  for (let i = 0; i < states.length; i++) {
    const ratingFrontStars = rating.find('.ms-RatingStar-front').hostNodes();
    const width = ratingFrontStars.at(i).props().style!.width;

    expect(width).toEqual(`${states[i]}%`);
  }
}
