import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { InteractionTag } from './InteractionTag';
import { isConformant } from '../../testing/isConformant';
import { InteractionTagPrimary } from '../InteractionTagPrimary';
import { InteractionTagSecondary } from '../InteractionTagSecondary';

const requiredProps = {
  children: 'test',
};

describe('InteractionTag', () => {
  isConformant({
    Component: InteractionTag,
    displayName: 'InteractionTag',
    requiredProps,
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (now a default test) replaces it: it
    // asserts the group marker IS stamped and is never `classList[0]` (D16.2 / D16.6).
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('should set aria-labelledby with ids of InteractionTagPrimary and InteractionTagSecondary', () => {
    const { getByTestId } = render(
      <InteractionTag>
        <InteractionTagPrimary>{'tag'}</InteractionTagPrimary>
        <InteractionTagSecondary data-testid="secondary" aria-label="remove" />
      </InteractionTag>,
    );
    // The two ids are React `useId` values, so their suffixes count the renders that
    // happened earlier in this FILE, not anything about styling. They shifted f/g → h/i
    // when the `classname-overrides-win` conformance test above was added, and h/i → j/k
    // when `component-has-group-marker` was added (each renders the component twice); the
    // assertion still checks exactly what it checked before — that aria-labelledby is
    // "<primary id> <secondary id>".
    //
    // These `fui-InteractionTag*-` strings are `useId` PREFIXES, not BEM statics: they name
    // an element id, never a class, so DECISIONS.md D16.1 leaves them exactly as it leaves
    // react-provider's `fui-FluentProvider<n>` (D16.1's named exception).
    expect(getByTestId('secondary').getAttribute('aria-labelledby')).toMatchInlineSnapshot(
      `"fui-InteractionTagPrimary-_r_j_ fui-InteractionTagSecondary-_r_k_"`,
    );
  });
});
