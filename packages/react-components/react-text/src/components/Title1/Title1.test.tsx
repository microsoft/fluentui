import * as React from 'react';
import { render } from '@testing-library/react';
import { Title1 } from './Title1';
import { isConformant } from '../../common/isConformant';

describe('Title1', () => {
  isConformant({
    Component: Title1,
    displayName: 'Title1',
  });

  it('renders a default state', () => {
    const result = render(<Title1>Default Title1</Title1>);
    expect(result.container).toMatchSnapshot();
  });
});
