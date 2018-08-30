import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders Checkbox correctly', () => {
    const component = renderer.create(<Checkbox label="Standard checkbox" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Checkbox with id correctly', () => {
    const component = mount(<Checkbox label="Standard checkbox" ariaDescribedBy={'descriptionID'} id="my-checkbox" />);
    expect(component.find('button').prop('id')).toEqual('my-checkbox');
  });
});
