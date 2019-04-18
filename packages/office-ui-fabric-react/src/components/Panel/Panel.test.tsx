import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { PanelBase } from './Panel.base';
import { Panel } from './Panel';
let div: HTMLElement;

const ReactDOM = require('react-dom');

describe('Panel', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

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

  describe('open', () => {
    beforeEach(() => {
      div = document.createElement('div');
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(div);
    });

    it('fires the correct events', () => {
      let openedCalled = false;
      let openCalled = false;
      let dismissedCalled = false;
      let dismissCalled = false;
      let dismissCount = 0;

      const setOpenTrue = (): void => {
        openCalled = true;
      };
      const setOpenedTrue = (): void => {
        openedCalled = true;
      };
      const setDismissTrue = (): void => {
        dismissCalled = true;
        dismissCount++;
      };
      const setDismissedTrue = (): void => {
        dismissedCalled = true;
      };
      jest.useFakeTimers();

      const panel: PanelBase = ReactDOM.render(
        <PanelBase onOpen={setOpenTrue} onOpened={setOpenedTrue} onDismiss={setDismissTrue} onDismissed={setDismissedTrue} />,
        div
      ) as any;

      panel.open();

      expect(openCalled).toEqual(true);
      expect(openedCalled).toEqual(false);

      jest.runOnlyPendingTimers();

      expect(openedCalled).toEqual(true);

      expect(dismissCalled).toEqual(false);
      expect(dismissedCalled).toEqual(false);

      panel.dismiss();

      expect(dismissCalled).toEqual(true);
      expect(dismissedCalled).toEqual(false);

      // Dismiss should only be called once per dismiss.
      expect(dismissCount).toEqual(1);

      jest.runOnlyPendingTimers();

      expect(dismissedCalled).toEqual(true);
    });
  });

  describe('onClose', () => {
    beforeEach(() => {
      div = document.createElement('div');
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
