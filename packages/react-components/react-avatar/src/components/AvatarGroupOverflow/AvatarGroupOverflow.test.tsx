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
  result.queryByRole('button')?.click();
  return queryByRoleDialog(result)!;
};

describe('AvatarGroupOverflow', () => {
  isConformant({
    Component: AvatarGroupOverflow,
    displayName: 'AvatarGroupOverflow',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: avatarGroupOverflowClassNames.root,
            overflowContent: avatarGroupOverflowClassNames.overflowContent,
            overflowSurface: avatarGroupOverflowClassNames.overflowSurface,
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
