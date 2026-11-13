import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import type { TeachingPopoverBodyProps } from './TeachingPopoverBody.types';
import { TeachingPopoverBody } from './TeachingPopoverBody';
import { teachingPopoverBodyClassNames, useTeachingPopoverBodyStyles } from './useTeachingPopoverBodyStyles';

import styles from './TeachingPopoverBody.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverBody: (...args: Parameters<typeof actual.useTeachingPopoverBody>) =>
      deepFreezeState(actual.useTeachingPopoverBody(...args)),
  };
});

const renderBody = (bodyProps: TeachingPopoverBodyProps = {}) => {
  const result = render(
    <TeachingPopover defaultOpen>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverBody {...bodyProps}>Body text</TeachingPopoverBody>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-body')!;

  return { ...result, root, media: root?.querySelector<HTMLElement>('span')! };
};

const lengths = [
  ['short', styles.short],
  ['medium', styles.medium],
  ['tall', styles.tall],
] as const;

describe('TeachingPopoverBody', () => {
  isConformant({
    Component: TeachingPopoverBody,
    displayName: 'TeachingPopoverBody',
  });

  it('stamps the marker pair in order', () => {
    const { root } = renderBody();
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-body');
    expect(names[1]).toBe('group/fui-teaching-popover-body');
    expect(teachingPopoverBodyClassNames.root).toBe('fui-teaching-popover-body group/fui-teaching-popover-body');
  });

  it('carries the root module class', () => {
    const { root } = renderBody();

    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('renders the media slot only when supplied, with its base class', () => {
    expect(renderBody().media).toBeNull();

    const { media } = renderBody({ media: {} });

    expect(media).toHaveClass(styles.media);
  });

  it('selects one media-length class per value, and short by default', () => {
    lengths.forEach(([mediaLength, expected]) => {
      const { media } = renderBody({ media: {}, mediaLength });

      expect(media).toHaveClass(expected);
      lengths
        .filter(([other]) => other !== mediaLength)
        .forEach(([, otherClass]) => expect(media).not.toHaveClass(otherClass));
    });

    expect(renderBody({ media: {} }).media).toHaveClass(styles.short);
  });

  it('keeps a consumer className exactly once', () => {
    const { root } = renderBody({ className: 'consumer' });

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const media = Object.freeze({ className: 'given-media' }) as never;
    const state = Object.freeze({ root, media, components: {}, mediaLength: 'tall' }) as never;

    const next = useTeachingPopoverBodyStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect(next.media).not.toBe(media);
    expect((root as { className: string }).className).toBe('given');
  });
});
