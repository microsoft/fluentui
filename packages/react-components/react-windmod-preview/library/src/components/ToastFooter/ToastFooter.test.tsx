import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { ToastFooter } from './ToastFooter';
import { toastFooterClassNames, useToastFooterStyles } from './useToastFooterStyles';

import styles from './ToastFooter.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/toast', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/toast');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useToastFooter: (...args: Parameters<typeof actual.useToastFooter>) =>
      deepFreezeState(actual.useToastFooter(...args)),
  };
});

const renderFooter = (props: React.ComponentProps<typeof ToastFooter> = {}) => {
  const { container } = render(<ToastFooter {...props}>footer</ToastFooter>);

  return { root: container.firstElementChild as HTMLElement };
};

describe('ToastFooter', () => {
  isConformant({
    Component: ToastFooter,
    displayName: 'ToastFooter',
    requiredProps: { children: 'footer' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderFooter();

    expect(root).toHaveClass('fui-toast-footer');
    expect(root).toHaveClass('group/fui-toast-footer');
    expect(root.classList[0]).toBe('fui-toast-footer');
    expect(toastFooterClassNames.root).toBe('fui-toast-footer group/fui-toast-footer');
  });

  it('carries its own root module class', () => {
    expect(renderFooter().root).toHaveClass(styles.root);
    expect(renderFooter().root.className).not.toContain('undefined');
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { root } = renderFooter({ ref, className: 'consumer', 'aria-label': 'footer', style: { opacity: 0.5 } });

    expect(ref.current).toBe(root);
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('aria-label')).toBe('footer');
    expect(root.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({ root, components: {} }) as never;

    const next = useToastFooterStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
  });
});
