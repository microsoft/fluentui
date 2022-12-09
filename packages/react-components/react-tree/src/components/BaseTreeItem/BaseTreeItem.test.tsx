import * as React from 'react';
import { render } from '@testing-library/react';
import { BaseTreeItem } from './BaseTreeItem';
import { isConformant } from '../../testing/isConformant';
import { BaseTreeItemProps } from './index';
import { resetIdsForTests } from '@fluentui/react-utilities';

describe('BaseTreeItem', () => {
  beforeEach(() => {
    resetIdsForTests();
  });
  isConformant<BaseTreeItemProps>({
    Component: BaseTreeItem,
    displayName: 'BaseTreeItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BaseTreeItem>Default BaseTreeItem</BaseTreeItem>);
    expect(result.container).toMatchSnapshot();
  });
});
