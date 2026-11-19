import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import type { TeachingPopoverProps } from '../TeachingPopover/TeachingPopover.types';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from '../TeachingPopoverCarouselFooter/TeachingPopoverCarouselFooter';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';
import { TeachingPopoverCarouselFooterButton } from './TeachingPopoverCarouselFooterButton';
import { teachingPopoverCarouselFooterButtonClassNames } from './useTeachingPopoverCarouselFooterButtonStyles';

import buttonStyles from '../Button/Button.module.css';
import styles from './TeachingPopoverCarouselFooterButton.module.css';

// Frozen-state guard — see testing/freezeState.ts. This component's state root is the button
// hook's, so that is the hook whose return value is frozen at the seam.
jest.mock('@fluentui/react-headless-components-preview/button', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/button');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useButton: (...args: Parameters<typeof actual.useButton>) => deepFreezeState(actual.useButton(...args)),
  };
});

const cards = ['1', '2', '3'];

// Both carousel props are required on the public type, as they are on the reference's, so each
// case names only what it varies over the two defaults below. The props type is a union over `as`
// and `Partial` of it does not distribute, so the cases are typed against the button branch — the
// element every case here renders.
type FooterButtonProps = Extract<TeachingPopoverCarouselFooterButtonProps, { as?: 'button' }>;

type Slots = {
  previous?: Partial<FooterButtonProps>;
  next?: Partial<FooterButtonProps>;
};

const renderButtons = (
  { previous, next }: Slots = {},
  popoverProps: Partial<TeachingPopoverProps> = {},
  defaultValue = '2',
) => {
  const previousProps: FooterButtonProps = {
    navType: 'prev',
    children: 'Previous',
    altText: 'Close',
    ...previous,
  };
  const nextProps: FooterButtonProps = {
    navType: 'next',
    children: 'Next',
    altText: 'Finish',
    ...next,
  };

  const result = render(
    <TeachingPopover defaultOpen {...popoverProps}>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>
        <TeachingPopoverCarousel defaultValue={defaultValue}>
          {cards.map(value => (
            <TeachingPopoverCarouselCard key={value} value={value}>
              <span>Page {value}</span>
            </TeachingPopoverCarouselCard>
          ))}
          <TeachingPopoverCarouselFooter previous={previousProps} next={nextProps} />
        </TeachingPopoverCarousel>
      </TeachingPopoverSurface>
    </TeachingPopover>,
  );

  const buttons = Array.from(
    result.container.querySelectorAll<HTMLElement>('.fui-teaching-popover-carousel-footer-button'),
  );

  return { ...result, previous: buttons[0], next: buttons[1], buttons };
};

describe('TeachingPopoverCarouselFooterButton', () => {
  isConformant({
    Component: TeachingPopoverCarouselFooterButton,
    displayName: 'TeachingPopoverCarouselFooterButton',
  });

  it('stamps both marker pairs on the root, its own first', () => {
    const { next } = renderButtons();
    const names = next.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-carousel-footer-button');
    expect(names[1]).toBe('group/fui-teaching-popover-carousel-footer-button');
    // Button's own pair is load-bearing: its icon rules select through the group marker.
    expect(names).toContain('fui-button');
    expect(names).toContain('group/fui-button');
    expect(teachingPopoverCarouselFooterButtonClassNames.root).toBe(
      'fui-teaching-popover-carousel-footer-button group/fui-teaching-popover-carousel-footer-button',
    );
    expect(next).toHaveClass(buttonStyles.root);
  });

  it('keeps the stamps the Button stylesheet selects on', () => {
    const { next } = renderButtons({ next: { children: 'Next', icon: <span />, disabledFocusable: true } });

    expect(next.hasAttribute('data-disabled-focusable')).toBe(true);
    expect(next.getAttribute('data-icon-position')).toBe('before');

    const iconOnly = renderButtons({ next: { icon: <span />, children: undefined } }).next;

    expect(iconOnly.hasAttribute('data-icon-only')).toBe(true);
  });

  it('derives the appearance from the direction and the surface', () => {
    const neutral = renderButtons();

    expect(neutral.next).toHaveClass(buttonStyles.primary);
    expect(neutral.previous).toHaveClass(buttonStyles.secondary);
    expect(neutral.next).not.toHaveClass(styles.brandNext);
    expect(neutral.previous).not.toHaveClass(styles.brandPrevious);

    const brand = renderButtons({}, { appearance: 'brand' });

    expect(brand.next).toHaveClass(buttonStyles.secondary);
    expect(brand.next).toHaveClass(styles.brandNext);
    expect(brand.previous).toHaveClass(buttonStyles.outline);
    expect(brand.previous).toHaveClass(styles.brandPrevious);
  });

  it('lets a consumer appearance win over the derived one', () => {
    const { next } = renderButtons({ next: { children: 'Next', appearance: 'subtle' } });

    expect(next).toHaveClass(buttonStyles.subtle);
    expect(next).not.toHaveClass(buttonStyles.primary);
  });

  it('keeps the derived appearance when the consumer passes an explicit undefined', () => {
    const { next } = renderButtons({ next: { children: 'Next', appearance: undefined } });

    expect(next).toHaveClass(buttonStyles.primary);
  });

  it('changes the page when clicked', async () => {
    const { next, container } = renderButtons();

    await userEvent.click(next);

    expect(container.querySelector('[data-carousel-active-item="true"]')?.getAttribute('data-carousel-item')).toBe('3');
  });

  it('fires a consumer onClick exactly once', async () => {
    const onClick = jest.fn();
    const { next } = renderButtons({ next: { children: 'Next', onClick } });

    await userEvent.click(next);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('swaps in the trailing-step text at both ends', () => {
    const first = renderButtons({}, {}, '1');

    expect(first.previous).toHaveTextContent('Close');
    expect(first.next).toHaveTextContent('Next');

    const last = renderButtons({}, {}, '3');

    expect(last.previous).toHaveTextContent('Previous');
    expect(last.next).toHaveTextContent('Finish');

    const middle = renderButtons({}, {}, '2');

    expect(middle.previous).toHaveTextContent('Previous');
    expect(middle.next).toHaveTextContent('Next');
  });

  it('blocks the page change on a focusable-disabled button', async () => {
    const { next, container } = renderButtons({ next: { children: 'Next', disabledFocusable: true } });

    await userEvent.click(next);

    expect(container.querySelector('[data-carousel-active-item="true"]')?.getAttribute('data-carousel-item')).toBe('2');
  });

  it('keeps the carousel props off the DOM', () => {
    // React lowercases an unrecognized prop on its way to the element and reports it through
    // console.error, so both halves are asserted: the attributes must be absent and the render must
    // be quiet.
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { previous, next } = renderButtons();

    for (const button of [previous, next]) {
      expect(button.hasAttribute('navtype')).toBe(false);
      expect(button.hasAttribute('alttext')).toBe(false);
    }

    expect(error).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('keeps a consumer className exactly once', () => {
    const { next } = renderButtons({ next: { children: 'Next', className: 'consumer' } });

    expect(
      next
        .getAttribute('class')!
        .split(/\s+/)
        .filter(one => one === 'consumer'),
    ).toHaveLength(1);
    expect(next).toHaveClass(buttonStyles.root);
  });
});
