import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCellLayout } from './TableCellLayout';
import { isConformant } from '../../testing/isConformant';
import { TableCellLayoutProps } from './TableCellLayout.types';

describe('TableCellLayout', () => {
  isConformant<TableCellLayoutProps>({
    Component: TableCellLayout,
    displayName: 'TableCellLayout',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            media: 'Test Icon',
            main: 'Main content',
            description: 'Secondary content',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<TableCellLayout>Default TableCellLayout</TableCellLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
