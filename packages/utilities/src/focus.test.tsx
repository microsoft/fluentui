import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createTestContainer } from '@fluentui/test-utilities';

import {
  isElementVisible,
  isElementTabbable,
  focusAsync,
  getElementIndexPath,
  getFirstTabbable,
  getFocusableByIndexPath,
  getLastTabbable,
} from './focus';

function renderIntoDocument(element: React.ReactElement<{}>, container: HTMLElement): HTMLElement {
  const component = ReactDOM.render(element, container) as React.ReactInstance;
  const renderedDOM = ReactDOM.findDOMNode(component) as HTMLElement;

  return renderedDOM;
}

// JSDOM does not currently set `delegatesFocus`
// https://github.com/jsdom/jsdom/blob/b7683ed68ebe259cd2c68e5faf12d484a785f45f/lib/jsdom/living/nodes/Element-impl.js#L420-L424
function createDivWithShadowRoot(initOptions: ShadowRootInit): HTMLElement {
  const div = {
    getAttribute: (qualifiedName: string): string | null => null,
    shadowRoot: {
      mode: initOptions.mode,
      delegatesFocus: initOptions.delegatesFocus,
    },
  };

  return div as HTMLElement;
}

function makeShadowDiv(innerHTML: string): React.FC {
  const ShadowDiv = () => {
    const setRef = (node: HTMLElement | null) => {
      if (node) {
        node.attachShadow({ mode: 'open' });
        node.shadowRoot!.innerHTML = innerHTML;
      }
    };

    return <div className="parent" ref={setRef} />;
  };

  return ShadowDiv;
}

