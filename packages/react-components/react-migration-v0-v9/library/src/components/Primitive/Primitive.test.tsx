import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin, isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import { Primitive } from './Primitive';
import styles from './Primitive.module.css';

/*
 * ACTIVE suite, deliberately outside the `xdescribe` below.
 *
 * The whole `Primitive` suite is skipped for a pre-existing, non-styling reason (see the
 * `xdescribe`), which means `component-has-group-marker` — the conformance test that guards
 * the D15.1 / D16.2 invariant — never runs for this component. Primitive is also one of the
 * two components in this package whose root has no styling class at all and therefore depends
 * on an identity-only module local to keep the marker off `classList[0]`. That combination is
 * a blind spot with teeth: during this conversion the identity local was silently pruned by
 * the CSS pipeline (a literally empty `.root {}` does not survive `@tailwindcss/postcss`) and
 * nothing failed. These two assertions close it without touching the skipped suite.
 */
describe('Primitive (group-marker invariant)', () => {
  it('stamps its group marker and never emits it as classList[0]', () => {
    const { container } = render(<Primitive>hi</Primitive>);
    const root = container.firstChild as HTMLElement;

    expect(root.classList.contains('group/fui-primitive')).toBe(true);
    expect(root.classList[0]).not.toMatch(/^(group|peer)\//);
    expect(root.classList[0]).toBe(styles.root);
  });

  it('puts the consumer className last', () => {
    const { container } = render(<Primitive className="consumer-wins">hi</Primitive>);
    const classNames = Array.from((container.firstChild as HTMLElement).classList);

    expect(classNames[classNames.length - 1]).toBe('consumer-wins');
  });
});

xdescribe('Primitive', () => {
  isConformant({
    Component: Primitive,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'Primitive',
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

  it.each`
    children           | dir
    ${'hi'}            | ${'auto'}
    ${(<div>hi</div>)} | ${undefined}
  `(`uses 'dir=auto' only when children is plain text`, ({ children, dir }) => {
    const { container } = render(<Primitive>{children}</Primitive>);
    expect(container.firstChild).toHaveAttribute('dir', dir);
  });
});
