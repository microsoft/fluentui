import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { TreeItemLayout } from './TreeItemLayout';
import { isConformant } from '../../testing/isConformant';
import { TreeItemProvider } from '../../contexts';
import { Tree } from '../../Tree';
import { TreeItem } from '../TreeItem/TreeItem';

const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <TreeItemProvider
    value={{
      value: '',
      selectionRef: React.createRef(),
      layoutRef: React.createRef(),
      subtreeRef: React.createRef(),
      actionsRef: React.createRef(),
      expandIconRef: React.createRef(),
      treeItemRef: React.createRef(),
      isActionsVisible: true,
      isAsideVisible: true,
      itemType: 'leaf',
      open: false,
      checked: false,
    }}
  >
    {children}
  </TreeItemProvider>
);

describe('TreeItemLayout', () => {
  isConformant({
    Component: TreeItemLayout,
    renderOptions: { wrapper: Wrapper },
    displayName: 'TreeItemLayout',
    disabledTests: [
      // This is disabled as aside and actions cannot be visible at the same time
      'component-has-static-classnames',
      'component-has-static-classnames-object',
    ],
    requiredProps: {
      iconAfter: 'iconAfter',
      iconBefore: 'iconBefore',
      expandIcon: 'expandIcon',
      actions: 'actions',
      aside: 'aside',
      selector: {},
    },
  });

  it('renders a default state', () => {
    const result = render(<TreeItemLayout>Default TreeItemLayout</TreeItemLayout>);
    expect(result.container).toMatchSnapshot();
  });

  // Regression tests for the accessibility fix that exposes the selection control to assistive
  // technologies (e.g. Voice Access). The selector must not be `aria-hidden` (so it is found by
  // role) and must have an accessible name derived from the item content. See MAS 4.3.1.
  it('exposes the multiselect selection control with an accessible name', () => {
    render(
      <Tree aria-label="Tree" selectionMode="multiselect">
        <TreeItem itemType="leaf" value="item1">
          <TreeItemLayout>Item 1</TreeItemLayout>
        </TreeItem>
      </Tree>,
    );

    expect(screen.getByRole('checkbox', { name: 'Item 1' })).toBeTruthy();
  });

  it('exposes the single-selection control with an accessible name', () => {
    render(
      <Tree aria-label="Tree" selectionMode="single">
        <TreeItem itemType="leaf" value="item1">
          <TreeItemLayout>Item 1</TreeItemLayout>
        </TreeItem>
      </Tree>,
    );

    expect(screen.getByRole('radio', { name: 'Item 1' })).toBeTruthy();
  });
});
