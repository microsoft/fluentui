import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Toolbar } from '../Toolbar';
import { ToolbarToggleButton, toolbarToggleButtonClassNames } from './';

describe('ToolbarToggleButton', () => {
  isConformant({
    Component: ToolbarToggleButton,
    displayName: 'ToolbarToggleButton',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Action', name: 'action', value: 'action' },
  });

  it('renders visual defaults and toggles through toolbar context', () => {
    const { getByRole } = render(
      <Toolbar size="small">
        <ToolbarToggleButton name="format" value="bold">
          Bold
        </ToolbarToggleButton>
      </Toolbar>,
    );
    const button = getByRole('button', { name: 'Bold' });

    expect(button).toHaveAttribute('data-appearance', 'subtle');
    expect(button).toHaveAttribute('data-size', 'small');
    expect(button).toHaveClass(toolbarToggleButtonClassNames.root);

    fireEvent.click(button);
    expect(button).toHaveAttribute('data-checked');
  });
});
