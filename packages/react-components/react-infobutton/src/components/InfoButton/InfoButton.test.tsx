import * as React from 'react';
import { render } from '@testing-library/react';
import { InfoButton } from './InfoButton';
import { isConformant } from '../../common/isConformant';

describe('InfoButton', () => {
  isConformant({
    Component: InfoButton,
    displayName: 'InfoButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<InfoButton>Default InfoButton</InfoButton>);
    expect(result.container).toMatchSnapshot();
  });
});
