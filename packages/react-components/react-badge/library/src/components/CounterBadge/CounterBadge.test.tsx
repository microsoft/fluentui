import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { CounterBadge } from './CounterBadge';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — `useCounterBadgeStyles_unstable` puts the
    // consumer className last, then hands the whole string to `useBadgeStyles_unstable`
    // as ITS last argument, so the consumer className stays last overall; unlayered
    // consumer CSS keeps beating every `fui.*` layer (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const { container } = render(<CounterBadge />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
