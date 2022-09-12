import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCellPrimaryItem } from './TableCellPrimaryItem';
import { isConformant } from '../../common/isConformant';
import { TableCellPrimaryItemProps } from './TableCellPrimaryItem.types';

describe('TableCellPrimaryItem', () => {
  isConformant({
    Component: TableCellPrimaryItem as React.FC<TableCellPrimaryItemProps>,
    displayName: 'TableCellPrimaryItem',
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
    const result = render(<TableCellPrimaryItem>Default TableCellPrimaryItem</TableCellPrimaryItem>);
    expect(result.container).toMatchSnapshot();
  });
});
