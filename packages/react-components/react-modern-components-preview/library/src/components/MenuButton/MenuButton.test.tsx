import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MenuButton } from './MenuButton';

describe('MenuButton', () => {
  isConformant({
    Component: MenuButton,
    displayName: 'MenuButton',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file'],
    requiredProps: { children: 'Menu button' },
  });

  it('renders a default state', () => {
    const result = render(<MenuButton>Default MenuButton</MenuButton>);
    expect(result.container).toMatchSnapshot();
  });
});
