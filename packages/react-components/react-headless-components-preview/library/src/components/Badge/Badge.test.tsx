import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Badge } from './Badge';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
  });

  it('renders a default state', () => {
    const result = render(<Badge>Default Badge</Badge>);
    expect(result.container).toMatchSnapshot();
  });
});
