import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { CounterBadge } from './CounterBadge';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts `counterBadgeClassNames` still holds
    // `fui-CounterBadge` / `fui-CounterBadge__<slot>` strings AND that they are rendered.
    // Both are false by design: DECISIONS.md D16.1 removed the BEM statics, D16.5 narrowed
    // the export to `{ root }` and re-pointed it at the group marker. Its
    // `has-static-classnames` testOptions entry goes with it.
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      // a CounterBadge IS a Badge — `useBadgeStyles_unstable` stamps its marker on this same element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-badge', 'group/fui-counter-badge'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const { container } = render(<CounterBadge />);
    expect(container.firstChild).toMatchSnapshot();
  });

  /**
   * The `classList[0]` half of `component-has-group-marker`, asserted locally.
   *
   * Belt-and-braces alongside the shared `component-has-group-marker` default test, which
   * CounterBadge takes by declaring its marker SET (`testOptions['has-group-marker'].markers`,
   * DECISIONS.md D16.3) because this root legitimately carries two — `group/fui-badge` (a CounterBadge IS a Badge; `useBadgeStyles_unstable`
   * stamps it on this same element) and `group/fui-counter-badge`, which narrows to the
   * subtype. That is the shape `useCounterBadgeStyles.styles.ts` documents and D15.1 intends.
   *
   * The SECOND assertion — the D15.1 / D16.2 invariant that a marker is never `classList[0]`,
   * because nwsapi's jsdom `:scope` polyfill builds its anchor from
   * `escape(element.classList[0])` and the `/` survives that escaping into an invalid
   * selector — still applies and is not optional. Both roots lead with an unconditional
   * hashed module class (CounterBadge's identity-only `.root`, then Badge's `.root`
   * prepended), so this holds; the test exists so a future reordering cannot break it
   * silently. Rendered with no props, which is CounterBadge's weakest case: BOTH of its own
   * style slices (`dot`, `hide`) are conditional.
   */
  it('never emits a group marker as classList[0]', () => {
    const { container } = render(<CounterBadge />);
    const root = container.firstElementChild as HTMLElement;

    expect(root.classList.length).toBeGreaterThan(0);
    expect(root.classList[0]).not.toMatch(/^(group|peer)\//);
  });
});
