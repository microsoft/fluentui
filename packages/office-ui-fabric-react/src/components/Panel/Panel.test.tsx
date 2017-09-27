/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';

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
        onDismissed={ () => dismissedCalled = true }
      />,
      div) as any;

    panel.dismiss();

    expect(dismissCalled).toEqual(true);
    expect(dismissedCalled).toEqual(false);

    setTimeout(() => {
      try {
        expect(dismissedCalled).toEqual(true);
        done();
      } catch (e) {
        done(e);
      }
    }, 250);
  });
});