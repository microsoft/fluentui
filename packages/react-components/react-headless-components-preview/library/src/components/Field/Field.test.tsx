import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Field } from './Field';

describe('Field', () => {
  isConformant({
    Component: Field,
    displayName: 'Field',
  });

  it('renders a default state', () => {
    const result = render(<Field>Default Field</Field>);
    expect(result.container).toMatchSnapshot();
  });
});
