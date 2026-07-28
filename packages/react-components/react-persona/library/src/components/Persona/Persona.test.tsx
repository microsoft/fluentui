import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { omit } from '@fluentui/react-utilities';
import { Persona } from './Persona';
import { personaClassNames } from './usePersonaStyles.styles';
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
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            name: 'Kevin Sturgis',
            secondaryText: 'Software Engineer',
            tertiaryText: 'Seattle, WA',
            quaternaryText: 'Microsoft',
          },
          expectedClassNames: omit(personaClassNames, ['presence']),
        },
        {
          props: {
            presenceOnly: true,
            presence: { status: 'available' },
            name: 'Kevin Sturgis',
            secondaryText: 'Software Engineer',
            tertiaryText: 'Available',
            quaternaryText: 'Microsoft',
          },
          expectedClassNames: omit(personaClassNames, ['avatar']),
        },
      ],
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
