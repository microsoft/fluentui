import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { DialogSurface } from './DialogSurface';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import type { DialogSurfaceProps } from './DialogSurface.types';
import { mockUseDialogContext } from '../../testing/mockUseDialogContext';

jest.mock('../../contexts/dialogContext.ts');

describe('DialogSurface', () => {
  const testid = 'test';
  beforeEach(() => {
    resetIdsForTests();
    mockUseDialogContext({ open: true });
  });

  isConformant<DialogSurfaceProps>({
    disabledTests: ['component-has-static-classnames-object'],
    Component: DialogSurface,
    displayName: 'DialogSurface',
    requiredProps: {
      'data-testid': testid,
    } as DialogSurfaceProps,
    getTargetElement: result => {
      return result.getByTestId(testid);
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    mockUseDialogContext({ open: true });
    const result = render(<DialogSurface>Default DialogSurface</DialogSurface>);
    expect(result.container).toMatchSnapshot();
  });
});

describe('DialogSurface DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    render(
      <DialogSurface backdrop={{ appearance: 'dimmed' }} backdropMotion={null} mountNode={null}>
        Surface
      </DialogSurface>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((screen.getByRole('dialog') as HTMLElement).getAttributeNames().sort()).toEqual([
      'aria-modal',
      'class',
      'role',
      'tabindex',
    ]);
  });
});
