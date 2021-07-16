import * as React from 'react';
import { render } from '@testing-library/react';
import { Title3 } from './Title3';
import { isConformant } from '../../common/isConformant';

describe('Title3', () => {
  isConformant({
    Component: Title3,
    displayName: 'Title3',
  });

  it('renders a default state', () => {
    const result = render(<Title3>Default Title3</Title3>);
    expect(result.container).toMatchSnapshot();
  });
});
