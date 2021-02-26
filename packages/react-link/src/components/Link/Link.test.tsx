import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { Link } from './Link';

describe('Link', () => {
  isConformant({
    Component: Link,
    displayName: 'Link',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Link in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Link>Default Link</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
