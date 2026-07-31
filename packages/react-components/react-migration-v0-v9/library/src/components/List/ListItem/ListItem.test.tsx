import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin, isConformant } from '@fluentui/react-conformance';
import { ListItem } from './ListItem';
import type { ListItemProps } from './ListItem.types';

describe('ListItem', () => {
  isConformant({
    Component: ListItem as React.FunctionComponent<ListItemProps>,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'ListItem',
    /*
     * `component-has-static-classnames-object` no longer exists in the default set — it was
     * DELETED when the BEM statics were removed (DECISIONS.md D16.6). `component-has-group-marker`
     * replaced it and is now ENABLED: it asserts the group marker IS stamped and, per D16.2,
     * is never `classList[0]`. `classname-overrides-win` (D9) pins the styling override
     * contract cascade-natively.
     *
     * `has-docblock` / `has-top-level-file` stay disabled for the original reason recorded
     * below — unrelated to styling.
     */
    // Disabled because this should be ItemLayout's responsibility, but it doesn't render those.
    // Adding them there now might not be safe.
    disabledTests: ['has-docblock', 'has-top-level-file'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ListItem>Default ListItem</ListItem>);
    expect(result.container).toMatchSnapshot();
  });
});
