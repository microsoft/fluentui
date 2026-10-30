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
});
