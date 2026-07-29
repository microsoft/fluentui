import '@testing-library/jest-dom';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin, isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import * as React from 'react';

import { Flex } from './Flex';
import styles from './Flex.module.css';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * These tests used to assert computed styles (`toHaveStyle('display: flex')`), which worked
 * only because Griffel injected its atomic CSS into jsdom at runtime. A converted component
 * ships static CSS compiled at BUILD time, and jest maps `*.module.css` to a class-name proxy
 * (jest.config.js) — no stylesheet reaches jsdom, so `getComputedStyle` has nothing to
 * resolve and a `toHaveStyle` assertion would pass vacuously at best.
 *
 * The contract therefore splits in two, and both halves are checked:
 *   - WHICH class the component applies for a prop → asserted here, against the same module
 *     key the component uses, so a renamed or dropped slice fails.
 *   - WHAT declarations that class carries → asserted against the build-emitted
 *     `dist/styles.css` by the computed-style probe in the conversion report.
 *
 * Same split react-text made for its 30 equivalent assertions (reports/phase2-batch2.md).
 */

describe('Flex', () => {
  isConformant({
    Component: Flex,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'Flex',
    /*
     * `component-has-static-classnames-object` no longer exists in the default set — it was
     * DELETED when the BEM statics were removed (DECISIONS.md D16.6), because it hard-codes
     * the `fui-<Component>` / `fui-<Component>__<slot>` format and asserts those classes are
     * rendered, which is exactly what D16 retires. `component-has-group-marker` replaced it
     * and is ENABLED here: it asserts the marker IS stamped and, per D16.2, is never
     * `classList[0]`.
     *
     * `classname-overrides-win` is the cascade-native replacement for
     * `make-styles-overrides-win` (DECISIONS.md D9). The Griffel original is not in this
     * package's set to begin with (it ships in `@fluentui/react-conformance-griffel`, which
     * this package does not use), so there is nothing to disable — only the replacement to add.
     */
    disabledTests: ['has-docblock', 'has-top-level-file'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const { getByText } = render(<Flex>Test</Flex>);
    const textElement = getByText('Test');

    expect(textElement.nodeName).toBe('DIV');
    expect(textElement).toHaveClass(styles.flex);
    // The marker is public DOM surface and must never lead the class list (D16.2 / D15.1).
    expect(textElement).toHaveClass('group/fui-flex');
    expect(textElement.classList[0]).toBe(styles.flex);
    // Rule-free defaults: no orientation, alignment, gap or padding slice without a prop.
    expect(textElement).not.toHaveClass(styles.column);
    expect(textElement).not.toHaveClass(styles.inline);
    expect(textElement).not.toHaveClass(styles.wrap);
    expect(textElement).not.toHaveClass(styles.fill);
  });

  it('applies the column style', () => {
    const { getByText } = render(<Flex column={true}>Test</Flex>);

    expect(getByText('Test')).toHaveClass(styles.column);
  });

  it('applies the fill style', () => {
    const { getByText } = render(<Flex fill={true}>Test</Flex>);

    expect(getByText('Test')).toHaveClass(styles.fill);
  });

  it('applies the gap style', () => {
    const { getByText } = render(<Flex gap="gap.small">Test</Flex>);
    const textElement = getByText('Test');

    // Row flow reads the COLUMN-gap family (`column-gap`); the column-flow twin is below.
    expect(textElement).toHaveClass(styles['gap-for-row-flex-small']);
    expect(textElement).not.toHaveClass(styles['gap-for-column-flex-small']);
  });

  it('applies the gap style for column', () => {
    const { getByText } = render(
      <Flex gap="gap.small" column={true}>
        Test
      </Flex>,
    );
    const textElement = getByText('Test');

    expect(textElement).toHaveClass(styles['gap-for-column-flex-small']);
    expect(textElement).not.toHaveClass(styles['gap-for-row-flex-small']);
  });

  it('applies the hAlign style for row', () => {
    const { getByText } = render(<Flex hAlign="center">Test</Flex>);

    expect(getByText('Test')).toHaveClass(styles['justify-content-center']);
  });

  it('applies the hAlign style for column', () => {
    const { getByText } = render(
      <Flex hAlign="center" column={true}>
        Test
      </Flex>,
    );

    expect(getByText('Test')).toHaveClass(styles['align-items-center']);
  });

  it('applies the inline style', () => {
    const { getByText } = render(<Flex inline={true}>Test</Flex>);

    expect(getByText('Test')).toHaveClass(styles.inline);
  });

  it('applies the padding style', () => {
    const { getByText } = render(<Flex padding="padding.medium">Test</Flex>);

    expect(getByText('Test')).toHaveClass(styles['padding-medium']);
  });

  it('applies the space style', () => {
    const { getByText } = render(<Flex space="around">Test</Flex>);

    expect(getByText('Test')).toHaveClass(styles['justify-content-space-around']);
  });

  it('applies the vAlign style for row', () => {
    const { getByText } = render(<Flex vAlign="center">Test</Flex>);

    expect(getByText('Test')).toHaveClass(styles['align-items-center']);
  });

  it('applies the vAlign style for column', () => {
    const { getByText } = render(
      <Flex vAlign="center" column={true}>
        Test
      </Flex>,
    );

    expect(getByText('Test')).toHaveClass(styles['justify-content-center']);
  });

  it('applies the wrap style', () => {
    const { getByText } = render(<Flex wrap={true}>Test</Flex>);

    expect(getByText('Test')).toHaveClass(styles.wrap);
  });

  /*
   * VR blind-spot probes (this package has no VR stories at all). Both cover prop
   * combinations no earlier assertion reaches.
   */
  it('swaps the alignment families for column flow', () => {
    const { getByText } = render(
      <Flex hAlign="end" vAlign="start" column={true}>
        Test
      </Flex>,
    );
    const textElement = getByText('Test');

    expect(textElement).toHaveClass(styles['align-items-flex-end']);
    expect(textElement).toHaveClass(styles['justify-content-flex-start']);
  });

  it('maps hAlign="stretch" to the CENTER alignment class (upstream quirk, preserved)', () => {
    const { getByText } = render(
      <Flex hAlign="stretch" column={true}>
        Test
      </Flex>,
    );
    const textElement = getByText('Test');

    // Flex.tsx's `classMaps.alignItems.stretch` points at `alignItemsCenter`, not
    // `alignItemsStretch`. Preserved verbatim — changing it is a behaviour decision, not a
    // styling-mechanism one. See the note in Flex.module.css.
    expect(textElement).toHaveClass(styles['align-items-center']);
    expect(textElement).not.toHaveClass(styles['align-items-stretch']);
  });
});
