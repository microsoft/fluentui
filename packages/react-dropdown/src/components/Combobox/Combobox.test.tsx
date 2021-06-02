import * as React from 'react';
import '@testing-library/jest-dom';
import { Combobox } from './Combobox';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('Combobox', () => {
  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Combobox in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Combobox>Default Combobox</Combobox>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
