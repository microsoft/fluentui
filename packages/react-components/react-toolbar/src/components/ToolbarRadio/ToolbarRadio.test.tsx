import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarRadio } from './ToolbarRadio';
import { isConformant } from '../../common/isConformant';
import { ToggleButtonProps } from '@fluentui/react-button';

describe('ToolbarRadio', () => {
  isConformant({
    Component: ToolbarRadio as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToolbarRadio',
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <ToolbarRadio name="name" value="value">
        Default ToolbarRadio
      </ToolbarRadio>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
