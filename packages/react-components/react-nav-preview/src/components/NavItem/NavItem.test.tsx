import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  isConformant({
    Component: NavItem,
    displayName: 'NavItem',
  });
});
