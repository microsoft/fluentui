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
    disabledTests: ['component-has-static-classnames-object', 'exported-top-level'],
  });
});
