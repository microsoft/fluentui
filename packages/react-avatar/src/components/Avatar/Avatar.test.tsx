import * as React from 'react';
import { isConformant } from '../../common/isConformant';
import { Avatar } from './Avatar';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';

describe('Avatar', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  isConformant({
    Component: Avatar,
    displayName: 'Avatar',
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
    const component = renderer.create(<Avatar icon={<span className="icon" />} />);
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
    const component = renderer.create(<Avatar name="First Last" icon={<span className="icon" />} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over initials', () => {
    const component = renderer.create(<Avatar name="First Last" image="i.png" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over icon', () => {
    const component = renderer.create(<Avatar icon={<span className="icon" />} image="i.png" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over initials and icon', () => {
    const component = renderer.create(<Avatar name="First Last" icon={<span className="icon" />} image="i.png" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a badge', () => {
    const component = renderer.create(<Avatar name="First Last" badge="available" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles customSize', () => {
    const component = renderer.create(<Avatar name="First Last" size={32} style={{ width: '33px', height: '33px' }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
