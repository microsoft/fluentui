import * as React from 'react';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem';
import { isConformant } from '../../common/isConformant';
import { render, RenderResult, screen, within } from '@testing-library/react';
import { avatarGroupClassNames } from './useAvatarGroupStyles';
import { AvatarGroupOverflow } from '../AvatarGroupOverflow/AvatarGroupOverflow';

// testing-library's queryByRole function doesn't look inside portals
// function queryByRoleList(result: RenderResult) {
//   const lists = result.baseElement.querySelectorAll('*[role="list"]');
//   if (!lists?.length) {
//     return null;
//   } else {
//     expect(lists.length).toBe(1);
//     return lists.item(0) as HTMLElement;
//   }
// }

// const getOverflowContentElement = (result: RenderResult) => {
//   // overflowButton needs to be clicked otherwise overflowContent won't be rendered.
//   result.queryByRole('button')?.click();
//   return queryByRoleList(result)!;
// };

describe('AvatarGroup', () => {
  isConformant({
    Component: AvatarGroup,
    displayName: 'AvatarGroup',
    // disabledTests: ['make-styles-overrides-win'],
    // testOptions: {
    //   'has-static-classnames': [
    //     {
    //       props: {},
    //       expectedClassNames: {
    //         root: avatarGroupClassNames.root,
    //         overflowButton: avatarGroupClassNames.overflowButton,
    //         overflowContent: avatarGroupClassNames.overflowContent,
    //       },
    //       getPortalElement: getOverflowContentElement,
    //     },
    //   ],
    // },
    requiredProps: {
      children: (
        <>
          <AvatarGroupItem name="Mona Kane" />
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
          <AvatarGroupOverflow>
            <AvatarGroupItem name="Allan Munger" />
            <AvatarGroupItem name="Daisy Phillips" />
            <AvatarGroupItem name="Robert Tolbert" />
            <AvatarGroupItem name="Kevin Sturgis" />
          </AvatarGroupOverflow>
        </>
      ),
    },
  });

  it('renders an overflow indicator when AvatarGroupItems overflow', () => {
    render(
      <AvatarGroup>
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
        <AvatarGroupOverflow>
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </AvatarGroupOverflow>
      </AvatarGroup>,
    );

    expect(screen.getByText('+5')).toBeTruthy();
  });

  it('renders an icon overflow indicator when size is less than 24', () => {
    render(
      <AvatarGroup size={20}>
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
        <AvatarGroupOverflow>
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </AvatarGroupOverflow>
      </AvatarGroup>,
    );

    expect(screen.getByRole('button').textContent).toBe('');
  });
});
