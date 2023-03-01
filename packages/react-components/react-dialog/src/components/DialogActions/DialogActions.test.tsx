import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogActions } from './DialogActions';
import { isConformant } from '../../testing/isConformant';
import { DialogActionsProps } from './DialogActions.types';

describe('DialogActions', () => {
  isConformant<DialogActionsProps>({
    Component: DialogActions,
    displayName: 'DialogActions',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DialogActions>Default DialogActions</DialogActions>);
    expect(result.container).toMatchSnapshot();
  });
});
