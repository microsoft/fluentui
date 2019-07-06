import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';

import { Toggle } from './Toggle';

describe('ToggleView', () => {
  it('renders a label', () => {
    const component = mount(<Toggle label="Label" />);
    expect(
      component
        .find('.ms-Toggle-label')
        .first()
        .text()
    ).toEqual('Label');
  });

  it('renders toggle correctly', () => {
    const component = renderer.create(<Toggle label="Label" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders aria-label', () => {
    const component = mount(<Toggle label="Label" ariaLabel="AriaLabel" />);

    expect(
      component
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-label')
    ).toEqual('AriaLabel');
  });

  it(`doesn't render a label element if none is provided`, () => {
    const component = mount(<Toggle checked={false} />);

    expect(component.find('label').length).toEqual(0);
  });
});
