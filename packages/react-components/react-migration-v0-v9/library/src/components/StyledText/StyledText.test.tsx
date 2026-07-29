import '@testing-library/jest-dom';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin, isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import * as React from 'react';

import type { StyledTextProps } from './StyledText';
import { StyledText } from './StyledText';
import styles from './StyledText.module.css';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * These tests used to assert computed styles (`toHaveStyle('color: var(--colorPaletteRed…)')`),
 * which worked only because Griffel injected its atomic CSS into jsdom at runtime. A converted
 * component ships static CSS compiled at BUILD time, and jest maps `*.module.css` to a
 * class-name proxy (jest.config.js) — no stylesheet reaches jsdom, so `getComputedStyle` has
 * nothing to resolve and a `toHaveStyle` assertion would pass vacuously at best.
 *
 * The contract therefore splits in two, and both halves are checked:
 *   - WHICH class the component applies for a prop → asserted here, against the same module
 *     key the component uses, so a renamed or dropped slice fails.
 *   - WHAT declarations that class carries → asserted against the build-emitted
 *     `dist/styles.css` by the conversion report's computed-style probe. The `size` cases in
 *     particular used to assert `line-height: var(--lineHeightBase400)` etc.; that token
 *     mapping is now pinned in StyledText.module.css and covered by the probe.
 *
 * Same split react-text made for its 30 equivalent assertions (reports/phase2-batch2.md).
 */

