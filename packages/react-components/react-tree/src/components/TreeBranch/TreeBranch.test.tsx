import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeBranch } from './TreeBranch';
import { isConformant } from '../../testing/isConformant';

describe('TreeBranch', () => {
  isConformant({
    Component: TreeBranch,
    displayName: 'TreeBranch',
  });

  it('renders a default state', () => {
    const result = render(<TreeBranch>Default TreeBranch</TreeBranch>);
    expect(result.container).toMatchSnapshot();
  });
});
