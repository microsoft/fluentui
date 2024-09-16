import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarButton } from './ToolbarButton';
import { isConformant } from '../../testing/isConformant';
import { ButtonProps } from '@fluentui/react-button';

describe('ToolbarButton', () => {
  isConformant({
    Component: ToolbarButton as React.FunctionComponent<ButtonProps>,
    displayName: 'ToolbarButton',
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarButton>Default ToolbarButton</ToolbarButton>);
    expect(result.container).toMatchSnapshot();
  });
});
