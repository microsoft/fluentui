// import * as React from 'react';
// import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Rating } from './Rating';

describe('Rating', () => {
  isConformant({
    Component: Rating,
    displayName: 'Rating',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests
});
