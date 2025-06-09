import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen, act } from '@testing-library/react';
import { resetIds } from '@fluentui/utilities';

import { MessageBar } from './MessageBar';
import { MessageBarType } from './MessageBar.types';
import { isConformant } from '../../common/isConformant';
import { getBySelector } from '../../common/testUtilities';

describe('MessageBar', () => {
  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  const noop = () => {
    /* no-op */
  };

  describe('snapshots', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('renders MessageBar correctly', () => {
      const component = renderer.create(<MessageBar>Message</MessageBar>);
      // The message is delay-rendered. Run timers to show it.
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a info MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.info}>Message</MessageBar>);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a warning MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.warning}>Message</MessageBar>);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a error MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.error}>Message</MessageBar>);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a severeWarning MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.severeWarning}>Message</MessageBar>);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a success MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.success}>Message</MessageBar>);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline MessageBar correctly', () => {
      const component = renderer.create(<MessageBar isMultiline={true}>Message</MessageBar>);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline info MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.info} isMultiline={true}>
          Message
        </MessageBar>,
      );
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline warning MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>
          Message
        </MessageBar>,
      );
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline error MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
          Message
        </MessageBar>,
      );
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline severeWarning MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.severeWarning} isMultiline={true}>
          Message
        </MessageBar>,
      );
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline success MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.success} isMultiline={true}>
          Message
        </MessageBar>,
      );
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  isConformant({
    Component: MessageBar,
    displayName: 'MessageBar',
  });

  it('renders custom message bar icon correctly', () => {
    const { container } = render(
      <MessageBar messageBarType={MessageBarType.success} messageBarIconProps={{ iconName: 'AddFriend' }} />,
    );
    const dismissIcon = container.querySelector('[data-icon-name="AddFriend"]');
    expect(dismissIcon).toBeInTheDocument();
  });

  it('can reflect props changes', () => {
    const { rerender, container } = render(<MessageBar messageBarType={MessageBarType.success} />);

    expect(getBySelector(container, '.ms-MessageBar')).toHaveClass('ms-MessageBar--success');
    rerender(<MessageBar messageBarType={MessageBarType.error} />);

    expect(getBySelector(container, '.ms-MessageBar')).not.toHaveClass('ms-MessageBar--success');
    expect(getBySelector(container, '.ms-MessageBar')).toHaveClass('ms-MessageBar--error');
  });

  it('delay renders message by default', () => {
    jest.useFakeTimers();
    render(
      <MessageBar>
        <span id="test">content</span>
      </MessageBar>,
    );

    // message not rendered initially
    expect(screen.queryByText('content')).not.toBeInTheDocument();

    // run timers to render
    act(() => {
      jest.runOnlyPendingTimers();
    });

    // message is rendered
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('can disable delayed rendering', () => {
    render(
      <MessageBar delayedRender={false}>
        <span id="test">content</span>
      </MessageBar>,
    );

    // message IS rendered initially
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('respects updates to message', () => {
    jest.useFakeTimers();
    const { rerender } = render(
      <MessageBar>
        <span id="test1">content 1</span>
      </MessageBar>,
    );
    // run timers to render
    act(() => {
      jest.runOnlyPendingTimers();
    });

    // check for first message
    expect(screen.getByText('content 1')).toBeInTheDocument();

    // update message
    rerender(
      <MessageBar>
        <span id="test2">content 2</span>
      </MessageBar>,
    );
    expect(screen.queryByText('content 1')).not.toBeInTheDocument();
    expect(screen.getByText('content 2')).toBeInTheDocument();
  });

  describe('dismiss', () => {
    describe('single-line', () => {
      it('is present when onDismiss exists', () => {
        render(<MessageBar onDismiss={noop} isMultiline={false} />);
        const dismissElement = screen.getByRole('button');
        expect(dismissElement).toBeInTheDocument();
      });

      it('is not present when onDismiss is missing', () => {
        render(<MessageBar isMultiline={false} />);
        const dismissElement = screen.queryByRole('button', { name: /dismiss/i });
        expect(dismissElement).not.toBeInTheDocument();
      });

      it('has custom dismiss icon', () => {
        const { container } = render(
          <MessageBar onDismiss={noop} isMultiline={false} dismissIconProps={{ iconName: 'AddFriend' }} />,
        );
        const dismissIcon = getBySelector(container, '[data-icon-name="AddFriend"]');
        expect(dismissIcon).toBeInTheDocument();
      });

      it('mixes in native props to the inner text element, except className', () => {
        const { container } = render(
          <MessageBar aria-live={'polite'} isMultiline={false} className={'sampleClassName'}>
            Message
          </MessageBar>,
        );

        const innerText = getBySelector(container, '.ms-MessageBar-innerText');
        expect(innerText).toHaveAttribute('aria-live', 'polite');

        const singleLine = getBySelector(container, '.ms-MessageBar-singleline');
        expect(singleLine).toHaveClass('sampleClassName');
        expect(innerText).not.toHaveClass('sampleClassName');
      });
    });

    describe('multi-line', () => {
      it('is present when onDismiss exists', () => {
        render(<MessageBar onDismiss={noop} isMultiline={true} />);
        const dismissElement = screen.getByRole('button');
        expect(dismissElement).toBeInTheDocument();
      });

      it('is not present when onDismiss is missing', () => {
        render(<MessageBar isMultiline={true} />);
        const dismissElement = screen.queryByRole('button', { name: /dismiss/i });
        expect(dismissElement).not.toBeInTheDocument();
      });

      it('mixes in native props to the inner text element', () => {
        const { container } = render(
          <MessageBar aria-live={'polite'} isMultiline={true}>
            Message
          </MessageBar>,
        );

        const innerText = getBySelector(container, '.ms-MessageBar-innerText');
        expect(innerText).toHaveAttribute('aria-live', 'polite');
      });
    });
  });

  describe('truncated', () => {
    it('is present when onDismiss exists', () => {
      render(<MessageBar truncated={true} isMultiline={false} />);
      const expandElement = screen.getByRole('button');
      expect(expandElement).toBeInTheDocument();
    });

    it('is not present when truncated is missing', () => {
      render(<MessageBar isMultiline={false} />);
      const expandElement = screen.queryByRole('button', { name: /expand/i });
      expect(expandElement).not.toBeInTheDocument();
    });
  });

  describe('role attribute', () => {
    it('is present only once', () => {
      render(<MessageBar />);
      const roleElements = screen.getAllByRole('status');
      expect(roleElements.length).toBe(1);
    });

    it('is present only once when custom role attribute exists', () => {
      const role = 'none';
      render(<MessageBar role={role} />);
      const roleElements = screen.getAllByRole(role);
      expect(roleElements.length).toBe(1);
      expect(roleElements[0]).toHaveAttribute('role', role);
    });

    it('uses correct default based on messageBarType', () => {
      const { rerender } = render(<MessageBar>content</MessageBar>);

      // Status messages
      for (const messageBarType of [MessageBarType.info, MessageBarType.success, MessageBarType.warning]) {
        const typeName = `MessageBarType.${MessageBarType[messageBarType]}`;
        rerender(<MessageBar messageBarType={messageBarType}>content</MessageBar>);
        const roleElem = screen.getByRole('status');
        expect(roleElem).toBeInTheDocument();
        // include the MessageBarType in the assertion so it's clearer what failed
        expect([typeName, roleElem.getAttribute('role')]).toEqual([typeName, 'status']);
        expect([typeName, roleElem.getAttribute('aria-live')]).toEqual([typeName, 'polite']);
      }

      // Alert messages
      for (const messageBarType of [MessageBarType.error, MessageBarType.blocked, MessageBarType.severeWarning]) {
        const typeName = `MessageBarType.${MessageBarType[messageBarType]}`;
        rerender(<MessageBar messageBarType={messageBarType}>content</MessageBar>);
        const roleElem = screen.getByRole('alert');
        expect(roleElem).toBeInTheDocument();
        expect([typeName, roleElem.getAttribute('role')]).toEqual([typeName, 'alert']);
        expect([typeName, roleElem.getAttribute('aria-live')]).toEqual([typeName, 'assertive']);
      }
    });
  });
});