describe('StyledText', () => {
  isConformant({
    Component: StyledText as React.ComponentType<StyledTextProps>,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'StyledText',
    /*
     * `component-has-static-classnames-object` was DELETED from the default set with the BEM
     * statics (DECISIONS.md D16.6); `component-has-group-marker` replaced it and is ENABLED.
     * `classname-overrides-win` is the cascade-native replacement for
     * `make-styles-overrides-win` (D9); the Griffel original is not in this package's set.
     */
    disabledTests: ['has-docblock', 'has-top-level-file'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it.each`
    children           | dir
    ${'hi'}            | ${'auto'}
    ${(<div>hi</div>)} | ${null}
  `(`uses 'dir=auto' only when children is plain text`, ({ children, dir }) => {
    const { getByTestId } = render(<StyledText data-testid="test">{children}</StyledText>);
    const textElement = getByTestId('test');
    expect(textElement.getAttribute('dir')).toBe(dir);
  });

  it('renders a default state', () => {
    const { getByText } = render(<StyledText>Test</StyledText>);
    const textElement = getByText('Test');

    expect(textElement.nodeName).toBe('SPAN');
    // Every styling class on StyledText is conditional, so the root carries the identity-only
    // local minted to keep the marker off `classList[0]` (D16.2 / D15.1).
    expect(textElement).toHaveClass(styles.root);
    expect(textElement).toHaveClass('group/fui-styled-text');
    expect(textElement.classList[0]).toBe(styles.root);
    // `wrap` defaults to true, so the nowrap slice is absent by default.
    expect(textElement).not.toHaveClass(styles.nowrap);
    expect(textElement).not.toHaveClass(styles.truncate);
  });

  it('applies the truncate style', () => {
    const { getByText } = render(<StyledText truncate>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles.truncate);
  });

  it('applies the nowrap style only when wrap is explicitly false', () => {
    const { getByText, rerender } = render(<StyledText wrap>Test</StyledText>);
    expect(getByText('Test')).not.toHaveClass(styles.nowrap);

    rerender(<StyledText wrap={false}>Test</StyledText>);
    expect(getByText('Test')).toHaveClass(styles.nowrap);
  });

  it.each`
    weight         | slice
    ${'light'}     | ${'light'}
    ${'semilight'} | ${'semilight'}
    ${'regular'}   | ${'regular'}
    ${'medium'}    | ${'medium'}
    ${'semibold'}  | ${'semibold'}
    ${'bold'}      | ${'bold'}
  `(`applies the correct weight styles`, ({ weight, slice }) => {
    const { getByText } = render(<StyledText weight={weight}>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles[slice]);
  });

  it.each`
    size          | slice
    ${100}        | ${'base100'}
    ${200}        | ${'base200'}
    ${300}        | ${'base300'}
    ${400}        | ${'base400'}
    ${500}        | ${'base500'}
    ${600}        | ${'base600'}
    ${700}        | ${'hero700'}
    ${'smaller'}  | ${'base100'}
    ${'small'}    | ${'base200'}
    ${'medium'}   | ${'base300'}
    ${'large'}    | ${'base400'}
    ${'large500'} | ${'base500'}
    ${'larger'}   | ${'base600'}
    ${'largest'}  | ${'hero700'}
  `(`applies the correct size styles`, ({ size, slice }) => {
    const { getByText } = render(<StyledText size={size}>Test</StyledText>);

    // Both the numeric and the named alias must land on the SAME slice — that aliasing is
    // `sizeMap` in StyledText.tsx and is what this table pins.
    expect(getByText('Test')).toHaveClass(styles[slice]);
  });

  it.each`
    atMention | slice
    ${true}   | ${'mention'}
    ${'me'}   | ${'mention-me'}
  `(`applies the correct atMention styles`, ({ atMention, slice }) => {
    const { getByText } = render(<StyledText atMention={atMention}>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles[slice]);
  });

  it('applies both mention slices for atMention="me"', () => {
    // `mentionMe` is applied ON TOP of `mention` and wins `color` by its later position in
    // `fui.components.l1`, exactly as the later mergeClasses argument did.
    const { getByText } = render(<StyledText atMention="me">Test</StyledText>);
    const textElement = getByText('Test');

    expect(textElement).toHaveClass(styles.mention);
    expect(textElement).toHaveClass(styles['mention-me']);
  });

  it('applies the disabled style', () => {
    const { getByText } = render(<StyledText disabled>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles.disabled);
  });

  it('applies the error style', () => {
    const { getByText } = render(<StyledText error>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles.error);
  });

  it('applies the important style', () => {
    const { getByText } = render(<StyledText important>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles.important);
  });

  it('applies the success style', () => {
    const { getByText } = render(<StyledText success>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles.success);
  });

  it('applies the temporary style', () => {
    const { getByText } = render(<StyledText temporary>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles.temporary);
  });

  it('applies the timestamp style', () => {
    const { getByText } = render(<StyledText timestamp>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles.timestamp);
  });

  it.each`
    align        | slice
    ${'center'}  | ${'align-center'}
    ${'end'}     | ${'align-end'}
    ${'justify'} | ${'align-justify'}
  `('applies the $align alignment style', ({ align, slice }) => {
    const { getByText } = render(<StyledText align={align}>Test</StyledText>);

    expect(getByText('Test')).toHaveClass(styles[slice]);
  });

  it('applies no alignment class for align="start"', () => {
    // `start` is the rule-free default — StyledText.tsx branches only on center/end/justify.
    const { getByText } = render(<StyledText align="start">Test</StyledText>);
    const textElement = getByText('Test');

    expect(textElement).not.toHaveClass(styles['align-center']);
    expect(textElement).not.toHaveClass(styles['align-end']);
    expect(textElement).not.toHaveClass(styles['align-justify']);
  });

  /*
   * VR blind-spot probe (no VR coverage for this package): weight AND a colour slice that
   * also writes `font-weight`. `important` is argument 13 and `weight` argument 3, so
   * `important`'s 700 must win — encoded as file position in StyledText.module.css.
   */
  it('applies both the weight slice and the important slice, in that order', () => {
    const { getByText } = render(
      <StyledText weight="light" important>
        Test
      </StyledText>,
    );
    const textElement = getByText('Test');

    expect(textElement).toHaveClass(styles.light);
    expect(textElement).toHaveClass(styles.important);
    expect(Array.from(textElement.classList).indexOf(styles.light)).toBeLessThan(
      Array.from(textElement.classList).indexOf(styles.important),
    );
  });
});
