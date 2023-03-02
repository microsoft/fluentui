import * as React from 'react';
import { render } from '@testing-library/react';
import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';

describe('Tag', () => {
  isConformant({
    Component: Tag,
    displayName: 'Tag',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Tag>Default Tag</Tag>);
    expect(result.container).toMatchSnapshot();
  });
});
