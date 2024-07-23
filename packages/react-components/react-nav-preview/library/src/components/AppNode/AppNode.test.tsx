import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AppNode } from './AppNode';

describe('AppNode', () => {
  isConformant({
    Component: AppNode,
    displayName: 'AppNode',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<AppNode>Default AppNode</AppNode>);
    expect(result.container).toMatchSnapshot();
  });
});
