import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { CardFooter } from './CardFooter';
import { isConformant } from '../../testing/isConformant';

describe('CardFooter', () => {
  isConformant({
    Component: CardFooter,
    displayName: 'CardFooter',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is retired by D16.1/D16.6: the statics it
    // asserts are no longer rendered, and `cardFooterClassNames` is now the retained,
    // marker-valued `{ root: string }` of D16.5. `component-has-group-marker` replaces it —
    // the marker is stamped, and never at `classList[0]` (D15.1 / D16.2).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<CardFooter action={'Action slot'}>Default CardFooter</CardFooter>);
    expect(result.container).toMatchSnapshot();
  });
});
