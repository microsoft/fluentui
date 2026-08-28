import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselPageCount } from '../TeachingPopoverCarouselPageCount/TeachingPopoverCarouselPageCount';
import type { TeachingPopoverCarouselFooterProps } from './TeachingPopoverCarouselFooter.types';
import { TeachingPopoverCarouselFooter } from './TeachingPopoverCarouselFooter';
import { teachingPopoverCarouselFooterClassNames } from './useTeachingPopoverCarouselFooterStyles';

import styles from './TeachingPopoverCarouselFooter.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopoverCarouselFooter: (...args: Parameters<typeof actual.useTeachingPopoverCarouselFooter>) =>
      deepFreezeState(actual.useTeachingPopoverCarouselFooter(...args)),
  };
});

const cards = ['1', '2', '3'];

const defaultFooter: TeachingPopoverCarouselFooterProps = {
  previous: { navType: 'prev', children: 'Previous', altText: 'Close' },
  next: { navType: 'next', children: 'Next', altText: 'Finish' },
};

const renderFooter = (footerProps: TeachingPopoverCarouselFooterProps = defaultFooter, withPageCount = true) => {
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
          <TeachingPopoverCarouselFooter {...footerProps}>
            {withPageCount ? (
              <TeachingPopoverCarouselPageCount>
                {(current, total) => `${current} of ${total}`}
              </TeachingPopoverCarouselPageCount>
            ) : null}
          </TeachingPopoverCarouselFooter>
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const root = result.container.querySelector<HTMLElement>('.fui-teaching-popover-carousel-footer')!;
  const buttons = Array.from(root.querySelectorAll<HTMLElement>('.fui-teaching-popover-carousel-footer-button'));

  return { ...result, root, buttons };
};

describe('TeachingPopoverCarouselFooter', () => {
  isConformant({
    Component: TeachingPopoverCarouselFooter,
    displayName: 'TeachingPopoverCarouselFooter',
    requiredProps: defaultFooter as never,
  });

  it('stamps the marker pair in order and its own root class', () => {
    const { root } = renderFooter();
    const names = root.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-carousel-footer');
    expect(names[1]).toBe('group/fui-teaching-popover-carousel-footer');
    expect(root).toHaveClass(styles.root);
    expect(teachingPopoverCarouselFooterClassNames.root).toBe(
      'fui-teaching-popover-carousel-footer group/fui-teaching-popover-carousel-footer',
    );
  });

  it('defaults the layout to centered, and takes the offset class when asked', () => {
    expect(renderFooter().root).toHaveClass(styles.centered);
    expect(renderFooter().root).not.toHaveClass(styles.offset);

    const offset = renderFooter({ ...defaultFooter, layout: 'offset' });

    expect(offset.root).toHaveClass(styles.offset);
    expect(offset.root).not.toHaveClass(styles.centered);
  });

  it('resolves both button slots onto windmod’s own footer button', () => {
    const { buttons } = renderFooter();

    expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      const names = button.getAttribute('class')!.split(/\s+/);

      expect(names[0]).toBe('fui-teaching-popover-carousel-footer-button');
      expect(names).toContain('group/fui-teaching-popover-carousel-footer-button');
      // The windmod footer button is a windmod Button; the headless one is not.
      expect(names).toContain('fui-button');
    }
  });

  it('does not let the renderer revert the element-type swap', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    try {
      renderFooter();

      // assertSlots warns exactly when it has rewritten a slot's element type back.
      expect(warn.mock.calls.filter(([message]) => String(message).includes('slot'))).toHaveLength(0);
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });

  it('renders a previous button even when the consumer supplies none', () => {
    const { buttons } = renderFooter({ next: { navType: 'next', children: 'Next', altText: 'Finish' } });

    expect(buttons).toHaveLength(2);
    // C-4's stated consequence: the default button renders, and renders empty. Asserting only the
    // count would pass just as well against a footer that rendered two next buttons.
    expect(buttons[0]).toBeEmptyDOMElement();
    expect(buttons[1]).toHaveTextContent('Next');
  });

  it('orders previous before the row’s children when centered and after them when offset', () => {
    const positionOf = (root: HTMLElement) => {
      const children = Array.from(root.children);
      const previous = children.findIndex(child =>
        child.classList.contains('fui-teaching-popover-carousel-footer-button'),
      );
      const pageCount = children.findIndex(child =>
        child.classList.contains('fui-teaching-popover-carousel-page-count'),
      );

      return { previous, pageCount };
    };

    const centered = positionOf(renderFooter().root);

    expect(centered.previous).toBeLessThan(centered.pageCount);

    const offset = positionOf(renderFooter({ ...defaultFooter, layout: 'offset' }).root);

    expect(offset.pageCount).toBeLessThan(offset.previous);
  });

  it('keeps a consumer className exactly once', () => {
    const { root } = renderFooter({ ...defaultFooter, className: 'consumer' });

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
  });
});
