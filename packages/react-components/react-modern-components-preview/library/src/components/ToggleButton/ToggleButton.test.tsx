import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  isConformant({
    Component: ToggleButton,
    displayName: 'ToggleButton',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file'],
    requiredProps: { children: 'Toggle button' },
  });

  it('renders a default state', () => {
    const result = render(<ToggleButton>Default ToggleButton</ToggleButton>);
    expect(result.container).toMatchSnapshot();
  });
});
