import * as React from 'react';
import { render } from '@testing-library/react';
import { TableRow } from './TableRow';
import { isConformant } from '../../common/isConformant';
import { TableRowProps } from './TableRow.types';

const tbody = document.createElement('tbody');
describe('TableRow', () => {
  isConformant({
    Component: TableRow as React.FunctionComponent<TableRowProps>,
    renderOptions: {
      container: document.body.appendChild(tbody),
    },
    displayName: 'TableRow',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableRow>Default TableRow</TableRow>, { container: tbody });
    expect(result.container).toMatchSnapshot();
  });
});
