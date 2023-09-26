import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Messagebar } from './Messagebar';

describe('Messagebar', () => {
  isConformant({
    Component: Messagebar,
    displayName: 'Messagebar',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Messagebar>Default Messagebar</Messagebar>);
    expect(result.container).toMatchSnapshot();
  });
});
