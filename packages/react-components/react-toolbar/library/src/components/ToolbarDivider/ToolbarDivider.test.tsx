import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarDivider } from './ToolbarDivider';
import { isConformant } from '../../testing/isConformant';

describe('ToolbarDivider', () => {
  isConformant({
    Component: ToolbarDivider,
    displayName: 'ToolbarDivider',
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarDivider>Default ToolbarDivider</ToolbarDivider>);
    expect(result.container).toMatchSnapshot();
  });
});
