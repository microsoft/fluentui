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

    const surface = getByRole('group');
    expect(surface.firstElementChild?.tagName).toBe('DIV');
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
});
