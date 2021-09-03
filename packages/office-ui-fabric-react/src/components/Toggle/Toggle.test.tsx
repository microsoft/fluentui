import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';
import * as sinon from 'sinon';

import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders a label', () => {
    const component = mount(<Toggle label="Label" />);
    expect(
      component
        .find('.ms-Toggle-label')
        .first()
        .text(),
    ).toEqual('Label');
  });

  it('renders toggle correctly', () => {
    const component = renderer.create(<Toggle label="Label" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label (string)', () => {
    const component = renderer.create(<Toggle label="Label" inlineLabel={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label (JSX Element)', () => {
    const component = renderer.create(<Toggle label={<p>Label</p>} inlineLabel={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label and on/off text provided', () => {
    const component = renderer.create(<Toggle label="Label" inlineLabel={true} onText="On" offText="Off" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hidden toggle correctly', () => {
    const component = renderer.create(<Toggle hidden />);
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
        .getAttribute('aria-label'),
    ).toEqual('AriaLabel');
  });

  it('can call the callback on a change of toggle', () => {
    let isToggledValue;
    const callback = (ev: React.MouseEvent<HTMLElement>, isToggled: boolean) => {
      isToggledValue = isToggled;
    };

    const component = mount<React.ReactInstance>(<Toggle label="Label" onChange={callback} />);

    expect(
      component
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-checked'),
    ).toEqual('false');

    component
      .find('button')
      .first()
      .simulate('click');

    expect(isToggledValue).toEqual(true);

    expect(
      component
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-checked'),
    ).toEqual('true');
  });

  it(`doesn't update the state if the user provides checked`, () => {
    const component = mount(<Toggle label="Label" checked={false} />);

    expect(
      component
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-checked'),
    ).toEqual('false');

    component
      .find('button')
      .first()
      .simulate('click');

    expect(
      component
        .update()
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-checked'),
    ).toEqual('false');
  });

  it(`doesn't render a label element if none is provided`, () => {
    const component = mount(<Toggle checked={false} />);

    expect(component.find('label').length).toEqual(0);
  });

  it(`doesn't trigger onSubmit when placed inside a form`, () => {
    let component: any;
    const onSubmit = sinon.spy();

    const wrapper = mount(
      <form
        action="#"
        onSubmit={e => {
          onSubmit();
          e.preventDefault();
        }}
      >
        <Toggle componentRef={ref => (component = ref)} label="Label" />
      </form>,
    );
    const button: any = wrapper.find('button');
    // Simulate to change toggle state.
    button.simulate('click');
    expect((component as React.Component<any, any>).state.checked).toEqual(true);
    expect(onSubmit.called).toEqual(false);
  });

  it('correctly changes id if a different one is passed after first render', () => {
    const testId1 = 'testId1';
    const testId2 = 'testId2';
    const component = mount(<Toggle id={testId1} />);

    const toggleButton = component.find('button');
    expect(toggleButton.length).toEqual(1);
    expect(
      toggleButton
        .first()
        .getDOMNode()
        .getAttribute('id'),
    ).toEqual(testId1);

    component.setProps({ id: testId2 });
    expect(
      toggleButton
        .first()
        .getDOMNode()
        .getAttribute('id'),
    ).toEqual(testId2);
  });

  describe('aria-labelledby', () => {
    it('has no aria-labelledby attribute if ariaLabel is provided', () => {
      const component = mount(<Toggle label="Label" ariaLabel="AriaLabel" />);

      expect(
        component
          .find('button')
          .first()
          .getDOMNode()
          .getAttribute('aria-labelledby'),
      ).toBeNull();
    });

    it('is labelled by the label element if no aria labels are provided', () => {
      const component = mount(<Toggle label="Label" id="ToggleId" />);

      expect(
        component
          .find('button')
          .first()
          .getDOMNode()
          .getAttribute('aria-labelledby'),
      ).toBe('ToggleId-label');
    });

    it('is labelled by the state text element if no aria labels are provided and no label is provided', () => {
      const component = mount(<Toggle onText="On" offText="Off" id="ToggleId" />);

      expect(
        component
          .find('button')
          .first()
          .getDOMNode()
          .getAttribute('aria-labelledby'),
      ).toBe('ToggleId-stateText');
    });

    it('is labelled by the label AND state text elements if no aria labels are provided', () => {
      const component = mount(<Toggle label="Label" onText="On" offText="Off" id="ToggleId" />);

      expect(
        component
          .find('button')
          .first()
          .getDOMNode()
          .getAttribute('aria-labelledby'),
      ).toBe('ToggleId-label ToggleId-stateText');
    });
  });
});
