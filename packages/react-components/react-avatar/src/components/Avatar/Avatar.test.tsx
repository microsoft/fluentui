import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { Avatar } from './Avatar';
import { render, screen } from '@testing-library/react';
import { avatarClassNames } from './useAvatarStyles.styles';
import { DEFAULT_STRINGS } from './useAvatar';

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
            icon: 'Test Icon',
          },
          expectedClassNames: {
            root: avatarClassNames.root,
            icon: avatarClassNames.icon,
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

  it('does not render the icon when there is an image', () => {
    render(<Avatar icon={<img src="i.svg" alt="test-icon" />} image={{ src: 'avatar.png', alt: 'test-image' }} />);

    expect(screen.getByAltText('test-image')).toBeTruthy();
    expect(screen.queryByAltText('test-icon')).toBeFalsy();
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

    expect(rootRef.current?.getAttribute('role')).toBe('img');
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

  it('sets aria-hidden on the icon', () => {
    const iconRef = React.createRef<HTMLSpanElement>();
    render(<Avatar icon={{ ref: iconRef }} />);

    expect(iconRef.current?.getAttribute('aria-hidden')).toBeTruthy();
  });

  it('sets aria-labelledby to initials if no name is provided', () => {
    render(<Avatar initials={{ children: 'FL', id: 'initials-id' }} />);

    expect(screen.getByRole('img').getAttribute('aria-labelledby')).toBe('initials-id');
  });

  it('sets aria-labelledby to initials with a generated ID, if no name is provided', () => {
    render(<Avatar initials="ABC" />);

    const intialsId = screen.getByText('ABC').id;

    expect(screen.getByRole('img').getAttribute('aria-labelledby')).toBe(intialsId);
  });

  it('sets aria-labelledby to the name + badge', () => {
    const name = 'First Last';
    render(<Avatar id="root-id" name={name} badge={{ status: 'away', id: 'badge-id' }} />);

    const root = screen.getAllByRole('img')[0];
    expect(root.getAttribute('aria-label')).toBe(name);
    expect(root.getAttribute('aria-labelledby')).toBe('root-id badge-id');
  });

  it('sets aria-label to the name + activeState when active="active"', () => {
    const name = 'First Last';
    render(<Avatar id="root-id" name={name} active="active" />);

    const root = screen.getAllByRole('img')[0];
    expect(root.getAttribute('aria-label')).toBe(`${name} ${DEFAULT_STRINGS.active}`);
  });

  it('sets aria-label to the name + activeState when active="inactive"', () => {
    const name = 'First Last';
    render(<Avatar id="root-id" name={name} active="inactive" />);

    const root = screen.getAllByRole('img')[0];
    expect(root.getAttribute('aria-label')).toBe(`${name} ${DEFAULT_STRINGS.inactive}`);
  });

  it('sets aria-labelledby to the name + badge + activeState when there is a badge and active state', () => {
    render(<Avatar id="root-id" name="First Last" badge={{ status: 'away', id: 'badge-id' }} active="active" />);

    const activeAriaLabelElement = screen.getByText(DEFAULT_STRINGS.active);
    expect(activeAriaLabelElement.id).toBeTruthy();
    expect(activeAriaLabelElement.hidden).toBeTruthy();

    const root = screen.getAllByRole('img')[0];
    expect(root.getAttribute('aria-labelledby')).toBe(`root-id badge-id ${activeAriaLabelElement.id}`);
  });

  it('sets aria-labelledby to the initials + badge + activeState, if no name is provided', () => {
    render(
      <Avatar
        initials={{ children: 'FL', id: 'initials-id' }}
        badge={{ status: 'away', id: 'badge-id' }}
        active="inactive"
      />,
    );

    const activeAriaLabelElement = screen.getByText(DEFAULT_STRINGS.inactive);
    expect(activeAriaLabelElement.id).toBeTruthy();
    expect(activeAriaLabelElement.hidden).toBeTruthy();

    const root = screen.getAllByRole('img')[0];
    expect(root.getAttribute('aria-labelledby')).toBe(`initials-id badge-id ${activeAriaLabelElement.id}`);
  });

  it('does not render an activeAriaLabelElement when active state is unset', () => {
    render(<Avatar name="First Last" />);

    expect(screen.queryByText(DEFAULT_STRINGS.active)).toBeNull();
    expect(screen.queryByText(DEFAULT_STRINGS.inactive)).toBeNull();

    const root = screen.getAllByRole('img')[0];
    expect(root.getAttribute('aria-label')).toBe('First Last');
    expect(root.getAttribute('aria-labelledby')).toBeFalsy();
  });

  it('does not render an image when the src attribute is undefined', () => {
    render(<Avatar image={{ src: undefined, alt: 'test-image' }} />);

    expect(screen.queryByAltText('test-image')).toBeNull();
  });
});
