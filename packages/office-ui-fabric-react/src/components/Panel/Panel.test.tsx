import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Panel } from './Panel';
import { PanelBase } from './Panel.base';
import { IPanel } from './Panel.types';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';

let div: HTMLElement;

const ReactDOM = require('react-dom');

describe('Panel', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Panel correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const originalCreatePortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(
      <Panel
        isOpen={true}
        headerText="Test Panel"
        headerTextProps={{
          className: 'panel_class',
          'aria-level': 3,
        }}
      >
        <span>Content goes here</span>
      </Panel>,
    );

    expect(component.toJSON()).toMatchSnapshot();

    ReactDOM.createPortal = originalCreatePortal;
  });

  describe('open', () => {
    beforeEach(() => {
      div = document.createElement('div');
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(div);
    });

    it('fires the correct events on imperative scenarios', () => {
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
        <PanelBase
          onOpen={setOpenTrue}
          onOpened={setOpenedTrue}
          onDismiss={setDismissTrue}
          onDismissed={setDismissedTrue}
        />,
        div,
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

    it('fires the correct events on non-imperative scenarios', () => {
      const panel = React.createRef<IPanel>();

      const onOpen = jest.fn();
      const onOpened = jest.fn();
      const onDismiss = jest.fn();
      const onDismissed = jest.fn();
      jest.useFakeTimers();

      const wrapper = mount(
        <Panel
          isOpen={false}
          onOpen={onOpen}
          onOpened={onOpened}
          onDismiss={onDismiss}
          onDismissed={onDismissed}
          componentRef={panel}
        />,
      );

      expect(onOpen).toHaveBeenCalledTimes(0);

      wrapper.setProps({ isOpen: true });

      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(onOpened).toHaveBeenCalledTimes(0);

      jest.runOnlyPendingTimers();

      expect(onOpened).toHaveBeenCalledTimes(1);
      expect(onDismiss).toHaveBeenCalledTimes(0);

      wrapper.setProps({ isOpen: false });

      expect(onDismissed).toHaveBeenCalledTimes(0);

      jest.runOnlyPendingTimers();

      expect(onDismissed).toHaveBeenCalledTimes(1);
    });
  });

  it('allows the consumer to pass through popup props', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const originalCreatePortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(
      <Panel
        isOpen={true}
        headerText="Test Panel"
        headerTextProps={{
          className: 'panel_class',
          'aria-level': 3,
        }}
        popupProps={{ ariaLabel: 'I am an aria label', ariaLabelledBy: '' }}
      >
        <span>Content goes here</span>
      </Panel>,
    );

    expect(component.toJSON()).toMatchSnapshot();

    ReactDOM.createPortal = originalCreatePortal;
  });

  isConformant({
    Component: Panel,
    displayName: 'Panel',
    componentPath: path.join(__dirname, 'Panel.ts'),
    disabledTests: ['component-handles-classname'],
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
