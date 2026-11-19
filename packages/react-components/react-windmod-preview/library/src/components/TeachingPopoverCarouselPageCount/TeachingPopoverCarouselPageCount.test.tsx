import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselPageCount } from './TeachingPopoverCarouselPageCount';
import {
  teachingPopoverCarouselPageCountClassNames,
  useTeachingPopoverCarouselPageCountStyles,
} from './useTeachingPopoverCarouselPageCountStyles';

import styles from './TeachingPopoverCarouselPageCount.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverCarouselPageCount: (...args: Parameters<typeof actual.useTeachingPopoverCarouselPageCount>) =>
      deepFreezeState(actual.useTeachingPopoverCarouselPageCount(...args)),
  };
});

const cards = ['1', '2', '3'];

/** The store fills on a mount effect, so a first paint reads 0 / 0; render() flushes it. */
const renderPageCount = () => {
  const spy = jest.fn((current: number, total: number) => `${current} of ${total}`);
  const result = render(
    <TeachingPopover defaultOpen>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverCarousel defaultValue="2">
          {cards.map(value => (
            <TeachingPopoverCarouselCard key={value} value={value}>
              <span>Page {value}</span>
            </TeachingPopoverCarouselCard>
          ))}
          <TeachingPopoverCarouselPageCount>{spy}</TeachingPopoverCarouselPageCount>
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-carousel-page-count')!;

  return { ...result, root, spy };
};

describe('TeachingPopoverCarouselPageCount', () => {
  isConformant({
    Component: TeachingPopoverCarouselPageCount,
    displayName: 'TeachingPopoverCarouselPageCount',
    requiredProps: { children: () => null } as never,
  });

  it('stamps the marker pair in order and its own root class', () => {
    const { root } = renderPageCount();
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-carousel-page-count');
    expect(names[1]).toBe('group/fui-teaching-popover-carousel-page-count');
    expect(root).toHaveClass(styles.root);
    expect(teachingPopoverCarouselPageCountClassNames.root).toBe(
      'fui-teaching-popover-carousel-page-count group/fui-teaching-popover-carousel-page-count',
    );
  });

  it('renders the output the hook already produced, without re-invoking the render function', () => {
    const { root, spy } = renderPageCount();

    expect(root).toHaveTextContent('2 of 3');

    const rendersAfterSettle = spy.mock.calls.filter(([current, total]) => current === 2 && total === 3);

    expect(rendersAfterSettle.length).toBeGreaterThan(0);
    // One call per render pass, never a second call within a pass.
    expect(spy.mock.calls.length).toBe(spy.mock.results.length);
  });

  it('passes the already-invoked children through by identity', () => {
    const renderFn = jest.fn();
    const children = ['2 of 3'];
    const state = {
      currentIndex: 1,
      totalPages: 3,
      renderPageCount: renderFn,
      components: { root: 'div' },
      root: { children },
    } as never;

    const styled = useTeachingPopoverCarouselPageCountStyles(state);

    expect(styled.root.children).toBe(children);
    expect(renderFn).not.toHaveBeenCalled();
  });

  it('keeps a consumer className exactly once', () => {
    const result = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverCarousel defaultValue="1">
            <TeachingPopoverCarouselCard value="1">
              <span>Page one</span>
            </TeachingPopoverCarouselCard>
            <TeachingPopoverCarouselPageCount className="consumer">
              {(current, total) => `${current} of ${total}`}
            </TeachingPopoverCarouselPageCount>
          </TeachingPopoverCarousel>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );
    const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-carousel-page-count')!;

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
  });
});
