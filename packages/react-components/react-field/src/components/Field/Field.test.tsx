import * as React from 'react';
import { render } from '@testing-library/react';
import { Field } from './Field';
import { isConformant } from '../../common/isConformant';

describe('Field', () => {
  isConformant({
    Component: Field,
    displayName: 'Field',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Field>Default Field</Field>);
    expect(result.container).toMatchSnapshot();
  });
});
