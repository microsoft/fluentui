import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarRadio } from './ToolbarRadio';
import { isConformant } from '../../common/isConformant';

describe('ToolbarRadio', () => {
  isConformant({
    Component: ToolbarRadio,
    displayName: 'ToolbarRadio',
    primarySlot: 'input',
    disabledTests: [
      'component-has-static-classname',
      'component-has-static-classname-exported',
      'component-has-static-classnames-object',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ToolbarRadio />);
    expect(result.container).toMatchSnapshot();
  });
});
