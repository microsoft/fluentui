import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { NavSubItem } from './NavSubItem';
import type { NavSubItemProps } from './NavSubItem.types';

describe('NavSubItem', () => {
  isConformant({
    Component: NavSubItem as React.FunctionComponent<NavSubItemProps>,
    displayName: 'NavSubItem',
  });
});
