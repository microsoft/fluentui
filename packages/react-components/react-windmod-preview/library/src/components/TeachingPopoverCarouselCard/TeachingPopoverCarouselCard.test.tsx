import * as React from 'react';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from './TeachingPopoverCarouselCard';
import { teachingPopoverCarouselCardClassNames } from './useTeachingPopoverCarouselCardStyles';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverCarouselCard: (...args: Parameters<typeof actual.useTeachingPopoverCarouselCard>) =>
      deepFreezeState(actual.useTeachingPopoverCarouselCard(...args)),
  };
});

const renderCards = () => {
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
          <TeachingPopoverCarouselCard value="2">
            <span>Page two</span>
          </TeachingPopoverCarouselCard>
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const cards = Array.from(result.container.querySelectorAll<HTMLElement>('.fui-teaching-popover-carousel-card'));

  return { ...result, active: cards[0], inactive: cards[1], cards };
};

describe('TeachingPopoverCarouselCard', () => {
  isConformant({
    Component: TeachingPopoverCarouselCard,
    displayName: 'TeachingPopoverCarouselCard',
    requiredProps: { value: '1' },
  });

  it('stamps the marker pair in order', () => {
    const { active } = renderCards();
    const names = active.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-carousel-card');
    expect(names[1]).toBe('group/fui-teaching-popover-carousel-card');
    expect(teachingPopoverCarouselCardClassNames.root).toBe(
      'fui-teaching-popover-carousel-card group/fui-teaching-popover-carousel-card',
    );
  });

  it('renders through the carousel item, which stamps both of its own attributes', () => {
    const { active, inactive } = renderCards();

    expect(active.getAttribute('data-carousel-item')).toBe('1');
    expect(inactive.getAttribute('data-carousel-item')).toBe('2');
    expect(active.getAttribute('data-carousel-active-item')).toBe('true');
  });

  it('stringifies the inactive card’s active flag rather than removing the attribute', () => {
    const { inactive } = renderCards();

    // A raw boolean, so the attribute is PRESENT and reads "false" when off. Any presence selector
    // on it would match an inactive card.
    expect(inactive.hasAttribute('data-carousel-active-item')).toBe(true);
    expect(inactive.getAttribute('data-carousel-active-item')).toBe('false');
  });

  it('hides the inactive card and drops its children', () => {
    const { inactive } = renderCards();

    expect(inactive.hasAttribute('hidden')).toBe(true);
    expect(inactive).toBeEmptyDOMElement();
  });

  it('never lets a stylesheet read the active flag as a presence attribute', () => {
    const componentsDir = join(__dirname, '..');
    const modules = readdirSync(componentsDir, { withFileTypes: true, recursive: true })
      .filter(entry => entry.isFile() && entry.name.endsWith('.module.css'))
      .map(entry => join(entry.parentPath, entry.name));

    expect(modules.length).toBeGreaterThan(0);
    for (const file of modules) {
      expect(readFileSync(file, 'utf8')).not.toContain('data-carousel-active-item');
    }
  });
});
