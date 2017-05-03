/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';

let { expect } = chai;

import { Panel } from './Panel';

let div: HTMLElement;

describe('Panel', () => {
  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('fires the correct events when closing', (done) => {
    let dismissedCalled = false;
    let dismissCalled = false;
    let panel: Panel = ReactDOM.render(
      <Panel
        isOpen={ true }
        onDismiss={ () => { dismissCalled = true; } }
        onDismissed={ () => dismissedCalled = true } />,
      div) as any;

    panel.dismiss();

    expect(dismissCalled).equals(true, 'onDismiss was not called');
    expect(dismissedCalled).equals(false, 'onDismissed was called prematurely');

    setTimeout(() => {
      try {
        expect(dismissedCalled).equals(true, 'onDismissed not called');
        done();
      } catch (e) {
        done(e);
      }
    }, 250);
  });
});