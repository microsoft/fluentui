import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroup } from './AvatarGroup';
import { isConformant } from '../../common/isConformant';
import { Avatar } from '../Avatar';

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
        <Avatar name="Katri Athokas" />
        <Avatar name="Elvia Atkins" />
        <Avatar name="Cameron Evans" />
        <Avatar name="Wanda Howard" />
        <Avatar name="Mona Kane" />
        <Avatar name="Allan Munger" />
        <Avatar name="Daisy Phillips" />
        <Avatar name="Robert Tolbert" />
        <Avatar name="Kevin Sturgis" />
      </AvatarGroup>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
