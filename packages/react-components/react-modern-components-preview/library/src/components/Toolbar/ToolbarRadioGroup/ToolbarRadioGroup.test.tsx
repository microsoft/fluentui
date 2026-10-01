import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Toolbar } from '../Toolbar';
import { ToolbarRadioGroup, toolbarRadioGroupClassNames } from './';

describe('ToolbarRadioGroup', () => {
  isConformant({
    Component: ToolbarRadioGroup,
    displayName: 'ToolbarRadioGroup',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: { 'aria-label': 'Actions' },
  });

  it('renders a styled radio group and inherits vertical orientation', () => {
    const { getByRole } = render(
      <Toolbar vertical>
        <ToolbarRadioGroup className="consumer-class" />
      </Toolbar>,
    );
    const group = getByRole('radiogroup');

    expect(group).toHaveAttribute('data-vertical');
    expect(group).toHaveClass(toolbarRadioGroupClassNames.root, 'consumer-class');
  });
});
