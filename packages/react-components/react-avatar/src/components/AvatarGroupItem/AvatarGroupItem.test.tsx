import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroupItem } from './AvatarGroupItem';
import { isConformant } from '../../common/isConformant';

describe('AvatarGroupItem', () => {
  isConformant({
    Component: AvatarGroupItem,
    displayName: 'AvatarGroupItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<AvatarGroupItem>Default AvatarGroupItem</AvatarGroupItem>);
    expect(result.container).toMatchSnapshot();
  });
});
