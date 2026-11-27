import * as React from 'react';
import { render } from '@testing-library/react';
import { Toolbar } from '.';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarDivider } from './ToolbarDivider';
import { ToolbarGroup } from './ToolbarGroup';
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
    expect(getByRole('toolbar')).toHaveAttribute('data-orientation', 'horizontal');

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
    expect(getByRole('toolbar')).not.toHaveAttribute('data-vertical');
    expect(getByRole('toolbar')).toHaveAttribute('data-orientation', 'vertical');

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

  it('emits data-orientation on the toolbar and its children', () => {
    const { getByRole, getByTestId } = render(
      <Toolbar vertical>
        {/* ToolbarButton reads `vertical` from its own prop, not from the toolbar context. */}
        <ToolbarButton data-testid="button" vertical>
          Bold
        </ToolbarButton>
        <ToolbarGroup data-testid="group">
          <ToolbarButton>Italic</ToolbarButton>
        </ToolbarGroup>
        <ToolbarDivider data-testid="divider" />
      </Toolbar>,
    );

    expect(getByRole('toolbar')).toHaveAttribute('data-orientation', 'vertical');
    expect(getByTestId('button')).toHaveAttribute('data-orientation', 'vertical');
    expect(getByTestId('group')).toHaveAttribute('data-orientation', 'vertical');
    // The divider orientation is inverted relative to the toolbar.
    expect(getByTestId('divider')).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('emits horizontal data-orientation on the children of a horizontal toolbar', () => {
    const { getByTestId } = render(
      <Toolbar>
        <ToolbarButton data-testid="button">Bold</ToolbarButton>
        <ToolbarGroup data-testid="group">
          <ToolbarButton>Italic</ToolbarButton>
        </ToolbarGroup>
        <ToolbarDivider data-testid="divider" />
      </Toolbar>,
    );

    expect(getByTestId('button')).toHaveAttribute('data-orientation', 'horizontal');
    expect(getByTestId('group')).toHaveAttribute('data-orientation', 'horizontal');
    expect(getByTestId('divider')).toHaveAttribute('data-orientation', 'vertical');
  });
});
