import * as React from 'react';
import { render } from '@testing-library/react';
import { Toolbar } from '../Toolbar';
import { ToolbarToggleButton } from './ToolbarToggleButton';

describe('ToolbarToggleButton', () => {
  it('renders unchecked by default', () => {
    const { getAllByRole } = render(
      <Toolbar>
        <ToolbarToggleButton name="format" value="bold">
          Bold
        </ToolbarToggleButton>
        <ToolbarToggleButton name="format" value="italic">
          Italic
        </ToolbarToggleButton>
      </Toolbar>,
    );

    getAllByRole('button').forEach(button => {
      expect(button).toHaveAttribute('aria-pressed', 'false');
      expect(button).not.toHaveAttribute('data-checked');
    });
  });

  it('renders checked when value is in toolbar checkedValues', () => {
    const { getByRole } = render(
      <Toolbar defaultCheckedValues={{ format: ['bold'] }}>
        <ToolbarToggleButton name="format" value="bold">
          Bold
        </ToolbarToggleButton>
        <ToolbarToggleButton name="format" value="italic" disabled>
          Italic
        </ToolbarToggleButton>
        <ToolbarToggleButton name="format" value="underline" icon="U" aria-label="Underline" />
      </Toolbar>,
    );

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
