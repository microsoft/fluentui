import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarRadioGroup } from './ToolbarRadioGroup';
import { isConformant } from '../../common/isConformant';

describe('ToolbarRadioGroup', () => {
  isConformant({
    Component: ToolbarRadioGroup,
    displayName: 'ToolbarRadioGroup',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarRadioGroup>Default ToolbarRadioGroup</ToolbarRadioGroup>);
    expect(result.container).toMatchSnapshot();
  });
});
