import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Toolbar } from '../Toolbar';
import { ToolbarRadioButton, toolbarRadioButtonClassNames } from './';

describe('ToolbarRadioButton', () => {
  isConformant({
    Component: ToolbarRadioButton,
    displayName: 'ToolbarRadioButton',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Action', name: 'action', value: 'action' },
  });

  it('renders visual defaults and selects through toolbar context', () => {
    const { getByRole } = render(
      <Toolbar size="large">
        <ToolbarRadioButton name="alignment" value="start">
          Start
        </ToolbarRadioButton>
      </Toolbar>,
    );
    const button = getByRole('radio', { name: 'Start' });

    expect(button).toHaveAttribute('data-appearance', 'subtle');
    expect(button).toHaveAttribute('data-size', 'large');
    expect(button).toHaveClass(toolbarRadioButtonClassNames.root);

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-checked', 'true');
  });
});
