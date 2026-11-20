import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogActions } from './DialogActions';
import { isConformant } from '../../testing/isConformant';
import type { DialogActionsProps } from './DialogActions.types';

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

describe('DialogActions DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <DialogActions position="start" fluid>
        Actions
      </DialogActions>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
