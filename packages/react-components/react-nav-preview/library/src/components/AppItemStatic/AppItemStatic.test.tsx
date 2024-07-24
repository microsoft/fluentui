import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AppItemStatic } from './AppItemStatic';

describe('AppItemStatic', () => {
  isConformant({
    Component: AppItemStatic,
    displayName: 'AppItemStatic',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<AppItemStatic>Default AppItemStatic</AppItemStatic>);
    expect(result.container).toMatchSnapshot();
  });
});
