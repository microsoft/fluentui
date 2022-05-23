import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeDesigner } from './ThemeDesigner';

describe('ThemeDesigner', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ThemeDesigner>Default ThemeDesigner</ThemeDesigner>);
    expect(result.container).toMatchSnapshot();
  });
});
