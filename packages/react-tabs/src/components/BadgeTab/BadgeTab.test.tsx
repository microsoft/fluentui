import * as React from 'react';
import { render } from '@testing-library/react';
import { BadgeTab } from './BadgeTab';
import { isConformant } from '../../common/isConformant';

describe('BadgeTab', () => {
  isConformant({
    Component: BadgeTab,
    displayName: 'BadgeTab',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BadgeTab>Default BadgeTab</BadgeTab>);
    expect(result.container).toMatchSnapshot();
  });
});
