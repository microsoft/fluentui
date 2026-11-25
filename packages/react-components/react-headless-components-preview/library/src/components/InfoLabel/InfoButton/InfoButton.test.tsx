import * as React from 'react';
import { InfoButton } from './InfoButton';
import { isConformant } from '../../../testing/isConformant';
import { fireEvent, render, waitFor } from '@testing-library/react';

describe('InfoButton', () => {
  isConformant({
    Component: InfoButton,
    displayName: 'InfoButton',
    requiredProps: {
      info: "This is an InfoButton's information.",
    },
    disabledTests: ['component-has-static-classnames-object', 'exported-top-level', 'has-top-level-file-extra'],
  });

  it('exposes open state on the trigger', () => {
    const { getByRole, rerender } = render(<InfoButton info="Information" popover={{ open: true }} />);
    const trigger = getByRole('button', { name: 'information' });

    expect(trigger).toHaveAttribute('data-open', '');

    rerender(<InfoButton info="Information" popover={{ open: false }} />);

    expect(trigger).not.toHaveAttribute('data-open');
  });

  it('does not expose open state by default', () => {
    const { getByRole } = render(<InfoButton info="Information" />);

    expect(getByRole('button', { name: 'information' })).not.toHaveAttribute('data-open');
  });

  it('exposes information as a note rather than announcing a menu', async () => {
    const change = jest.fn();
    const { getByRole, queryByRole } = render(<InfoButton info="Information" popover={{ onOpenChange: change }} />);
    const trigger = getByRole('button', { name: 'information' });
    expect(trigger).not.toHaveAttribute('aria-haspopup');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).not.toHaveAttribute('aria-details');
    fireEvent.click(trigger);
    const note = getByRole('note', { hidden: true });
    expect(note.tagName).toBe('DIV');
    expect(note).toHaveAttribute('popover', 'auto');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-details', note.id);
    expect(note).toHaveFocus();
    expect(change).toHaveBeenCalledTimes(1);
    expect(change.mock.calls[0][1].open).toBe(true);
    change.mockClear();
    fireEvent.click(trigger);
    await waitFor(() => expect(queryByRole('note', { hidden: true })).toBeNull());
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).not.toHaveAttribute('aria-details');
    expect(change).toHaveBeenCalledTimes(1);
    expect(change.mock.calls[0][1].open).toBe(false);
  });

  it('preserves consumer trigger relationships and matching custom dialog semantics', () => {
    const { getByRole } = render(
      <InfoButton
        aria-haspopup="dialog"
        aria-details="consumer-details"
        aria-controls="consumer-controls"
        info={{ as: 'dialog', role: 'dialog', children: 'Information' }}
        popover={{ defaultOpen: true }}
      />,
    );
    const trigger = getByRole('button', { name: 'information' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-details', 'consumer-details');
    expect(trigger).toHaveAttribute('aria-controls', 'consumer-controls');
    expect(getByRole('dialog', { hidden: true })).toBeInTheDocument();
  });

  it('preserves consumer relationships when closed', () => {
    const { getByRole } = render(
      <InfoButton aria-details="consumer-details" aria-controls="consumer-controls" info="Information" />,
    );
    const trigger = getByRole('button', { name: 'information' });
    expect(trigger).toHaveAttribute('aria-details', 'consumer-details');
    expect(trigger).toHaveAttribute('aria-controls', 'consumer-controls');
  });

  it('preserves explicit focus-trapping behavior with matching dialog semantics', () => {
    const { getByRole } = render(
      <InfoButton info="Information" popover={{ inertTrapFocus: true, defaultOpen: true }} />,
    );
    expect(getByRole('button', { name: 'information' })).toHaveAttribute('aria-haspopup', 'dialog');
    const dialog = getByRole('dialog', { hidden: true });
    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveFocus();
    expect(getByRole('dialog', { name: 'information', hidden: true })).toBe(dialog);
  });

  it('preserves an explicit name for an opt-in dialog', () => {
    const { getByRole } = render(
      <InfoButton
        info={{ 'aria-label': 'Additional details', children: 'Information' }}
        popover={{ inertTrapFocus: true, defaultOpen: true }}
      />,
    );
    expect(getByRole('dialog', { name: 'Additional details', hidden: true })).toBeInTheDocument();
  });

  it('consumes defaultOpen without passing conflicting state props to Popover', () => {
    const error = jest.spyOn(console, 'error');
    try {
      const { getByRole } = render(<InfoButton info="Information" popover={{ defaultOpen: true }} />);
      expect(getByRole('button')).toHaveAttribute('aria-expanded', 'true');
      expect(getByRole('note', { hidden: true })).toBeInTheDocument();
      expect(error).not.toHaveBeenCalled();
    } finally {
      error.mockRestore();
    }
  });

  describe.each([false, true])('blur dismissal (inertTrapFocus=%s)', inertTrapFocus => {
    const surfaceRole = inertTrapFocus ? 'dialog' : 'note';

    it('notifies a controlled owner that accepts the close request', async () => {
      const onOpenChange = jest.fn();
      const Example = () => {
        const [open, setOpen] = React.useState(true);
        return (
          <>
            <InfoButton
              info="Information"
              popover={{
                inertTrapFocus,
                open,
                onOpenChange: (event, data) => {
                  onOpenChange(event, data);
                  setOpen(data.open);
                },
              }}
            />
            <button>Outside</button>
          </>
        );
      };
      const { getByRole, queryByRole } = render(<Example />);

      fireEvent.blur(getByRole(surfaceRole, { hidden: true }), {
        relatedTarget: getByRole('button', { name: 'Outside' }),
      });

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      const event = onOpenChange.mock.calls[0][0];
      expect(event.type).toBe('blur');
      expect(onOpenChange).toHaveBeenCalledWith(event, { event, type: 'blur', open: false });
      expect(getByRole('button', { name: 'information' })).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(queryByRole(surfaceRole, { hidden: true })).toBeNull());
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });

    it('notifies an uncontrolled observer once, including after the queued native close', async () => {
      const onOpenChange = jest.fn();
      const onNativeClose = jest.fn();
      const { getByRole, queryByRole } = render(
        <InfoButton info="Information" popover={{ inertTrapFocus, defaultOpen: true, onOpenChange }} />,
      );
      const surface = getByRole(surfaceRole, { hidden: true });
      surface.addEventListener(inertTrapFocus ? 'close' : 'toggle', event => {
        if (inertTrapFocus || ('newState' in event && event.newState === 'closed')) {
          onNativeClose();
        }
      });

      fireEvent.blur(surface, { relatedTarget: null });

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'blur', relatedTarget: null }),
        expect.objectContaining({ type: 'blur', open: false }),
      );
      await waitFor(() => expect(queryByRole(surfaceRole, { hidden: true })).toBeNull());
      expect(onNativeClose).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });

    it('respects a controlled owner that refuses the close request', () => {
      const onOpenChange = jest.fn();
      const { getByRole } = render(
        <InfoButton info="Information" popover={{ inertTrapFocus, open: true, onOpenChange }} />,
      );
      const surface = getByRole(surfaceRole, { hidden: true });

      fireEvent.blur(surface, { relatedTarget: null });

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: false }));
      expect(getByRole('button', { name: 'information' })).toHaveAttribute('aria-expanded', 'true');
      expect(getByRole(surfaceRole, { hidden: true })).toBe(surface);
    });

    it('does not dismiss when focus moves between the trigger, surface, and its descendants', () => {
      const onOpenChange = jest.fn();
      const { getByRole } = render(
        <InfoButton
          info={
            <>
              <button>First</button>
              <button>Second</button>
            </>
          }
          popover={{ inertTrapFocus, defaultOpen: true, onOpenChange }}
        />,
      );
      const trigger = getByRole('button', { name: 'information' });
      const surface = getByRole(surfaceRole, { hidden: true });
      const first = getByRole('button', { name: 'First', hidden: true });
      const second = getByRole('button', { name: 'Second', hidden: true });

      fireEvent.blur(surface, { relatedTarget: trigger });
      fireEvent.blur(trigger, { relatedTarget: surface });
      fireEvent.blur(surface, { relatedTarget: first });
      fireEvent.blur(first, { relatedTarget: second });

      expect(onOpenChange).not.toHaveBeenCalled();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('preserves consumer blur handlers and ignores blur when already closed', async () => {
      const onBlur = jest.fn();
      const onBlurCapture = jest.fn();
      const onOpenChange = jest.fn();
      const { getByRole, queryByRole } = render(
        <>
          <InfoButton
            onBlur={onBlur}
            info={{ children: 'Information', onBlurCapture }}
            popover={{ inertTrapFocus, defaultOpen: true, onOpenChange }}
          />
          <button>Outside</button>
        </>,
      );
      const trigger = getByRole('button', { name: 'information' });
      const outside = getByRole('button', { name: 'Outside' });

      fireEvent.blur(getByRole(surfaceRole, { hidden: true }), { relatedTarget: trigger });
      expect(onBlurCapture).toHaveBeenCalledTimes(1);
      expect(onOpenChange).not.toHaveBeenCalled();
      fireEvent.blur(trigger, { relatedTarget: outside });

      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(queryByRole(surfaceRole, { hidden: true })).toBeNull());
      fireEvent.blur(trigger, { relatedTarget: outside });
      expect(onBlur).toHaveBeenCalledTimes(2);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });
  });
});
