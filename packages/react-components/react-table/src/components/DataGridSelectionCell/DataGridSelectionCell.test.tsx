import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridSelectionCell } from './DataGridSelectionCell';
import { isConformant } from '../../testing/isConformant';
import { DataGridSelectionCellProps } from '../../../dist/index';
import { dataGridSelectionCellClassNames } from './useDataGridSelectionCellStyles';

describe('DataGridSelectionCell', () => {
  isConformant<DataGridSelectionCellProps>({
    Component: DataGridSelectionCell,
    displayName: 'DataGridSelectionCell',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            type: 'checkbox',
          },
          expectedClassNames: {
            root: dataGridSelectionCellClassNames.root,
            checkboxIndicator: dataGridSelectionCellClassNames.checkboxIndicator,
          },
        },
        {
          props: {
            type: 'radio',
          },
          expectedClassNames: {
            root: dataGridSelectionCellClassNames.root,
            radioIndicator: dataGridSelectionCellClassNames.radioIndicator,
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DataGridSelectionCell>Default DataGridSelectionCell</DataGridSelectionCell>);
    expect(result.container).toMatchSnapshot();
  });
});
