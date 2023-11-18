import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarToggleButton } from './ToolbarToggleButton';
import { isConformant } from '../../testing/isConformant';
import { ToggleButtonProps } from '@fluentui/react-button';

describe('ToolbarToggleButton', () => {
  isConformant({
    Component: ToolbarToggleButton as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToolbarToggleButton',
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <ToolbarToggleButton name="name" value="value">
        Default ToolbarToggleButton
      </ToolbarToggleButton>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
