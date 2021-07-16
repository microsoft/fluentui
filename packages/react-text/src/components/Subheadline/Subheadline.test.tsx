import * as React from 'react';
import { render } from '@testing-library/react';
import { Subheadline } from './Subheadline';
import { isConformant } from '../../common/isConformant';

describe('Subheadline', () => {
  isConformant({
    Component: Subheadline,
    displayName: 'Subheadline',
  });

  it('renders a default state', () => {
    const result = render(<Subheadline>Default Subheadline</Subheadline>);
    expect(result.container).toMatchSnapshot();
  });
});
