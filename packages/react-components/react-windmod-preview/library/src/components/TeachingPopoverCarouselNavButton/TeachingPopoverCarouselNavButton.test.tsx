import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import type { TeachingPopoverProps } from '../TeachingPopover/TeachingPopover.types';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselNav } from '../TeachingPopoverCarouselNav/TeachingPopoverCarouselNav';
import { TeachingPopoverCarouselNavButton } from './TeachingPopoverCarouselNavButton';
import { teachingPopoverCarouselNavButtonClassNames } from './useTeachingPopoverCarouselNavButtonStyles';

import styles from './TeachingPopoverCarouselNavButton.module.css';

// Frozen-state guard — see testing/freezeState.ts. The seam is the headless hook's return value:
// that hook writes its own data-selected stamp before returning, so freezing anything below it
// would fail on the headless layer rather than on this one.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverCarouselNavButton: (...args: Parameters<typeof actual.useTeachingPopoverCarouselNavButton>) =>
      deepFreezeState(actual.useTeachingPopoverCarouselNavButton(...args)),
  };
});

const cards = ['1', '2'];

const renderDots = (popoverProps: Partial<TeachingPopoverProps> = {}) => {
  const result = render(
    <TeachingPopover defaultOpen {...popoverProps}>
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
          <TeachingPopoverCarouselNav>
            {value => <TeachingPopoverCarouselNavButton aria-label={`Tip ${value}`} />}
          </TeachingPopoverCarouselNav>
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const dots = Array.from(result.container.querySelectorAll<HTMLElement>('.fui-teaching-popover-carousel-nav-button'));

  return { ...result, selected: dots[0], unselected: dots[1], dots };
};

describe('TeachingPopoverCarouselNavButton', () => {
  isConformant({
    Component: TeachingPopoverCarouselNavButton,
    displayName: 'TeachingPopoverCarouselNavButton',
  });

  it('stamps the marker pair in order and its own root class', () => {
    const { selected } = renderDots();
    const names = selected.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-carousel-nav-button');
    expect(names[1]).toBe('group/fui-teaching-popover-carousel-nav-button');
    expect(selected).toHaveClass(styles.root);
    expect(teachingPopoverCarouselNavButtonClassNames.root).toBe(
      'fui-teaching-popover-carousel-nav-button group/fui-teaching-popover-carousel-nav-button',
    );
  });

  it('renders a tab-role button', () => {
    const { selected } = renderDots();

    expect(selected.tagName).toBe('BUTTON');
    expect(selected.getAttribute('role')).toBe('tab');
    expect(selected.getAttribute('type')).toBe('button');
  });

  it('keeps both of the libraries’ selection spellings, and adds no third', () => {
    const { selected, unselected } = renderDots();

    expect(selected.getAttribute('aria-selected')).toBe('true');
    expect(unselected.getAttribute('aria-selected')).toBe('false');
    expect(selected.hasAttribute('data-selected')).toBe(true);
    expect(unselected.hasAttribute('data-selected')).toBe(false);

    const stamped = selected.getAttributeNames().filter(name => name.startsWith('data-') && name.includes('select'));

    expect(stamped).toEqual(['data-selected']);
  });

  it('repaints under brand and leaves the neutral surface alone', () => {
    expect(renderDots({ appearance: 'brand' }).selected).toHaveClass(styles.brand);
    expect(renderDots().selected).not.toHaveClass(styles.brand);
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
            <TeachingPopoverCarouselNav>
              {value => <TeachingPopoverCarouselNavButton aria-label={value} className="consumer" />}
            </TeachingPopoverCarouselNav>
          </TeachingPopoverCarousel>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );
    const dot = result.container.querySelector<HTMLElement>('.fui-teaching-popover-carousel-nav-button')!;

    expect(
      dot
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(dot).toHaveClass(styles.root);
  });
});
