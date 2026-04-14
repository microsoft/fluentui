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
    const result = render(<RadioGroup>Default RadioGroup</RadioGroup>);
    expect(result.container).toMatchSnapshot();
  });
});
