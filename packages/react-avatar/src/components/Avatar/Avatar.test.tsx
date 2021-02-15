import * as React from 'react';
import * as path from 'path';
import { isConformant } from '@fluentui/react-conformance';
import { Avatar } from './Avatar';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { GroupIcon } from '@fluentui/react-icons-mdl2';

describe('Avatar', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  isConformant({
    asPropHandlesRef: true,
    componentPath: path.join(__dirname, 'Avatar.tsx'),
    Component: Avatar,
    displayName: 'Avatar',
    disabledTests: ['has-docblock'],
  });

  /**
   * Note: see more visual regression tests for Avatar in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Avatar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an icon', () => {
    const component = renderer.create(<Avatar icon={<GroupIcon />} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an image', () => {
    const component = renderer.create(<Avatar image="i.png" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 1 initial with a 1-word name', () => {
    const component = renderer.create(<Avatar name="First" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 2 initials with a 2-word name', () => {
    const component = renderer.create(<Avatar name="First Last" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 2 initials with a 3-word name', () => {
    const component = renderer.create(<Avatar name="First M. Last" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an icon if the name is not alphabetic', () => {
    const component = renderer.create(<Avatar name="(111)-555-1234" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays custom initials via getInitials', () => {
    const component = renderer.create(
      <Avatar name="First Last" getInitials={name => (name[1] + name[7]).toUpperCase()} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes icon over initials', () => {
    const component = renderer.create(<Avatar name="First Last" icon={<GroupIcon />} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over initials', () => {
    const component = renderer.create(<Avatar name="First Last" image="i.png" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over icon', () => {
    const component = renderer.create(<Avatar icon={<GroupIcon />} image="i.png" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over initials and icon', () => {
    const component = renderer.create(<Avatar name="First Last" icon={<GroupIcon />} image="i.png" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a badge', () => {
    const component = renderer.create(<Avatar name="First Last" badge="success" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles customSize', () => {
    const component = renderer.create(
      <Avatar name="First Last" size={32} tokens={{ width: '33px', height: '33px' }} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
