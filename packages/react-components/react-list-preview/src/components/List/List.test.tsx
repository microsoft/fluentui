import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { List } from './List';
import { ListProps } from './List.types';

describe('List', () => {
  isConformant({
    Component: List as React.FunctionComponent<ListProps>,
    displayName: 'List',
    testOptions: {
      'consistent-callback-args': {
        // onSelectionChange has an eventArguent which is React.SyntheticEvent. This throws an error during testing
        ignoreProps: ['onSelectionChange'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<List>Default List</List>);
    expect(result.container).toMatchSnapshot();
  });
});
