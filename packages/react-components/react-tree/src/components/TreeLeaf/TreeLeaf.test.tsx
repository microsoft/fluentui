import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeLeaf } from './TreeLeaf';
import { isConformant } from '../../testing/isConformant';

describe('TreeLeaf', () => {
  isConformant({
    Component: TreeLeaf,
    displayName: 'TreeLeaf',
  });

  it('renders a default state', () => {
    const result = render(<TreeLeaf>Default TreeLeaf</TreeLeaf>);
    expect(result.container).toMatchSnapshot();
  });
});
