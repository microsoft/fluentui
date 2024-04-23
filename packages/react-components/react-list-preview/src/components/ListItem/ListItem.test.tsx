import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ListItem } from './ListItem';
import { ListItemProps } from './ListItem.types';

describe('ListItem', () => {
  isConformant<ListItemProps>({
    Component: ListItem as React.FunctionComponent<ListItemProps>,
    displayName: 'ListItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            checkmark: { renderByDefault: true },
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<ListItem>Default ListItem</ListItem>);
    expect(result.container).toMatchSnapshot();
  });
});
