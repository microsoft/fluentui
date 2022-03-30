import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarButton } from './ToolbarButton';
import { isConformant } from '../../common/isConformant';

describe('ToolbarButton', () => {
  isConformant({
    Component: ToolbarButton,
    displayName: 'ToolbarButton',
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarButton>Default ToolbarButton</ToolbarButton>);
    expect(result.container).toMatchSnapshot();
  });
});
