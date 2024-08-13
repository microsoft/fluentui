import * as React from 'react';
import { AvatarGroupItem } from '../AvatarGroupItem/AvatarGroupItem';
import { AvatarGroupPopover } from './AvatarGroupPopover';
import { avatarGroupPopoverClassNames } from './useAvatarGroupPopoverStyles.styles';
import { isConformant } from '../../testing/isConformant';
import { render, RenderResult, screen } from '@testing-library/react';

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

describe('AvatarGroupPopover', () => {
  isConformant({
    Component: AvatarGroupPopover,
    displayName: 'AvatarGroupPopover',
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
            popoverButton: avatarGroupPopoverClassNames.triggerButton,
            popoverContent: avatarGroupPopoverClassNames.content,
            popoverSurface: avatarGroupPopoverClassNames.popoverSurface,
          },
          getPortalElement: getPopoverSurfaceElement,
        },
      ],
      'consistent-callback-args': {
        legacyCallbacks: ['onOpenChange'],
      },
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

  it('respects a custom count', () => {
    render(
      <AvatarGroupPopover count={20}>
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroupPopover>,
    );

    expect(screen.getByRole('button').textContent).toBe('+20');
  });

  it('does not render a count greater than 99', () => {
    render(
      <AvatarGroupPopover count={120}>
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroupPopover>,
    );

    expect(screen.getByRole('button').textContent).toBe('99+');
  });
});
