import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { TableCellLayout } from './TableCellLayout';
import { isConformant } from '../../testing/isConformant';
import type { TableCellLayoutProps } from './TableCellLayout.types';

describe('TableCellLayout', () => {
  isConformant<TableCellLayoutProps>({
    Component: TableCellLayout,
    displayName: 'TableCellLayout',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<TableCellLayout>Default TableCellLayout</TableCellLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
