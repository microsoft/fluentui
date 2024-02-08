import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '@fluentui/react-conformance';
import { List } from './List';
import { ListProps } from './List.types';

describe('List', () => {
  isConformant({
    Component: List as React.FunctionComponent<ListProps>,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'List',
    // Disabled because this should be ItemLayout's responsibility, but it doesn't render those.
    // Adding them there now might not be safe.
    disabledTests: ['component-has-static-classnames-object', 'has-docblock', 'has-top-level-file'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<List>Default List</List>);
    expect(result.container).toMatchSnapshot();
  });
});
