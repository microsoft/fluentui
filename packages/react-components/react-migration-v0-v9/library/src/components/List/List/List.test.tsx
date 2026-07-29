import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin, isConformant } from '@fluentui/react-conformance';
import { List } from './List';
import type { ListProps } from './List.types';

describe('List', () => {
  isConformant({
    Component: List as React.FunctionComponent<ListProps>,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'List',
    /*
     * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
     *
     * `component-has-static-classnames-object` no longer exists in the default set — it was
     * DELETED when the BEM statics were removed (DECISIONS.md D16.6). `component-has-group-marker`
     * replaced it and is now ENABLED: it asserts the group marker IS stamped and, per D16.2,
     * is never `classList[0]`. `classname-overrides-win` is the cascade-native replacement for
     * `make-styles-overrides-win` (D9); the Griffel original is not in this package's set to
     * begin with, so there is nothing to disable.
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
    const result = render(<List>Default List</List>);
    expect(result.container).toMatchSnapshot();
  });
});
