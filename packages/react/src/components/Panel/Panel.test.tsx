import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import { Panel } from './Panel';
import { PanelBase } from './Panel.base';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { resetIds } from '../../Utilities';
import type { IPanel, IPanelProps } from './Panel.types';

describe('Panel', () => {
  let div: HTMLElement | undefined;

  beforeEach(() => {
    resetIds();
  });

  afterAll(() => {
    resetIds();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Panel correctly', () => {
    render(
      <Panel
        isOpen
        headerText="Test Panel"
        headerTextProps={{
          className: 'panel_class',
          'aria-level': 3,
        }}
      >
        <span>Content goes here</span>
      </Panel>,
    );
    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  describe('open', () => {
    afterEach(() => {
      if (div) {
        ReactDOM.unmountComponentAtNode(div);
        div = undefined;
      }
    });

    it('fires the correct events on imperative scenarios', () => {
      const panel = React.createRef<IPanel>();
      const onOpen = jest.fn();
      const onOpened = jest.fn();
      const onDismiss = jest.fn();
      const onDimissed = jest.fn();

      jest.useFakeTimers();

      render(
        <PanelBase
          componentRef={panel}
          onOpen={onOpen}
          onOpened={onOpened}
          onDismiss={onDismiss}
          onDismissed={onDimissed}
        />,
      );

      expect(panel.current).toBeDefined();
      panel.current!.open();

      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(onOpened).toHaveBeenCalledTimes(0);

      jest.runOnlyPendingTimers();

      expect(onOpened).toHaveBeenCalledTimes(1);

      expect(onDismiss).toHaveBeenCalledTimes(0);
      expect(onDimissed).toHaveBeenCalledTimes(0);

      panel.current!.dismiss();

      // Dismiss should only be called once per dismiss.
      expect(onDismiss).toHaveBeenCalledTimes(1);
      expect(onDimissed).toHaveBeenCalledTimes(0);

      jest.runOnlyPendingTimers();

      expect(onDimissed).toHaveBeenCalledTimes(1);
    });

    it('fires the correct events on non-imperative scenarios', () => {
      const panel = React.createRef<IPanel>();

      const onOpen = jest.fn();
      const onOpened = jest.fn();
      const onDismiss = jest.fn();
      const onDismissed = jest.fn();
      jest.useFakeTimers();

      const props: IPanelProps = { onOpen, onOpened, onDismiss, onDismissed, componentRef: panel };
      const { rerender } = render(<Panel isOpen={false} {...props} />);

      expect(onOpen).toHaveBeenCalledTimes(0);

      rerender(<Panel isOpen {...props} />);

      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(onOpened).toHaveBeenCalledTimes(0);

      jest.runOnlyPendingTimers();

      expect(onOpened).toHaveBeenCalledTimes(1);
      expect(onDismiss).toHaveBeenCalledTimes(0);

      rerender(<Panel isOpen={false} {...props} />);

      expect(onDismissed).toHaveBeenCalledTimes(0);

      jest.runOnlyPendingTimers();

      expect(onDismissed).toHaveBeenCalledTimes(1);
    });
  });

  it('allows the consumer to pass through popup props', () => {
    render(
      <Panel
        isOpen
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

    const popup = screen.getByRole('dialog');
    expect(popup.getAttribute('aria-label')).toBe('I am an aria label');
    expect(popup.getAttribute('aria-labelledby')).toBe('');
  });

  isConformant({
    Component: Panel,
    displayName: 'Panel',
    componentPath: path.join(__dirname, 'Panel.ts'),
    // Problem: Ref doesn't match DOM node.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-has-root-ref', 'component-handles-ref', 'component-handles-classname'],
  });
});
