import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { BreadcrumbButton } from './BreadcrumbButton';
import type { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import { isConformant } from '../../testing/isConformant';
import { ArrowRight16Filled } from '@fluentui/react-icons';

describe('BreadcrumbButton', () => {
  isConformant({
    Component: BreadcrumbButton as React.FunctionComponent<BreadcrumbButtonProps>,
    displayName: 'BreadcrumbButton',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` /
    // `fui-<Component>__<slot>` format, which the D16 statics-removal sweep retired for
    // converted packages: `breadcrumbButtonClassNames.root` is now the group marker and the
    // never-applied `icon` key is gone (DECISIONS.md D16.5/D16.6). Its `has-static-classnames`
    // testOptions went with it.
    //
    // `component-has-group-marker` runs here with a declared marker SET, unlike Breadcrumb / BreadcrumbItem
    // / BreadcrumbDivider. Its first assertion requires EXACTLY ONE `group/` marker on the
    // outermost slot, and a BreadcrumbButton root legitimately carries two: this hook stamps
    // `group/fui-breadcrumb-button` and then calls `useButtonStyles_unstable`, which stamps
    // `group/fui-button` on the same element — the element genuinely IS both. react-button
    // documents the same by-design duplication for ToggleButton / CompoundButton / MenuButton
    // (see useButtonStyles.styles.ts), so this is a property of every composing component, not
    // a breadcrumb quirk. `testOptions['has-group-marker']` only overrides the EXPECTED marker
    // name; it has no "this root composes another component's marker" escape hatch, so the
    // shared test cannot express this shape today.
    //
    // The valuable half of that test — the D15.1/D16.2 `classList[0]` invariant, which guards
    // a jsdom-only render-time throw that neither the build nor VR can see — is asserted
    // locally instead, immediately below. Move back to the shared test if it ever grows an
    // allowance for composed markers.
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      // renders react-button’s Button, whose hook stamps its marker on this same element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-button', 'group/fui-breadcrumb-button'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  // Local stand-in for `component-has-group-marker` — see the note above for why the shared
  // test cannot run on a composing component.
  describe('named group marker (DECISIONS.md D15.1 / D16.2)', () => {
    const renderRoot = (props: BreadcrumbButtonProps = {}): HTMLElement =>
      render(<BreadcrumbButton {...props}>Item</BreadcrumbButton>).container.firstElementChild as HTMLElement;

    it('stamps its own marker alongside the Button marker it composes', () => {
      const classNames = Array.from(renderRoot().classList);

      expect(classNames).toContain('group/fui-breadcrumb-button');
      // Asserted, not merely tolerated: react-toolbar-style descendants address whichever
      // identity they mean, so losing either name is a public contract break.
      expect(classNames).toContain('group/fui-button');
    });

    it('never emits a marker as classList[0]', () => {
      // nwsapi (jsdom's `:scope` polyfill) builds its selector anchor from
      // `escape(element.classList[0])`. The `/` survives that escaping, so a leading marker
      // splices an invalid production into the selector and every `:scope` query under jsdom
      // throws an AggregateError at render time. Real browsers are unaffected, which is why
      // this is invisible to VR and has to be asserted here.
      //
      // The token that holds index 0 is react-button's unconditional `styles.root`: this hook
      // leads with its OWN `styles.root`, and `useButtonStyles_unstable` then prepends
      // Button's. Both are unconditional, so no prop combination can expose the marker.
      expect(renderRoot().classList[0]).not.toMatch(/^(group|peer)\//);
      expect(renderRoot({ current: true, size: 'large' }).classList[0]).not.toMatch(/^(group|peer)\//);
    });
  });

  it('renders a default state', () => {
    const result = render(<BreadcrumbButton>Default BreadcrumbButton</BreadcrumbButton>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="group/fui-button group/fui-breadcrumb-button"
          data-size="medium"
        >
          Default BreadcrumbButton
        </button>
      </div>
    `);
  });

  it('renders with an icon', () => {
    const result = render(
      <BreadcrumbButton icon={<ArrowRight16Filled />}>BreadcrumbButton with icon</BreadcrumbButton>,
    );
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="group/fui-button group/fui-breadcrumb-button"
          data-icon-position="before"
          data-size="medium"
        >
          <span
            class=""
          >
            <svg
              aria-hidden="true"
              class=""
              fill="currentColor"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8c0-.41.34-.75.75-.75h8.79L8.25 4.31a.75.75 0 0 1 1-1.12L14 7.44a.75.75 0 0 1 0 1.12L9.25 12.8a.75.75 0 1 1-1-1.12l3.29-2.94H2.75A.75.75 0 0 1 2 8Z"
                fill="currentColor"
              />
            </svg>
          </span>
          BreadcrumbButton with icon
        </button>
      </div>
    `);
  });
});
