import * as React from 'react';
import { render } from '@testing-library/react';
import { ComboButton } from './ComboButton';
import { isConformant } from '../../common/isConformant';

describe('ComboButton', () => {
  isConformant({
    Component: ComboButton,
    displayName: 'ComboButton',
    primarySlot: 'content',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ComboButton>Default ComboButton</ComboButton>);
    expect(result.container).toMatchSnapshot();
  });
});
