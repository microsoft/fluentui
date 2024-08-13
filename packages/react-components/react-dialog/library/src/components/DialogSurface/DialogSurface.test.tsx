import * as React from 'react';
import { render } from '@testing-library/react';
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
