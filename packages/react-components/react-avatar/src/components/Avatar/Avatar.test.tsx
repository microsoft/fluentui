import * as React from 'react';
import { isConformant } from '../../common/isConformant';
import { Avatar } from './Avatar';
import { render, screen } from '@testing-library/react';
import { avatarClassNames } from './useAvatarStyles';

describe('Avatar', () => {
  isConformant({
    Component: Avatar,
    displayName: 'Avatar',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            image: { src: 'avatar.png', alt: 'test-image' },
            initials: 'Test Initials',
            badge: 'Test Badge',
          },
          expectedClassNames: {
            root: avatarClassNames.root,
            image: avatarClassNames.image,
            initials: avatarClassNames.initials,
            badge: avatarClassNames.badge,
          },
        },
        {
          props: {
            image: { src: 'avatar.png', alt: 'test-image' },
            icon: 'Test Icon',
            badge: 'Test Badge',
          },
          expectedClassNames: {
            root: avatarClassNames.root,
            image: avatarClassNames.image,
            icon: avatarClassNames.icon,
            badge: avatarClassNames.badge,
          },
        },
      ],
    },
  });

  /**
   * Note: see visual regression tests for Avatar in /apps/vr-tests.
   */
  it('renders a default state', () => {
    render(<Avatar />);
    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('renders an icon', () => {
    render(<Avatar icon={<img src="i.svg" alt="test-icon" />} />);
    expect(screen.getByAltText('test-icon')).toBeTruthy();
  });

  it('renders an image', () => {
    render(<Avatar image={{ src: 'avatar.png', alt: 'test-image' }} />);
    expect(screen.getByAltText('test-image')).toBeTruthy();
  });

  it('renders 1 initial with a 1-word name', () => {
    render(<Avatar name="First" />);
    expect(screen.getByText('F')).toBeTruthy();
  });

  it('renders 2 initials with a 2-word name', () => {
    render(<Avatar name="First Last" />);
    expect(screen.getByText('FL')).toBeTruthy();
  });

  it('renders 2 initials with a 3-word name', () => {
    render(<Avatar name="First Middle Last" />);
    expect(screen.getByText('FL')).toBeTruthy();
  });

  it('renders 1 initial at size 16', () => {
    render(<Avatar name="First Middle Last" size={16} />);
    expect(screen.getByText('F')).toBeTruthy();
  });

  it('renders an icon if the name is not alphabetic', () => {
    const initialsRef = React.createRef<HTMLElement>();
    render(<Avatar name="(111)-555-1234" initials={{ ref: initialsRef }} icon={<img src="i.svg" alt="test-icon" />} />);

    expect(initialsRef.current).toBeFalsy();
    expect(screen.getByAltText('test-icon')).toBeTruthy();
  });

  it('displays custom initials', () => {
    render(<Avatar name="First Last" initials="XZ" />);
    expect(screen.getByText('XZ')).toBeTruthy();
  });

  it('prioritizes initials over icon', () => {
    render(<Avatar name="First Last" icon={<img src="i.svg" alt="test-icon" />} />);

    expect(screen.getByText('FL')).toBeTruthy();
    expect(screen.queryByAltText('test-icon')).toBeFalsy();
  });

  it('prioritizes image over initials', () => {
    render(<Avatar name="First Last" image={{ src: 'avatar.png', alt: 'test-image' }} />);

    // Both are rendered, but the initials precede the image, and are hidden by it
    expect(screen.getByAltText('test-image').compareDocumentPosition(screen.getByText('FL'))).toBe(
      Node.DOCUMENT_POSITION_PRECEDING,
    );
  });

  it('prioritizes image over icon', () => {
    render(<Avatar icon={<img src="i.svg" alt="test-icon" />} image={{ src: 'avatar.png', alt: 'test-image' }} />);

    // Both are rendered, but the icon precedes the image, and are hidden by it
    expect(screen.getByAltText('test-image').compareDocumentPosition(screen.getByAltText('test-icon'))).toBe(
      Node.DOCUMENT_POSITION_PRECEDING,
    );
  });

  it('prioritizes image over initials and icon', () => {
    render(
      <Avatar
        name="First Last"
        icon={<img src="i.svg" alt="test-icon" />}
        image={{ src: 'avatar.png', alt: 'test-image' }}
      />,
    );

    // Both image and initials are rendered, but the initials precede the image, and are hidden by it
    expect(screen.getByAltText('test-image').compareDocumentPosition(screen.getByText('FL'))).toBe(
      Node.DOCUMENT_POSITION_PRECEDING,
    );

    // The icon is not rendered
    expect(screen.queryByAltText('test-icon')).toBeFalsy();
  });

  it('displays a badge', () => {
    const badgeRef = React.createRef<HTMLDivElement>();
    render(<Avatar name="First Last" badge={{ status: 'available', ref: badgeRef }} />);
    expect(badgeRef.current).toBeTruthy();
  });

  it('does not set name on the native element', () => {
    render(<Avatar name="First Last" data-testid="root" />);

    expect(screen.getByTestId('root').getAttribute('name')).toBeFalsy();
  });

  it('sets role="img" on the root', () => {
    const rootRef = React.createRef<HTMLSpanElement>();
    render(<Avatar ref={rootRef} image={{ src: 'avatar.png' }} />);

    expect(rootRef.current).toBe(screen.getByRole('img'));
  });

  it('sets aria-label={name} on the root', () => {
    const name = 'First Last';
    render(<Avatar name={name} />);

    expect(screen.getByRole('img').getAttribute('aria-label')).toEqual(name);
  });

  it('sets aria-hidden and role="presentation" on the image', () => {
    render(<Avatar name="First Last" image={{ src: 'avatar.png', alt: 'test-image' }} />);

    const image = screen.getByAltText('test-image');
    expect(image.getAttribute('aria-hidden')).toBeTruthy();
    expect(image.getAttribute('role')).toEqual('presentation');
  });

  it('sets aria-hidden on the initials', () => {
    render(<Avatar name="First Last" />);

    expect(screen.getByText('FL').getAttribute('aria-hidden')).toBeTruthy();
  });

  it('sets aria-hidden on the icon', () => {
    const iconRef = React.createRef<HTMLSpanElement>();
    render(<Avatar icon={{ ref: iconRef }} />);

    expect(iconRef.current?.getAttribute('aria-hidden')).toBeTruthy();
  });

  it('falls back to initials for aria-labelledby', () => {
    render(<Avatar initials={{ children: 'FL', id: 'initials-id' }} />);

    expect(screen.getByRole('img').getAttribute('aria-labelledby')).toBe('initials-id');
  });

  it('includes badge in aria-labelledby', () => {
    const name = 'First Last';
    render(<Avatar id="root-id" name={name} badge={{ status: 'away', id: 'badge-id' }} />);

    expect(screen.getByRole('img').getAttribute('aria-label')).toBe(name);
    expect(screen.getByRole('img').getAttribute('aria-labelledby')).toBe('root-id badge-id');
  });
});
