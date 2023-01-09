import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridHeader } from './DataGridHeader';
import { isConformant } from '../../testing/isConformant';
import { DataGridHeaderProps } from './DataGridHeader.types';

describe('DataGridHeader', () => {
  isConformant<DataGridHeaderProps>({
    Component: DataGridHeader,
    displayName: 'DataGridHeader',
  });

  it('renders a default state', () => {
    const result = render(<DataGridHeader>Default DataGridHeader</DataGridHeader>);
    expect(result.container).toMatchSnapshot();
  });
});
