import * as React from 'react';
import { render } from '@testing-library/react';
import { CheckmarkCircleFilled } from '@fluentui/react-icons/headless/svg/checkmark-circle';
import { DiamondDismissFilled } from '@fluentui/react-icons/headless/svg/diamond-dismiss';
import { InfoFilled } from '@fluentui/react-icons/headless/svg/info';
import { WarningFilled } from '@fluentui/react-icons/headless/svg/warning';

import { isConformant } from '../../testing/isConformant';
import { MessageBar } from './MessageBar';
import type { MessageBarIntent, MessageBarShape, MessageBarState } from './MessageBar.types';
import { MessageBarActions } from '../MessageBarActions/MessageBarActions';
import { MessageBarBody } from '../MessageBarBody/MessageBarBody';
import { MessageBarTitle } from '../MessageBarTitle/MessageBarTitle';
import { messageBarClassNames, useMessageBarStyles } from './useMessageBarStyles';

import actionsStyles from '../MessageBarActions/MessageBarActions.module.css';
import styles from './MessageBar.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/message-bar', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/message-bar');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMessageBar: (...args: Parameters<typeof actual.useMessageBar>) => deepFreezeState(actual.useMessageBar(...args)),
  };
});

const intents: MessageBarIntent[] = ['info', 'success', 'warning', 'error'];
const shapes: MessageBarShape[] = ['rounded', 'square'];

const renderMessageBar = (props: React.ComponentProps<typeof MessageBar> = {}) => {
  const { container } = render(<MessageBar {...props}>msg</MessageBar>);
  const root = container.firstElementChild as HTMLElement;

  return { root, icon: root.querySelector(`.${styles.icon}`) };
};

/** The icon slot is the root's first child whenever it renders at all. */
const iconGlyphPath = (props: React.ComponentProps<typeof MessageBar> = {}) =>
  renderMessageBar(props).root.querySelector('svg path')?.getAttribute('d') ?? null;

