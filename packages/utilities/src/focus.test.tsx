/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { isElementVisible, isElementTabbable, focusAsync, getElementIndexPath, getFocusableByIndexPath } from './focus';

let _hiddenElement: HTMLElement | undefined;
let _visibleElement: HTMLElement | undefined;
let _element: HTMLElement | undefined;

function renderIntoDocument(element: React.ReactElement<{}>): HTMLElement {
  const component = ReactTestUtils.renderIntoDocument(element);
  const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
  return renderedDOM as HTMLElement;
}

function _initialize(): void {
  _hiddenElement = renderIntoDocument(
    <div data-is-visible={false}>
      <button />
    </div>
  ) as HTMLElement;
  _visibleElement = renderIntoDocument(
    <div data-is-visible={true}>
      <button />
    </div>
  ) as HTMLElement;
  _element = renderIntoDocument(
    <div>
      <button />
    </div>
  ) as HTMLElement;
  // tslint:disable-next-line:no-any
  (_element as any).isVisible = true;
}

describe('isElementVisible', () => {
  beforeEach(() => _initialize());
  it('returns false if data-is-visible is false', () => {
    expect(isElementVisible(_hiddenElement)).toEqual(false);
  });

  it('returns true if data-is-visible is true', () => {
    expect(isElementVisible(_visibleElement)).toEqual(true);
  });

  it('returns true if data-is-visible is undefined but element is visible', () => {
    expect(isElementVisible(_element)).toEqual(true);
  });
});

describe('isElementTabbable', () => {
  it('returns false on null', () => {
    expect(isElementVisible(null)).toEqual(false);
  });

  it('returns false on normal divs', () => {
    let div = document.createElement('div');

    expect(isElementTabbable(div)).toEqual(false);
  });

  it('returns false on disabled buttons', () => {
    let button = document.createElement('button');

    button.setAttribute('disabled', 'true');

    expect(isElementTabbable(button)).toEqual(false);
  });

  it('returns true on buttons', () => {
    let button = document.createElement('button');

    expect(isElementTabbable(button)).toEqual(true);
  });

  it('returns true on anchors', () => {
    let anchor = document.createElement('a');

    expect(isElementTabbable(anchor)).toEqual(true);
  });

  it('returns true on input elements', () => {
    let input = document.createElement('input');

    expect(isElementTabbable(input)).toEqual(true);
  });

  it('returns true on textarea elements', () => {
    let textarea = document.createElement('textarea');

    expect(isElementTabbable(textarea)).toEqual(true);
  });

  it('works with tabbable divs', () => {
    let div = document.createElement('div');

    div.tabIndex = 0;

    expect(isElementTabbable(div)).toEqual(true);
  });

  it('returns true with role=button divs', () => {
    let div = document.createElement('div');

    div.setAttribute('role', 'button');

    expect(isElementTabbable(div)).toEqual(true);
  });

  it('returns false with role=button disabled buttons', () => {
    let button = document.createElement('button');

    button.setAttribute('role', 'button');
    button.setAttribute('disabled', 'true');

    expect(isElementTabbable(button)).toEqual(false);
  });
});

describe('focusAsync', () => {
  // rAF does not exist in node - let's mock it
  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return window.setTimeout(callback, 16);
  };

  jest.useFakeTimers();

  it('focuses on an item on the next frame', () => {
    const component = renderIntoDocument(
      <div>
        <button className="a">a</button>
        <button className="b">b</button>
        <button className="c">c</button>
      </div>
    );

    const container = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const buttonA = container.querySelector('.a') as HTMLElement;
    const buttonB = container.querySelector('.b') as HTMLElement;
    const buttonC = container.querySelector('.c') as HTMLElement;

    // Focus the first button.
    focusAsync(buttonA);
    window.requestAnimationFrame(() => {
      expect(container.ownerDocument.activeElement).toBe(buttonA);

      // Focus the second button, then the third before the next frame
      focusAsync(buttonB);
      focusAsync(buttonC);
      window.requestAnimationFrame(() => {
        expect(container.ownerDocument.activeElement).toBe(buttonC);
      });
    });

    jest.runAllTimers();
  });

  it('can focus a component which implements focus()', () => {
    let calledFocus = false;
    const fakeComponent = {
      focus: () => (calledFocus = true)
    };

    focusAsync(fakeComponent);
    jest.runAllTimers();
    expect(calledFocus).toEqual(true);
  });
});

describe('getFocusableByIndexPath', () => {
  it('can recover a path', () => {
    const parent = document.createElement('div');

    parent.innerHTML = `
    <div>
      <div></div>
      <div></div>
      <div>
        <div></div>
        <button id='child' data-is-visible='true' />
      </div>
    </div>
  `;

    const child = parent.querySelector('#child') as HTMLElement;

    expect(getFocusableByIndexPath(parent, [0, 2, 1])).toEqual(child);
  });

  it('ignores hidden elements', () => {
    const parent = document.createElement('div');

    parent.innerHTML = `
    <div>
      <div></div>
      <div></div>
      <div>
        <div></div>
        <button id='child' data-is-visible='false' />
      </div>
    </div>
  `;

    const child = parent.querySelector('#child') as HTMLElement;

    expect(getFocusableByIndexPath(parent, [0, 2, 1])).toEqual(null);
  });

  it('can fallback to a previous element', () => {
    const parent = document.createElement('div');

    parent.innerHTML = `
    <div>
      <button id='child' data-is-visible='true'>
        <div>
          <div/>
        </div>
      </button>
    </div>
  `;

    const child = parent.querySelector('#child') as HTMLElement;

    expect(getFocusableByIndexPath(parent, [0, 0, 0, 0, 0, 0])).toEqual(child);
  });
});

describe('getElementIndexPath', () => {
  it('can get a path', () => {
    const parent = document.createElement('div');

    parent.innerHTML = `
      <div>
        <div></div>
        <div></div>
        <div>
          <div></div>
          <div id='child'></div>
        </div>
      </div>
    `;

    const child = parent.querySelector('#child') as HTMLElement;

    expect(getElementIndexPath(parent, child)).toEqual([0, 2, 1]);
  });

  it('can handle the same element', () => {
    const parent = document.createElement('div');

    expect(getElementIndexPath(parent, parent)).toEqual([]);
  });
});
