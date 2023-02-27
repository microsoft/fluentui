import * as React from 'react';
import { render } from '@testing-library/react';
import { TagButton } from './TagButton';
import { isConformant } from '../../testing/isConformant';

describe('TagButton', () => {
  isConformant({
    Component: TagButton,
    displayName: 'TagButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagButton>Default TagButton</TagButton>);
    expect(result.container).toMatchSnapshot();
  });
});
