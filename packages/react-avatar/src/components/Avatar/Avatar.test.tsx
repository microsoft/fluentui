import * as React from 'react';
import * as path from 'path';
import { isConformant } from '@fluentui/react-conformance';
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
    componentPath: path.join(__dirname, 'Avatar.tsx'),
    Component: Avatar,
    displayName: 'Avatar',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });

  /**
   * Note: see more visual regression tests for Avatar in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Avatar>Default Avatar</Avatar>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
