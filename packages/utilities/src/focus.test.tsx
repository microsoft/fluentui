/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
let { expect } = chai;

import { isElementVisible, isElementTabbable } from './focus';

let _hiddenElement: HTMLElement | undefined;
let _visibleElement: HTMLElement | undefined;
let _element: HTMLElement | undefined;

function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
  const component = ReactTestUtils.renderIntoDocument(element);
  const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
  return renderedDOM as HTMLElement;
}

function _initialize(): void {
  _hiddenElement = renderIntoDocument(
    <div data-is-visible={ false }>
      <button />
    </div>
  ) as HTMLElement;
  _visibleElement = renderIntoDocument(
    <div data-is-visible={ true }>
      <button />
    </div>
  ) as HTMLElement;
  _element = renderIntoDocument(
    <div>
      <button />
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

describe('isElementTabbable', () => {

  it('returns false on null', () => {
    expect(isElementVisible(null)).is.false;
  });

  it('returns false on normal divs', () => {
    let div = document.createElement('div');

    expect(isElementTabbable(div)).is.false;
  });

  it('returns false on disabled buttons', () => {
    let button = document.createElement('button');

    button.setAttribute('disabled', 'true');

    expect(isElementTabbable(button)).is.false;

  });

  it('returns true on buttons', () => {
    let button = document.createElement('button');

    expect(isElementTabbable(button)).is.true;
  });

  it('returns true on anchors', () => {
    let anchor = document.createElement('a');

    expect(isElementTabbable(anchor)).is.true;
  });

  it('returns true on input elements', () => {
    let input = document.createElement('input');

    expect(isElementTabbable(input)).is.true;
  });

  it('returns true on textarea elements', () => {
    let textarea = document.createElement('textarea');

    expect(isElementTabbable(textarea)).is.true;
  });

  it('works with tabbable divs', () => {
    let div = document.createElement('div');

    div.tabIndex = 0;

    expect(isElementTabbable(div)).is.true;
  });

  it('returns true with role=button divs', () => {
    let div = document.createElement('div');

    div.setAttribute('role', 'button');

    expect(isElementTabbable(div)).is.true;
  });

  it('returns false with role=button disabled buttons', () => {
    let button = document.createElement('button');

    button.setAttribute('role', 'button');
    button.setAttribute('disabled', 'true');

    expect(isElementTabbable(button)).is.false;
  });

});