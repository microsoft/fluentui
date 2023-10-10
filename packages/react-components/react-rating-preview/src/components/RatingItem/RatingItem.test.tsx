import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RatingItem } from './RatingItem';

describe('RatingItem', () => {
  isConformant({
    Component: RatingItem,
    displayName: 'RatingItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<RatingItem>Default RatingItem</RatingItem>);
    expect(result.container).toMatchSnapshot();
  });
});
