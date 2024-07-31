import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '@fluentui/react-conformance';
import { ListItem } from './ListItem';
import { ListItemProps } from './ListItem.types';

describe('ListItem', () => {
  isConformant({
    Component: ListItem as React.FunctionComponent<ListItemProps>,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'ListItem',
    // Disabled because this should be ItemLayout's responsibility, but it doesn't render those.
    // Adding them there now might not be safe.
    disabledTests: ['component-has-static-classnames-object', 'has-docblock', 'has-top-level-file'],
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
