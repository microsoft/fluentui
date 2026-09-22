import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroup } from '../AvatarGroup/AvatarGroup';
import { AvatarGroupItem } from './AvatarGroupItem';
import { avatarGroupItemClassNames } from './useAvatarGroupItemStyles.styles';

describe('AvatarGroupItem', () => {
  it('renders the modern Avatar with inherited visual state', () => {
    const { getByLabelText } = render(
      <AvatarGroup layout="stack" size={48}>
        <AvatarGroupItem name="Ada Lovelace" className="consumer-class" />
      </AvatarGroup>,
    );
    const avatar = getByLabelText('Ada Lovelace');
    const root = avatar.parentElement;

    expect(root).toHaveClass(avatarGroupItemClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-layout', 'stack');
    expect(root).toHaveAttribute('data-size', '48');
    expect(avatar).toHaveAttribute('data-size', '48');
  });
});
