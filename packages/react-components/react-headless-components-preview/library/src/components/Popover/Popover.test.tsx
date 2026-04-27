import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';

beforeAll(() => {
  HTMLElement.prototype.showPopover = jest.fn();
  HTMLElement.prototype.hidePopover = jest.fn();

  // JSDOM does not implement ResizeObserver
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

describe('Popover', () => {
  it('renders trigger and surface children', () => {
    const { getByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toBeInTheDocument();
    expect(getByText('Surface content')).toBeInTheDocument();
  });

  it('opens on trigger click (uncontrolled)', () => {
    const { getByText, queryByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface content</PopoverSurface>
      </Popover>,
    );

    expect(queryByText('Surface content')).not.toBeInTheDocument();

    userEvent.click(getByText('Trigger'));

    expect(getByText('Surface content')).toBeInTheDocument();
  });

  it('closes on trigger click when open', () => {
    const { getByText, queryByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Surface content')).toBeInTheDocument();

    userEvent.click(getByText('Trigger'));

    expect(queryByText('Surface content')).not.toBeInTheDocument();
  });

  it('fires onOpenChange callback', () => {
    const onOpenChange = jest.fn();

    const { getByText } = render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    userEvent.click(getByText('Trigger'));

    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  it('supports controlled open state', () => {
    const { getByText, queryByText, rerender } = render(
      <Popover open={false}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(queryByText('Surface')).not.toBeInTheDocument();

    rerender(
      <Popover open={true}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Surface')).toBeInTheDocument();
  });

  it('sets aria-expanded on trigger', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    const trigger = getByText('Trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets data-open on trigger when open', () => {
    const { getByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('data-open');
  });

  it('sets role="group" on surface', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).toBeInTheDocument();
  });

  it('sets data-open attribute on surface', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).toHaveAttribute('data-open');
  });

  it('closes on Escape key', () => {
    const { getByRole, queryByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    const surface = getByRole('group');
    fireEvent.keyDown(surface, { key: 'Escape' });

    expect(queryByText('Surface')).not.toBeInTheDocument();
  });

  it('sets popover="manual" on surface by default', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).toHaveAttribute('popover', 'manual');
  });

  it('does not set popover attribute when inline', () => {
    const { getByRole } = render(
      <Popover defaultOpen inline>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group')).not.toHaveAttribute('popover');
  });
});
