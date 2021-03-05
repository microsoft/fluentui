import * as React from 'react';
import { PresenceBadge } from './PresenceBadge';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('PresenceBadge', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'PresenceBadge',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('renders a default state', () => {
    const component = renderer.create(<PresenceBadge />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
