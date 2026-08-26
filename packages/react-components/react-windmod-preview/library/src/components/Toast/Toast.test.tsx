import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Toast } from './Toast';
import { toastClassNames, useToastStyles } from './useToastStyles';

import styles from './Toast.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/toast', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/toast');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useToast: (...args: Parameters<typeof actual.useToast>) => deepFreezeState(actual.useToast(...args)),
  };
});

const renderToast = (props: React.ComponentProps<typeof Toast> = {}) => {
  const { container } = render(<Toast {...props}>toast</Toast>);

  return { root: container.firstElementChild as HTMLElement };
};

describe('Toast', () => {
  isConformant({
    Component: Toast,
    displayName: 'Toast',
    requiredProps: { children: 'toast' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderToast();

    expect(root).toHaveClass('fui-toast');
    expect(root).toHaveClass('group/fui-toast');
    expect(root.classList[0]).toBe('fui-toast');
    expect(toastClassNames.root).toBe('fui-toast group/fui-toast');
  });

  it('carries its own root module class', () => {
    expect(renderToast().root).toHaveClass(styles.root);
    expect(renderToast().root.className).not.toContain('undefined');
  });

  it('stamps data-appearance for inverted and omits it otherwise', () => {
    expect(renderToast({ appearance: 'inverted' }).root.getAttribute('data-appearance')).toBe('inverted');
    expect(renderToast().root.getAttribute('data-appearance')).toBeNull();
  });

  it('leaves data-intent to the headless layer and never sends the look prop to it', () => {
    // Outside a Toaster there is no container context, so the headless hook resolves no intent.
    expect(renderToast({ appearance: 'inverted' }).root.getAttribute('data-intent')).toBeNull();
    expect(renderToast({ appearance: 'inverted' }).root.getAttribute('appearance')).toBeNull();
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { root } = renderToast({ ref, className: 'consumer', 'aria-label': 'toast', style: { opacity: 0.5 } });

    expect(ref.current).toBe(root);
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('aria-label')).toBe('toast');
    expect(root.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {}, appearance: 'inverted' }) as never;

    const next = useToastStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});
