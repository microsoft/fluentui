import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { ToastBody } from './ToastBody';
import { toastBodyClassNames, useToastBodyStyles } from './useToastBodyStyles';

import styles from './ToastBody.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/toast', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/toast');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useToastBody: (...args: Parameters<typeof actual.useToastBody>) => deepFreezeState(actual.useToastBody(...args)),
  };
});

const renderBody = (props: React.ComponentProps<typeof ToastBody> = {}) => {
  const { container } = render(<ToastBody {...props}>body</ToastBody>);

  return {
    root: container.querySelector<HTMLElement>(`.${styles.root}`)!,
    subtitle: container.querySelector<HTMLElement>(`.${styles.subtitle}`),
  };
};

describe('ToastBody', () => {
  isConformant({
    Component: ToastBody,
    displayName: 'ToastBody',
    requiredProps: { children: 'body' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderBody();

    expect(root).toHaveClass('fui-toast-body');
    expect(root).toHaveClass('group/fui-toast-body');
    expect(root.classList[0]).toBe('fui-toast-body');
    expect(toastBodyClassNames.root).toBe('fui-toast-body group/fui-toast-body');
  });

  it('carries its own module class on the root and, when rendered, on the subtitle', () => {
    expect(renderBody().root).toHaveClass(styles.root);
    expect(renderBody().subtitle).toBeNull();
    expect(renderBody({ subtitle: 'more' }).subtitle).not.toBeNull();
    expect(renderBody().root.className).not.toContain('undefined');
  });

  it('keeps a consumer className exactly once, and passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { root } = renderBody({ ref, className: 'consumer', 'aria-label': 'body', style: { opacity: 0.5 } });

    expect(ref.current).toBe(root);
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(root.getAttribute('aria-label')).toBe('body');
    expect(root.style.opacity).toBe('0.5');
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const subtitle = Object.freeze({ className: 'given-subtitle' }) as never;
    const state = Object.freeze({ root, subtitle, components: {} }) as never;

    const next = useToastBodyStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect(next.subtitle).not.toBe(subtitle);
    expect((root as { className: string }).className).toBe('given');
  });
});
