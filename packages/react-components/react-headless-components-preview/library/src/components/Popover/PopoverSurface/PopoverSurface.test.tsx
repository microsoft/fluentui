import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Popover } from '../Popover';
import { PopoverTrigger } from '../PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface';

describe('PopoverSurface', () => {
  it('renders surface content', () => {
    const { getByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Surface content')).toBeInTheDocument();
  });

  it('has role="group" by default', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).toBeInTheDocument();
  });

  it('has data-open attribute when open', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).toHaveAttribute('data-open');
  });

  it('has popover="auto" attribute by default', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).toHaveAttribute('popover', 'auto');
  });

  it('mirrors a browser-driven `toggle` event into onOpenChange', () => {
    const onOpenChange = jest.fn();

    const { getByRole } = render(
      <Popover defaultOpen onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    const surface = getByRole('group');
    const toggleEvent = new Event('toggle');
    (toggleEvent as unknown as { newState: string }).newState = 'closed';
    fireEvent(surface, toggleEvent);

    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: false }));
  });

  it('renders arrow when withArrow is set', () => {
    const { getByRole } = render(
      <Popover defaultOpen withArrow>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group').querySelector('[data-arrow]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface className="my-surface">Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).toHaveClass('my-surface');
  });

  it('keeps trigger aria-details linked to the surface even when a custom id is provided', () => {
    const { getByText, getByRole } = render(
      <Popover open>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface id="user-provided-id">Content</PopoverSurface>
      </Popover>,
    );

    const surface = getByRole('group');
    const trigger = getByText('Trigger');

    expect(surface.id).not.toBe('user-provided-id');
    expect(trigger.getAttribute('aria-details')).toBe(surface.id);
  });
});
