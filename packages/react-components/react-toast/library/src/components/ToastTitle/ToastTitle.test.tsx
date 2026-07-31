import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { fuiSelector } from '@fluentui/react-utilities';
import { ToastTitle } from './ToastTitle';
import { isConformant } from '../../testing/isConformant';
import type { ToastTitleProps } from './ToastTitle.types';
import { toastTitleClassNames } from './useToastTitleStyles.styles';

describe('ToastTitle', () => {
  isConformant<ToastTitleProps>({
    Component: ToastTitle,
    displayName: 'ToastTitle',
    // `renderToastTitle` returns a fragment whose FIRST child is the `media` slot, so the
    // container's first child is not the root — every class-list assertion has to be pointed
    // at the root explicitly.
    //
    // `fuiSelector` is required, not cosmetic: `toastTitleClassNames.root` is now the
    // `group/fui-toast-title` marker (DECISIONS.md D16.5) and the `/` in it terminates a class
    // name in SELECTOR position, so `'.' + …` is a SyntaxError rather than a non-match.
    getTargetElement: result => {
      const targetElement = result.container.querySelector(fuiSelector(toastTitleClassNames.root));
      if (targetElement) {
        return targetElement as HTMLElement;
      }

      throw new Error(`Failed to get ToastTitle root ${toastTitleClassNames.root}`);
    },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-group-marker` runs from the DEFAULT set: it asserts
    // `group/fui-toast-title` is stamped on the element `getTargetElement` returns, and that
    // the marker is never `classList[0]` (D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    requiredProps: {
      media: 'c',
      action: 'a',
    },
  });

  it('renders a default state', () => {
    const result = render(<ToastTitle>Default ToastTitle</ToastTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
