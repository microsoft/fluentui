import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TooltipV2 } from './TooltipV2';

describe('TooltipV2', () => {
  isConformant({
    Component: TooltipV2,
    displayName: 'TooltipV2',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TooltipV2>Default TooltipV2</TooltipV2>);
    expect(result.container).toMatchSnapshot();
  });
});
