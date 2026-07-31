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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<TableCellLayout>Default TableCellLayout</TableCellLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
