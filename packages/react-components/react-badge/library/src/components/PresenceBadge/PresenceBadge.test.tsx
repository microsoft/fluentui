import * as React from 'react';
import { PresenceBadge } from './PresenceBadge';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../testing/isConformant';

describe('PresenceBadge', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'PresenceBadge',
  });

  it('renders a default state', () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const component = renderer.create(<PresenceBadge />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
