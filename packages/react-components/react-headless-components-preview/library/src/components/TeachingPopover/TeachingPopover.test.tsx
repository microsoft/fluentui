import * as React from 'react';
import { createPortal } from 'react-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from './TeachingPopover';
import { TeachingPopoverHeader } from './TeachingPopoverHeader';
import { TeachingPopoverTrigger } from './TeachingPopoverTrigger';
import { TeachingPopoverSurface } from './TeachingPopoverSurface';
import { TeachingPopoverTitle } from './TeachingPopoverTitle';

describe('TeachingPopover', () => {
  isConformant({
    Component: TeachingPopover,
    displayName: 'TeachingPopover',
    requiredProps: {
      defaultOpen: true,
      children: [
        <TeachingPopoverTrigger key="trigger">
          <button>Trigger</button>
        </TeachingPopoverTrigger>,
        <TeachingPopoverSurface key="surface">Surface</TeachingPopoverSurface>,
      ],
    },
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'make-styles-overrides-win',
      'consistent-callback-args',
    ],
  });

  it('renders trigger and surface children', () => {
    const { getByText } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface content</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByText('Trigger')).toBeInTheDocument();
    expect(getByText('Surface content')).toBeInTheDocument();
  });

  it('preserves the default header dismiss button and keeps the title dismiss button opt-in', () => {
    const { container, getByTestId } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverHeader data-testid="header">Tips</TeachingPopoverHeader>
          <TeachingPopoverTitle data-testid="title">Title</TeachingPopoverTitle>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );
    const header = getByTestId('header');
    const title = getByTestId('title');

    expect(container.querySelector('svg')).toBeNull();
    expect(header.querySelector('[aria-hidden="true"]')).toBeEmptyDOMElement();
    expect(header.querySelector('button[aria-label="dismiss"]')).toBeEmptyDOMElement();
    expect(title.querySelector('button[aria-label="dismiss"]')).toBeNull();
  });

  it('renders explicitly provided header and title slots', () => {
    const { getByTestId } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverHeader
            icon={{ children: <span data-testid="header-icon">Tip</span> }}
            dismissButton={{ children: <span data-testid="header-dismiss">Close header</span> }}
          >
            Tips
          </TeachingPopoverHeader>
          <TeachingPopoverTitle dismissButton={{ children: <span data-testid="title-dismiss">Close title</span> }}>
            Title
          </TeachingPopoverTitle>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByTestId('header-icon')).toHaveTextContent('Tip');
    expect(getByTestId('header-dismiss')).toHaveTextContent('Close header');
    expect(getByTestId('title-dismiss')).toHaveTextContent('Close title');
  });

  it('renders an arrow by default (withArrow=true)', () => {
    const { getByRole } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('dialog', { hidden: true }).querySelector('[data-arrow]')).toBeInTheDocument();
  });

  it('allows opting out of the arrow with withArrow={false}', () => {
    const { getByRole } = render(
      <TeachingPopover defaultOpen withArrow={false}>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('dialog', { hidden: true }).querySelector('[data-arrow]')).toBeNull();
  });

  it('defaults to dialog semantics without requiring inertTrapFocus', () => {
    const { getByRole, queryByRole } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('dialog', { hidden: true })).toBeInTheDocument();
    expect(queryByRole('group', { hidden: true })).not.toBeInTheDocument();
  });

  it('names the dialog from the title while preserving explicit labels', () => {
    const { getByRole, rerender } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface as="div">
          <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );

    const dialog = getByRole('dialog', { name: 'Teaching Bubble Title', hidden: true });
    const title = getByRole('heading', { name: 'Teaching Bubble Title', hidden: true });
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);

    rerender(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface as="div" aria-label="Custom label">
          <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('dialog', { name: 'Custom label', hidden: true })).toHaveAttribute('aria-label', 'Custom label');

    rerender(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface as="div" aria-labelledby="custom-label">
          <span id="custom-label">Custom labelled-by value</span>
          <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('dialog', { name: 'Custom labelled-by value', hidden: true })).toHaveAttribute(
      'aria-labelledby',
      'custom-label',
    );
  });

  it.each([TeachingPopoverHeader, TeachingPopoverTitle])(
    'autofocuses the dismiss button on opening and not after carousel content remounts',
    Component => {
      const Example = () => {
        const [open, setOpen] = React.useState(true);
        const [page, setPage] = React.useState(0);

        return (
          <TeachingPopover open={open} onOpenChange={(_, data) => setOpen(data.open)}>
            <TeachingPopoverTrigger>
              <button>Trigger</button>
            </TeachingPopoverTrigger>
            <TeachingPopoverSurface>
              <Component key={page} dismissButton={{}}>
                Page {page + 1}
              </Component>
              <button onClick={() => (page === 2 ? setOpen(false) : setPage(page + 1))}>
                {page === 2 ? 'Done' : 'Next'}
              </button>
            </TeachingPopoverSurface>
          </TeachingPopover>
        );
      };

      const { getByRole, getByText } = render(<Example />);
      expect(getByRole('button', { name: 'dismiss', hidden: true })).toHaveFocus();

      const next = getByRole('button', { name: 'Next', hidden: true });
      next.focus();
      userEvent.keyboard('{Enter}');
      expect(getByText('Page 2')).toBeInTheDocument();
      expect(next).toHaveFocus();

      userEvent.keyboard('{Enter}');
      expect(getByText('Page 3')).toBeInTheDocument();
      expect(getByRole('button', { name: 'Done', hidden: true })).toHaveFocus();

      userEvent.keyboard('{Enter}');
      expect(getByRole('button', { name: 'Trigger' })).toHaveAttribute('aria-expanded', 'false');
    },
  );

  it.each([TeachingPopoverHeader, TeachingPopoverTitle])(
    'autofocuses on parent-controlled open transitions, including a late dismiss-button mount',
    async Component => {
      const Example = () => {
        const [open, setOpen] = React.useState(false);
        const [showDismiss, setShowDismiss] = React.useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>Open externally</button>
            <button onClick={() => setOpen(false)}>Close externally</button>
            <TeachingPopover open={open}>
              <TeachingPopoverTrigger>
                <button>Trigger</button>
              </TeachingPopoverTrigger>
              <TeachingPopoverSurface as="div">
                {showDismiss ? (
                  <Component dismissButton={{}}>Content</Component>
                ) : (
                  <button onClick={() => setShowDismiss(true)}>Mount dismiss</button>
                )}
              </TeachingPopoverSurface>
            </TeachingPopover>
          </>
        );
      };

      const { getByRole, getByText } = render(<Example />);
      userEvent.click(getByText('Open externally'));
      userEvent.click(getByText('Mount dismiss'));
      await waitFor(() => expect(getByRole('button', { name: 'dismiss', hidden: true })).toHaveFocus());

      userEvent.click(getByText('Close externally'));
      userEvent.click(getByText('Open externally'));
      await waitFor(() => expect(getByRole('button', { name: 'dismiss', hidden: true })).toHaveFocus());
    },
  );

  it.each([TeachingPopoverHeader, TeachingPopoverTitle])(
    'preserves explicit dismiss-button autofocus and restores trigger focus on dismissal',
    async Component => {
      const { getByRole } = render(
        <TeachingPopover defaultOpen>
          <TeachingPopoverTrigger>
            <button>Trigger</button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            <Component dismissButton={{ autoFocus: true }}>Content</Component>
          </TeachingPopoverSurface>
        </TeachingPopover>,
      );
      const dismiss = getByRole('button', { name: 'dismiss', hidden: true });
      expect(dismiss).toHaveFocus();
      expect(dismiss).toHaveAttribute('type', 'button');
      expect(dismiss).not.toHaveAttribute('aria-hidden');
      userEvent.click(dismiss);
      await waitFor(() => expect(getByRole('button', { name: 'Trigger' })).toHaveFocus());
    },
  );

  it('preserves role overrides and allows dismiss-button suppression', () => {
    const { getByRole, queryByLabelText } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface role="region">
          <TeachingPopoverHeader dismissButton={null}>Header</TeachingPopoverHeader>
          <TeachingPopoverTitle dismissButton={null}>Title</TeachingPopoverTitle>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );
    expect(getByRole('region', { hidden: true })).toBeInTheDocument();
    expect(queryByLabelText('dismiss')).toBeNull();
  });

  it.each([TeachingPopoverHeader, TeachingPopoverTitle])('allows consumers to prevent dismissal', Component => {
    const onClick = jest.fn((event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault());
    const { getByRole } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface as="div">
          <Component dismissButton={{ onClick, autoFocus: false }}>Content</Component>
        </TeachingPopoverSurface>
      </TeachingPopover>,
    );
    const dismiss = getByRole('button', { name: 'dismiss', hidden: true });
    expect(dismiss).toHaveProperty('autofocus', false);
    userEvent.click(dismiss);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(getByRole('button', { name: 'Trigger' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('forwards inertTrapFocus to the surface when explicitly set', () => {
    const { getByRole } = render(
      <TeachingPopover defaultOpen inertTrapFocus>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('dialog', { hidden: true })).toBeInTheDocument();
  });

  it('opens on trigger click and fires onOpenChange', () => {
    const onOpenChange = jest.fn();
    const { getByText, queryByText } = render(
      <TeachingPopover onOpenChange={onOpenChange}>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(queryByText('Surface')).not.toBeInTheDocument();

    userEvent.click(getByText('Trigger'));

    expect(getByText('Surface')).toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  describe('close focus restoration', () => {
    const Example = ({
      open,
      withTrigger = true,
      autoFocus = true,
      disabledInside = false,
    }: {
      open: boolean;
      withTrigger?: boolean;
      autoFocus?: boolean;
      disabledInside?: boolean;
    }) => {
      const surface = (
        <TeachingPopoverSurface as="div">
          <button autoFocus={autoFocus} disabled={disabledInside}>
            Inside
          </button>
        </TeachingPopoverSurface>
      );
      return (
        <>
          <button>Outside</button>
          <TeachingPopover open={open}>
            {withTrigger
              ? [
                  <TeachingPopoverTrigger key="trigger">
                    <button>Trigger</button>
                  </TeachingPopoverTrigger>,
                  React.cloneElement(surface, { key: 'surface' }),
                ]
              : surface}
          </TeachingPopover>
        </>
      );
    };

    it('restores focus owned by an initially open surface', async () => {
      const { getByText, rerender } = render(<Example open />);
      expect(getByText('Inside')).toHaveFocus();
      rerender(<Example open={false} />);
      await waitFor(() => expect(getByText('Trigger')).toHaveFocus());
    });

    it('does not steal focus when initially closed', () => {
      const { getByText } = render(<Example open={false} />);
      expect(getByText('Trigger')).not.toHaveFocus();
    });

    it('does not restore focus that never belonged to the surface', () => {
      const { getByText, rerender } = render(<Example open autoFocus={false} disabledInside />);
      expect(getByText('Inside')).not.toHaveFocus();
      rerender(<Example open={false} autoFocus={false} disabledInside />);
      expect(getByText('Trigger')).not.toHaveFocus();
    });

    it('tracks surface focus even when its focus event stops bubbling', async () => {
      const { getByText, rerender } = render(<Example open autoFocus={false} />);
      getByText('Outside').focus();
      getByText('Inside').addEventListener('focusin', event => event.stopPropagation());
      getByText('Inside').focus();
      rerender(<Example open={false} autoFocus={false} />);
      await waitFor(() => expect(getByText('Trigger')).toHaveFocus());
    });

    it('preserves outside focus even when the surface focus event stops bubbling', async () => {
      const { getByText, queryByText, rerender } = render(<Example open />);
      getByText('Inside').addEventListener('focusin', event => event.stopPropagation());
      getByText('Outside').focus();
      getByText('Inside').focus();
      getByText('Outside').focus();
      const surface = getByText('Inside').parentElement!;
      const hidePopover = surface.hidePopover;
      // Preserve explicit outside focus after the polyfill restores its saved target.
      Object.defineProperty(surface, 'hidePopover', {
        configurable: true,
        value: () => {
          hidePopover.call(surface);
          getByText('Outside').focus();
        },
      });
      try {
        rerender(<Example open={false} />);
        expect(getByText('Outside')).toHaveFocus();
        await waitFor(() => expect(queryByText('Inside')).not.toBeInTheDocument());
        expect(getByText('Outside')).toHaveFocus();
      } finally {
        Reflect.deleteProperty(surface, 'hidePopover');
      }
    });

    it('supports closing without a trigger', () => {
      const { getByText, rerender } = render(<Example open withTrigger={false} />);
      expect(getByText('Inside')).toHaveFocus();
      rerender(<Example open={false} withTrigger={false} />);
      expect(getByText('Outside')).not.toHaveFocus();
    });

    (['open', 'closed'] as const).forEach(mode => {
      it(`restores focus owned by an initially open surface in a ${mode} shadow root`, async () => {
        const { container } = render(<div />);
        const host = container.firstElementChild!;
        const shadowRoot = host.attachShadow({ mode });
        const { rerender } = render(createPortal(<Example open />, shadowRoot));

        expect(shadowRoot.activeElement).toHaveTextContent('Inside');
        expect(host.ownerDocument.activeElement).toBe(host);
        rerender(createPortal(<Example open={false} />, shadowRoot));
        await waitFor(() => expect(shadowRoot.activeElement).toHaveTextContent('Trigger'));
      });
    });
  });
});
