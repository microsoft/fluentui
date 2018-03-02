/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { Rating } from './Rating';
import { RatingBase } from './Rating.base';
import { getStyles } from './Rating.styles';

describe('Rating', () => {
  it('Renders Rating correctly', () => {
    const component = renderer.create(<Rating />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Can change rating.', () => {
    let exception;
    let threwException = false;
    let rating;
    try {
      rating = ReactTestUtils.renderIntoDocument(
        <RatingBase
          getStyles={ getStyles }
          rating={ 2 }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).toEqual(false);
    const renderedDOM = ReactDOM.findDOMNode(rating as React.ReactInstance);

    const ratingButtons = renderedDOM.querySelectorAll('.ms-Rating-button');
    const ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');

    const checkState = (ratingToCheck: number, state: string) => {
      const iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      const width = iconElement.style.width;
      expect(width).toEqual(state);
    };

    checkState(1, '100%');
    checkState(2, '100%');
    checkState(3, '0%');
    checkState(4, '0%');
    checkState(5, '0%');

    ReactTestUtils.Simulate.focus(ratingButtons[0]);

    checkState(1, '100%');
    checkState(2, '0%');
    checkState(3, '0%');
    checkState(4, '0%');
    checkState(5, '0%');
  });

  it('Clamps input rating to allowed range.', () => {
    let exception;
    let threwException = false;
    let rating;
    try {
      rating = ReactTestUtils.renderIntoDocument(
        <RatingBase
          getStyles={ getStyles }
          rating={ 10 }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).toEqual(false);

    const renderedDOM = ReactDOM.findDOMNode(rating as React.ReactInstance);

    const ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');

    const checkState = (ratingToCheck: number, state: string) => {
      const iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      const width = iconElement.style.width;
      expect(width).toEqual(state);
    };

    expect(ratingFrontStars.length).toEqual(5);
    checkState(1, '100%');
    checkState(2, '100%');
    checkState(3, '100%');
    checkState(4, '100%');
    checkState(5, '100%');

  });

  it('Half star is displayed when 2.5 value is passed.', () => {
    let exception;
    let threwException = false;
    let rating;
    try {
      rating = ReactTestUtils.renderIntoDocument<RatingBase>(
        <RatingBase
          getStyles={ getStyles }
          rating={ 2.5 }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).toEqual(false);

    const renderedDOM = ReactDOM.findDOMNode(rating as React.ReactInstance);
    const ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');

    const checkState = (ratingToCheck: number, state: string) => {
      const iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      const width = iconElement.style.width;
      expect(width).toEqual(state);
    };

    checkState(1, '100%');
    checkState(2, '100%');
    checkState(3, '50%');
    checkState(4, '0%');
    checkState(5, '0%');

  });

  it('When rating is disabled cannot change rating', () => {
    let exception;
    let threwException = false;
    let choiceGroup;
    try {
      choiceGroup = ReactTestUtils.renderIntoDocument<RatingBase>(
        <RatingBase
          getStyles={ getStyles }
          disabled={ true }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).toEqual(false);

    const renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    const ratingButtons = renderedDOM.querySelectorAll('.ms-Rating-button');
    expect((ratingButtons[0] as HTMLButtonElement).disabled).toEqual(true);
    expect((ratingButtons[1] as HTMLButtonElement).disabled).toEqual(true);
    expect((ratingButtons[2] as HTMLButtonElement).disabled).toEqual(true);
    expect((ratingButtons[3] as HTMLButtonElement).disabled).toEqual(true);
    expect((ratingButtons[4] as HTMLButtonElement).disabled).toEqual(true);

  });

  it('When rating is readonly cannot change rating', () => {
    let exception;
    let threwException = false;
    let choiceGroup;
    try {
      choiceGroup = ReactTestUtils.renderIntoDocument<RatingBase>(
        <RatingBase
          getStyles={ getStyles }
          readOnly={ true }
          rating={ 2 }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;

    }
    expect(threwException).toEqual(false);

    const renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    const ratingButtons = renderedDOM.querySelectorAll('.ms-Rating-button');
    expect((ratingButtons[0] as HTMLButtonElement).disabled).toEqual(true);
    expect((ratingButtons[1] as HTMLButtonElement).disabled).toEqual(true);
    expect((ratingButtons[2] as HTMLButtonElement).disabled).toEqual(true);
    expect((ratingButtons[3] as HTMLButtonElement).disabled).toEqual(true);
    expect((ratingButtons[4] as HTMLButtonElement).disabled).toEqual(true);

    const ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');
    const checkState = (ratingToCheck: number, state: string) => {
      const iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      const width = iconElement.style.width;
      expect(width).toEqual(state);
    };

    checkState(1, '100%');
    checkState(2, '100%');
    checkState(3, '0%');
    checkState(4, '0%');
    checkState(5, '0%');
  });

});
