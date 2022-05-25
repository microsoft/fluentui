import * as React from 'react';
import { mount } from 'enzyme';
import { create } from '@fluentui/utilities/lib/test';
import { resetIds } from '@fluentui/utilities';
import { Toggle } from './Toggle';
import { isConformant } from '../../common/isConformant';

describe('Toggle', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders a label', () => {
    const component = mount(<Toggle label="Label" />);
    expect(component.find('.ms-Toggle-label').first().text()).toEqual('Label');
  });

  it('renders toggle correctly', () => {
    const component = create(<Toggle label="Label" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label (string)', () => {
    const component = create(<Toggle label="Label" inlineLabel={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label (JSX Element)', () => {
    const component = create(<Toggle label={<p>Label</p>} inlineLabel={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label and on/off text provided', () => {
    const component = create(<Toggle label="Label" inlineLabel={true} onText="On" offText="Off" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hidden toggle correctly', () => {
    const component = create(<Toggle hidden />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Toggle,
    displayName: 'Toggle',
  });

  it('renders aria-label', () => {
    const component = mount(<Toggle label="Label" ariaLabel="AriaLabel" />);

    expect(component.find('button').first().getDOMNode().getAttribute('aria-label')).toEqual('AriaLabel');
  });

  it('can call the callback on a change of toggle', () => {
    let isToggledValue;
    const callback = (ev: React.MouseEvent<HTMLElement>, isToggled?: boolean) => {
      isToggledValue = isToggled;
    };

    const component = mount<React.ReactInstance>(<Toggle label="Label" onChange={callback} />);

    expect(component.find('button').first().getDOMNode().getAttribute('aria-checked')).toEqual('false');

    component.find('button').first().simulate('click');

    expect(isToggledValue).toEqual(true);

    expect(component.find('button').first().getDOMNode().getAttribute('aria-checked')).toEqual('true');
  });

  it(`doesn't update the state if the user provides checked`, () => {
    const component = mount(<Toggle label="Label" checked={false} />);

    expect(component.find('button').first().getDOMNode().getAttribute('aria-checked')).toEqual('false');

    component.find('button').first().simulate('click');

    expect(component.update().find('button').first().getDOMNode().getAttribute('aria-checked')).toEqual('false');
  });

  it(`doesn't render a label element if none is provided`, () => {
    const component = mount(<Toggle checked={false} />);

    expect(component.find('label').length).toEqual(0);
  });

  it(`doesn't trigger onSubmit when placed inside a form`, () => {
    const onSubmit = jest.fn();

    const wrapper = mount(
      <form
        action="#"
        onSubmit={e => {
          onSubmit();
          e.preventDefault();
        }}
      >
        <Toggle label="Label" />
      </form>,
    );
    const button = wrapper.find('button');
    // simulate to change toggle state
    button.simulate('click');
    expect(button.getDOMNode().getAttribute('aria-checked')).toEqual('true');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  describe('aria-labelledby', () => {
    it('has no aria-labelledby attribute if ariaLabel is provided', () => {
      const component = mount(<Toggle label="Label" ariaLabel="AriaLabel" />);

      expect(component.find('button').first().getDOMNode().getAttribute('aria-labelledby')).toBeNull();
    });

    it('is labelled by the label element if no aria labels are provided', () => {
      const component = mount(<Toggle label="Label" id="ToggleId" />);

      expect(component.find('button').first().getDOMNode().getAttribute('aria-labelledby')).toBe('ToggleId-label');
    });

    it('is labelled by the state text element if no aria labels are provided and no label is provided', () => {
      const component = mount(<Toggle onText="On" offText="Off" id="ToggleId" />);

      expect(component.find('button').first().getDOMNode().getAttribute('aria-labelledby')).toBe('ToggleId-stateText');
    });

    it('is labelled by the label element alone if no aria labels are provided, and state text is provided', () => {
      const component = mount(<Toggle label="Label" onText="On" offText="Off" id="ToggleId" />);

      expect(component.find('button').first().getDOMNode().getAttribute('aria-labelledby')).toBe('ToggleId-label');
    });
  });
});
