import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  isConformant({
    Component: RadioGroup,
    displayName: 'RadioGroup',
  });

  it('renders a default state', () => {
    const { getByRole, getByText } = render(<RadioGroup>Default RadioGroup</RadioGroup>);
    const radiogroup = getByRole('radiogroup');

    expect(radiogroup).toBeInTheDocument();
    expect(getByText('Default RadioGroup')).toBeInTheDocument();
  });
});
