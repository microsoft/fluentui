import * as React from 'react';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem';
import { isConformant } from '../../common/isConformant';
import { render } from '@testing-library/react';

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
    const result = render(
      <AvatarGroup>
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroup>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
