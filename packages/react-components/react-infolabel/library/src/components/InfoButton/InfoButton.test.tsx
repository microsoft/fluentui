import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { InfoButton } from './InfoButton';
import { isConformant } from '../../testing/isConformant';
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
    // InfoButton is not to be exported by the package nor added to react-components, therefore these tests
    // need to be disabled.
    //
    // `component-has-static-classnames-object` stays disabled, now for a stronger reason: it
    // asserts the `fui-<Component>__<slot>` BEM format DECISIONS.md D16.1 removed.
    // `component-has-group-marker` (now a default test) replaces it — it asserts the group marker IS stamped
    // and is never `classList[0]` (D16.2 / D16.6). The `has-static-classnames` testOptions
    // that fed the deleted test (including `getPortalElement`, which reached the PopoverSurface
    // in the portal — Griffel-styled at the time) went with it.
    //
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind):
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last. Both slots now compose with clsx — the
    // `info` slot's Griffel `makeStyles` was converted in Phase 3 once react-popover landed
    // (see useInfoButtonStyles.styles.ts) — so the consumer className never reaches a
    // mergeClasses call and the test can no longer observe the contract. The guarantee itself
    // is unchanged: clsx puts
    // `state.root.className` last and the `@layer fui.*` sublayers keep unlayered consumer
    // CSS winning (DECISIONS.md D2/D9). `classname-overrides-win` below is its
    // cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['component-has-static-classnames-object', 'exported-top-level'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });
});
