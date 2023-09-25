import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Rating } from './Rating';

describe('Rating', () => {
  isConformant({
    Component: Rating,
    displayName: 'Rating',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Rating>Default Rating</Rating>);
    expect(result.container).toMatchSnapshot();
  });
});
