import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridHeaderCell } from './DataGridHeaderCell';
import { isConformant } from '../../testing/isConformant';
import { DataGridHeaderCellProps } from './DataGridHeaderCell.types';

describe('DataGridHeaderCell', () => {
  isConformant<DataGridHeaderCellProps>({
    Component: DataGridHeaderCell,
    displayName: 'DataGridHeaderCell',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            sortIcon: 'Test Icon',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DataGridHeaderCell>Default DataGridHeaderCell</DataGridHeaderCell>);
    expect(result.container).toMatchSnapshot();
  });
});
