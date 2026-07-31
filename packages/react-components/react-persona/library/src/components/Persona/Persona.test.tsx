import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Persona } from './Persona';
import { render, screen } from '@testing-library/react';

describe('Persona', () => {
  isConformant({
    Component: Persona,
    displayName: 'Persona',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: [
      // Statics removal (DECISIONS.md D16.1/D16.6). Persona no longer renders
      // `fui-Persona` / `fui-Persona__<slot>`, and `personaClassNames` is now
      // `{ root: 'group/fui-persona' }`, so all three assertions in
      // `component-has-static-classnames-object` — the export shape, the
      // `fui-<Component>__<slot>` format and the rendered classes — no longer describe
      // this component. `component-has-group-marker` (now a default test) is its replacement: the group
      // marker is the sole public identity class now (D16.5).
      'component-has-static-classnames-object',
    ],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('passes name to primaryText if no primaryText is provided', () => {
    render(<Persona name="Kevin Sturgis" />);
    expect(screen.queryByText('Kevin Sturgis')).toBeTruthy();
  });

  it('ignores name when primaryText is provided', () => {
    render(<Persona name="Kevin Sturgis" primaryText="Custom Primary Text" />);
    expect(screen.queryByText('Kevin Sturgis')).toBeFalsy();
    expect(screen.queryByText('Custom Primary Text')).toBeTruthy();
  });
});
