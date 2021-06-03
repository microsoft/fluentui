import * as React from 'react';
import { render } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { isConformant } from '../../common/isConformant';

describe('Checkbox', () => {
  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests
});
