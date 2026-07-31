import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` was already disabled here (the root and
    // backdrop are portalled out of the render container) and is retired outright by
    // D16.1/D16.6: `dialogSurfaceClassNames` is now the retained, marker-valued
    // `{ root: string }` of D16.5, with the `backdrop` key removed so reading it is a
    // compile error. `component-has-group-marker` replaces it, and reaches the portalled
    // root through the `getTargetElement` below — asserting the marker is stamped and that
    // it is never `classList[0]` (D15.1 / D16.2).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
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
