/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';

import {
  setWarningCallback,
} from '@uifabric/utilities';

let { expect } = chai;

import { Dialog } from './Dialog';

// export function setWarningCallback(warningCallback: (message: string) => void): void;

describe('Dialog', () => {
  beforeEach(() => {
    setWarningCallback(message => null);
  });
  afterEach(() => {
    [].forEach.call(document.querySelectorAll('body > div'), (div: any) => div.parentNode.removeChild(div));

    expect(document.querySelector('.ms-Dialog')).to.be.null;
  });

  it('Fires dismissed after closing', () => {
    let dismissedCalled = false;

    const handleDismissed = () => {
      dismissedCalled = true;
    };

    const div = document.createElement('div');
    ReactDOM.render(<Dialog hidden={ false } onDismissed={ handleDismissed } />, div);
    ReactDOM.render(<Dialog hidden={ true } onDismissed={ handleDismissed } />, div);

    setTimeout(() => {
      const dialog = document.querySelector('.ms-Dialog');
      expect(dialog).to.be.null;

      expect(dismissedCalled).to.be.true;
    }, 400);

  });

  it('Fires dismissed after hidden', () => {
    let dismissedCalled = false;

    const handleDismissed = () => {
      dismissedCalled = true;
    };

    const div = document.createElement('div');
    ReactDOM.render(<Dialog hidden={ false } modalProps={ { onDismissed: handleDismissed } } />, div);
    ReactDOM.render(<Dialog hidden={ true } modalProps={ { onDismissed: handleDismissed } } />, div);

    setTimeout(() => {
      const dialog = document.querySelector('.ms-Dialog');
      expect(dialog).to.be.null;

      expect(dismissedCalled).to.be.true;
    }, 400);

  });
});