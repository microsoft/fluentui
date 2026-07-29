import * as React from 'react';
import { render } from '@testing-library/react';
import { Text } from './Text';
import { isConformant } from '../../testing/isConformant';
import type { TextProps } from './Text.types';

import styles from './Text.module.css';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * These tests used to assert computed styles (`toHaveStyle('white-space: nowrap')`), which
 * worked only because Griffel injected its atomic CSS into jsdom at runtime. A converted
 * component ships static CSS compiled at BUILD time, and jest maps `*.module.css` to a
 * class-name proxy (jest.config.js) — no stylesheet reaches jsdom, so `getComputedStyle`
 * has nothing to resolve and a `toHaveStyle` assertion would pass vacuously at best.
 *
 * The contract therefore splits in two, and both halves are checked:
 *   - WHICH class / data-attribute the hook applies for a prop → asserted here, against
 *     the same `Text.module.css` key the hook uses, so a renamed or dropped slice fails.
 *   - WHAT declarations that class carries → asserted against the build-emitted
 *     `dist/styles.css` by the computed-style probe described in the conversion report;
 *     the values are pinned to the compiled Griffel atomics in
 *     lib-commonjs/components/Text/useTextStyles.styles.js.
 */

describe('Text', () => {
  isConformant<TextProps>({
    Component: Text,
    displayName: 'Text',
  });

  it('renders a default state', () => {
    const { container, getByText } = render(<Text>Test</Text>);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="group/fui-text"
          data-size="300"
        >
          Test
        </span>
      </div>
    `);

    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('SPAN');
    expect(textElement).toHaveClass(styles.root);
    // Rule-free defaults: font "base", weight "regular" and align "start" have no slice.
    expect(textElement).not.toHaveClass(styles.monospace);
    expect(textElement).not.toHaveClass(styles.semibold);
    expect(textElement).not.toHaveClass(styles.center);
  });

  it('applies the no wrap styles', () => {
    const { getByText } = render(<Text wrap={false}>Test</Text>);

    expect(getByText('Test')).toHaveClass(styles.nowrap);
  });

  it('applies the truncate style', () => {
    const { getByText } = render(<Text truncate>Test</Text>);

    expect(getByText('Test')).toHaveClass(styles.truncate);
  });

  it('applies the block style', () => {
    const { getByText } = render(<Text block>Test</Text>);

    expect(getByText('Test')).toHaveClass(styles.block);
  });

  it('applies the italic style', () => {
    const { getByText } = render(<Text italic>Test</Text>);

    expect(getByText('Test')).toHaveClass(styles.italic);
  });

  it('applies the underline style', () => {
    const { getByText } = render(<Text underline>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveClass(styles.underline);
    expect(textElement).not.toHaveClass(styles['strikethrough-underline']);
  });

  it('applies the strikethrough style', () => {
    const { getByText } = render(<Text strikethrough>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveClass(styles.strikethrough);
    expect(textElement).not.toHaveClass(styles['strikethrough-underline']);
  });

  it('applies both strikethrough and underline styles', () => {
    const { getByText } = render(
      <Text strikethrough underline>
        Test
      </Text>,
    );

    // The combined slice is applied ON TOP of the two single-decoration ones, exactly as
    // the Griffel original did, and wins `text-decoration-line` by its later position in
    // `fui.components.l1`.
    const textElement = getByText('Test');
    expect(textElement).toHaveClass(styles.underline, styles.strikethrough, styles['strikethrough-underline']);
  });

  it.each([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] as const)(
    'applies the %s token sizing styles',
    sizeToken => {
      const { getByText } = render(<Text size={sizeToken}>Test</Text>);

      // `size` is a dense numeric scale, so it rides `data-size` and the module targets it
      // with attribute selectors (cookbook scale-prop rule). 300 is the default and
      // deliberately has no rule — the attribute is still stamped for every value.
      expect(getByText('Test')).toHaveAttribute('data-size', String(sizeToken));
    },
  );

  it.each(['base', 'monospace', 'numeric'] as const)('applies %s font', input => {
    const { getByText } = render(<Text font={input}>Test</Text>);
    const textElement = getByText('Test');

    if (input === 'base') {
      expect(textElement).not.toHaveClass(styles.monospace);
      expect(textElement).not.toHaveClass(styles.numeric);
    } else {
      expect(textElement).toHaveClass(styles[input]);
    }
  });

  it.each(['regular', 'medium', 'semibold', 'bold'] as const)('applies %s weight', input => {
    const { getByText } = render(<Text weight={input}>Test</Text>);
    const textElement = getByText('Test');

    if (input === 'regular') {
      expect(textElement).not.toHaveClass(styles.medium);
      expect(textElement).not.toHaveClass(styles.semibold);
      expect(textElement).not.toHaveClass(styles.bold);
    } else {
      expect(textElement).toHaveClass(styles[input]);
    }
  });

  it.each(['start', 'center', 'end', 'justify'] as const)('applies a %s alignment', input => {
    const { getByText } = render(<Text align={input}>Test</Text>);
    const textElement = getByText('Test');

    if (input === 'start') {
      expect(textElement).not.toHaveClass(styles.center);
      expect(textElement).not.toHaveClass(styles.end);
      expect(textElement).not.toHaveClass(styles.justify);
    } else {
      expect(textElement).toHaveClass(styles[input]);
    }
  });
});
