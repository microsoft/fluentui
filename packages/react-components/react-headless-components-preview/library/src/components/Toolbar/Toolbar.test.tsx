import * as React from 'react';
import { render } from '@testing-library/react';
import { Toolbar } from '.';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarToggleButton } from './ToolbarToggleButton';

describe('Toolbar', () => {
  it('renders unchecked by default', () => {
    const { getByRole, getAllByRole } = render(
      <Toolbar>
        <ToolbarButton name="format" value="bold">
          Bold
        </ToolbarButton>
        <ToolbarToggleButton name="format" value="italic">
          Italic
        </ToolbarToggleButton>
      </Toolbar>,
    );

    expect(getByRole('toolbar')).toHaveAttribute('focusgroup', 'toolbar inline wrap');
    expect(getByRole('toolbar')).not.toHaveAttribute('data-vertical');

    expect(getAllByRole('button')).toHaveLength(2);
  });

  it('renders checked when value is in toolbar checkedValues', () => {
    const { getByRole } = render(
      <Toolbar defaultCheckedValues={{ format: ['bold'] }} vertical>
        <ToolbarToggleButton name="format" value="bold">
          Bold
        </ToolbarToggleButton>
        <ToolbarToggleButton name="format" value="italic" disabled>
          Italic
        </ToolbarToggleButton>
        <ToolbarToggleButton name="format" value="underline" icon="U" aria-label="Underline" />
      </Toolbar>,
    );

    expect(getByRole('toolbar')).toHaveAttribute('focusgroup', 'toolbar block wrap');
    expect(getByRole('toolbar')).toHaveAttribute('data-vertical');

    const button1 = getByRole('button', { name: 'Bold' });
    expect(button1).toHaveAttribute('aria-pressed', 'true');
    expect(button1).toHaveAttribute('data-checked');

    const button2 = getByRole('button', { name: 'Italic' });
    expect(button2).toHaveAttribute('aria-pressed', 'false');
    expect(button2).not.toHaveAttribute('data-checked');
    expect(button2).toBeDisabled();
    expect(button2).toHaveAttribute('data-disabled');

    const button3 = getByRole('button', { name: 'Underline' });
    expect(button3).toHaveAttribute('aria-pressed', 'false');
    expect(button3).not.toHaveAttribute('data-checked');
    expect(button3).not.toBeDisabled();
    expect(button3).toHaveAttribute('data-icon-only');
  });
});
