import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Toolbar } from '../Toolbar';
import { ToolbarButton, toolbarButtonClassNames } from './';

describe('ToolbarButton', () => {
  isConformant({
    Component: ToolbarButton,
    displayName: 'ToolbarButton',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { children: 'Action' },
  });

  it('inherits toolbar size and renders stable button styling', () => {
    const { getByRole } = render(
      <Toolbar size="large">
        <ToolbarButton className="consumer-class">Action</ToolbarButton>
      </Toolbar>,
    );
    const button = getByRole('button', { name: 'Action' });

    expect(button).toHaveAttribute('data-appearance', 'subtle');
    expect(button).toHaveAttribute('data-size', 'large');
    expect(button).toHaveAttribute('data-shape', 'rounded');
    expect(button).toHaveClass(toolbarButtonClassNames.root, 'consumer-class');
  });
});
