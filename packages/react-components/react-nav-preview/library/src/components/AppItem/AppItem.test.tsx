import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AppItem } from './AppItem';

describe('AppItem', () => {
  isConformant({
    Component: AppItem,
    displayName: 'AppItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<AppItem>Default AppItem</AppItem>);
    expect(result.container).toMatchSnapshot();
  });
});
