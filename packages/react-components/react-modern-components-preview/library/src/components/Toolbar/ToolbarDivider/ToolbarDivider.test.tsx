import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Toolbar } from '../Toolbar';
import { ToolbarDivider, toolbarDividerClassNames } from './';

describe('ToolbarDivider', () => {
  isConformant({
    Component: ToolbarDivider,
    displayName: 'ToolbarDivider',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
  });

  it('renders stable divider styling with visual defaults', () => {
    const { getByRole } = render(
      <Toolbar>
        <ToolbarDivider className="consumer-class" />
      </Toolbar>,
    );
    const divider = getByRole('separator');

    expect(divider).toHaveAttribute('data-align-content', 'center');
    expect(divider).toHaveAttribute('data-appearance', 'default');
    expect(divider).toHaveClass(toolbarDividerClassNames.root, 'consumer-class');
  });
});
