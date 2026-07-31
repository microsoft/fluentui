import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DataGridHeader } from './DataGridHeader';
import { isConformant } from '../../testing/isConformant';
import type { DataGridHeaderProps } from './DataGridHeader.types';

describe('DataGridHeader', () => {
  isConformant<DataGridHeaderProps>({
    Component: DataGridHeader,
    displayName: 'DataGridHeader',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    // This component renders another component's ROOT — a DataGridHeader IS a TableHeader — so the
    // element legitimately carries BOTH markers (DECISIONS.md D16.3). Declaring the whole set
    // keeps `component-has-group-marker` running as an exact set comparison, and keeps its
    // `classList[0]` half — the D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on —
    // asserted here.
    testOptions: {
      'has-group-marker': {
        markers: ['group/fui-table-header', 'group/fui-data-grid-header'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<DataGridHeader>Default DataGridHeader</DataGridHeader>);
    expect(result.container).toMatchSnapshot();
  });
});
