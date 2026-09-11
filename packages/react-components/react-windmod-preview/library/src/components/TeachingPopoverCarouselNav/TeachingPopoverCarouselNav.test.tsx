import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/TeachingPopoverCarouselNavButton';
import { TeachingPopoverCarouselNav } from './TeachingPopoverCarouselNav';
import {
  teachingPopoverCarouselNavClassNames,
  useTeachingPopoverCarouselNavStyles,
} from './useTeachingPopoverCarouselNavStyles';

import styles from './TeachingPopoverCarouselNav.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverCarouselNav: (...args: Parameters<typeof actual.useTeachingPopoverCarouselNav>) =>
      deepFreezeState(actual.useTeachingPopoverCarouselNav(...args)),
  };
});

const cards = ['1', '2', '3'];

/** `values` is filled by a mount effect that queries the DOM for the carousel's items, so the first
 *  render yields an empty tablist. render() flushes effects, so every assertion below is post-effect. */
const renderNav = (renderNavButton = (value: string) => <TeachingPopoverCarouselNavButton aria-label={value} />) => {
  const spy = jest.fn(renderNavButton);
  const result = render(
    <TeachingPopover defaultOpen>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverCarousel defaultValue="1">
          {cards.map(value => (
            <TeachingPopoverCarouselCard key={value} value={value}>
              <span>Page {value}</span>
            </TeachingPopoverCarouselCard>
          ))}
          <TeachingPopoverCarouselNav>{spy}</TeachingPopoverCarouselNav>
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-carousel-nav')!;

  return { ...result, root, spy };
};

describe('TeachingPopoverCarouselNav', () => {
  isConformant({
    Component: TeachingPopoverCarouselNav,
    displayName: 'TeachingPopoverCarouselNav',
    requiredProps: { children: () => null } as never,
  });

  it('stamps the marker pair in order and its own root class', () => {
    const { root } = renderNav();
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-carousel-nav');
    expect(names[1]).toBe('group/fui-teaching-popover-carousel-nav');
    expect(root).toHaveClass(styles.root);
    expect(teachingPopoverCarouselNavClassNames.root).toBe(
      'fui-teaching-popover-carousel-nav group/fui-teaching-popover-carousel-nav',
    );
  });

  it('keeps the tablist role and tab stop the headless hook sets', () => {
    const { root } = renderNav();

    expect(root.getAttribute('role')).toBe('tablist');
    expect(root.getAttribute('tabindex')).toBe('0');
  });

  it('invokes the render function once per carousel value and renders nothing else', () => {
    const { root, spy } = renderNav();

    const values = spy.mock.calls.map(([value]) => value);

    expect(values).toEqual(cards);
    expect(root.querySelectorAll('.fui-teaching-popover-carousel-nav-button')).toHaveLength(cards.length);
    // The hook nulls root.children; every child below comes from the render function.
    expect(root.childElementCount).toBe(cards.length);
  });

  it('passes the render function and the nulled children through by identity', () => {
    const renderNavButton = jest.fn();
    const state = {
      values: ['1'],
      renderNavButton,
      components: { root: 'div' },
      root: { children: null },
    } as never;

    const styled = useTeachingPopoverCarouselNavStyles(state);

    expect(styled.renderNavButton).toBe(renderNavButton);
    expect(styled.root.children).toBeNull();
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
            <TeachingPopoverCarouselNav className="consumer">
              {value => <TeachingPopoverCarouselNavButton aria-label={value} />}
            </TeachingPopoverCarouselNav>
          </TeachingPopoverCarousel>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );
    const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-carousel-nav')!;

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
  });
});
