import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DialogTitle } from './DialogTitle';
import { isConformant } from '../../testing/isConformant';
import type { DialogTitleProps } from './DialogTitle.types';

describe('DialogTitle', () => {
  isConformant<DialogTitleProps>({
    Component: DialogTitle,
    displayName: 'DialogTitle',
    disabledTests: [
      // TODO: having problems due to the fact root of DialogTitle is Fragment
      'component-has-static-classnames-object',
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
      // it was called with the consumer className last; this component now composes with
      // clsx and never calls mergeClasses, so the test can no longer observe the contract.
      // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
      //
      // The static-classnames opt-out above is now doubly true: D16.1 removed
      // `fui-DialogTitle` / `fui-DialogTitle__action` outright and narrowed
      // `dialogTitleClassNames` to the marker-valued `{ root: string }` of D16.5.
      // `component-has-group-marker` (a default test) replaces it and is unaffected by the
      // Fragment — it reads the classList of the container's first child, which is the
      // <h2> root — asserting the marker is stamped and never `classList[0]`
      // (D15.1 / D16.2).
    ],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<DialogTitle>Default DialogTitle</DialogTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
