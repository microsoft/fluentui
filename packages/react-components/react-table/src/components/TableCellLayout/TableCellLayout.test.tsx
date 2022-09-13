import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCellLayout } from './TableCellLayout';
import { isConformant } from '../../common/isConformant';

describe('TableCellLayout', () => {
  isConformant({
    Component: TableCellLayout,
    displayName: 'TableCellLayout',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            media: 'Test Icon',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableCellLayout>Default TableCellLayout</TableCellLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
