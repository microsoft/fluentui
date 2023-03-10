import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogContent } from './DialogContent';
import { isConformant } from '../../testing/isConformant';

describe('DialogContent', () => {
  isConformant({
    Component: DialogContent,
    displayName: 'DialogContent',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DialogContent>Default DialogContent</DialogContent>);
    expect(result.container).toMatchSnapshot();
  });
});
