import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavDrawer } from './NavDrawer';

describe('NavDrawer', () => {
  isConformant({
    Component: NavDrawer,
    displayName: 'NavDrawer',
  });
});
