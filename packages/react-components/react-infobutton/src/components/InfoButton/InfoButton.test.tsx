import { InfoButton } from './InfoButton';
import { isConformant } from '../../testing/isConformant';
import { infoButtonClassNames } from './useInfoButtonStyles';
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
      content: "This is an InfoButton's Content.",
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            content: "This is an InfoButton's Content.",
          },
          expectedClassNames: {
            root: infoButtonClassNames.root,
            content: infoButtonClassNames.content,
          },
          getPortalElement: getPopoverSurfaceElement,
        },
      ],
    },
  });
});
