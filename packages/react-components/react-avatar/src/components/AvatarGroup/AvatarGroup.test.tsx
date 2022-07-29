import * as React from 'react';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem';
import { isConformant } from '../../common/isConformant';
import { render, RenderResult, screen, within } from '@testing-library/react';
import { avatarGroupClassNames } from './useAvatarGroupStyles';

// testing-library's queryByRole function doesn't look inside portals
function queryByRoleList(result: RenderResult) {
  const lists = result.baseElement.querySelectorAll('*[role="list"]');
  if (!lists?.length) {
    return null;
  } else {
    expect(lists.length).toBe(1);
    return lists.item(0) as HTMLElement;
  }
}

const getOverflowContentElement = (result: RenderResult) => {
  // overflowButton needs to be clicked otherwise overflowContent won't be rendered.
  result.queryByRole('button')?.click();
  return queryByRoleList(result)!;
};

describe('AvatarGroup', () => {
  isConformant({
    Component: AvatarGroup,
    displayName: 'AvatarGroup',
    disabledTests: ['make-styles-overrides-win'],
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: avatarGroupClassNames.root,
            overflowButton: avatarGroupClassNames.overflowButton,
            overflowContent: avatarGroupClassNames.overflowContent,
          },
          getPortalElement: getOverflowContentElement,
        },
      ],
    },
    requiredProps: {
      children: [
        <AvatarGroupItem key="0" name="Katri Athokas" />,
        <AvatarGroupItem key="1" name="Elvia Atkins" />,
        <AvatarGroupItem key="2" name="Cameron Evans" />,
        <AvatarGroupItem key="3" name="Wanda Howard" />,
        <AvatarGroupItem key="4" name="Mona Kane" />,
        <AvatarGroupItem key="5" name="Allan Munger" />,
        <AvatarGroupItem key="6" name="Daisy Phillips" />,
        <AvatarGroupItem key="7" name="Robert Tolbert" />,
        <AvatarGroupItem key="8" name="Kevin Sturgis" />,
      ],
    },
  });

  it('renders an overflow indicator when AvatarGroupItems overflow', () => {
    render(
      <AvatarGroup>
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroup>,
    );

    expect(screen.getByText('+5')).toBeTruthy();
  });

  it('renders an icon overflow indicator when size is less than 24', () => {
    render(
      <AvatarGroup size={20}>
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroup>,
    );

    expect(screen.getByRole('button').textContent).toBe('');
  });

  it('ignores maxAvatars when using pie layout', () => {
    render(
      <AvatarGroup layout="pie">
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroup>,
    );

    // maxAvatars is 3 when the layout is pie, but it also renders a transparent button
    // so it needs to check for 3 children + 1 button
    expect(screen.getByRole('group').children.length).toBe(4);
  });

  it('renders the avatars in the correct order when using a stack or spread layout', () => {
    render(
      <AvatarGroup>
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroup>,
    );

    const avatarChildren = screen.getByRole('group').children;

    expect(avatarChildren.item(0)?.textContent).toBe('AM');
    expect(avatarChildren.item(1)?.textContent).toBe('DP');
    expect(avatarChildren.item(2)?.textContent).toBe('RT');
    expect(avatarChildren.item(3)?.textContent).toBe('KS');
  });

  it('renders all AvatarGroupItems inside the overflowContent when using a pie layout', () => {
    const { baseElement } = render(
      <AvatarGroup layout="pie">
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroup>,
    );

    const button = screen.getByRole('button');
    button.click();
    // overflowContent is rendered in a portal, so using baseElement let's you access its content
    const avatarGroupItems = within(baseElement as HTMLElement).getAllByRole('listitem');
    const avatarGroupItemAvatars = avatarGroupItems.map(item => within(item).getByRole('img'));

    expect(avatarGroupItemAvatars[0].textContent).toBe('KA');
    expect(avatarGroupItemAvatars[1].textContent).toBe('EA');
    expect(avatarGroupItemAvatars[2].textContent).toBe('CE');
    expect(avatarGroupItemAvatars[3].textContent).toBe('WH');
    expect(avatarGroupItemAvatars[4].textContent).toBe('MK');
    expect(avatarGroupItemAvatars[5].textContent).toBe('AM');
    expect(avatarGroupItemAvatars[6].textContent).toBe('DP');
    expect(avatarGroupItemAvatars[7].textContent).toBe('RT');
    expect(avatarGroupItemAvatars[8].textContent).toBe('KS');
  });

  it('handles maxAvatars', () => {
    render(
      <AvatarGroup>
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroup>,
    );

    expect(screen.getByRole('group').children.length).toBe(5);
  });

  it('handles custom maxAvatars', () => {
    render(
      <AvatarGroup maxAvatars={8}>
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroup>,
    );

    expect(screen.getByRole('group').children.length).toBe(8);
  });
});
