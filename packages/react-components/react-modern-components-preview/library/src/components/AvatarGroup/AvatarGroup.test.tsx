import * as React from 'react';
import { render } from '@testing-library/react';
import { AvatarGroup } from './AvatarGroup';
import { avatarGroupClassNames } from './useAvatarGroupStyles.styles';

describe('AvatarGroup', () => {
  it('has the expected display name and forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AvatarGroup ref={ref} />);

    expect(AvatarGroup.displayName).toBe('AvatarGroup');
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders visual defaults and preserves consumer classes', () => {
    const { container } = render(<AvatarGroup className="consumer-class" />);
    const root = container.firstElementChild;

    expect(root).toHaveClass(avatarGroupClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-layout', 'spread');
    expect(root).toHaveAttribute('data-size', '32');
  });

  it('maps visual props to data attributes', () => {
    const { container } = render(<AvatarGroup layout="pie" size={64} />);
    const root = container.firstElementChild;

    expect(root).toHaveAttribute('data-layout', 'pie');
    expect(root).toHaveAttribute('data-size', '64');
  });
});
