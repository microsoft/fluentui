import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroupOverflow } from './AvatarGroupOverflow';
import { isConformant } from '../../common/isConformant';

describe('AvatarGroupOverflow', () => {
  isConformant({
    Component: AvatarGroupOverflow,
    displayName: 'AvatarGroupOverflow',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<AvatarGroupOverflow>Default AvatarGroupOverflow</AvatarGroupOverflow>);
    expect(result.container).toMatchSnapshot();
  });
});
