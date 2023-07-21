import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItemLayout } from './TreeItemLayout';
import { isConformant } from '../../testing/isConformant';
import { TreeItemSlotsProvider } from '../../contexts/treeItemSlotsContext';

const Wrap: React.FC = props => (
  <TreeItemSlotsProvider value={{ actions: { visible: true, children: '' }, aside: '', expandIcon: '', selector: {} }}>
    {props.children}
  </TreeItemSlotsProvider>
);

describe('TreeItemLayout', () => {
  isConformant({
    Component: TreeItemLayout,
    renderOptions: { wrapper: Wrap },
    displayName: 'TreeItemLayout',
    requiredProps: {
      iconAfter: 'iconAfter',
      iconBefore: 'iconBefore',
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItemLayout>Default TreeItemLayout</TreeItemLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
