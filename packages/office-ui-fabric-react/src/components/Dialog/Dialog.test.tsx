/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';

let { expect } = chai;

import { Dialog } from './Dialog';

describe('Dialog', () => {
  afterEach(() => {
    [].forEach.call(document.querySelectorAll('body > div'), div => div.parentNode.removeChild(div));

    expect(document.querySelector('.ms-Dialog')).to.be.null;
  });

  it('Fires dismissed after closing', () => {
    let dismissedCalled = false;

    const handleDismissed = () => {
      dismissedCalled = true;
    };

    const div = document.createElement('div');
    ReactDOM.render(<Dialog isOpen={ true } onDismissed={ handleDismissed } />, div);
    ReactDOM.render(<Dialog isOpen={ false } onDismissed={ handleDismissed } />, div);

    setTimeout(() => {
      const dialog = document.querySelector('.ms-Dialog');
      expect(dialog).to.be.null;

      expect(dismissedCalled).to.be.true;
    }, 400);

  });
});