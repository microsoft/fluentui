import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogHeader } from './DialogHeader';
import { isConformant } from '../../common/isConformant';

describe('DialogHeader', () => {
  isConformant({
    Component: DialogHeader,
    displayName: 'DialogHeader',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DialogHeader>Default DialogHeader</DialogHeader>);
    expect(result.container).toMatchSnapshot();
  });
});
