import * as React from 'react';
import { render } from '@testing-library/react';
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

  it('applies aria-haspopup="dialog" when focus trapping is enabled', () => {
    const { getByText } = render(
      <Popover trapFocus>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>,
    );

    expect(getByText('Trigger')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it.each([false, true])('preserves a consumer popup role when trapFocus is %s', trapFocus => {
    const { getByText } = render(
      <Popover trapFocus={trapFocus}>
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
      <Popover trapFocus>
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
});
