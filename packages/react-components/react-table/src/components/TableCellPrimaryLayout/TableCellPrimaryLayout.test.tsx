import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCellPrimaryLayout } from './TableCellPrimaryLayout';
import { isConformant } from '../../common/isConformant';
import { TableCellPrimaryLayoutProps } from './TableCellPrimaryLayout.types';

describe('TableCellPrimaryLayout', () => {
  isConformant({
    Component: TableCellPrimaryLayout as React.FC<TableCellPrimaryLayoutProps>,
    displayName: 'TableCellPrimaryLayout',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            media: 'Test Icon',
            main: 'Main content',
            secondary: 'Secondary content',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<TableCellPrimaryLayout>Default TableCellPrimaryLayout</TableCellPrimaryLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
