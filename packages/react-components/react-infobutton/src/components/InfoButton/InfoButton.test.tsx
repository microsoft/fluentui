import { InfoButton } from './InfoButton';
import { isConformant } from '../../common/isConformant';
import { infoButtonClassNames } from './useInfoButtonStyles';
import { RenderResult } from '@testing-library/react';

// testing-library's queryByRole function doesn't look inside portals
function queryByRoleDialog(result: RenderResult) {
  const dialogs = result.baseElement.querySelectorAll('*[role="dialog"]');
  if (!dialogs?.length) {
    return null;
  } else {
    expect(dialogs.length).toBe(1);
    return dialogs.item(0) as HTMLElement;
  }
}

const getPopoverSurfaceElement = (result: RenderResult) => {
  // triggerButton needs to be clicked otherwise content won't be rendered.
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
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'make-styles-overrides-win',
    ],
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            // root shouldn't be expected since the root is a Popover
            trigger: infoButtonClassNames.trigger,
            content: infoButtonClassNames.content,
          },
          getPortalElement: getPopoverSurfaceElement,
        },
      ],
    },
  });
});
