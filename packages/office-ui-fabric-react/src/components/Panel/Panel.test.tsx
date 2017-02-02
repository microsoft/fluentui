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

  it('Fires dismissed after closing', () => {
    let dismissedCalled = false;

    const handleDismissed = () => {
      dismissedCalled = true;
    };

    const div = document.createElement('div');
    ReactDOM.render(<Panel isOpen={true} onDismissed={handleDismissed} />, div);
    ReactDOM.render(<Panel isOpen={false} onDismissed={handleDismissed} />, div);
    const event = document.createEvent('CustomEvent'); // AnimationEvent is not supported by PhantomJS
    event.initCustomEvent('animationend', true, true, {});
    (event as any).animationName = 'fadeOut';

    const panel = document.querySelector('.ms-Panel');
    expect(panel).not.to.be.null;

    panel.dispatchEvent(event);

    expect(dismissedCalled).to.be.true;
  });
});