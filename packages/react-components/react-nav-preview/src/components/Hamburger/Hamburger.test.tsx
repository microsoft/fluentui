import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { Hamburger } from './Hamburger';
import { HamburgerProps } from './Hamburger.types';

describe('Hamburger', () => {
  isConformant({
    Component: Hamburger as React.FunctionComponent<HamburgerProps>,
    displayName: 'Hamburger',
  });
});
