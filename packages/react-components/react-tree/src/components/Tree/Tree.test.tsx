import * as React from 'react';
import { render } from '@testing-library/react';
import { Tree } from './Tree';
import { isConformant } from '../../testing/isConformant';

describe('Tree', () => {
  isConformant({
    Component: Tree,
    displayName: 'Tree',
  });

  it('renders a default state', () => {
    const result = render(<Tree>Default Tree</Tree>);
    expect(result.container).toMatchSnapshot();
  });
});
