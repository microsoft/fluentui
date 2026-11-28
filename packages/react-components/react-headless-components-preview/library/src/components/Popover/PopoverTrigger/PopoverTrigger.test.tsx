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

  it('omits aria-haspopup for a non-modal surface', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).not.toHaveAttribute('aria-haspopup');
  });

  it('applies aria-haspopup="dialog" when inert focus trapping is enabled', () => {
    const { getByText } = render(
      <Popover inertTrapFocus>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it.each([false, true])('preserves a consumer popup role when inertTrapFocus is %s', inertTrapFocus => {
    const { getByText } = render(
      <Popover inertTrapFocus={inertTrapFocus}>
        <PopoverTrigger>
          <button aria-haspopup="menu">Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('preserves an explicit false aria-haspopup on a modal trigger', () => {
    const { getByText } = render(
      <Popover inertTrapFocus>
        <PopoverTrigger>
          <button aria-haspopup={false}>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('aria-haspopup', 'false');
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

  describe('openOnContext', () => {
    const renderContext = (onOpenChange: jest.Mock) =>
      render(
        <Popover openOnContext onOpenChange={onOpenChange}>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Content</PopoverSurface>
        </Popover>,
      );

    it('opens immediately from a keyboard contextmenu', () => {
      const onOpenChange = jest.fn();
      const { getByText } = renderContext(onOpenChange);

      fireEvent.contextMenu(getByText('Trigger'), { button: 0 });

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
    });

    it('waits for pointerup after a right-click contextmenu', () => {
      const onOpenChange = jest.fn();
      const { getByText } = renderContext(onOpenChange);

      fireEvent.contextMenu(getByText('Trigger'), { button: 2 });
      expect(onOpenChange).not.toHaveBeenCalled();

      fireEvent.pointerUp(document);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
    });

    it('keeps at most one pending pointerup listener', () => {
      const onOpenChange = jest.fn();
      const { getByText } = renderContext(onOpenChange);

      fireEvent.contextMenu(getByText('Trigger'), { button: 2 });
      fireEvent.contextMenu(getByText('Trigger'), { button: 2 });
      fireEvent.pointerUp(document);

      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });

    it('drops the pending pointerup listener on unmount', () => {
      const onOpenChange = jest.fn();
      const { getByText, unmount } = renderContext(onOpenChange);

      fireEvent.contextMenu(getByText('Trigger'), { button: 2 });
      unmount();
      fireEvent.pointerUp(document);

      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });
});
