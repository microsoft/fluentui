import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MessageBarActions } from './MessageBarActions';
import type { MessageBarActionsProps } from './MessageBarActions.types';

describe('MessageBarActions', () => {
  isConformant<MessageBarActionsProps>({
    Component: MessageBarActions,
    displayName: 'MessageBarActions',
    disabledTests: [
      // TODO: having problems due to the fact root of DialogTitle is Fragment
      'component-has-static-classnames-object',
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
      // it was called with the consumer className last; this component now composes with
      // clsx and never calls mergeClasses, so the test can no longer observe the contract.
      // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
      // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
      // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
      'make-styles-overrides-win',
    ],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MessageBarActions>Default MessageBarActions</MessageBarActions>);
    expect(result.container).toMatchSnapshot();
  });
});
