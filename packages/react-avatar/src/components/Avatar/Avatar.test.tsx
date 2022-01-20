import * as React from 'react';
import { isConformant } from '../../common/isConformant';
import { Avatar } from './Avatar';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { render } from '@testing-library/react';

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
    const component = renderer.create(<Avatar image={{ src: 'i.png' }} />);
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

  it('displays custom initials', () => {
    const name = 'First Last';
    const component = renderer.create(<Avatar name={name} initials={(name[1] + name[7]).toUpperCase()} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes initials over icon', () => {
    const component = renderer.create(<Avatar name="First Last" icon={<span className="icon" />} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over initials', () => {
    const component = renderer.create(<Avatar name="First Last" image={{ src: 'i.png' }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over icon', () => {
    const component = renderer.create(<Avatar icon={<span className="icon" />} image={{ src: 'i.png' }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prioritizes image over initials and icon', () => {
    const component = renderer.create(
      <Avatar name="First Last" icon={<span className="icon" />} image={{ src: 'i.png' }} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a badge', () => {
    const component = renderer.create(<Avatar name="First Last" badge={{ status: 'available' }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles customSize', () => {
    const component = renderer.create(<Avatar name="First Last" size={32} style={{ width: '33px', height: '33px' }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not set name on the native element', () => {
    const result = render(<Avatar name="First Last" data-testid="root" />);
    expect(result.getByTestId('root').getAttribute('name')).toBeFalsy();
  });

  it('sets the alt text on the image element, and aria-hidden on initials', () => {
    const name = 'First Last';
    const result = render(<Avatar name={name} image={{ src: 'avatar.png' }} />);

    const image = result.getByRole('img');
    const initials = result.getByText('FL');
    expect(image.getAttribute('alt')).toEqual(name);
    expect(initials.getAttribute('aria-hidden')).toEqual('true');
  });

  it('sets role and aria-label on initials when there is no image', () => {
    const name = 'First Last';
    const initialsRef = React.createRef<HTMLSpanElement>();
    const result = render(<Avatar name={name} initials={{ ref: initialsRef }} />);

    expect(result.getByRole('img')).toBe(initialsRef.current);
    expect(initialsRef.current?.getAttribute('aria-label')).toEqual(name);
    expect(initialsRef.current?.getAttribute('aria-hidden')).toBeNull();
  });

  it('sets role and aria-label on icon when there is no image or initials', () => {
    const name = 'First Last';
    const iconRef = React.createRef<HTMLSpanElement>();
    const result = render(<Avatar name={name} initials="" icon={{ ref: iconRef }} />);

    expect(result.getByRole('img')).toBe(iconRef.current);
    expect(iconRef.current?.getAttribute('aria-label')).toEqual(name);
    expect(iconRef.current?.getAttribute('aria-hidden')).toBeNull();
  });

  // it('sets alt on the image element', () => {
  //   const name = 'First Last';
  //   const result = render(<Avatar name={name} image={{ src: 'first-last.png' }} />);

  //   expect(result.getByRole('img').getAttribute('alt')).toEqual(name);
  // });
});
