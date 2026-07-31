import '@testing-library/jest-dom';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin, isConformant } from '@fluentui/react-conformance';
import * as React from 'react';
import { render } from '@testing-library/react';

import { Segment } from './Segment';
import styles from './Segment.module.css';

/*
 * ACTIVE suite, deliberately outside the `xdescribe` below — same reasoning as
 * Primitive.test.tsx. The suite is skipped for a pre-existing, non-styling reason, so
 * `component-has-group-marker` never runs for Segment; these two assertions carry the
 * D15.1 / D16.2 invariant on their own.
 */
describe('Segment (group-marker invariant)', () => {
  it('stamps its group marker and never emits it as classList[0]', () => {
    const { container } = render(<Segment>Test</Segment>);
    const root = container.firstChild as HTMLElement;

    expect(root.classList.contains('group/fui-segment')).toBe(true);
    expect(root.classList[0]).not.toMatch(/^(group|peer)\//);
    expect(root.classList[0]).toBe(styles.segment);
  });

  it('puts the consumer className last', () => {
    const { container } = render(<Segment className="consumer-wins">Test</Segment>);
    const classNames = Array.from((container.firstChild as HTMLElement).classList);

    expect(classNames[classNames.length - 1]).toBe('consumer-wins');
  });
});

// TODO[Jest] Investigate this. Possible out of memory. Job didn't finish the work in the pipeline

xdescribe('Segment', () => {
  isConformant({
    Component: Segment,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'Segment',
    /*
     * `component-has-static-classnames-object` no longer exists in the default set — it was
     * DELETED when the BEM statics were removed (DECISIONS.md D16.6), because it hard-codes
     * the `fui-<Component>` / `fui-<Component>__<slot>` format and asserts those classes are
     * rendered, which is exactly what D16 retires. `component-has-group-marker` replaced it
     * and is now ENABLED here: it asserts the group marker IS stamped and, per D16.2, is
     * never `classList[0]`.
     *
     * `classname-overrides-win` (DECISIONS.md D9) pins the styling override contract
     * cascade-natively: the consumer className is composed last (clsx) and unlayered
     * consumer CSS beats the `@layer fui.*` rules (D2).
     */
    disabledTests: ['has-docblock', 'has-top-level-file'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const { getByText } = render(<Segment>Test</Segment>);
    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('DIV');
  });
});
