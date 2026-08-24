import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { MessageBar } from '../MessageBar/MessageBar';
import { MessageBarActions } from './MessageBarActions';
import type { MessageBarActionsState } from './MessageBarActions.types';
import { messageBarActionsClassNames, useMessageBarActionsStyles } from './useMessageBarActionsStyles';

import styles from './MessageBarActions.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/message-bar', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/message-bar');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMessageBarActions: (...args: Parameters<typeof actual.useMessageBarActions>) =>
      deepFreezeState(actual.useMessageBarActions(...args)),
  };
});

const renderActions = (props: React.ComponentProps<typeof MessageBarActions> = {}) => {
  const { container } = render(
    <MessageBarActions {...props}>
      <button>act</button>
    </MessageBarActions>,
  );

  return container.querySelector('.fui-message-bar-actions') as HTMLElement;
};

describe('MessageBarActions', () => {
  // jsdom ships no ResizeObserver, and the headless reflow attaches one on every MessageBar mount.
  // https://github.com/jsdom/jsdom/issues/3368
  beforeAll(() => {
    global.ResizeObserver = class {
      public observe() {
        /* no-op */
      }
      public unobserve() {
        /* no-op */
      }
      public disconnect() {
        /* no-op */
      }
    };
  });

  isConformant({
    Component: MessageBarActions,
    displayName: 'MessageBarActions',
  });

  it('stamps the marker pair on the root', () => {
    const root = renderActions();

    expect(root).toHaveClass('fui-message-bar-actions');
    expect(root).toHaveClass('group/fui-message-bar-actions');
    expect(root.classList[0]).toBe('fui-message-bar-actions');
    expect(messageBarActionsClassNames.root).toBe('fui-message-bar-actions group/fui-message-bar-actions');
  });

  it('carries the root module class and keeps the consumer className', () => {
    const root = renderActions({ className: 'consumer' });

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
    // Negative control against the shared `fuicm-root` — see MessageBar.test.tsx.
    expect(root).not.toHaveClass(styles['container-action']);
  });

  it('reflects the presence of actions content', () => {
    expect(renderActions().hasAttribute('data-has-actions')).toBe(true);

    const { container } = render(<MessageBarActions />);
    const empty = container.querySelector('.fui-message-bar-actions') as HTMLElement;

    expect(empty.hasAttribute('data-has-actions')).toBe(false);
  });

  it('decorates the container action and keeps its consumer className', () => {
    const { container } = render(
      <MessageBarActions containerAction={{ children: <button>x</button>, className: 'mine' }}>
        <button>act</button>
      </MessageBarActions>,
    );
    const containerAction = container.querySelector(`.${styles['container-action']}`) as HTMLElement;

    expect(containerAction).toBeTruthy();
    expect(containerAction).toHaveClass('mine');
    expect(containerAction).not.toBe(container.querySelector('.fui-message-bar-actions'));
  });

  it('orders the container action around the actions root by layout', () => {
    const orderFor = (layout: 'singleline' | 'multiline') => {
      const { container } = render(
        <MessageBar layout={layout}>
          <MessageBarActions containerAction={<button>x</button>}>
            <button>act</button>
          </MessageBarActions>
        </MessageBar>,
      );
      const root = container.firstElementChild as HTMLElement;
      const actions = root.querySelector('.fui-message-bar-actions') as HTMLElement;
      const containerAction = root.querySelector(`.${styles['container-action']}`) as HTMLElement;

      const siblings = Array.from(root.children);

      return { actions: siblings.indexOf(actions), containerAction: siblings.indexOf(containerAction) };
    };

    const singleline = orderFor('singleline');
    expect(singleline.containerAction).toBeGreaterThan(singleline.actions);

    const multiline = orderFor('multiline');
    expect(multiline.containerAction).toBeLessThan(multiline.actions);
  });

  // The renderer reads the button context off its second argument; dropping it throws.
  it('supplies the button context its renderer requires', () => {
    expect(() => renderActions()).not.toThrow();
    expect(renderActions().textContent).toBe('act');
  });

  it('returns new state without touching the state it was given', () => {
    const state = Object.freeze({
      root: Object.freeze({ className: 'consumer' }),
      containerAction: Object.freeze({ className: 'mine' }),
    }) as unknown as MessageBarActionsState;

    const styled = useMessageBarActionsStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.containerAction).not.toBe(state.containerAction);
    expect(state.root.className).toBe('consumer');
  });

  it('passes arbitrary props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <MessageBarActions ref={ref} data-testid="actions" id="a" style={{ zIndex: 3 }}>
        <button>act</button>
      </MessageBarActions>,
    );
    const root = container.querySelector('.fui-message-bar-actions') as HTMLElement;

    expect(root.getAttribute('data-testid')).toBe('actions');
    expect(root.id).toBe('a');
    expect(root.style.zIndex).toBe('3');
    expect(ref.current).toBe(root);
  });
});
