import * as React from 'react';
import { render } from '@testing-library/react';
import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';

const requiredProps = {
  avatar: {
    name: 'Katri Athokas',
  },
  icon: 'i',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
  dismissable: true,
};

describe('Tag', () => {
  isConformant({
    Component: Tag,
    displayName: 'Tag',
    requiredProps,
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Tag {...requiredProps}>Default Tag</Tag>);
    expect(result.container).toMatchSnapshot();
  });
});