describe('isElementVisible', () => {
  let testContainer: HTMLElement | undefined;

  afterEach(() => {
    if (testContainer) {
      ReactDOM.unmountComponentAtNode(testContainer);
      testContainer.remove();
      testContainer = undefined;
    }
  });

  it('returns false if data-is-visible is false', () => {
    testContainer = createTestContainer();

    const _hiddenElement = renderIntoDocument(
      <div data-is-visible={false}>
        <button />
      </div>,
      testContainer,
    ) as HTMLElement;

    expect(isElementVisible(_hiddenElement)).toEqual(false);
  });

  it('returns true if data-is-visible is true', () => {
    testContainer = createTestContainer();
    const _visibleElement = renderIntoDocument(
      <div data-is-visible={true}>
        <button />
      </div>,
      testContainer,
    ) as HTMLElement;

    expect(isElementVisible(_visibleElement)).toEqual(true);
  });

  it('returns true if data-is-visible is undefined but element is visible', () => {
    testContainer = createTestContainer();

    const _element = renderIntoDocument(
      <div>
        <button />
      </div>,
      testContainer,
    ) as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_element as any).isVisible = true;

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

  it('returns true on select elements', () => {
    let select = document.createElement('select');

    expect(isElementTabbable(select)).toEqual(true);
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

  it('returns false with role=button divs', () => {
    let div = document.createElement('div');

    div.setAttribute('role', 'button');

    expect(isElementTabbable(div)).toEqual(false);
  });

  it('returns false with role=button disabled buttons', () => {
    let button = document.createElement('button');

    button.setAttribute('role', 'button');
    button.setAttribute('disabled', 'true');

    expect(isElementTabbable(button)).toEqual(false);
  });

  it('returns false with -1 tabIndex', () => {
    let button = document.createElement('button');

    button.tabIndex = -1;

    expect(isElementTabbable(button, true)).toEqual(false);
  });

  it('returns true for elements with shadowRoot.delegatesFocus=true', () => {
    const div = createDivWithShadowRoot({ mode: 'open', delegatesFocus: true });

    expect(div.shadowRoot?.delegatesFocus).toEqual(true);
    expect(isElementTabbable(div)).toEqual(true);
  });

  it('returns true for elements with shadowRoot.delegatesFocus=false', () => {
    const div = createDivWithShadowRoot({ mode: 'open' });

    expect(isElementTabbable(div)).toEqual(false);
  });

  it('returns true for elements with shadowRoot.delegatesFocus=true when set to ignore shadow roots', () => {
    const div = createDivWithShadowRoot({ mode: 'open', delegatesFocus: true });

    expect(isElementTabbable(div, undefined, false)).toEqual(false);
  });
});

describe('focusAsync', () => {
  let testContainer: HTMLElement | undefined;
  afterEach(() => {
    if (testContainer) {
      ReactDOM.unmountComponentAtNode(testContainer);
      testContainer.remove();
      testContainer = undefined;
    }
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('focuses on an item on the next frame', () => {
    testContainer = createTestContainer();

    const container = renderIntoDocument(
      <div>
        <button className="a">a</button>
        <button className="b">b</button>
        <button className="c">c</button>
      </div>,
      testContainer,
    );

    const buttonA = container.querySelector('.a') as HTMLElement;
    const buttonB = container.querySelector('.b') as HTMLElement;
    const buttonC = container.querySelector('.c') as HTMLElement;

    // Focus the first button.
    focusAsync(buttonA);
    window.requestAnimationFrame(() => {
      expect(container.ownerDocument!.activeElement).toBe(buttonA);

      // Focus the second button, then the third before the next frame
      focusAsync(buttonB);
      focusAsync(buttonC);
      window.requestAnimationFrame(() => {
        expect(container.ownerDocument!.activeElement).toBe(buttonC);
      });
    });

    jest.runAllTimers();
  });

  it('can focus a component which implements focus()', () => {
    let calledFocus = false;
    const fakeComponent = {
      ownerDocument: {},
      focus: () => (calledFocus = true),
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

    parent.querySelector('#child') as HTMLElement;

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

describe('getFirstTabbable', () => {
  let testContainer: HTMLElement | undefined;
  afterEach(() => {
    if (testContainer) {
      ReactDOM.unmountComponentAtNode(testContainer);
      testContainer.remove();
      testContainer = undefined;
    }
  });

  it('focuses on the next tabbable item', () => {
    testContainer = createTestContainer();
    const container = renderIntoDocument(
      <div>
        <div className="parent">
          <button className="a" data-is-visible={true}>
            a
          </button>
          <button className="b" data-is-visible={true}>
            b
          </button>
          <button className="c" data-is-visible={true}>
            c
          </button>
        </div>
      </div>,
      testContainer,
    );

    const parent = container.querySelector('.parent') as HTMLElement;
    const buttonA = container.querySelector('.a') as HTMLElement;
    const buttonB = container.querySelector('.b') as HTMLElement;

    expect(getFirstTabbable(parent, buttonA, true, false)).toEqual(buttonB);
  });

  it('focuses on the next tabbable item in shadow DOM', () => {
    testContainer = createTestContainer();

    const innerHTML = `
    <button class="a" data-is-visible="true">
      a
    </button>
    <button class="b" data-is-visible="true">
      b
    </button>
    <button class="c" data-is-visible="true">
      c
    </button>
    `;
    const ShadowDiv = makeShadowDiv(innerHTML);

    const container = renderIntoDocument(
      <div>
        <ShadowDiv />
      </div>,
      testContainer,
    );

    const parent = container.querySelector('.parent') as HTMLElement;
    const buttonA = parent?.shadowRoot?.querySelector('.a') as HTMLElement;
    const buttonB = parent?.shadowRoot?.querySelector('.b') as HTMLElement;

    expect(getFirstTabbable(parent, buttonA, true, false, true)).toEqual(buttonB);
  });

  it('does not focus on an item with tabIndex of -1', () => {
    testContainer = createTestContainer();
    const container = renderIntoDocument(
      <div>
        <div className="parent">
          <button className="a" data-is-visible={true} tabIndex={-1}>
            a
          </button>
          <button className="b" data-is-visible={true} tabIndex={-1}>
            b
          </button>
          <button className="c" data-is-visible={true} tabIndex={-1}>
            c
          </button>
        </div>
      </div>,
      testContainer,
    );

    const parent = container.querySelector('.parent') as HTMLElement;
    const buttonA = container.querySelector('.a') as HTMLElement;

    expect(getFirstTabbable(parent, buttonA, true, false)).toEqual(null);
  });
});

describe('getLastTabbable', () => {
  let testContainer: HTMLElement | undefined;
  afterEach(() => {
    if (testContainer) {
      ReactDOM.unmountComponentAtNode(testContainer);
      testContainer.remove();
      testContainer = undefined;
    }
  });

  it('focuses on the last tabbable item', () => {
    testContainer = createTestContainer();
    const container = renderIntoDocument(
      <div>
        <div className="parent">
          <button className="a" data-is-visible={true}>
            a
          </button>
          <button className="b" data-is-visible={true}>
            b
          </button>
          <button className="c" data-is-visible={true}>
            c
          </button>
        </div>
      </div>,
      testContainer,
    );

    const parent = container.querySelector('.parent') as HTMLElement;
    const buttonB = container.querySelector('.b') as HTMLElement;
    const buttonC = container.querySelector('.c') as HTMLElement;

    expect(getLastTabbable(parent, buttonC, true, false)).toEqual(buttonB);
  });

  it('focuses on the last tabbable item in shadow DOM', () => {
    testContainer = createTestContainer();

    const innerHTML = `
    <button class="a" data-is-visible="true">
      a
    </button>
    <button class="b" data-is-visible="true">
      b
    </button>
    <button class="c" data-is-visible="true">
      c
    </button>
    `;
    const ShadowDiv = makeShadowDiv(innerHTML);

    const container = renderIntoDocument(
      <div>
        <ShadowDiv />
      </div>,
      testContainer,
    );

    const parent = container.querySelector('.parent') as HTMLElement;
    const buttonB = parent?.shadowRoot?.querySelector('.b') as HTMLElement;
    const buttonC = parent?.shadowRoot?.querySelector('.c') as HTMLElement;

    expect(getLastTabbable(parent, buttonC, true, false, true)).toEqual(buttonB);
  });

  it('does not focus on an item with tabIndex of -1', () => {
    testContainer = createTestContainer();
    const container = renderIntoDocument(
      <div>
        <div className="parent">
          <button className="a" data-is-visible={true} tabIndex={-1}>
            a
          </button>
          <button className="b" data-is-visible={true} tabIndex={-1}>
            b
          </button>
          <button className="c" data-is-visible={true} tabIndex={-1}>
            c
          </button>
        </div>
      </div>,
      testContainer,
    );

    const parent = container.querySelector('.parent') as HTMLElement;
    const buttonC = container.querySelector('.c') as HTMLElement;

    expect(getLastTabbable(parent, buttonC, true, false)).toEqual(null);
  });
});
