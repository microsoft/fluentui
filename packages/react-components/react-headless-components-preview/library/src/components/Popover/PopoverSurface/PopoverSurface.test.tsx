import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Popover } from '../Popover';
import { PopoverTrigger } from '../PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface';

beforeAll(() => {
  HTMLElement.prototype.showPopover = jest.fn();
  HTMLElement.prototype.hidePopover = jest.fn();

  global.ResizeObserver = class ResizeObserver {
    public observe(): void {
      /* no-op */
    }
    public unobserve(): void {
      /* no-op */
    }
    public disconnect(): void {
      /* no-op */
    }
  } as unknown as typeof globalThis.ResizeObserver;
});

afterAll(() => {
  delete (HTMLElement.prototype as unknown as Record<string, unknown>).showPopover;
  delete (HTMLElement.prototype as unknown as Record<string, unknown>).hidePopover;
  delete (global as unknown as Record<string, unknown>).ResizeObserver;
});

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

  it('does not have popover attribute when inline', () => {
    const { getByRole } = render(
      <Popover defaultOpen inline>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).not.toHaveAttribute('popover');
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