describe('MessageBar', () => {
  // jsdom ships no ResizeObserver, and the headless reflow attaches one on every mount.
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
    Component: MessageBar,
    displayName: 'MessageBar',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderMessageBar();

    expect(root).toHaveClass('fui-message-bar');
    expect(root).toHaveClass('group/fui-message-bar');
    expect(root.classList[0]).toBe('fui-message-bar');
    expect(messageBarClassNames.root).toBe('fui-message-bar group/fui-message-bar');
  });

  it('stamps the shape on the root and defaults it to rounded', () => {
    expect(renderMessageBar().root.getAttribute('data-shape')).toBe('rounded');

    shapes.forEach(shape => {
      expect(renderMessageBar({ shape }).root.getAttribute('data-shape')).toBe(shape);
    });
  });

  it('adds no windmod stamp to the root beyond data-shape', () => {
    const { root } = renderMessageBar();
    const stamped = root.getAttributeNames().filter(name => name.startsWith('data-'));

    expect(stamped.sort()).toEqual(['data-intent', 'data-layout', 'data-shape']);
  });

  it('carries the root module class and keeps the consumer className', () => {
    const { root } = renderMessageBar({ className: 'consumer' });

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
    // fuicm-root is shared by all four modules under jest — a negative control proves the
    // assertion above is not vacuous.
    expect(root).not.toHaveClass(actionsStyles['container-action']);
  });

  it('passes the resolved layout through to the root and to a nested actions root', () => {
    const renderTree = (layout?: 'singleline' | 'multiline') => {
      const { container } = render(
        <MessageBar layout={layout}>
          <MessageBarBody>msg</MessageBarBody>
          <MessageBarActions>
            <button>act</button>
          </MessageBarActions>
        </MessageBar>,
      );
      const root = container.firstElementChild as HTMLElement;

      return { root, actions: root.querySelector('.fui-message-bar-actions') as HTMLElement };
    };

    const singleline = renderTree();
    expect(singleline.root.getAttribute('data-layout')).toBe('singleline');
    expect(singleline.actions.getAttribute('data-layout')).toBe('singleline');

    const multiline = renderTree('multiline');
    expect(multiline.root.getAttribute('data-layout')).toBe('multiline');
    expect(multiline.actions.getAttribute('data-layout')).toBe('multiline');
  });

  it('passes the intent through to the root and defaults it to info', () => {
    expect(renderMessageBar().root.getAttribute('data-intent')).toBe('info');

    intents.forEach(intent => {
      expect(renderMessageBar({ intent }).root.getAttribute('data-intent')).toBe(intent);
    });
  });

  it('restores the Fluent glyph that belongs to each intent', () => {
    const expected: Record<MessageBarIntent, React.ComponentType> = {
      info: InfoFilled,
      success: CheckmarkCircleFilled,
      warning: WarningFilled,
      error: DiamondDismissFilled,
    };

    const paths = intents.map(intent => {
      const Glyph = expected[intent];
      const { container } = render(<Glyph />);

      // Pinning each intent to its own glyph, not merely to a distinct one: swapping two
      // entries in the icon map keeps them distinct and would otherwise go unnoticed.
      expect(iconGlyphPath({ intent })).toBe(container.querySelector('path')?.getAttribute('d'));

      return iconGlyphPath({ intent });
    });

    expect(new Set(paths).size).toBe(intents.length);
    expect(iconGlyphPath()).toBe(iconGlyphPath({ intent: 'info' }));
  });

  it('renders the default glyph inside the icon slot', () => {
    const { root, icon } = renderMessageBar();

    expect(icon).toBe(root.firstElementChild);
    expect(icon?.querySelector('svg')).toBeTruthy();
  });

  it('removes the icon slot entirely for icon={null}', () => {
    const { root } = renderMessageBar({ icon: null });

    expect(root.querySelector(`.${styles.icon}`)).toBeNull();
    expect(root.querySelector('svg')).toBeNull();
  });

  // The fallback fires on null OR undefined children, so both spellings below keep the default
  // glyph where Griffel blanks it. Removing the slot is still spelled `icon={null}`.
  it('restores the default glyph for an icon slot with empty children', () => {
    expect(iconGlyphPath({ icon: { children: null } })).toBe(iconGlyphPath());
    expect(iconGlyphPath({ icon: { children: undefined } })).toBe(iconGlyphPath());
  });

  it('lets a consumer glyph win over the default', () => {
    const { root, icon } = renderMessageBar({ icon: <i data-consumer-icon /> });

    expect(icon?.querySelector('i[data-consumer-icon]')).toBeTruthy();
    expect(root.querySelector('svg')).toBeNull();
  });

  it('carries the icon module class and keeps the consumer className', () => {
    const { icon } = renderMessageBar({ icon: { className: 'mine' } });

    expect(icon).toHaveClass(styles.icon);
    expect(icon).toHaveClass('mine');
  });

  it('gates the bottom reflow spacer on the resolved layout', () => {
    const spacerOf = (props: React.ComponentProps<typeof MessageBar>) =>
      renderMessageBar(props).root.querySelector(`.${styles.bottomReflowSpacer}`);

    expect(spacerOf({ layout: 'multiline' })).toBeTruthy();
    expect(spacerOf({ layout: 'singleline' })).toBeNull();
    expect(spacerOf({ layout: 'multiline', bottomReflowSpacer: null })).toBeNull();
  });

  it('keeps a consumer className on the bottom reflow spacer', () => {
    const { root } = renderMessageBar({ layout: 'multiline', bottomReflowSpacer: { className: 'mine' } });
    const spacer = root.querySelector(`.${styles.bottomReflowSpacer}`);

    expect(spacer).toHaveClass('mine');
  });

  it('wires the generated title id through the context', () => {
    const { container } = render(
      <MessageBar>
        <MessageBarBody>
          <MessageBarTitle>title</MessageBarTitle>
          msg
        </MessageBarBody>
      </MessageBar>,
    );
    const root = container.firstElementChild as HTMLElement;
    const title = root.querySelector('.fui-message-bar-title') as HTMLElement;

    expect(title.id).toBeTruthy();
    expect(root.getAttribute('aria-labelledby')).toBe(title.id);
  });

  it('gives a title rendered outside a MessageBar the default context id', () => {
    const { container } = render(<MessageBarTitle>title</MessageBarTitle>);

    expect((container.firstElementChild as HTMLElement).id).toBe('');
  });

  it('decorates the children of a full tree by element identity', () => {
    const { container } = render(
      <MessageBar layout="multiline">
        <MessageBarBody>
          <MessageBarTitle>title</MessageBarTitle>
          msg
        </MessageBarBody>
        <MessageBarActions containerAction={<button>x</button>}>
          <button>act</button>
        </MessageBarActions>
      </MessageBar>,
    );
    const root = container.firstElementChild as HTMLElement;
    const body = root.querySelector('.fui-message-bar-body') as HTMLElement;
    const title = body.querySelector('.fui-message-bar-title') as HTMLElement;
    const actions = root.querySelector('.fui-message-bar-actions') as HTMLElement;
    const containerAction = root.querySelector(`.${actionsStyles['container-action']}`) as HTMLElement;

    // Under jest every module's `root` local hashes to the same `fuicm-root`, so the four roots
    // are separated by element identity and by the locals whose names differ.
    expect(new Set([root, body, title, actions, containerAction]).size).toBe(5);
    expect(body.parentElement).toBe(root);
    expect(title.parentElement).toBe(body);
    expect(actions.parentElement).toBe(root);
    expect(containerAction.parentElement).toBe(root);

    [root, body, title, actions].forEach(element => expect(element).toHaveClass(styles.root));
    expect(containerAction).not.toHaveClass(styles.root);
    expect(root).not.toHaveClass(styles.icon);
    expect(root.querySelector(`.${styles.icon}`)).toBe(root.firstElementChild);
  });

  it('returns new state without touching the state it was given', () => {
    const state = Object.freeze({
      shape: 'square',
      root: Object.freeze({ className: 'consumer' }),
      icon: Object.freeze({ className: 'mine' }),
      bottomReflowSpacer: Object.freeze({}),
    }) as unknown as MessageBarState;

    const styled = useMessageBarStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.icon).not.toBe(state.icon);
    expect(styled.bottomReflowSpacer).not.toBe(state.bottomReflowSpacer);
    expect(state.root.className).toBe('consumer');
  });

  it('passes arbitrary props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <MessageBar ref={ref} data-testid="bar" id="mb" role="alert" style={{ zIndex: 3 }}>
        msg
      </MessageBar>,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute('data-testid')).toBe('bar');
    expect(root.id).toBe('mb');
    expect(root.getAttribute('role')).toBe('alert');
    expect(root.style.zIndex).toBe('3');
    expect(ref.current).toBe(root);
  });
});
