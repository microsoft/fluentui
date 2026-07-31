import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Persona } from './Persona';
import { render, screen } from '@testing-library/react';

describe('Persona', () => {
  isConformant({
    Component: Persona,
    displayName: 'Persona',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
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
