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

    expect(getByRole('group', { hidden: true }).tagName).toBe('DIALOG');
  });

  it('renders a dialog when focus trapping is enabled', () => {
    const { getByRole } = render(
      <Popover defaultOpen trapFocus>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('dialog', { hidden: true }).tagName).toBe('DIALOG');
  });

  it('allows the root element to be a div', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface as="div">Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group', { hidden: true }).tagName).toBe('DIV');
  });

  it('warns when a div root is used with focus trapping', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();

    render(
      <Popover defaultOpen trapFocus>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface as="div">Content</PopoverSurface>
      </Popover>,
    );

    expect(consoleWarn).toHaveBeenCalledWith(
      '@fluentui/react-headless-components-preview [PopoverSurface]: ' +
        '`as="div"` is incompatible with `Popover trapFocus`. ' +
        'Use the default `dialog` element when focus trapping is enabled.',
    );

    consoleWarn.mockRestore();
  });

  it('does not warn when the default dialog root is used with focus trapping', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();

    render(
      <Popover defaultOpen trapFocus>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(consoleWarn).not.toHaveBeenCalled();

    consoleWarn.mockRestore();
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

    expect(getByRole('group', { hidden: true })).toHaveAttribute('data-open');
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

    expect(getByRole('group', { hidden: true })).toHaveAttribute('popover', 'auto');
  });

  it('lets a consumer override the popover attribute', () => {
    const { getByRole } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface popover="manual">Content</PopoverSurface>
      </Popover>,
    );

    expect(getByRole('group', { hidden: true })).toHaveAttribute('popover', 'manual');
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

    const surface = getByRole('group', { hidden: true });
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

    expect(getByRole('group', { hidden: true }).querySelector('[data-arrow]')).toBeInTheDocument();
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

    expect(getByRole('group', { hidden: true })).toHaveClass('my-surface');
  });

  it('keeps trigger aria-details linked to the surface even when a custom id is provided', () => {
    const { getByRole, getByText } = render(
      <Popover open>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface id="user-provided-id">Content</PopoverSurface>
      </Popover>,
    );

    const surface = getByRole('group', { hidden: true });
    const trigger = getByText('Trigger');

    expect(surface.id).not.toBe('user-provided-id');
    expect(trigger.getAttribute('aria-details')).toBe(surface.id);
  });
});
