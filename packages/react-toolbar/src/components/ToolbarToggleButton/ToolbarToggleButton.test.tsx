import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarToggleButton } from './ToolbarToggleButton';
import { isConformant } from '../../common/isConformant';

describe('ToolbarToggleButton', () => {
  isConformant({
    Component: ToolbarToggleButton,
    displayName: 'ToolbarToggleButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarToggleButton>Default ToolbarToggleButton</ToolbarToggleButton>);
    expect(result.container).toMatchSnapshot();
  });
});
