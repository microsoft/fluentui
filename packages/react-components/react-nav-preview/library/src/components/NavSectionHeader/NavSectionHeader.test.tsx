import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { NavSectionHeader } from './NavSectionHeader';
import { NavSectionHeaderProps } from './NavSectionHeader.types';

describe('NavSectionHeader', () => {
  isConformant({
    Component: NavSectionHeader as React.FunctionComponent<NavSectionHeaderProps>,
    displayName: 'NavSectionHeader',
  });
});
