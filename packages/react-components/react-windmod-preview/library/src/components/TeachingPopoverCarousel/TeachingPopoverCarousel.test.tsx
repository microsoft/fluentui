import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselNav } from '../TeachingPopoverCarouselNav/TeachingPopoverCarouselNav';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/TeachingPopoverCarouselNavButton';
import type { TeachingPopoverCarouselProps } from './TeachingPopoverCarousel.types';
import { TeachingPopoverCarousel } from './TeachingPopoverCarousel';
import { teachingPopoverCarouselClassNames } from './useTeachingPopoverCarouselStyles';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverCarousel: (...args: Parameters<typeof actual.useTeachingPopoverCarousel>) =>
      deepFreezeState(actual.useTeachingPopoverCarousel(...args)),
  };
});

const cards = ['1', '2', '3'];

const renderCarousel = (carouselProps: Partial<TeachingPopoverCarouselProps> = {}) => {
  const result = render(
    <TeachingPopover defaultOpen>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverCarousel defaultValue="1" {...carouselProps}>
          {cards.map(value => (
            <TeachingPopoverCarouselCard key={value} value={value}>
              <span>Page {value}</span>
            </TeachingPopoverCarouselCard>
          ))}
          <TeachingPopoverCarouselNav>
            {value => <TeachingPopoverCarouselNavButton aria-label={`Tip ${value}`} />}
          </TeachingPopoverCarouselNav>
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-carousel')!;

  return { ...result, root };
};

describe('TeachingPopoverCarousel', () => {
  isConformant({
    Component: TeachingPopoverCarousel,
    displayName: 'TeachingPopoverCarousel',
  });

  it('stamps the marker pair in order', () => {
    const { root } = renderCarousel();
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-carousel');
    expect(names[1]).toBe('group/fui-teaching-popover-carousel');
    expect(teachingPopoverCarouselClassNames.root).toBe(
      'fui-teaching-popover-carousel group/fui-teaching-popover-carousel',
    );
  });

  it('renders through the two-argument render so the carousel context reaches its children', () => {
    const { root } = renderCarousel();

    // A nav button only resolves a value from the provider the second render argument supplies.
    expect(root.querySelectorAll('.fui-teaching-popover-carousel-nav-button')).toHaveLength(cards.length);
  });

  it('passes the carousel options through untouched', () => {
    const onValueChange = jest.fn();
    const announcement = jest.fn(() => 'page');
    const { root } = renderCarousel({ defaultValue: '2', onValueChange, announcement });

    const active = root.querySelector('[data-carousel-active-item="true"]');

    expect(active?.getAttribute('data-carousel-item')).toBe('2');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('keeps a consumer className exactly once', () => {
    const { root } = renderCarousel({ className: 'consumer' });

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
  });
});
