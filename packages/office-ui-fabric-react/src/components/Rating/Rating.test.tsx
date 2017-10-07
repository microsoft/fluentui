/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

import { Rating } from './Rating';

describe('Rating', () => {
  it('Can change rating.', () => {
    let exception;
    let threwException = false;
    let rating;
    try {
      rating = ReactTestUtils.renderIntoDocument<Rating>(
        <Rating
          rating={ 2 }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).toEqual(false);
    let renderedDOM = ReactDOM.findDOMNode(rating as React.ReactInstance);

    let ratingButtons = renderedDOM.querySelectorAll('.ms-Rating-button');
    let ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');

    const checkState = (ratingToCheck: number, state: string) => {
      let iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      let width = iconElement.style.width;
      expect(width).to.be.eq(state, 'Rating star width should be ${state}');

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
      rating = ReactTestUtils.renderIntoDocument<Rating>(
        <Rating
          rating={ 10 }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).toEqual(false);

    let renderedDOM = ReactDOM.findDOMNode(rating as React.ReactInstance);

    let ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');

    const checkState = (ratingToCheck: number, state: string) => {
      let iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      let width = iconElement.style.width;
      expect(width).to.be.eq(state, 'Rating star width should be ${state}');
    };

    expect(ratingFrontStars.length).to.be.eq(5, 'Number of rating stars are clamped to 5');
    checkState(1, '100%');
    checkState(2, '100%');
    checkState(3, '100%');
    checkState(4, '100%');
    checkState(5, '100%');

  });

  it('Clamps input rating to nearest number when halfstar is not enabled.', () => {
    let exception;
    let threwException = false;
    let rating;
    try {
      rating = ReactTestUtils.renderIntoDocument<Rating>(
        <Rating
          rating={ 2.5 }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).to.be.false;

    let renderedDOM = ReactDOM.findDOMNode(rating as React.ReactInstance);
    let ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');

    const checkState = (ratingToCheck: number, state: string) => {
      let iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      let width = iconElement.style.width;
      expect(width).to.be.eq(state, 'Rating star width should be ${state}');
    };

    checkState(1, '100%');
    checkState(2, '100%');
    checkState(3, '0%');
    checkState(4, '0%');
    checkState(5, '0%');
  });

  it('Half star is displayed when it is enabled.', () => {
    let exception;
    let threwException = false;
    let rating;
    try {
      rating = ReactTestUtils.renderIntoDocument<Rating>(
        <Rating
          rating={ 2.5 }
          enableHalfStar={ true }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).to.be.false;

    let renderedDOM = ReactDOM.findDOMNode(rating as React.ReactInstance);
    let ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');

    const checkState = (ratingToCheck: number, state: string) => {
      let iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      let width = iconElement.style.width;
      expect(width).to.be.eq(state, 'Rating star width should be ${state}');
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
      choiceGroup = ReactTestUtils.renderIntoDocument<Rating>(
        <Rating
          disabled={ true }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).toEqual(false);

    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let ratingButtons = renderedDOM.querySelectorAll('.ms-Rating-button');
    expect((ratingButtons[0] as HTMLButtonElement).disabled).to.be.eq(true);
    expect((ratingButtons[1] as HTMLButtonElement).disabled).to.be.eq(true);
    expect((ratingButtons[2] as HTMLButtonElement).disabled).to.be.eq(true);
    expect((ratingButtons[3] as HTMLButtonElement).disabled).to.be.eq(true);
    expect((ratingButtons[4] as HTMLButtonElement).disabled).to.be.eq(true);

  });

  it('When rating is readonly cannot change rating', () => {
    let exception;
    let threwException = false;
    let choiceGroup;
    try {
      choiceGroup = ReactTestUtils.renderIntoDocument<Rating>(
        <Rating
          readOnly={ true }
          rating={ 2 }
        />
      );
    } catch (e) {
      exception = e;
      threwException = true;

    }
    expect(threwException).to.be.false;

    let renderedDOM = ReactDOM.findDOMNode(choiceGroup as React.ReactInstance);
    let ratingButtons = renderedDOM.querySelectorAll('.ms-Rating-button');
    expect((ratingButtons[0] as HTMLButtonElement).disabled).to.be.eq(true);
    expect((ratingButtons[1] as HTMLButtonElement).disabled).to.be.eq(true);
    expect((ratingButtons[2] as HTMLButtonElement).disabled).to.be.eq(true);
    expect((ratingButtons[3] as HTMLButtonElement).disabled).to.be.eq(true);
    expect((ratingButtons[4] as HTMLButtonElement).disabled).to.be.eq(true);

    let ratingFrontStars = renderedDOM.querySelectorAll('.ms-RatingStar-front');
    const checkState = (ratingToCheck: number, state: string) => {
      let iconElement = ratingFrontStars[ratingToCheck - 1] as HTMLElement;
      let width = iconElement.style.width;
      expect(width).to.be.eq(state, 'Rating star width should be ${state}');
    };

    checkState(1, '100%');
    checkState(2, '100%');
    checkState(3, '0%');
    checkState(4, '0%');
    checkState(5, '0%');
  });

});
