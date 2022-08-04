import * as React from 'react';
import { AvatarGroupItem } from '../AvatarGroupItem/AvatarGroupItem';
import { AvatarGroupOverflow } from './AvatarGroupOverflow';
import { avatarGroupOverflowClassNames } from './useAvatarGroupOverflowStyles';
import { isConformant } from '../../common/isConformant';
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

const getOverflowSurfaceElement = (result: RenderResult) => {
  // Overflow button needs to be clicked otherwise overflowContent won't be rendered.
  result.getByRole('button').click();
  const dialog = queryByRoleDialog(result);
  expect(dialog).not.toBeNull();
  return dialog!;
};

describe('AvatarGroupOverflow', () => {
  isConformant({
    Component: AvatarGroupOverflow,
    displayName: 'AvatarGroupOverflow',
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
            overflowButton: avatarGroupOverflowClassNames.triggerButton,
            overflowContent: avatarGroupOverflowClassNames.content,
            overflowSurface: avatarGroupOverflowClassNames.popoverSurface,
          },
          getPortalElement: getOverflowSurfaceElement,
        },
      ],
    },
    requiredProps: {
      children: (
        <>
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </>
      ),
      count: 4,
    },
  });
});
