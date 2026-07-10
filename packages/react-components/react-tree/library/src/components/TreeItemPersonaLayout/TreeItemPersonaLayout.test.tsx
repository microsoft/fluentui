import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { TreeItemPersonaLayout } from './TreeItemPersonaLayout';
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

describe('TreeItemPersonaLayout', () => {
  isConformant({
    Component: TreeItemPersonaLayout,
    renderOptions: { wrapper: Wrapper },
    displayName: 'TreeItemPersonaLayout',
    disabledTests: [
      // This is disabled as aside and actions cannot be visible at the same time
      'component-has-static-classnames',
      'component-has-static-classnames-object',
    ],
    requiredProps: {
      description: 'description',
      expandIcon: 'expandIcon',
      actions: 'actions',
      aside: 'aside',
      selector: {},
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItemPersonaLayout>Default TreeItemPersonaLayout</TreeItemPersonaLayout>);
    expect(result.container).toMatchSnapshot();
  });

  // Regression test: the persona layout shares the selection control via TreeItemLayout, so it
  // must also expose a named selector. The content id is carried onto its `main` slot so the
  // selector's `aria-labelledby` resolves here too. See MAS 4.3.1.
  it('exposes the selection control with an accessible name', () => {
    render(
      <Tree aria-label="Tree" selectionMode="multiselect">
        <TreeItem itemType="leaf" value="item1">
          <TreeItemPersonaLayout>Jane Doe</TreeItemPersonaLayout>
        </TreeItem>
      </Tree>,
    );

    expect(screen.getByRole('checkbox', { name: 'Jane Doe' })).toBeTruthy();
  });
});
