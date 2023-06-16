import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItemAside } from './TreeItemAside';
import { isConformant } from '../../testing/isConformant';

describe('TreeItemAside', () => {
  isConformant({
    Component: TreeItemAside,
    displayName: 'TreeItemAside',
    requiredProps: {
      visible: true,
    },
  });

  it('renders a default state', () => {
    const result = render(<TreeItemAside>Default TreeItemAside</TreeItemAside>);
    expect(result.container).toMatchSnapshot();
  });
});
