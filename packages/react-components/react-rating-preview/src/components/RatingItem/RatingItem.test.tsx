import * as React from 'react';
import { render } from '@testing-library/react';
import { RatingItem } from './RatingItem';

describe('RatingItem', () => {
  it('renders a default state', () => {
    const result = render(<RatingItem>Default RatingItem</RatingItem>);
    expect(result.container).toMatchSnapshot();
  });
});
