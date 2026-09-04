import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Dialog } from './Dialog';
import { DialogSurface } from './DialogSurface';
import { DialogHeader } from './DialogHeader';
import { DialogTitle } from './DialogTitle';
import { DialogBody } from './DialogBody';
import { DialogActions } from './DialogActions';
import { DialogTrigger } from './DialogTrigger';

describe('Dialog', () => {
  isConformant({
    Component: Dialog,
    displayName: 'Dialog',
    disabledTests: [
      // Dialog does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
      'make-styles-overrides-win',
    ],
    requiredProps: {
      children: <DialogSurface>Dialog content</DialogSurface>,
    },
  });

  it('renders a default state', () => {
    const result = render(
      <Dialog defaultOpen>
        <DialogSurface>
          <DialogHeader>
            <DialogTitle>Default Dialog</DialogTitle>
            <DialogBody>This is a default dialog</DialogBody>
            <DialogActions>
              <DialogTrigger>
                <button>Close</button>
              </DialogTrigger>
            </DialogActions>
          </DialogHeader>
        </DialogSurface>
      </Dialog>,
    );
    const dialog = result.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent('Default Dialog');
  });

  it('uses trigger defaults based on placement', () => {
    const result = render(
      <Dialog defaultOpen>
        <DialogTrigger>
          <button>Open dialog</button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogActions>
              <DialogTrigger>
                <button>Close dialog</button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );

    const openButton = result.getByRole('button', { name: 'Open dialog' });
    const closeButton = result.getByRole('button', { name: 'Close dialog' });

    expect(openButton).toHaveAttribute('aria-haspopup', 'dialog');
    expect(closeButton).not.toHaveAttribute('aria-haspopup');
  });

  it('wires DialogTitle id to DialogSurface aria-labelledby', () => {
    const result = render(
      <Dialog defaultOpen>
        <DialogSurface>
          <DialogTitle>Accessible title</DialogTitle>
          <DialogBody>Body</DialogBody>
        </DialogSurface>
      </Dialog>,
    );

    const dialog = result.getByRole('dialog', { name: 'Accessible title' });
    const title = result.getByRole('heading', { name: 'Accessible title' });

    expect(title).toHaveAttribute('id');
    expect(dialog).toHaveAttribute('aria-labelledby', title.getAttribute('id'));
  });

  it('does not set aria-labelledby when aria-label is provided', () => {
    const result = render(
      <Dialog defaultOpen>
        <DialogSurface aria-label="Custom dialog label">
          <DialogTitle>Hidden from name computation</DialogTitle>
        </DialogSurface>
      </Dialog>,
    );

    const dialog = result.getByRole('dialog', { name: 'Custom dialog label' });

    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  describe('scroll lock', () => {
    // jsdom reports clientWidth 0, which would read as a scrollbar on every page.
    const setScrollbarWidth = (width: number) =>
      Object.defineProperty(document.documentElement, 'clientWidth', {
        configurable: true,
        value: window.innerWidth - width,
      });

    afterEach(() => {
      // `setScrollbarWidth` installs a configurable OWN property shadowing the prototype getter, so
      // removing that own property restores the getter. `delete` cannot express this — `clientWidth`
      // is typed `readonly`, which `Partial<HTMLElement>` preserves — while `Reflect.deleteProperty`
      // has identical runtime semantics and needs no cast.
      Reflect.deleteProperty(document.documentElement, 'clientWidth');
      document.documentElement.style.removeProperty('scrollbar-gutter');
      document.body.style.removeProperty('overflow');
    });

    const renderModal = () =>
      render(
        <Dialog unmountOnClose={false}>
          <DialogTrigger>
            <button>Open dialog</button>
          </DialogTrigger>
          <DialogSurface>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogActions>
              <DialogTrigger>
                <button>Close dialog</button>
              </DialogTrigger>
            </DialogActions>
          </DialogSurface>
        </Dialog>,
      );

    it('reserves the scrollbar gutter while a modal holds the lock', () => {
      setScrollbarWidth(15);
      const result = renderModal();

      fireEvent.click(result.getByRole('button', { name: 'Open dialog' }));

      expect(document.body.style.overflow).toBe('visible clip');
      // On <html>, not <body>: scrollbar-gutter does not propagate to the viewport.
      expect(document.documentElement.style.scrollbarGutter).toBe('stable');

      fireEvent.click(result.getByRole('button', { name: 'Close dialog' }));

      expect(document.documentElement.style.scrollbarGutter).toBe('');
    });

    it('reserves nothing when the scrollbar takes no layout width', () => {
      setScrollbarWidth(0);
      const result = renderModal();

      fireEvent.click(result.getByRole('button', { name: 'Open dialog' }));

      expect(document.body.style.overflow).toBe('visible clip');
      expect(document.documentElement.style.scrollbarGutter).toBe('');
    });

    it('restores a gutter the host application had already set', () => {
      setScrollbarWidth(15);
      document.documentElement.style.scrollbarGutter = 'both-edges';
      const result = renderModal();

      fireEvent.click(result.getByRole('button', { name: 'Open dialog' }));

      expect(document.documentElement.style.scrollbarGutter).toBe('stable');

      fireEvent.click(result.getByRole('button', { name: 'Close dialog' }));

      expect(document.documentElement.style.scrollbarGutter).toBe('both-edges');
    });

    it('leaves a non-modal dialog out of the lock entirely', () => {
      setScrollbarWidth(15);
      const result = render(
        <Dialog defaultOpen modalType="non-modal">
          <DialogSurface>
            <DialogTitle>Non-modal title</DialogTitle>
          </DialogSurface>
        </Dialog>,
      );

      expect(result.container.querySelector('dialog')).toHaveAttribute('data-open');
      expect(document.body.style.overflow).toBe('');
      expect(document.documentElement.style.scrollbarGutter).toBe('');
    });
  });

  it('keeps dialog mounted after close when unmountOnClose is false', () => {
    const result = render(
      <Dialog unmountOnClose={false}>
        <DialogTrigger>
          <button>Open dialog</button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogActions>
            <DialogTrigger>
              <button>Close dialog</button>
            </DialogTrigger>
          </DialogActions>
        </DialogSurface>
      </Dialog>,
    );

    const openButton = result.getByRole('button', { name: 'Open dialog' });
    fireEvent.click(openButton);

    expect(result.getByRole('dialog', { name: 'Dialog title' })).toBeInTheDocument();

    const closeButton = result.getByRole('button', { name: 'Close dialog' });
    fireEvent.click(closeButton);

    const dialogElement = result.container.querySelector('dialog');

    expect(dialogElement).toBeInTheDocument();
    expect(dialogElement).not.toHaveAttribute('open');
  });
});
