import * as React from 'react';
import { render } from '@testing-library/react';
import { CheckmarkCircleFilled } from '@fluentui/react-icons/headless/svg/checkmark-circle';
import { DiamondDismissFilled } from '@fluentui/react-icons/headless/svg/diamond-dismiss';
import { InfoFilled } from '@fluentui/react-icons/headless/svg/info';
import { WarningFilled } from '@fluentui/react-icons/headless/svg/warning';
import { ToastContainer } from '@fluentui/react-headless-components-preview/toast';
import type { ToastContainerProps, ToastIntent } from '@fluentui/react-headless-components-preview/toast';

import { isConformant } from '../../testing/isConformant';
import { ToastTitle } from './ToastTitle';
import type { ToastTitleProps } from './ToastTitle.types';
import { toastTitleClassNames, useToastTitleStyles } from './useToastTitleStyles';

import styles from './ToastTitle.module.css';

// Frozen-state guard — see testing/freezeState.ts.
// It is the guard for the media restoration too, which spreads a new slot rather than writing `children`
// in place.
jest.mock('@fluentui/react-headless-components-preview/toast', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/toast');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useToastTitle: (...args: Parameters<typeof actual.useToastTitle>) => deepFreezeState(actual.useToastTitle(...args)),
  };
});

const intents: ToastIntent[] = ['info', 'success', 'warning', 'error'];

const containerProps: ToastContainerProps = {
  announce: () => null,
  close: () => null,
  content: '',
  data: {},
  imperativeRef: { current: null },
  intent: undefined,
  onStatusChange: () => null,
  order: 0,
  pauseOnHover: false,
  pauseOnWindowBlur: false,
  politeness: 'polite',
  position: 'bottom-end',
  priority: 0,
  remove: () => null,
  timeout: -1,
  toastId: 'toast-id',
  toasterId: 'toaster-id',
  tryRestoreFocus: () => null,
  updateId: 0,
  visible: true,
};

/**
 * ToastTitle reads its intent from the toast container context, so an intent cell has to render
 * inside a real container. The container itself defaults an unsupplied intent to `info`.
 */
const renderTitle = (props: ToastTitleProps = {}, intent?: ToastIntent) => {
  const { container } = render(
    <ToastContainer {...containerProps} intent={intent}>
      <ToastTitle {...props}>title</ToastTitle>
    </ToastContainer>,
  );
  const root = container.querySelector<HTMLElement>(`.${styles.root}`)!;

  return {
    root,
    media: container.querySelector<HTMLElement>(`.${styles.media}`),
    action: container.querySelector<HTMLElement>(`.${styles.action}`),
  };
};

const glyphPath = (element: Element | null) => element?.querySelector('svg path')?.getAttribute('d') ?? null;

describe('ToastTitle', () => {
  isConformant({
    Component: ToastTitle,
    displayName: 'ToastTitle',
    requiredProps: { children: 'title' },
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderTitle();

    expect(root).toHaveClass('fui-toast-title');
    expect(root).toHaveClass('group/fui-toast-title');
    expect(root.classList[0]).toBe('fui-toast-title');
    expect(toastTitleClassNames.root).toBe('fui-toast-title group/fui-toast-title');
  });

  it('carries its own module class on every slot it renders', () => {
    const { root, media, action } = renderTitle({ media: {}, action: 'undo' }, 'info');

    expect(root).toHaveClass(styles.root);
    expect(media).not.toBeNull();
    expect(action).not.toBeNull();
    expect(root.className).not.toContain('undefined');
  });

  it('renders the intent glyph for each of the four intents', () => {
    const glyphs = {
      info: InfoFilled,
      success: CheckmarkCircleFilled,
      warning: WarningFilled,
      error: DiamondDismissFilled,
    };

    const paths = intents.map(intent => {
      const Glyph = glyphs[intent];
      const { container } = render(<Glyph />);

      // Pinning each intent to its own glyph, not merely to a distinct one: swapping two
      // entries in the lookup would still leave four distinct paths.
      expect(glyphPath(renderTitle({}, intent).media)).toBe(container.querySelector('path')?.getAttribute('d'));

      return glyphPath(renderTitle({}, intent).media);
    });

    expect(new Set(paths).size).toBe(intents.length);
  });

  it('renders no media slot at all outside a toast container, where no intent resolves', () => {
    const { container } = render(<ToastTitle>title</ToastTitle>);

    expect(container.querySelector(`.${styles.media}`)).toBeNull();
  });

  it('takes the container default of info when no intent is supplied', () => {
    const { container } = render(<InfoFilled />);

    expect(glyphPath(renderTitle().media)).toBe(container.querySelector('path')?.getAttribute('d'));
  });

  // The glyph rule fires on null OR undefined children, so an empty media object still gets the
  // glyph where Griffel blanks it. Removing the slot is still spelled `media={null}`.
  it('restores the glyph for a media slot with empty children', () => {
    expect(glyphPath(renderTitle({ media: {} }, 'success').media)).not.toBeNull();
  });

  it('removes the slot entirely for media={null}', () => {
    expect(renderTitle({ media: null }, 'success').media).toBeNull();
  });

  it('lets consumer media children win over the intent glyph', () => {
    const { media } = renderTitle({ media: { children: <span data-testid="custom" /> } }, 'error');

    expect(media!.querySelector('[data-testid="custom"]')).not.toBeNull();
    expect(glyphPath(media)).toBeNull();
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const media = Object.freeze({ className: 'given-media' }) as never;
    const state = Object.freeze({ root, media, components: {} }) as never;

    const next = useToastTitleStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect(next.media).not.toBe(media);
    expect((root as { className: string }).className).toBe('given');
  });
});
