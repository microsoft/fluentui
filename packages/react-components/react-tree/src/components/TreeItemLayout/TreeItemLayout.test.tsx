import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItemLayout } from './TreeItemLayout';
import { isConformant } from '../../testing/isConformant';

describe('TreeItemLayout', () => {
  isConformant({
    Component: TreeItemLayout,
    displayName: 'TreeItemLayout',
    requiredProps: {
      expandIcon: 'expandIcon',
      iconAfter: 'iconAfter',
      iconBefore: 'iconBefore',
      aside: 'aside',
      actions: { visible: true, children: 'actions' },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItemLayout>Default TreeItemLayout</TreeItemLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
