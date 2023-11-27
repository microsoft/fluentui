import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ListItemButton } from './ListItemButton';
import { ButtonProps } from '../../../../react-button/src/Button';

describe('ListItemButton', () => {
  isConformant({
    Component: ListItemButton as React.FunctionComponent<ButtonProps>,
    displayName: 'ListItemButton',
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ListItemButton>Default ListItemButton</ListItemButton>);
    expect(result.container).toMatchSnapshot();
  });
});
