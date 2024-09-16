import * as React from 'react';
import { CounterBadge } from './CounterBadge';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../testing/isConformant';

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const component = renderer.create(<CounterBadge />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
