import * as React from 'react';
import { render } from '@testing-library/react';
import { TagButton } from './TagButton';
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

describe('TagButton', () => {
  isConformant({
    Component: TagButton,
    displayName: 'TagButton',
    requiredProps,
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagButton {...requiredProps}>Default TagButton</TagButton>);
    expect(result.container).toMatchSnapshot();
  });
});
