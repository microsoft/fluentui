import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../../testing/isConformant';
import { MessageBarBody } from './MessageBarBody';
import type { MessageBarBodyState } from './MessageBarBody.types';
import { messageBarBodyClassNames, useMessageBarBodyStyles } from './useMessageBarBodyStyles';

import actionsStyles from '../MessageBarActions/MessageBarActions.module.css';
import styles from './MessageBarBody.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/message-bar', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/message-bar');
  const { deepFreezeState } = require('../../../testing/freezeState');

  return {
    ...actual,
    useMessageBarBody: (...args: Parameters<typeof actual.useMessageBarBody>) =>
      deepFreezeState(actual.useMessageBarBody(...args)),
  };
});

const renderBody = (props: React.ComponentProps<typeof MessageBarBody> = {}) => {
  const { container } = render(<MessageBarBody {...props}>msg</MessageBarBody>);

  return container.firstElementChild as HTMLElement;
};

describe('MessageBarBody', () => {
  isConformant({
    Component: MessageBarBody,
    displayName: 'MessageBarBody',
  });

  it('stamps the marker pair on the root', () => {
    const root = renderBody();

    expect(root).toHaveClass('fui-message-bar-body');
    expect(root).toHaveClass('group/fui-message-bar-body');
    expect(root.classList[0]).toBe('fui-message-bar-body');
    expect(messageBarBodyClassNames.root).toBe('fui-message-bar-body group/fui-message-bar-body');
  });

  it('carries the root module class and keeps the consumer className', () => {
    const root = renderBody({ className: 'consumer' });

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
    // Negative control against the shared `fuicm-root` — see MessageBar.test.tsx.
    expect(root).not.toHaveClass(actionsStyles['container-action']);
  });

  // The renderer reads the link context off its second argument; dropping it throws.
  it('supplies the link context its renderer requires', () => {
    expect(() => renderBody()).not.toThrow();
    expect(renderBody().textContent).toBe('msg');
  });

  it('returns new state without touching the state it was given', () => {
    const state = Object.freeze({ root: Object.freeze({ className: 'consumer' }) }) as unknown as MessageBarBodyState;

    const styled = useMessageBarBodyStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
  });

  it('passes arbitrary props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <MessageBarBody ref={ref} data-testid="body" id="b" style={{ zIndex: 3 }}>
        msg
      </MessageBarBody>,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute('data-testid')).toBe('body');
    expect(root.id).toBe('b');
    expect(root.style.zIndex).toBe('3');
    expect(ref.current).toBe(root);
  });
});
