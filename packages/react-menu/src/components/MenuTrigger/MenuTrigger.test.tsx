import * as React from 'react';
import { MenuTrigger } from './MenuTrigger';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('MenuTrigger', () => {
  isConformant({
    disabledTests: [
      'as-renders-html',
      'as-renders-fc',
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'as-passes-as-value',
    ],
    Component: MenuTrigger,
    displayName: 'MenuTrigger',
    requiredProps: {
      children: <button>MenuTrigger</button>,
    },
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <MenuTrigger>
        <button>Menu trigger</button>
      </MenuTrigger>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
