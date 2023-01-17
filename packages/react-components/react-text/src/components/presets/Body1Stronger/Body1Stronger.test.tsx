import * as React from 'react';
import { render } from '@testing-library/react';
import { Body1Stronger } from './Body1Stronger';
import { isConformant } from '../../../testing/isConformant';

describe('Body1Stronger', () => {
  isConformant({
    Component: Body1Stronger,
    displayName: 'Body1Stronger',
  });

  it('renders a default state', () => {
    const result = render(<Body1Stronger>Default Body1Stronger</Body1Stronger>);
    expect(result.container).toMatchSnapshot();
  });
});
