import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { InfoButton } from './InfoButton';
import { isConformant } from '../../testing/isConformant';
import { infoButtonClassNames } from './useInfoButtonStyles.styles';
import type { RenderResult } from '@testing-library/react';

// testing-library's queryByRole function doesn't look inside portals
function queryByRoleNote(result: RenderResult) {
  const notes = result.baseElement.querySelectorAll('[role="note"]');
  if (!notes?.length) {
    return null;
  } else {
    expect(notes.length).toBe(1);
    return notes.item(0) as HTMLElement;
  }
}

const getPopoverSurfaceElement = (result: RenderResult) => {
  // button needs to be clicked otherwise content won't be rendered.
  result.getByRole('button').click();
  const dialog = queryByRoleNote(result);
  expect(dialog).not.toBeNull();
  return dialog!;
};

describe('InfoButton', () => {
  isConformant({
    Component: InfoButton,
    displayName: 'InfoButton',
    requiredProps: {
      info: "This is an InfoButton's information.",
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            info: "This is an InfoButton's information.",
          },
          expectedClassNames: {
            root: infoButtonClassNames.root,
            info: infoButtonClassNames.info,
          },
          getPortalElement: getPopoverSurfaceElement,
        },
      ],
    },
    // InfoButton is not to be exported by the package nor added to react-components, therefore these tests
    // need to be disabled.
    //
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind):
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last. The root slot now composes with clsx, so
    // the consumer className never reaches a mergeClasses call and the test can no longer
    // observe the contract — even though this file still calls mergeClasses for the `info`
    // slot, which deliberately stays on Griffel until react-popover converts (see
    // useInfoButtonStyles.styles.ts). The guarantee itself is unchanged: clsx puts
    // `state.root.className` last and the `@layer fui.*` sublayers keep unlayered consumer
    // CSS winning (DECISIONS.md D2/D9). `classname-overrides-win` below is its
    // cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['component-has-static-classnames-object', 'exported-top-level', 'make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
