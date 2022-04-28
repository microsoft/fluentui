import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroup } from './AvatarGroup';
import { isConformant } from '../../common/isConformant';

describe('AvatarGroup', () => {
  // TODO: Remove component-has-static-classnames-object from disabled tests.
  isConformant({
    Component: AvatarGroup,
    displayName: 'AvatarGroup',
    disabledTests: [
      'component-has-static-classname',
      'component-has-static-classname-exported',
      'component-has-static-classnames-object',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<AvatarGroup>Default AvatarGroup</AvatarGroup>);
    expect(result.container).toMatchSnapshot();
  });
});
