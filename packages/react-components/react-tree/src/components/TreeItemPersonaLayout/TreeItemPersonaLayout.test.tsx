import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItemPersonaLayout } from './TreeItemPersonaLayout';
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
});
