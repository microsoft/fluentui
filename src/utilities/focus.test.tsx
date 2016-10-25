/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
let { expect } = chai;

import { isElementVisible } from './focus';

let _hiddenElement;
let _visibleElement;
let _element;

function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
  const component = ReactTestUtils.renderIntoDocument(element);
  const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
  return renderedDOM as HTMLElement;
}

function _initialize() {
  _hiddenElement = renderIntoDocument(
    <div data-is-visible={ false }>
      <button></button>
    </div>
  ) as HTMLElement;
  _visibleElement = renderIntoDocument(
    <div data-is-visible={ true }>
      <button></button>
    </div>
  ) as HTMLElement;
  _element = renderIntoDocument(
    <div>
      <button></button>
    </div>
  ) as HTMLElement;
  (_element as any).isVisible = true;
}

describe('isElementVisible', () => {
  beforeEach(() => _initialize());
  it('returns false if data-is-visible is false', () => {
    expect(isElementVisible(_hiddenElement)).equals(false, 'Element is not visible');
  });

  it('returns true if data-is-visible is true', () => {
    expect(isElementVisible(_visibleElement)).equals(true, 'Element is visible');
  });

  it('returns true if data-is-visible is undefined but element is visible', () => {
    expect(isElementVisible(_element)).equals(true, 'Element is visible but data-is-visible is undefined');
  });

});
