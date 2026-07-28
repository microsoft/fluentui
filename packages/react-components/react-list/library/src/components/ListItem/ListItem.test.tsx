import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { ListItem } from './ListItem';
import type { ListItemProps } from './ListItem.types';

describe('ListItem', () => {
  isConformant<ListItemProps>({
    Component: ListItem as React.FunctionComponent<ListItemProps>,
    displayName: 'ListItem',
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
            checkmark: { renderByDefault: true },
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<ListItem>Default ListItem</ListItem>);
    expect(result.container).toMatchSnapshot();
  });
});
