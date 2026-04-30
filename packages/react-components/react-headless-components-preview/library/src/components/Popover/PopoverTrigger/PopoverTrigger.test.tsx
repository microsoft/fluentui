import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Popover } from '../Popover';
import { PopoverTrigger } from './PopoverTrigger';
import { PopoverSurface } from '../PopoverSurface/PopoverSurface';

describe('PopoverTrigger', () => {
  it('renders the child element', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Click me</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('applies aria-expanded attribute', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies aria-haspopup="true" by default', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('aria-haspopup', 'true');
  });

  it('applies data-open when popover is open', () => {
    const { getByText } = render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('data-open');
  });

  it('does not have data-open when popover is closed', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).not.toHaveAttribute('data-open');
  });

  it('toggles popover on click', () => {
    const onOpenChange = jest.fn();

    const { getByText } = render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    fireEvent.click(getByText('Trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  it('closes on Escape key press', () => {
    const onOpenChange = jest.fn();

    const { getByText } = render(
      <Popover defaultOpen onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    fireEvent.keyDown(getByText('Trigger'), { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: false }));
  });
});
