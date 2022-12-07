import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarGroup } from './ToolbarGroup';
import { isConformant } from '../../testing/isConformant';
import { ButtonProps } from '@fluentui/react-button';

describe('ToolbarGroup', () => {
  isConformant({
    Component: ToolbarGroup as React.FunctionComponent<ButtonProps>,
    displayName: 'ToolbarGroup',
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarGroup>Default ToolbarGroup</ToolbarGroup>);
    expect(result.container).toMatchSnapshot();
  });
});
