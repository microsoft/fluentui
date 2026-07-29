import '@testing-library/jest-dom';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin, isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import * as React from 'react';

import { ItemLayout } from './ItemLayout';

describe('ItemLayout', () => {
  isConformant({
    Component: ItemLayout,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'ItemLayout',
    /*
     * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
     *
     * `component-has-static-classnames-object` no longer exists in the default set — it was
     * DELETED when the BEM statics were removed (DECISIONS.md D16.6), because it hard-codes
     * the `fui-<Component>` / `fui-<Component>__<slot>` format and asserts those classes are
     * rendered, which is exactly what D16 retires. `component-has-group-marker` replaced it
     * and is now ENABLED here: it asserts the group marker IS stamped and, per D16.2, is
     * never `classList[0]`.
     *
     * `classname-overrides-win` is the cascade-native replacement for
     * `make-styles-overrides-win` (DECISIONS.md D9). The Griffel test jest-mocks
     * `mergeClasses` and asserts it was called with the consumer className last; this
     * component composes with clsx and never calls mergeClasses, so the old test can no
     * longer observe the contract. It is not in this package's `isConformant` set to begin
     * with (that comes from `@fluentui/react-conformance-griffel`, which this package does
     * not use), so there is nothing to disable — only the replacement to add.
     */
    disabledTests: ['has-docblock', 'has-top-level-file'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('adds a "className" for "contentWrapper"', () => {
    const { getByText } = render(
      <ItemLayout contentWrapper={{ className: 'content-wrapper' }}>Content Wrapper</ItemLayout>,
    );

    expect(getByText('Content Wrapper')).toHaveClass('content-wrapper');
  });

  it('adds a "className" for "contentMedia"', () => {
    const { getByText } = render(
      <ItemLayout contentMedia={{ className: 'content-media', children: 'Content Media' }} />,
    );

    expect(getByText('Content Media')).toHaveClass('content-media');
  });

  it('adds a "className" for "headerMedia"', () => {
    const { getByText } = render(<ItemLayout headerMedia={{ className: 'header-media', children: 'Header Media' }} />);

    expect(getByText('Header Media')).toHaveClass('header-media');
  });

  it('adds a "className" for "headerMedia"', () => {
    const { getByText } = render(<ItemLayout header={{ className: 'header', children: 'Header' }} />);

    expect(getByText('Header')).toHaveClass('header');
  });

  it('adds a "className" for "startMedia"', () => {
    const { getByText } = render(<ItemLayout startMedia={{ className: 'start-media', children: 'Start Media' }} />);

    expect(getByText('Start Media')).toHaveClass('start-media');
  });

  it('adds a "className" for "endMedia"', () => {
    const { getByText } = render(<ItemLayout endMedia={{ className: 'end-media', children: 'End Media' }} />);

    expect(getByText('End Media')).toHaveClass('end-media');
  });
});
