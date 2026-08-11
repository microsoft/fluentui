import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Popover } from './Popover';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import {
  resetOverlayRuntimeForTests,
  setOverlayRuntimeOverrideForTests,
} from '../../overlayRuntime';

describe('Popover fallback runtime', () => {
  beforeEach(() => {
    resetOverlayRuntimeForTests();
    setOverlayRuntimeOverrideForTests(document, 'fallback');
  });

  afterEach(() => {
    resetOverlayRuntimeForTests();
    setOverlayRuntimeOverrideForTests(document, 'native');
  });

  it('queues an open interaction while loading and portals the fallback surface', async () => {
    render(
      <Popover positioning="below-start">
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverSurface>Fallback content</PopoverSurface>
      </Popover>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));

    const surface = await screen.findByText('Fallback content');
    expect(surface).toHaveAttribute('data-overlay-runtime', 'fallback');
    expect(surface).toHaveAttribute('open');
    expect(surface).not.toHaveAttribute('popover');

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 5));
    });
    fireEvent.mouseDown(document.body);
    fireEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Fallback content')).not.toBeInTheDocument();
    });
  });

  it('dismisses the topmost fallback popover with Escape and restores focus', async () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverSurface>
          <button>Inside</button>
        </PopoverSurface>
      </Popover>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);

    const inside = await screen.findByRole('button', { name: 'Inside' });
    inside.focus();
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Inside' })).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });
});
