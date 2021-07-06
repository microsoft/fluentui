import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { isConformant } from '../../common/isConformant';

import { Spinner, SpinnerBase, SpinnerSize } from './index';

describe('Spinner', () => {
  it('renders Spinner correctly', () => {
    const component = renderer.create(<Spinner label="Standard spinner" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
    // Problem: Doesn’t handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });

  it('uses default documented properties', () => {
    const component = mount(<SpinnerBase />);

    expect(component.prop('size')).toEqual(SpinnerSize.medium);
    expect(component.prop('ariaLive')).toEqual('polite');
    expect(component.prop('labelPosition')).toEqual('bottom');

    component.unmount();
  });

  it('uses specified properties when provided', () => {
    const component = mount(
      <SpinnerBase
        size={SpinnerSize.large}
        ariaLive="assertive"
        labelPosition="top"
        label="Spinner label"
        ariaLabel="Aria spinner label"
      />,
    );

    expect(component.prop('size')).toEqual(SpinnerSize.large);
    expect(component.prop('ariaLive')).toEqual('assertive');
    expect(component.prop('labelPosition')).toEqual('top');
    expect(component.prop('label')).toEqual('Spinner label');
    expect(component.prop('ariaLabel')).toEqual('Aria spinner label');

    component.unmount();
  });
});
