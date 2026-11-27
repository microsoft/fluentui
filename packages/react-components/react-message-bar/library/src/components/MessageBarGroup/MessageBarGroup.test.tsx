import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBarGroup } from './MessageBarGroup';
import { MessageBar } from '../MessageBar/MessageBar';
import { MessageBarBody } from '../MessageBarBody/MessageBarBody';
import { MessageBarTitle } from '../MessageBarTitle/MessageBarTitle';

describe('MessageBarGroup', () => {
  isConformant({
    Component: MessageBarGroup,
    displayName: 'MessageBarGroup',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <MessageBarGroup>
        <span>Default MessageBarGroup</span>
      </MessageBarGroup>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('should handle static MessageBar components', () => {
    const result = render(
      <MessageBarGroup>
        <MessageBar intent="info">
          <MessageBarBody>
            <MessageBarTitle>Info Message</MessageBarTitle>
            This is an informational message.
          </MessageBarBody>
        </MessageBar>
        <MessageBar intent="warning">
          <MessageBarBody>
            <MessageBarTitle>Warning Message</MessageBarTitle>
            This is a warning message.
          </MessageBarBody>
        </MessageBar>
      </MessageBarGroup>,
    );
    expect(result.container).toBeTruthy();
  });

  it('should handle dynamic MessageBar components with motion', () => {
    const TestComponent = () => {
      const [messages, setMessages] = React.useState<Array<{ id: number; intent: 'info' | 'warning' | 'error' }>>([]);

      React.useEffect(() => {
        // Add a message immediately to test the motion system
        setMessages([{ id: 1, intent: 'info' }]);
      }, []);

      return (
        <MessageBarGroup animate="both">
          {messages.map(({ intent, id }) => (
            <MessageBar key={id} intent={intent}>
              <MessageBarBody>
                <MessageBarTitle>Dynamic Message {id}</MessageBarTitle>
                This is a dynamically added message
              </MessageBarBody>
            </MessageBar>
          ))}
        </MessageBarGroup>
      );
    };

    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
  });

  // Test for bug #33914 - https://github.com/microsoft/fluentui/issues/33914
  // Ensures motion components gracefully handle ref forwarding issues
  it('should not crash with invalid children (bug #33914 fix)', () => {
    // Component that doesn't forward refs properly (reproduces the original bug scenario)
    const NonRefForwardingWrapper = (props: React.ComponentProps<typeof MessageBarBody>) => {
      return <MessageBarBody {...props} />;
    };

    const TestComponent = () => (
      <MessageBarGroup>
        <NonRefForwardingWrapper>
          <MessageBarBody>
            <MessageBarTitle>Test Message</MessageBarTitle>
            This tests the ref forwarding fix.
          </MessageBarBody>
        </NonRefForwardingWrapper>
      </MessageBarGroup>
    );

    // Should not throw an error - motion components now handle this gracefully
    expect(() => {
      render(<TestComponent />);
    }).not.toThrow();
  });
});

describe('MessageBarGroup DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <MessageBarGroup animate="both">
        <MessageBar>
          <MessageBarBody>Message</MessageBarBody>
        </MessageBar>
      </MessageBarGroup>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });

  it('does not forward dangerouslySetInnerHTML to the root, which renders composed children', () => {
    const { container } = render(
      <MessageBarGroup dangerouslySetInnerHTML={{ __html: 'Injected' }}>
        <MessageBar>
          <MessageBarBody>Message</MessageBarBody>
        </MessageBar>
      </MessageBarGroup>,
    );

    expect((container.firstElementChild as HTMLElement).textContent).toBe('Message');
  });
});
