import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '@fluentui/react-conformance';
import { ListItem } from './ListItem';
import { ListItemProps } from './ListItem.types';

describe('ListItem', () => {
  isConformant({
    Component: ListItem as React.FunctionComponent<ListItemProps>,
    displayName: 'ListItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            checkmark: 'test checkmark',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ListItem>Default ListItem</ListItem>);
    expect(result.container).toMatchSnapshot();
  });
});
