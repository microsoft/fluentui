import '@testing-library/jest-dom';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin, isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import * as React from 'react';

import { GridShim } from './GridShim';
import styles from './Grid.module.css';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * The `toHaveStyle` assertions these tests used to carry only worked because Griffel injected
 * its atomics into jsdom at runtime; a converted component ships build-time CSS and jest maps
 * `*.module.css` to a class-name proxy, so `getComputedStyle` has nothing to resolve. WHICH
 * class is applied is asserted here; WHAT it declares is asserted against the build-emitted
 * `dist/styles.css` by the conversion report's computed-style probe. See Flex.test.tsx.
 */

describe('GridShim', () => {
  isConformant({
    Component: GridShim,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'GridShim',
    /*
     * `component-has-static-classnames-object` was DELETED from the default set with the BEM
     * statics (DECISIONS.md D16.6); `component-has-group-marker` replaced it and is ENABLED.
     * It derives the expected marker from `displayName`, which is why the marker is
     * `group/fui-grid-shim` and no `testOptions['has-group-marker']` override is needed — see
     * the note on `gridShimClassName` in GridShim.tsx for why the identity string changed.
     *
     * `classname-overrides-win` is the cascade-native replacement for
     * `make-styles-overrides-win` (D9); the Griffel original is not in this package's set.
     */
    disabledTests: ['has-docblock', 'has-top-level-file'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const { getByText } = render(<GridShim>Test</GridShim>);
    const textElement = getByText('Test');

    expect(textElement.nodeName).toBe('DIV');
    expect(textElement).toHaveClass(styles.grid);
    expect(textElement).toHaveClass('group/fui-grid-shim');
    // The marker is public DOM surface and must never lead the class list (D16.2 / D15.1).
    expect(textElement.classList[0]).toBe(styles.grid);
    // With neither `rows` nor `columns`, the default 5-column track applies and nothing else.
    expect(textElement).toHaveClass(styles['columns-default']);
    expect(textElement).not.toHaveClass(styles['only-rows']);
  });

  it('applies the columns style', () => {
    const { getByText } = render(<GridShim columns={1}>Test</GridShim>);
    const textElement = getByText('Test');

    expect(textElement).toHaveClass(styles.columns1);
    // `columnsDefault` and `columns1` both write `grid-template-columns`; their conditions are
    // mutually exclusive, and this is the assertion that pins that.
    expect(textElement).not.toHaveClass(styles['columns-default']);
  });

  it('applies the rows style', () => {
    const { getByText } = render(<GridShim rows={1}>Test</GridShim>);
    const textElement = getByText('Test');

    expect(textElement).toHaveClass(styles.rows1);
    // `rows` without `columns` also switches the auto-flow axis.
    expect(textElement).toHaveClass(styles['only-rows']);
    expect(textElement).not.toHaveClass(styles['columns-default']);
  });

  /* VR blind-spot probe: rows AND columns together (no VR coverage for this package). */
  it('applies both tracks and drops the auto-flow switch when rows and columns are both set', () => {
    const { getByText } = render(
      <GridShim rows={2} columns={3}>
        Test
      </GridShim>,
    );
    const textElement = getByText('Test');

    expect(textElement).toHaveClass(styles.rows2);
    expect(textElement).toHaveClass(styles.columns3);
    expect(textElement).not.toHaveClass(styles['only-rows']);
    expect(textElement).not.toHaveClass(styles['columns-default']);
  });
});
