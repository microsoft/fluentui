import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Fabric } from './Fabric';
import { mount } from 'enzyme';

describe('Fabric', () => {
  it('renders a Fabric component correctly', () => {
    const component = renderer.create(<Fabric>test</Fabric>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Fabric component with applyTheme correctly', () => {
    const component = renderer.create(<Fabric applyTheme>test</Fabric>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Fabric component with applyThemeToBody correctly', () => {
    const wrapper = mount(<Fabric applyThemeToBody>test</Fabric>);
    expect(wrapper.getDOMNode().getElementsByClassName('bodyThemed')).toBeTruthy();
  });
});
