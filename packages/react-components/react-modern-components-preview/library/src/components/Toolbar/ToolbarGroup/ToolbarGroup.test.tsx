import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Toolbar } from '../Toolbar';
import { ToolbarGroup, toolbarGroupClassNames } from './';

describe('ToolbarGroup', () => {
  isConformant({
    Component: ToolbarGroup,
    displayName: 'ToolbarGroup',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
  });

  it('renders the stable class and inherits vertical orientation', () => {
    const { getByTestId } = render(
      <Toolbar vertical>
        <ToolbarGroup className="consumer-class" data-testid="group" />
      </Toolbar>,
    );
    const group = getByTestId('group');

    expect(group).toHaveAttribute('data-vertical');
    expect(group).toHaveClass(toolbarGroupClassNames.root, 'consumer-class');
  });
});
