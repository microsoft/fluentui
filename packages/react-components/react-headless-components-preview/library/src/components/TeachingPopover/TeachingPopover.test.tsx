import * as React from 'react';
import { render } from '@testing-library/react';
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

  it('does not render default header or title icons', () => {
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
    expect(title.querySelector('button')).toBeNull();
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

    expect(getByRole('group', { hidden: true }).querySelector('[data-arrow]')).toBeInTheDocument();
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

    expect(getByRole('group', { hidden: true }).querySelector('[data-arrow]')).toBeNull();
  });

  it('does not enable trapFocus by default (surface is role="group", not "dialog")', () => {
    const { getByRole, queryByRole } = render(
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>Surface</TeachingPopoverSurface>
      </TeachingPopover>,
    );

    expect(getByRole('group', { hidden: true })).toBeInTheDocument();
    expect(queryByRole('dialog', { hidden: true })).not.toBeInTheDocument();
  });

  it('forwards trapFocus to the surface when explicitly set', () => {
    const { getByRole } = render(
      <TeachingPopover defaultOpen trapFocus>
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

    it('restores focus owned by an initially open surface', () => {
      const { getByText, rerender } = render(<Example open />);
      expect(getByText('Inside')).toHaveFocus();
      rerender(<Example open={false} />);
      expect(getByText('Trigger')).toHaveFocus();
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

    it('tracks surface focus even when its focus event stops bubbling', () => {
      const { getByText, rerender } = render(<Example open autoFocus={false} />);
      getByText('Outside').focus();
      getByText('Inside').addEventListener('focusin', event => event.stopPropagation());
      getByText('Inside').focus();
      rerender(<Example open={false} autoFocus={false} />);
      expect(getByText('Trigger')).toHaveFocus();
    });

    it('preserves outside focus even when the surface focus event stops bubbling', () => {
      const { getByText, rerender } = render(<Example open />);
      getByText('Inside').addEventListener('focusin', event => event.stopPropagation());
      getByText('Outside').focus();
      getByText('Inside').focus();
      getByText('Outside').focus();
      rerender(<Example open={false} />);
      expect(getByText('Outside')).toHaveFocus();
    });

    it('supports closing without a trigger', () => {
      const { getByText, rerender } = render(<Example open withTrigger={false} />);
      expect(getByText('Inside')).toHaveFocus();
      rerender(<Example open={false} withTrigger={false} />);
      expect(getByText('Outside')).not.toHaveFocus();
    });
  });
});
