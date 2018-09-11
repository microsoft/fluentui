import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { PanelBase } from './Panel.base';
import { Panel } from './Panel';
let div: HTMLElement;

const ReactDOM = require('react-dom');

describe('Panel', () => {
  it('renders Panel correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(
      <Panel isOpen={true} headerText="Test Panel">
        <span>Content goes here</span>
      </Panel>
    );

    expect(component.toJSON()).toMatchSnapshot();

    ReactDOM.createPortal.mockClear();
  });

  describe('onClose', () => {
    beforeEach(() => {
      div = document.createElement('div');
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(div);
    });

    it('fires the correct events when closing', done => {
      let dismissedCalled = false;
      let dismissCalled = false;
      const setDismissTrue = (): void => {
        dismissCalled = true;
      };
      const setDismissedTrue = (): void => {
        dismissedCalled = true;
      };

      const panel: PanelBase = ReactDOM.render(
        <PanelBase isOpen={true} onDismiss={setDismissTrue} onDismissed={setDismissedTrue} />,
        div
      ) as any;

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
});
