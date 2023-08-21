import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItemLayout } from './TreeItemLayout';
import { isConformant } from '../../testing/isConformant';
import { TreeItemProvider } from '../../contexts';

const Wrapper: React.FC = ({ children }) => (
  <TreeItemProvider
    value={{
      value: '',
      selectionRef: React.createRef(),
      layoutRef: React.createRef(),
      subtreeRef: React.createRef(),
      actionsRef: React.createRef(),
      expandIconRef: React.createRef(),
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
    requiredProps: {
      iconAfter: 'iconAfter',
      iconBefore: 'iconBefore',
      expandIcon: 'expandIcon',
      actions: 'actions',
      aside: 'aside',
      selector: {},
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItemLayout>Default TreeItemLayout</TreeItemLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
