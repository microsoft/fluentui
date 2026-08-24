import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { MessageBarTitle } from './MessageBarTitle';
import type { MessageBarTitleState } from './MessageBarTitle.types';
import { messageBarTitleClassNames, useMessageBarTitleStyles } from './useMessageBarTitleStyles';

import actionsStyles from '../MessageBarActions/MessageBarActions.module.css';
import styles from './MessageBarTitle.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/message-bar', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/message-bar');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMessageBarTitle: (...args: Parameters<typeof actual.useMessageBarTitle>) =>
      deepFreezeState(actual.useMessageBarTitle(...args)),
  };
});

const renderTitle = (props: React.ComponentProps<typeof MessageBarTitle> = {}) => {
  const { container } = render(<MessageBarTitle {...props}>title</MessageBarTitle>);

  return container.firstElementChild as HTMLElement;
};

describe('MessageBarTitle', () => {
  isConformant({
    Component: MessageBarTitle,
    displayName: 'MessageBarTitle',
  });

  it('stamps the marker pair on the root', () => {
    const root = renderTitle();

    expect(root).toHaveClass('fui-message-bar-title');
    expect(root).toHaveClass('group/fui-message-bar-title');
    expect(root.classList[0]).toBe('fui-message-bar-title');
    expect(messageBarTitleClassNames.root).toBe('fui-message-bar-title group/fui-message-bar-title');
  });

  it('carries the root module class and keeps the consumer className', () => {
    const root = renderTitle({ className: 'consumer' });

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
    // Negative control against the shared `fuicm-root` — see MessageBar.test.tsx.
    expect(root).not.toHaveClass(actionsStyles['container-action']);
  });

  it('returns new state without touching the state it was given', () => {
    const state = Object.freeze({ root: Object.freeze({ className: 'consumer' }) }) as unknown as MessageBarTitleState;

    const styled = useMessageBarTitleStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
  });

  it('passes arbitrary props through to the root', () => {
    const ref = React.createRef<HTMLElement>();
    const { container } = render(
      <MessageBarTitle ref={ref} data-testid="title" id="t" style={{ zIndex: 3 }}>
        title
      </MessageBarTitle>,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.tagName).toBe('SPAN');
    expect(root.getAttribute('data-testid')).toBe('title');
    expect(root.id).toBe('t');
    expect(root.style.zIndex).toBe('3');
    expect(ref.current).toBe(root);
  });
});
