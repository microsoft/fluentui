import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';

import { Toggle } from './Toggle';

describe('ToggleState', () => {
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
        .getAttribute('aria-checked')
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
        .getAttribute('aria-checked')
    ).toEqual('true');
  });

  it(`doesn't update the state if the user provides checked`, () => {
    const component = mount(<Toggle label="Label" checked={false} />);

    expect(
      component
        .find('button')
        .first()
        .getDOMNode()
        .getAttribute('aria-checked')
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
        .getAttribute('aria-checked')
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
        // tslint:disable-next-line:jsx-no-lambda
        onSubmit={e => {
          onSubmit();
          e.preventDefault();
        }}
      >
        <Toggle
          // tslint:disable-next-line:jsx-no-lambda
          componentRef={ref => (component = ref)}
          label="Label"
        />
      </form>
    );
    const button: any = wrapper.find('button');
    // simulate to change toggle state
    button.simulate('click');
    expect((component as React.Component<any, any>).state.checked).toEqual(true);
    expect(onSubmit.called).toEqual(false);
  });
});
