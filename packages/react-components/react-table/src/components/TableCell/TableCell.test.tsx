import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCell } from './TableCell';
import { isConformant } from '../../common/isConformant';
import { TableCellProps } from './TableCell.types';

const tr = document.createElement('tr');
describe('TableCell', () => {
  beforeEach(() => {
    document.body.appendChild(tr);
  });

  isConformant({
    Component: TableCell as React.FunctionComponent<TableCellProps>,
    renderOptions: {
      container: tr,
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            media: 'Test Icon',
          },
        },
      ],
    },
    displayName: 'TableCell',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableCell>Default TableCell</TableCell>, { container: tr });
    expect(result.container).toMatchSnapshot();
  });
});
