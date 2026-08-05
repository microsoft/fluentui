import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from './TeachingPopover';
import { TeachingPopoverTrigger } from './TeachingPopoverTrigger';
import { TeachingPopoverSurface } from './TeachingPopoverSurface';
import { TeachingPopoverCarousel } from './TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from './TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselNav } from './TeachingPopoverCarouselNav';
import { TeachingPopoverCarouselNavButton } from './TeachingPopoverCarouselNavButton';

describe('TeachingPopover', () => {
  isConformant({
    Component: TeachingPopover,
    displayName: 'TeachingPopover',
    requiredProps: {
      defaultOpen: true,
      children: [
        <TeachingPopoverTrigger key="trigger">
          <button>Trigger</button>
        </TeachingPopoverTrigger>,
        <TeachingPopoverSurface key="surface">Surface</TeachingPopoverSurface>,
      ],
    },
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'make-styles-overrides-win',
      'consistent-callback-args',
    ],
  });

  it('renders trigger and surface children', () => {
    const { getByText } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface content</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByText('Trigger')).toBeInTheDocument();
    expect(getByText('Surface content')).toBeInTheDocument();
  });

  it('renders an arrow by default (withArrow=true)', () => {
    const { getByRole } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('group', { hidden: true }).querySelector('[data-arrow]')).toBeInTheDocument();
  });

  it('allows opting out of the arrow with withArrow={false}', () => {
    const { getByRole } = render(
      <TeachingPopover defaultOpen withArrow={false}>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('group', { hidden: true }).querySelector('[data-arrow]')).toBeNull();
  });

  it('does not enable trapFocus by default (surface is role="group", not "dialog")', () => {
    const { getByRole, queryByRole } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('group', { hidden: true })).toBeInTheDocument();
    expect(queryByRole('dialog', { hidden: true })).not.toBeInTheDocument();
  });

  it('forwards trapFocus to the surface when explicitly set', () => {
    const { getByRole } = render(
      <TeachingPopover defaultOpen trapFocus>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('dialog', { hidden: true })).toBeInTheDocument();
  });

  it('opens on trigger click and fires onOpenChange', () => {
    const onOpenChange = jest.fn();
    const { getByText, queryByText } = render(
      <TeachingPopover onOpenChange={onOpenChange}>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(queryByText('Surface')).not.toBeInTheDocument();

    userEvent.click(getByText('Trigger'));

    expect(getByText('Surface')).toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  it('exposes the selected carousel navigation button', () => {
    const { getByRole } = render(
      <TeachingPopoverCarousel defaultValue="one" announcement={index => `Page ${index + 1}`}>
        <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselNav>
          {(value: string) => <TeachingPopoverCarouselNavButton aria-label={`Go to ${value}`} />}
        </TeachingPopoverCarouselNav>
      </TeachingPopoverCarousel>,
    );

    expect(getByRole('tab', { name: 'Go to one' })).toHaveAttribute('data-selected');
    expect(getByRole('tab', { name: 'Go to two' })).not.toHaveAttribute('data-selected');
  });
});
