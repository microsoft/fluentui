import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItemPersonaLayout } from './TreeItemPersonaLayout';
import { isConformant } from '../../testing/isConformant';
import { TreeItemSlotsProvider } from '../../contexts/treeItemSlotsContext';

const Wrap: React.FC = props => (
  <TreeItemSlotsProvider value={{ actions: { visible: true, children: '' }, aside: '', expandIcon: '' }}>
    {props.children}
  </TreeItemSlotsProvider>
);

describe('TreeItemPersonaLayout', () => {
  isConformant({
    Component: TreeItemPersonaLayout,
    renderOptions: { wrapper: Wrap },
    displayName: 'TreeItemPersonaLayout',
    requiredProps: {
      description: 'description',
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItemPersonaLayout>Default TreeItemPersonaLayout</TreeItemPersonaLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
