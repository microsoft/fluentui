import { InfoButton } from './InfoButton';
import { isConformant } from '../../common/isConformant';
import { infoButtonClassNames } from './useInfoButtonStyles';
import type { RenderResult } from '@testing-library/react';

// testing-library's queryByRole function doesn't look inside portals
function queryByRoleDialog(result: RenderResult) {
  const dialogs = result.baseElement.querySelectorAll('[role="dialog"]');
  if (!dialogs?.length) {
    return null;
  } else {
    expect(dialogs.length).toBe(1);
    return dialogs.item(0) as HTMLElement;
  }
}

const getPopoverSurfaceElement = (result: RenderResult) => {
  // button needs to be clicked otherwise content won't be rendered.
  result.getByRole('button').click();
  const dialog = queryByRoleDialog(result);
  expect(dialog).not.toBeNull();
  return dialog!;
};

describe('InfoButton', () => {
  isConformant({
    Component: InfoButton,
    displayName: 'InfoButton',
    requiredProps: {
      content: 'Popover content',
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            content: 'Popover content',
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
