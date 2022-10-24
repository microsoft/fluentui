import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarRadioButton } from './ToolbarRadioButton';
import { isConformant } from '../../common/isConformant';
import { ToggleButtonProps } from '@fluentui/react-button';

describe('ToolbarRadioButton', () => {
  isConformant({
    Component: ToolbarRadioButton as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToolbarRadioButton',
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <ToolbarRadioButton name="name" value="value">
        Default ToolbarRadio
      </ToolbarRadioButton>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
