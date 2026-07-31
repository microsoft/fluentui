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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    disabledTests: ['component-has-static-classnames-object', 'exported-top-level'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });
});
