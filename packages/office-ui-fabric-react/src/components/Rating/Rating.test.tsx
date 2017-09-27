/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

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

    let ratingInputs = renderedDOM.querySelectorAll('.ms-Rating-input');

    const checkState = (ratingToCheck: number, state: boolean) => {
      expect((ratingInputs[ratingToCheck - 1] as HTMLInputElement).checked).toEqual(state);
    };

    checkState(1, false);
    checkState(2, true);
    checkState(3, false);
    checkState(4, false);
    checkState(5, false);

    ReactTestUtils.Simulate.change(ratingInputs[0]);

    checkState(1, true);
    checkState(2, false);
    checkState(3, false);
    checkState(4, false);
    checkState(5, false);
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

    let ratingInputs = renderedDOM.querySelectorAll('.ms-Rating-input');

    expect((ratingInputs[0] as HTMLInputElement).checked).toEqual(false);
    expect((ratingInputs[1] as HTMLInputElement).checked).toEqual(false);
    expect((ratingInputs[2] as HTMLInputElement).checked).toEqual(false);
    expect((ratingInputs[3] as HTMLInputElement).checked).toEqual(false);
    expect((ratingInputs[4] as HTMLInputElement).checked).toEqual(true);
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
    let choiceOptions = renderedDOM.querySelectorAll('.ms-Rating-input');

    for (let i = 0; i < 5; ++i) {
      expect((choiceOptions[i] as HTMLInputElement).disabled).toEqual(true);
    }
  });

});
