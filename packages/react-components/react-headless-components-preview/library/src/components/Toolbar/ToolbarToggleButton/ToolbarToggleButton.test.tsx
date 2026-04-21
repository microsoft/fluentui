import * as React from 'react';
import { render } from '@testing-library/react';
import { Toolbar } from '../Toolbar';
import { ToolbarToggleButton } from './ToolbarToggleButton';

describe('ToolbarToggleButton', () => {
  it('renders unchecked by default', () => {
    const { getByRole } = render(
      <Toolbar>
        <ToolbarToggleButton name="format" value="bold">
          Bold
        </ToolbarToggleButton>
      </Toolbar>,
    );

    const button = getByRole('button', { name: 'Bold' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).not.toHaveAttribute('data-checked');
  });

  it('renders checked when value is in toolbar checkedValues', () => {
    const { getByRole } = render(
      <Toolbar defaultCheckedValues={{ format: ['bold'] }}>
        <ToolbarToggleButton name="format" value="bold">
          Bold
        </ToolbarToggleButton>
      </Toolbar>,
    );

    const button = getByRole('button', { name: 'Bold' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-checked');
  });
});
