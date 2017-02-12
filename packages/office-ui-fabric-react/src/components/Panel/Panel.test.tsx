/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';

let { expect } = chai;

import { Panel } from './Panel';

describe('Panel', () => {
  afterEach(() => {
    [].forEach.call(document.querySelectorAll('body > div'), div => div.parentNode.removeChild(div));

    expect(document.querySelector('.ms-Panel')).to.be.null;
  });

  it('Fires the correct events when closing', () => {
    let dismissedCalled = false;
    let dismissCalled = false;

    const handleDismissed = () => {
      dismissedCalled = true;
    };

    const div = document.createElement('div');

    let panel: Panel = ReactDOM.render(
      <Panel
        isOpen={ true }
        onDismiss={ () => { dismissCalled = true; } }
        onDismissed={ handleDismissed } />,
      div) as any;

    panel.dismiss();

    expect(dismissCalled).equals(true, 'onDismiss was not called');
    expect(dismissedCalled).equals(false, 'onDismissed was called prematurely');

    // Generate animation event to simulate animation completing.
    const event = document.createEvent('CustomEvent'); // AnimationEvent is not supported by PhantomJS
    event.initCustomEvent('animationend', true, true, {});
    (event as any).animationName = 'fadeOut';

    const panelElement = document.querySelector('.ms-Panel');
    expect(panel).not.to.be.null;

    panelElement.dispatchEvent(event);

    expect(dismissedCalled).equals(true, 'onDismissed was not called');
  });
});