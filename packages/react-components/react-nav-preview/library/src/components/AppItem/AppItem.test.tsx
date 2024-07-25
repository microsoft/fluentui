import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { AppItem } from './AppItem';

describe('AppItem', () => {
  isConformant({
    Component: AppItem,
    displayName: 'AppItem',
  });
});
