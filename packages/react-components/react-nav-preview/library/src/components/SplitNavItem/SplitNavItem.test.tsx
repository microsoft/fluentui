import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SplitNavItem } from './SplitNavItem';

describe('SplitNavItem', () => {
  isConformant({
    Component: SplitNavItem,
    displayName: 'SplitNavItem',
  });
});
