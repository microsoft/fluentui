import * as React from 'react';
import { Flex } from './Flex';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';

describe('Flex', () => {
  isConformant({
    Component: Flex,
    displayName: 'Flex',
  });

  /**
   * Note: see more visual regression tests for Flex in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Flex>Default Flex</Flex>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
