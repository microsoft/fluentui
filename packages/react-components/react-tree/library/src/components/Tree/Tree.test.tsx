import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Tree } from './Tree';
import { TreeItem } from '../TreeItem/TreeItem';

describe('Tree', () => {
  isConformant({
    Component: Tree,
    displayName: 'Tree',
    disabledTests: ['consistent-callback-args'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Tree>Default Tree</Tree>);
    expect(result.container).toMatchSnapshot();
  });
  it('should sync open state between Tree and TreeItem onOpenChange callback', () => {
    const handleOpenChange = jest.fn();

    const result = render(
      <Tree aria-label="Default" onOpenChange={handleOpenChange}>
        <TreeItem data-testid="tree-item" itemType="branch" open={true} onOpenChange={handleOpenChange}>
          parent
          <Tree>
            <TreeItem itemType="leaf">leaf</TreeItem>
          </Tree>
        </TreeItem>
      </Tree>,
    );

    result.getByTestId('tree-item').click();

    expect(handleOpenChange).toHaveBeenNthCalledWith(1, expect.any(Object), expect.objectContaining({ open: false }));

    expect(handleOpenChange).toHaveBeenNthCalledWith(2, expect.any(Object), expect.objectContaining({ open: false }));
  });
});
