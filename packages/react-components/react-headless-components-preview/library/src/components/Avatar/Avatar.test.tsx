import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  isConformant({
    Component: Avatar,
    displayName: 'Avatar',
  });

  it('renders a default state', () => {
    const result = render(<Avatar>Default Avatar</Avatar>);
    expect(result.container).toMatchSnapshot();
  });
});
