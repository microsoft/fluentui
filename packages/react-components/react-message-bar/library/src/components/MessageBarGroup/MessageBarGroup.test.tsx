import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MessageBarGroup } from './MessageBarGroup';
import { MessageBar } from '../MessageBar/MessageBar';
import { MessageBarBody } from '../MessageBarBody/MessageBarBody';
import { MessageBarTitle } from '../MessageBarTitle/MessageBarTitle';

describe('MessageBarGroup', () => {
  isConformant({
    Component: MessageBarGroup,
    displayName: 'MessageBarGroup',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // MessageBarGroup declares no styles at all, so it emits no module CSS — the
    // guarantee is simply that clsx puts `state.root.className` last (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: [
      // Statics removal (DECISIONS.md D16.1 / D16.6) — see MessageBar.test.tsx for the full
      // rationale. Replaced by `component-has-group-marker` (now a default test).
      'component-has-static-classnames-object',
    ],
    // `component-has-group-marker` asserts the D16 public contract: exactly one
    // `group/fui-message-bar-group` marker on the outermost slot, and never at `classList[0]`.
    // For this component that second assertion is the load-bearing one: MessageBarGroup is a
    // "Class B" root whose only leading token is the identity-only `.root` local in
    // `MessageBarGroup.module.css` (DECISIONS.md D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
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
